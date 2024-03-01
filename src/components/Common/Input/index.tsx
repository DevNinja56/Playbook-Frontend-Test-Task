import React from "react";

interface propTypes {
  placeHolder: string;
  error?: any;
  onChange: (e: any) => void;
  className: string;
  type?: string;
  autoComplete?: string;
  label?: string;
  isDisabled?: boolean;
}

const CommonInput = React.forwardRef<any, propTypes>(
  (
    {
      placeHolder,
      error,
      onChange,
      className,
      type,
      autoComplete,
      label,
      isDisabled,
      ...props
    }: propTypes,
    ref: any
  ) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <p className="text-mainBlackColor text-xl font-semibold">{label}</p>
        )}
        <input
          disabled={isDisabled}
          autoComplete={autoComplete}
          type={type}
          className={`${className} outline-none transition-all duration-300`}
          {...props}
          ref={ref}
          placeholder={placeHolder}
          onChange={onChange}
        />

        {error && (
          <p className="text-red-500 text-sm transition-all duration-300">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CommonInput.displayName = "CommonInput";

export default CommonInput;
