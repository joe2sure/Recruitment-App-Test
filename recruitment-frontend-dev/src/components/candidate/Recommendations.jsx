import React, { useState } from 'react'
import HealthCareImg from "@/assets/healthcareInc.png"
import checkedImg from "@/assets/checked.png"
import uncheckedImg from "@/assets/unchecked.png"

const n = 5

export default function Recommendatons() {
    const [checkedStates, setCheckedStates] = useState(
        Array(n).fill(false)
    );
  return (
    <>
        <div className='flex flex-col pt-10 md:pt-12 md:mx-auto'>
                <div className="py-2 px-6  flex justify-center mx-auto rounded-full border border-[#46007A] text-[#46007A] text-sm font-semibold">
                    Recommended Jobs
                </div>
                <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap mx-1.5 no-scrollbar scroll-smooth">
                    <div className="inline-flex gap-8 mt-10 md:mt-12 max-w-6">
                        {Array.from({ length: n }).map((_, index) => (
                            <div key={index} className='flex-none mb-3 rounded-lg border border-[#00000021] bg-white shadow-md p-2 w-[302.89px] h-[311.43px]'>
                                <div className="rounded-md bg-[#46007A0F] px-4 py-3">
                                    <div className="flex justify-between">
                                        <button className="date rounded-full bg-white px-2 py-1 text-xs">
                                            05 May, 2024
                                        </button>

                                    <button
                                    onClick={() => {
                                        const newStates = [...checkedStates];
                                        newStates[index] = !newStates[index];
                                        setCheckedStates(newStates);
                                    }}
                                    className="rounded-full w-[31.23px] h-[31.23px] bg-white flex justify-center items-center"
                                    >
                                    <img
                                        src={checkedStates[index] ? checkedImg : uncheckedImg}
                                        alt="CardChecker"
                                        className="w-[13.88px] h-[15.07px]"
                                    />
                                    </button>

                                    </div>
                                    <div className="flex space-x-2 items-center mt-6 mb-4">
                                        <div className="rounded-full w-[31.23px] h-[31.23px] bg-white flex justify-center items-center">
                                            <img src={HealthCareImg} alt='HealthCareImg' className='w-[21.13px] h-[13.77px] ' />
                                        </div>
                                        <p className='font-medium text-sm leading-[132%] tracking-wide'>
                                            Healthcare Inc
                                        </p>
                                    </div>
                                    <h4 className='text-semibold text-base leading-1 '>
                                        Medical Assistant Needed
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mt-8">
                                        {["Allied jobs", "Contract-based", "In-office", "Entry Level", "Flexible Schedule"].map((tag, index) => (
                                            <button key={index} className='inline-flex text-center py-1 px-2 text-xs leading-[100%] font-normal text-black border    border-[#0000004D] rounded-full'>
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6 px-4">
                                    <div className="flex justify-between items-center">
                                        <div className='flex flex-col gap-1.5'>
                                            <div className='flex items-center text-sm leading-[100%] text-black'>
                                                <h4 className='font-normal'>₦220k-400k</h4>
                                                <p className='font-light'>/mo</p>
                                            </div>
                                            <p className='text-xs leading-[100%] text-[#9865EE]'>Lagos, Nigeria</p>

                                        </div>
                                        <button className='font-normal text-[#FEFEFE] bg-[#46007A] hover:bg-purple-700 px-4 py-1 rounded-[13.88px] cursor-pointer transition-all duration-300'>
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    </>
  )
}
