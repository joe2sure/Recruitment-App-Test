import React from "react";

const JobManagementInput = ({
  label,
  className,
  inputClassName,
  ...props
}) => (
  <div className={`flex items-center w-full ${className}`}>
    {label && (
      <label className="text-[0.9375rem] text-[#3A3A3A] font-medium w-1/6">
        {label}
      </label>
    )}
    <input
      className={`border rounded-xs p-1.5 pl-2.5 w-2/6 placeholder:text-[#454648] placeholder:text-sm placeholder:font-light ${inputClassName}`}
      {...props}
    />
  </div>
);

export default JobManagementInput;
