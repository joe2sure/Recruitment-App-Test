import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronDown } from "lucide-react";

const MultiSelectDropdown = ({ 
  label, 
  options, 
  selectedValues, 
  onChange, 
  placeholder 
}) => {
  const toggleLocation = (value) => {
    const exists = selectedValues.find((o) => o.value === value);
    if (exists) {
      onChange(selectedValues.filter((o) => o.value !== value));
    } else {
      onChange([...selectedValues, options.find((o) => o.value === value)]);
    }
  };

  return (
    <div>
      <label className="block text-base font-semibold text-[#515B6F] mb-1">
        {label}
      </label>
      <Select onValueChange={toggleLocation}>
        <SelectTrigger className="w-full border p-2 flex justify-between items-center border-[#D6C3E9] bg-white rounded-none cursor-pointer">
          <div className="flex flex-wrap gap-1">
            {selectedValues.length ? (
              selectedValues.map((loc) => (
                <span
                  key={loc.value}
                  className="bg-[#D6C3E9] text-[#9865EE] px-2 py-1 text-xs"
                >
                  {loc.label}
                </span>
              ))
            ) : (
              <span className="text-gray-500">
                {placeholder}
              </span>
            )}
          </div>
          {/* <ChevronDown className="h-4 w-4" /> */}
        </SelectTrigger>
        <SelectContent className="w-full bg-white border rounded border-[#D6C3E9] ">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer justify-between"
            >
              <span>{opt.label}</span>
              {selectedValues.find((l) => l.value === opt.value) && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MultiSelectDropdown;