import React from "react";

const CustomInput = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  error,
  ...props 
}) => {
  return (
    <div>
      <label className="block text-base font-semibold text-[#515B6F]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full border p-2 border-[#D6C3E9] text-[#515B6F] focus:outline focus:outline-gray-500"
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;