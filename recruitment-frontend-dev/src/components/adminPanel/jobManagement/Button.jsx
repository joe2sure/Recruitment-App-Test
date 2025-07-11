import React from 'react'

const JobManagementButton = ({ children, variant = 'primary', className, ...props }) => {
  const base = 'py-3 px-2.5 text-[0.9375rem] font-medium'
  const styles = variant === 'primary'
    ? 'bg-[#46007A] text-white'
    : 'bg-[#737373] text-white'
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default JobManagementButton