import Loader from "@/components/Loader";
import Image from "next/image";
import React from "react";
import { MoonLoader } from "react-spinners";

interface propTypes {
  text: string;
  padding: string;
  className: string;
  icon?: React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  types?: string;
  isDisabled?: boolean;
  loader?: boolean;
  img?: boolean;
  url?: any;
}

const Button = ({
  text,
  padding,
  className,
  icon,
  onClick,
  isDisabled,
  loader,
  img,
  url,
}: propTypes) => {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      onClick={onClick}
      className={`${padding} ${className} transition-all duration-300 flex items-center justify-center`}
    >
      {img && <Image height={20} width={20} alt="google" src={url} priority />}
      {icon}
      {loader ? <Loader /> : text}
    </button>
  );
};

export default Button;
