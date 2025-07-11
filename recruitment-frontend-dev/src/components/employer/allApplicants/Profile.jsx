import React from 'react'
import { socials } from './Mockdata'

export default function Profile() {
  return (
    <section>
        <div className='w-full'>

            <h1 className='font-semibold text-[18px] leading-[27px] tracking-tight'>Personal Info</h1>

            <div className="mt-6 grid grid-cols-2 gap-6 border-b border-[#D6DDEB] pb-6">
                <div className='col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Full Name</h4>
                    <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>Tricia Uyanwune</p>
                </div>
                <div className='col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Gender</h4>
                    <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>Female</p>
                </div>
                <div className='col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Date of Birth</h4>
                    <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>March 23, 1995</p>
                </div>
                <div className='col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Language</h4>
                    <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>English, French, Bahasa</p>
                </div>
                <div className='col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Address</h4>
                    <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>Lagos, Nigeria</p>
                </div>

            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 pb-6">
                <h1 className='font-semibold text-[18px] leading-[27px] tracking-tight'>Professional Info</h1>
                <div className='col-span-2 mb-6 text-start'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>About Me</h4>
                    <div className="block mt-5 space-y-8">
                        <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit metus mi, vitae aliquam ligula pulvinar ut. Vivamus pellentesque tristique tristique. Proin dolor odio, laoreet 
                        </p>
                        <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit metus mi, vitae aliquam ligula pulvinar ut. Vivamus pellentesque tristique tristique. Proin dolor odio, laoreet 
                        </p>
                    </div>
                </div>
                <div className='col-span-2 md:col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Current Job</h4>
                    <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>Virtual Assistant</p>
                </div>
                <div className='col-span-2 md:col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Experience in Years</h4>
                    <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>4 Years</p>
                </div>
                <div className='col-span-2 md:col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Highest Qualification Held</h4>
                    <p className='font-medium text-[16px] leading-[27px] tracking-normal text-[#25324B]'>Bachelors in Agriculture</p>
                </div>
                <div className='col-span-2 md:col-span-1'>
                    <h4 className='font-normal text-[18px] leading-[25px] text-[#7E7E7E]'>Skill set</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1 lg:mt-0">
                        <div className='bg-[#D6C3E9] text-[#1D1D1D] px-2 lg:px-4 py-1 font-medium text-[14px] lg:text-[16px] leading-[16px] lg:leading-[27px]'>Project Management</div>
                        <div className='bg-[#D6C3E9] text-[#1D1D1D] px-2 lg:px-4 py-1 font-medium text-[14px] lg:text-[16px] leading-[16px] lg:leading-[27px]'>Copywriting</div>
                        <div className='bg-[#D6C3E9] text-[#1D1D1D] px-2 lg:px-4 py-1 font-medium text-[14px] lg:text-[16px] leading-[16px] lg:leading-[27px]'>English</div>
                    </div>
                </div>
                {socials.map((social, index) => (
                    <div key={index} className="col-span-2 md:col-span-1 mt-2 md:mt-6">
                        <div className="flex space-x-2">
                                <div className="w-6 h-6 md:h-12 md:w-12 rounded-md bg-[#D6C3E9] items-center justify-center flex">     
                                      <img className='w-3 h-3 md:w-5 md:h-5' src={social.icon} alt={social.name} /> 
                                </div>
                                <div className='block'>
                                    <h4 className='font-medium text-[12px] md:text-[14px] lg:text-[16px] lg:leading-[27px] tracking-normal text-[#1D1D1D] capitalize'>{social.name}</h4>
                                    <h6 className='font-normal text-[10.8px] md:text-[12px] lg:text-[14px] lg:leading-[21px] text-[#676767]'> {social.url} </h6>
                                </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </section>
  )
}

