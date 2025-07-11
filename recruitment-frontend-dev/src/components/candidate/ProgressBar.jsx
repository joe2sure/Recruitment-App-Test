import React from "react";

const ProgressBar = ({ value, max }) => {
  const percentage = (value / max) * 100 || 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
      <div
        className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
