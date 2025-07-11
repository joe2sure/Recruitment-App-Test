import React from "react";
import { IoIosGlobe } from "react-icons/io";
import { CgChevronDoubleRightO } from "react-icons/cg";
import { LuShip, LuGem } from "react-icons/lu";
import { PiShieldChevronLight, PiOption } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";

const EmployerProfile = () => {
  const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Mac Daniel',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Jane Doe',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const benefits = [
  {
    title: 'Full Healthcare',
    description: 'Comprehensive healthcare for all employees.',
    icon: <CgChevronDoubleRightO className="w-6 h-6" />,
  },
  {
    title: 'Unlimited Vacation',
    description: 'Take unlimited time off to recharge.',
    icon: <LuShip className="w-6 h-6" />,
  },
  {
    title: 'Skill Development',
    description: 'Access to learning and development programs.',
    icon: <PiShieldChevronLight className="w-6 h-6" />,
  },
  {
    title: 'Team Summits',
    description: 'Annual team-building summits.',
    icon: <LuGem className="w-6 h-6" />,
  },
  {
    title: 'Remote Working',
    description: 'Flexible remote work options.',
    icon: <PiOption className="w-6 h-6" />,
  },
  {
    title: 'Commuter Benefits',
    description: 'Subsidized commuting expenses.',
    icon: <IoPersonOutline className="w-6 h-6" />,
  },
];

const positions = [
  {
    title: 'Social Media Assistant',
    location: 'Paris, France',
    type: 'Remote',
  },
  {
    title: 'Brand Designer',
    location: 'San Francisco, USA',
    type: 'Full-time',
  },
  {
    title: 'Interactive Developer',
    location: 'Zurich, Switzerland',
    type: 'Part-time',
  },
  {
    title: 'HR Manager',
    location: 'Lausanne, Switzerland',
    type: 'Full-time',
  },
];





  return (
    <div className="">
      <section className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h2 className="text-[2rem] text-[#1D1D1D] font-semibold">EMPLOYER</h2>
          <p className="text-[#1D1D1D] font-medium">https://employer.com | Founded: July 21, 2011 | Locations: 20 countries</p>
        </div>
        <button className="text-sm text-black bg-[#D6C3E9] px-4 py-2.5 rounded-[10px] font-light">Edit Profile</button>
      </section>
      <p className="mt-4 text-[#515B6F] font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit metus mi, vitae aliquam ligula pulvinar ut. Vivamus pellentesque tristique tristique. Proin dolor odio, laoreet sed placerat nec, lobortis quis risus. Nam ac odio sit amet nisl molestie porta. Fusce auctor, justo vel pulvinar finibus, erat ante lacinia massa, ac placerat augue risus at est. Mauris auctor augue ex, accumsan lobortis odio ultricies eu. Nulla nunc mi, fermentum at risus a, malesuada fringilla erat. Pellentesque maximus turpis imperdiet mattis tincidunt. Nulla auctor, nulla porttitor malesuada pretium, ipsum ipsum iaculis justo, in condimentum magna nisi id enim. Nulla facilisi.
      </p>
      <section className="mt-3">
        <h3 className="text-2xl font-semibold text-[#1D1D1D] mb-5">Office Locations</h3>
        <div className="px-4 py-3 bg-[#FCFCFC] flex items-center gap-4">
          <section className="bg-[#D6C3E9] w-fit p-2.5 rounded-lg text-3xl text-[#1D1D1D]"><IoIosGlobe /></section>
          <p className="text-xl font-semibold text-[#1D1D1D]">England</p>
        </div>
      </section>
      <section className="mt-5">
        <h3 className="text-2xl font-semibold text-[#1D1D1D] mb-6">Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="">
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto rounded-lg w-full h-72 object-cover"
              />
              <h3 className="mt-3 text-base font-medium">{member.name}</h3>
              <p className="text-xs font-medium text-[#676767]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-[#1D1D1D] mb-9">Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-start space-x-4 p-4 pb-9 border bg-[#FCFCFC] border-[#D6C3E9] rounded-lg"
            >
              <div className="text-[#1D1D1D] mb-3">{benefit.icon}</div>
              <div>
                <h4 className="font-bold text-[#1D1D1D]">{benefit.title}</h4>
                <p className="text-sm text-[#676767]">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-9">
        <h3 className="text-2xl font-semibold text-[#1D1D1D] mb-8">Open Positions</h3>
        <div className="overflow-x-auto bg-[#FCFCFC] border border-[#D6C3E9] rounded-xl">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-[#E8F3EA]">
                <th className="px-4 py-3 text-left text-sm text-[#1D1D1D] font-normal">Position</th>
                <th className="px-4 py-3 text-left text-sm text-[#1D1D1D] font-normal">Location</th>
                <th className="px-4 py-3 text-left text-sm text-[#1D1D1D] font-normal">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8F3EA]">
              {positions.map((pos) => (
                <tr key={pos.title}>
                  <td className="px-4 py-6 text-sm text-[#1D1D1D]">{pos.title}</td>
                  <td className="px-4 py-6 text-sm text-[#8B30E7]">{pos.location}</td>
                  <td className="px-4 py-6 text-sm">
                    <div className="py-1.5 text-center bg-[#D6C3E9] text-[#1D1D1D] rounded-full text-xs">
                      {pos.type}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EmployerProfile;
