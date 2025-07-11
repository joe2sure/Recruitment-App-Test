import React, { useState } from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Recommendatons from '@/components/candidate/Recommendations'




export default function MyApplications() {

  return (
    <section className='block w-full bg-white'>
        <div className="">
            <header className='py-8 ml-14'>
                <Select className={` bg-white focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:!outline-none focus:ring-0
                    !border-0  `}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pending" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                        <SelectItem className={` hover:bg-[#46007A] hover:text-white transition-all duration-300 `} value="apple">Pending</SelectItem>
                        <SelectItem className={` hover:bg-[#46007A] hover:text-white transition-all duration-300 `} value="banana">Verified</SelectItem>
                        <SelectItem className={` hover:bg-[#46007A] hover:text-white transition-all duration-300 `} value="blueberry">Scheduled</SelectItem>
                        <SelectItem className={` hover:bg-[#46007A] hover:text-white transition-all duration-300 `} value="grapes">Rejected</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </header>
            <main>
                {/* <div className='overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth'> */}
                    <table className='table-auto w-full'>
                        <thead>
                            <tr className='custom_purple text-[#F5F5F5]'>
                                <th className='pl-4 md:pl-16 py-2 text-start'> Job Title</th>
                                <th className='px-4 py-2'> Status </th>
                                <th className='px-4 py-2'>Date Applied</th>
                                <th className='px-4 py-2'>Interview</th>
                            </tr>
                        </thead>
                        <tbody className="">
                        {applicationsData.map((application, index) => (
                            <tr key={index} className="text-center">
                                <td className="pl-4 md:pl-16 py-2 text-[#1E1E1E] text-start">
                                    <h4>{application.jobTitle}</h4>
                                    <div className="flex text-start justify-start items-center space-x-1">
                                    <p className="font-normal text-xs">{application.location}</p>
                                    <p>{"•"}</p>
                                    <p className="font-normal text-xs">{application.companyName}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-[#1F3C88]">{application.status}</td>
                                <td className="px-4 py-2 text-[#757575]">{application.dateApplied}</td>
                                <td className="px-4 py-2 text-[#757575]">{application.interview}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                {/* </div> */}
            </main>
        </div>
        {/* Recommendation Section */}
        <div className='md:ml-16'>
            <Recommendatons />
        </div>

    </section>
  )
}

const applicationsData = [
    { jobTitle: 'ICU Nurse', location: 'New York', companyName: 'ABC Hospital', status: 'Under Review', dateApplied: 'Apr 10', interview: 'Scheduled' },
    { jobTitle: 'ICU Nurse', location: 'New York', companyName: 'ABC Hospital', status: 'Under Review', dateApplied: 'Apr 10', interview: 'Scheduled' },
    { jobTitle: 'ICU Nurse', location: 'New York', companyName: 'ABC Hospital', status: 'Under Review', dateApplied: 'Apr 10', interview: 'Scheduled' },
    { jobTitle: 'ICU Nurse', location: 'New York', companyName: 'ABC Hospital', status: 'Under Review', dateApplied: 'Apr 10', interview: 'Scheduled' },
    { jobTitle: 'ICU Nurse', location: 'New York', companyName: 'ABC Hospital', status: 'Under Review', dateApplied: 'Apr 10', interview: 'Scheduled' },
    { jobTitle: 'ICU Nurse', location: 'New York', companyName: 'ABC Hospital', status: 'Under Review', dateApplied: 'Apr 10', interview: 'Scheduled' }
]




// import { H1 } from "@/components/ui"

// export default function Applications() {
//     return (
//         <H1 className="m-5">Applications</H1>
//     )
// }