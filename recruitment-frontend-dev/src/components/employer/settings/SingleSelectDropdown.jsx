import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelect = ({ label, options, value, onChange }) => {
  const handleValueChange = (val) => {
    onChange(options.find((o) => o.value === val));
  };

  return (
    <div>
      <label className="block text-base font-semibold text-[#515B6F] mb-1">
        {label}
      </label>
      <Select value={value.value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full border p-2 flex justify-between items-center border-[#D6C3E9] bg-white cursor-pointer rounded-none">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent className="w-full bg-white border rounded border-[#D6C3E9] text-[#515B6F] z-50">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;