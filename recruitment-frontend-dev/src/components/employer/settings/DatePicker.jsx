import React from "react";
import { FaChevronDown } from "react-icons/fa";

const DatePicker = ({ dateFounded, onDateChange }) => {
  const handleDateChange = (field, value) => {
    onDateChange({ ...dateFounded, [field]: value });
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <label className="block text-base font-semibold text-[#515B6F]">
          Day
        </label>
        <section className="relative">
          <select
            value={dateFounded.day}
            onChange={(e) => handleDateChange("day", e.target.value)}
            className="mt-1 block w-full border p-2 border-[#D6C3E9] text-[#515B6F] appearance-none cursor-pointer"
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute text-xs right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none" />
        </section>
      </div>
      <div>
        <label className="block text-base font-semibold text-[#515B6F]">
          Month
        </label>
        <section className="relative">
          <select
            value={dateFounded.month}
            onChange={(e) => handleDateChange("month", e.target.value)}
            className="mt-1 block w-full border rounded p-2 border-[#D6C3E9] text-[#515B6F] appearance-none cursor-pointer"
          >
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute text-xs right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none" />
        </section>
      </div>
      <div>
        <label className="block text-base font-semibold text-[#515B6F]">
          Year
        </label>
        <section className="relative">
          <select
            value={dateFounded.year}
            onChange={(e) => handleDateChange("year", e.target.value)}
            className="mt-1 block w-full border rounded p-2 border-[#D6C3E9] text-[#515B6F] appearance-none cursor-pointer"
          >
            {Array.from({ length: 30 }, (_, i) => 1995 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute text-xs right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none" />
        </section>
      </div>
    </div>
  );
};

export default DatePicker;