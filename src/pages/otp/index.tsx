import Loader from "@/components/Loader";
import Button from "@/components/Common/Button";
import { ROUTES } from "@/config/route.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import OTPInput, { OTPInputProps } from "react-otp-input";

const Otp = () => {
  const [otp, setOtp] = useState<string>("");
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [isLoaderActive, setIsLoaderActive] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (isLoaderActive) {
      timeoutId = setTimeout(() => {
        router.push(ROUTES.HOMEPAGE);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoaderActive, router]);

  const handleOnChange = (otp: string) => {
    if (otp === "000000") {
      setIsOtpError(true);
      setIsLoaderActive(false);

      return;
    }

    if (otp.length === 6) setIsLoaderActive(true);
    else setIsLoaderActive(false);

    setIsOtpError(false);
    setOtp(otp);
  };

  const renderSeparator = (index: number) => {
    if (index === 2) return <span className="text-white text-xl px-4">-</span>;
    return null;
  };

  const renderInput: OTPInputProps["renderInput"] = (inputProps, index) => {
    const { value, onChange, ...rest }: any = inputProps;

    if (index === 5 && isLoaderActive) {
      return (
        <div className="relative">
          <input
            {...rest}
            value={value?.slice(0, -1)}
            onChange={(e) => handleOnChange(e.target.value)}
            className={`otp-input focus:border-cyan-800 h-16 text-2xl border ${
              isOtpError ? "border-red-600" : "border-blackColor"
            } text-center outline-none bg-black text-white transition-all duration-300`}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <Loader />
          </div>
        </div>
      );
    }

    return (
      <input
        {...rest}
        value={value}
        onChange={onChange}
        className={`otp-input focus:border-cyan-800 h-12 md:h-16 text-2xl border ${
          isOtpError ? "border-red-600" : "border-blackColor"
        } text-center outline-none bg-black text-white transition-all duration-300`}
      />
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center space-x-2 mainBackgroundColor relative pt-12">
      <Button
        onClick={() => router.back()}
        padding="px-4 py-2"
        className="rounded-lg text-sm hidden md:flex items-center gap-3 text-darkSilverColor font-medium border border-mainGrayColor absolute top-5 lg:top-12 left-5 lg:left-12 cursor-pointer hover:bg-mainBackGroundColor z-20 hover:text-white group"
        text="Back"
        icon={
          <IoChevronBack className="h-4 w-4 text-mainGrayColor group-hover:text-white transition-all duration-300" />
        }
      />
      <IoChevronBack
        onClick={() => router.back()}
        className="absolute top-5 left-5 h-5 w-5 text-grayColor group-hover:text-white transition-all duration-300 block md:hidden"
      />
      <div className="w-auto md:w-[501px] rounded-md bg-transparent md:bg-lightBlackColor flex items-center justify-center py-12 flex-col gap-10 px-2 md:px-12">
        <Image
          height={48}
          width={288}
          className="h-12 w-72"
          alt="logo"
          src="/images/logo.png"
          priority
        />
        <form className="flex flex-col gap-5 w-full items-center">
          <h1 className="text-center text-grayColor w-11/12">
            We’ve sent a code to{" "}
            <span className="text-white">mike@fantasyplaybook.ai</span>{" "}
            <br className="block md:hidden" />
            Enter the 6 digit code to continue
          </h1>
          <OTPInput
            value={otp}
            onChange={handleOnChange}
            numInputs={6}
            containerStyle={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            renderSeparator={renderSeparator}
            inputStyle={{ width: isSmallScreen ? "40px" : "55px" }}
            renderInput={renderInput}
          />
          {isOtpError && (
            <p className="text-sm text-red-600 w-full pl-4">
              Invalid code entered.
            </p>
          )}
        </form>
        <h3 className="text-grayColor">
          Didn&apos;t get your code? <span className="text-white">Resend</span>
        </h3>
      </div>
      <h1 className="font-semibold text-sm text-center text-dellColor mt-20 pb-16">
        By continuing, you agree to our <br className="block md:hidden" />{" "}
        <span className="text-lightGreenColor">privacy policy</span> and{" "}
        <span className="text-lightGreenColor">terms of use</span>.
      </h1>
    </div>
  );
};

Otp.layout = { isPublic: true };

export default Otp;
