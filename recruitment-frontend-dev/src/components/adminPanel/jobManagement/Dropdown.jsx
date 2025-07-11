import React from 'react'

const JobManagementDropdown = ({ label, options, value, onChange, className, labelStyle, inputStyle }) => (
  <div className={`flex items-center w-full ${className}`}>
    {label && (<label className={`text-[0.9375rem] text-[#3A3A3A] font-medium w-1/6 ${labelStyle}`}>{label}</label>)}
    <select
      className={`border border-black rounded-xs p-1.5 pl-2.5 w-1/5 text-xs font-medium text-[#ADADAD] ${inputStyle}`}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(opt => <option className='text-black' key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
)

export default JobManagementDropdown