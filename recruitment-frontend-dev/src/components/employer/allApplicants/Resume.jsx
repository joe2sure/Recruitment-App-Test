import React from 'react'
import {experiences, education, industryKnowledge, tools, otherSkills, languages, social} from './Mockdata'
import { socials } from './Mockdata'

export default function Resume() {
  return (
    <section>
        <div className='w-full'>
            <div className="w-full flex flex-col-reverse md:grid md:grid-cols-3">
                <div className="col-span-1 md:col-span-1">
                    {socials.map((social, index) => (
                        <div key={index} className="mt-6">
                            <div className="flex space-x-4">
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


                {/* Resume */}
                <div className='col-span-1 md:col-span-2 border border-[#D6C3E9] rounded-md px-4 md:px-6 lg:px-10 xl:px-12'>
                    <div className="grid grid-cols-3 justify-between items-center pt-6">
                        <div className='text-[#25324B] col-span-2'>
                            <h1 className='font-semibold text-[16px] md:text-[24px] lg:text-[32px] leading-[120%] '>
                                John Doe
                            </h1>
                            <h2 className='font-medium text-[12px] md:text-[14px] lg:text-[18px] leading-[160%]'>
                                Product Designer
                            </h2>
                        </div>
                        <div className='col-span-1 ml-6'>
                            <img src="" alt="" className='w-12 h-12 md:w-24 md:h-24 bg-gray-200 rounded-full' />
                        </div>
                    </div>

                    {/* Details */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 text-[#7C8493] mt-4 md:mt-12'>
                        <div className="md:col-span-1 lg:col-span-2">
                            <h4 className='text-normal text-[11px] leading-[18px] tracking-[2px] uppercase pb-3'>EXPERIENCE</h4>
                                {experiences.map((experience, index) => (
                                    <div key={index} className='pb-8'>
                                        <h2 className='font-bold text-[11px] leading-[18px]'>{ experience.title }</h2>
                                        <h4 className='font-normal text-[11px] leading-[18px]'> {experience.companyname} </h4>
                                        <p className='font-normal text-[9px] leading-[18px] py-2'>Aug 2018 - Present - 1 year, Paris</p>
                                        <h4 className='text-normal text-[11px] leading-[18px]'>
                                            Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.
                                        </h4>
                                    </div>  
                                ))}
                            <h4 className='text-normal text-[11px] leading-[18px] tracking-[2px] uppercase pb-3'>EDUCATION</h4>
                                {education.map((edu, index) => (
                                    <div key={index} className='pb-4'>
                                        <h2 className='font-bold text-[11px] leading-[18px]'>{ edu.certificate }</h2>
                                        <h4 className='font-normal text-[13px] leading-[18px]'> {edu.institution} </h4>
                                        <p className='font-normal text-[10px] leading-[18px] py-2'>{edu.duration}</p>
                                    </div>  
                                ))}
                        </div>

                        <div className="col-span-1 text-[#7C8493] text-[11px] leading-[18px]">
                            <div className='mb-6'>
                                <p>johndoe@gmail.com</p>
                                <p>+44 123 456 7890</p>
                                <p>Vernouillet</p>
                            </div>
                            <div className="mb-6 block">
                                <p>Industry Knowledge</p>
                                {industryKnowledge.map((industry, index) => (
                                    <p key={index}>{ industry.name }</p>
                                ))}
                            </div>

                            <div className="mb-6">
                                <p>Tools & Technologies</p>
                                <div className="flex flex-wrap">
                                    {tools.map((tool, index) => (
                                            <p key={index}>{tool.name},</p>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p>Other Skills</p>
                                {otherSkills.map((skill, index) => (
                                    <div className="flex flex-wrap" key={index}>
                                        <p>{ skill.name }</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-6">
                                <p>Languages</p>
                                {languages.map((language, index) => (
                                    <p key={index} > {language.name} {language.level} </p> 
                                ))}
                            </div>

                            <div className="mb-6">
                                <p>Socials</p>
                                {social.map((soc, index) => (
                                    <p key={index} > {soc.name} </p> 
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
