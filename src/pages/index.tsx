import Button from "@/components/Common/Button";
import CommonInput from "@/components/Common/Input";
import { ROUTES } from "@/config/route.config";
import { SignInSchema } from "@/utils/validationSchema";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit: fromSubmit,
    formState: { errors },
  } = useForm({ resolver: SignInSchema });

  const [loader, setLoader] = useState<boolean>(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
  });

  const handleSubmit = async (value: { email: string }) => {
    setLoader(true);
    setLoginForm(value);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    router.push(ROUTES.OTP);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginForm({ ...loginForm, email: e.target.value });

  const isValidEmail = (email: string) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center space-x-2 mainBackgroundColor relative pt-12">
      <div className="w-full md:w-[501px] rounded-md bg-transparent md:bg-lightBlackColor flex items-center justify-center py-12 flex-col gap-10 px-6 md:px-12">
        <Image
          height={48}
          width={288}
          className="h-12 w-72"
          alt="logo"
          src="/images/logo.png"
          priority
        />
        <form
          onSubmit={fromSubmit(handleSubmit)}
          className="flex flex-col gap-5 w-full items-center"
        >
          <Button
            img
            url="/images/google.svg"
            padding="p-4"
            className="w-full bg-white rounded-lg font-medium text-black gap-3 hover:bg-opacity-50"
            text="Sign in with Google"
          />
          <hr className="w-full border-2 border-gray-700" />
          <div className="flex flex-col w-full gap-[1.5rem]">
            <CommonInput
              {...register("email", { required: true })}
              onChange={handleInputChange}
              type="email"
              className={`w-full p-5 bg-blackColor text-grayColor border border-blackColor ${
                errors?.email?.message
                  ? "focus:border-red-500"
                  : "focus:border-cyan-700"
              }`}
              placeHolder="Email Address"
              error={errors?.email?.message}
            />
            <Button
              loader={loader}
              padding="p-4"
              className={`w-full rounded-lg bg-mainBackGroundColor border border-mainColor font-medium text-grayColor ${
                !isValidEmail(loginForm.email)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-white hover:bg-opacity-40"
              }`}
              text="Continue with email"
              isDisabled={!isValidEmail(loginForm.email) || loader}
            />
          </div>
        </form>
        <h3
          onClick={() => router.push(ROUTES.SIGN_UP)}
          className="text-grayColor hover:text-cyan-700 cursor-pointer group transition-all duration-300"
        >
          Don&apos;t have an account?{" "}
          <span className="text-white group-hover:text-cyan-700 transition-all duration-300">
            Sign Up
          </span>
        </h3>
      </div>
      <h1 className="font-semibold text-sm text-center text-dellColor mt-20 pb-16 lg:pb-12">
        By continuing, you agree to our <br className="block md:hidden" />{" "}
        <span className="text-lightGreenColor">privacy policy</span> and{" "}
        <span className="text-lightGreenColor">terms of use</span>.
      </h1>
    </main>
  );
};

Home.layout = { auth: false, ip: null };
export default Home;
