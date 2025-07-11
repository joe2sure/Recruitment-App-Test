import React, { useState } from "react";


const SocialInput = ({ label, prefix, value, onChange, placeholder, error }) => {
  return (
    <div>
      <label className="block text-base font-semibold text-[#515B6F]">
        {label}
      </label>
      <div className="mt-1 flex border border-[#D6C3E9] items-center rounded">
        <span className="px-2 pr-0 text-[#515B6F] whitespace-nowrap bg-white">
          {prefix}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 p-2 pl-0 text-[#515B6F] outline-none"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};


export default SocialInput