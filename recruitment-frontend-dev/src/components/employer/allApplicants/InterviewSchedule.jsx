import React from 'react'
import Person1 from "@/assets/allApplicants/person1.png"
import Person2 from "@/assets/allApplicants/person2.png"
import Person3 from "@/assets/allApplicants/person3.png"
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { Pencil } from 'lucide-react'
import { socials } from './Mockdata'

export default function InterviewSchedule() {
  return (
    <section>
        <div className='w-full '>

            <div className="mt-6 mx-2 lg:mx-6 xl:mx-16">
                <div className="border border-[#D6C3E9] rounded-md p-4 md:p-6 lg:p-10 xl:p-12">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[10px] md:text-[13px] lg:text-[16px] leading-[160%] tracking-tight">
                    Interview List
                    </h1>
                    <button className="font-bold text-[10px] md:text-[13px] lg:text-[16px] leading-[160%] text-[#8B30E7]">
                    + Schedule New Interview
                    </button>
                </div>

                {/* Horizontally scrollable Interview List only */}
                <div className="mt-3 md:mt-8 overflow-x-auto">
                    <div className="min-w-[600px] md:min-w-0 flex flex-col gap-3">
                    {mockInterviews.map((interview, index) => (
                        <div
                        key={index}
                        className="grid grid-cols-8 min-w-full border border-[#D6DDEB] px-4 py-4"
                        >
                        <div className="col-span-1 flex items-center justify-center">
                            <img
                            src={interview.image}
                            alt={interview.name}
                            className="w-8 lg:w-12 h-8 lg:h-12 rounded-full"
                            />
                        </div>
                        <div className="col-span-2">
                            <h2 className="font-semibold text-xs lg:text-[16px] leading-[160%] text-black">
                            {interview.name}
                            </h2>
                            <h4 className="font-normal text-xs lg:text-[14px] leading-[160%] text-[#676767]">
                            {interview.testType}
                            </h4>
                        </div>
                        <div className="col-span-2 md:ml-2 lg:ml-0">
                            <h2 className="font-semibold text-xs lg:text-[16px] leading-[160%] text-black">
                            {interview.time}
                            </h2>
                            <h4 className="font-normal text-xs lg:text-[14px] leading-[160%] text-[#676767]">
                            {interview.location}
                            </h4>
                        </div>
                        <div className="px-1 lg:px-3 py-1 border border-[#9F5CEC] col-span-2 flex items-center justify-center">
                            <h4 className="text-[#8B30E7] flex gap-1 lg:gap-2 items-center xl:font-bold text-xs lg:text-[16px] leading-[27px] lg:leading-[160%]">
                            <Pencil className="w-4 h-4" />
                            Add Feedback
                            </h4>
                        </div>
                        <div className="col-span-1 flex justify-end items-center">
                            <IoEllipsisHorizontal className="mr-2" />
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-6 pb-6 md:w-5/6">
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
        </div>
    </section>
  )
}

const mockInterviews = [
  { name: "Olivia Smith", image:Person1, testType: "Technical Test", time: "10:00 AM - 12:00 PM", location: "Silver Crystal Room, Nomad" },
  { name: "Liam Johnson", image:Person2, testType: "Aptitude Test", time: "11:30 AM - 1:30 PM", location: "LA" },
  { name: "Emma Williams", image:Person3, testType: "Behavioral Interview", time: "2:00 PM - 4:00 PM", location: "CHI" },
  { name: "Noah Brown", image:Person3, testType: "Coding Challenge", time: "3:30 PM - 4:00 PM", location: "SF" }
];

export { mockInterviews };

