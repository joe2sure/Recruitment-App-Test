import React from 'react'

const JobManagementToggle = ({ label, checked, onChange }) => (
  <div className="flex items-center space-x-2">
    <span className="text-[0.9375rem] text-[#3A3A3A] font-medium w-1/6">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}>
      <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${checked ? 'translate-x-4' : ''}`} />
    </button>
  </div>
)

export default JobManagementToggle