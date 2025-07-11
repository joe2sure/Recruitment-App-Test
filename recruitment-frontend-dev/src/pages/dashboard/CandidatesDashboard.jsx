import { Body, Button, H2, H3 } from '@/components/ui';
import { Check } from 'lucide-react';
import { useState } from 'react';

// dummy data incase we are quering api later
const jobs = [
  {
    title: 'Clinical Psychologist',
    type: 'Full-time',
    location: 'Lagos, Nigeria',
    salary: '220k–400k',
    dateApplied: 'Mar 5, 2025 07:23 AM',
    status: 'Active',
  },
  {
    title: 'Paediatrician',
    type: 'Contract',
    location: 'Lagos, Nigeria',
    salary: '220k–400k',
    dateApplied: 'Mar 5, 2025 07:23 AM',
    status: 'Active',
  },
  {
    title: 'Job Title',
    type: 'Temporary',
    location: 'Lagos, Nigeria',
    salary: '220k–400k',
    dateApplied: 'Mar 5, 2025 07:23 AM',
    status: 'Active',
  },
  {
    title: 'Clinical Psychologist',
    type: 'Full-time',
    location: 'Lagos, Nigeria',
    salary: '220k–400k',
    dateApplied: 'Mar 5, 2025 07:23 AM',
    status: 'Active',
  },
  {
    title: 'Paediatrician',
    type: 'Contract',
    location: 'Lagos, Nigeria',
    salary: '220k–400k',
    dateApplied: 'Mar 5, 2025 07:23 AM',
    status: 'Active',
  },
  {
    title: 'Job Title',
    type: 'Temporary',
    location: 'Lagos, Nigeria',
    salary: '220k–400k',
    dateApplied: 'Mar 5, 2025 07:23 AM',
    status: 'Active',
  },
];

const badgeColors = {
  'Full-time': 'bg-blue-100 text-blue-800',
  Contract: 'bg-yellow-100 text-yellow-800',
  Temporary: 'bg-sky-100 text-sky-800',
};

function JobTableRow({
  logoUrl,
  title,
  type,
  location,
  salary,
  dateApplied,
  status,
}) {
  const logoSrc = logoUrl || '/placeHolder.png';

  return (
    <tr className="border-b last:border-b-0">
      <td className="py-5 px-3">
        <div className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="Company Logo"
            className="w-10 h-10 rounded-lg bg-gray-50 object-contain border border-gray-100"
          />
          <div>
            <div className="font-semibold">
              {title}
              <span
                className={`ml-2 inline-block text-xs font-medium px-2 py-1 rounded-xl ${badgeColors[type]}`}
              >
                {type}
              </span>
            </div>
            <div className="flex items-center text-sm gap-3">
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#e3e3e3"
                >
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
                {location}
              </span>
              <span className="hidden md:inline">₦ {salary}/month</span>
            </div>
          </div>
        </div>
      </td>
      <td className="py-5 px-3 text-[15px] text-gray-700">{dateApplied}</td>

      <td className="py-5 px-3">
        <span className="inline-flex items-center gap-1 text-green-700 font-medium text-sm">
          <Check size={16} className="stroke-3 border-2 rounded-full p-0.5" />
          {status}
        </span>
      </td>
      <td className="py-5 px-3">
        <Button className="text-white cursor-pointer hover:bg-purple-300">
          View Job
        </Button>
      </td>
    </tr>
  );
}

function JobTable() {
  const [showAll, setShowAll] = useState(false);
  const jobsToShow = showAll ? jobs : jobs.slice(0, 3);

  return (
    <section className="rounded-lg shadow bg-white w-full mt-10">
      <div className="grid grid-cols-[1fr_100px] px-2 py-7 md:px-7 border-b border-b-purple-900/80">
        <Body className="text-purple-900 shadow font-bold rounded-4xl py-1.5 px-9 w-55 border border-purple-900 justify-self-center">
          Recently Applied
        </Body>

        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 text-purple-800 font-medium mr-2 text-base hover:underline justify-self-end cursor-pointer"
        >
          {showAll ? 'View Less' : 'View All'}
          <span className="text-lg">&gt;</span>
        </button>

        {/* <Link
          to={"/candidate/alljobs"}
          className="flex items-center gap-2 text-purple-800 font-medium mr-2 text-base hover:underline justify-self-end"
        >
          View All
          <span className="text-lg">&gt;</span>
        </Link> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-purple-900 text-white text-left text-sm">
              <th className="py-3 px-3 lg:pl-25  ">JOBS</th>
              <th className="py-3 px-3 ">DATE APPLIED</th>
              <th className="py-3 px-3 ">STATUS</th>
              <th className="py-3 px-3 ">&nbsp;</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {jobsToShow.map((job, i) => (
              <JobTableRow key={job.title + i} {...job} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-gray-300"></div>
    </section>
  );
}

export default function Dashboard() {
  return (
    <section className="p-7 flex flex-col">
      <H3 className="text-center">Welcome Back, Esther!</H3>
      <Body className="text-center text-purple-600 mt-2">
        Here's a snapshot of your journey so far
      </Body>
      <div
        className="grid sm:grid-cols-2 md:grid-cols-[330px_330px] gap-4 mt-8 justify-center
            "
      >
        <div className="bg-purple-900 hover:bg-purple-600 transition-colors duration-300 text-white rounded-2xl p-5 text-center flex items-center gap-4 cursor-pointer">
          <div className="p-2 rounded-full bg-white text-black">
            <img
              className="w-12 h-12"
              src="/Applications-icon.png"
              alt="Jobs offers received"
            />
          </div>
          <div className="text-left">
            <H2>24</H2>
            <Body>Application sent this month</Body>
          </div>
        </div>
        <div className="bg-yellow-600 hover:bg-yellow-400 transition-colors duration-300 text-white rounded-2xl p-5 cursor-pointer text-center flex items-center gap-4">
          <div className="p-2 rounded-full bg-white text-black">
            <img
              className="w-12 h-12"
              src="/Interviews-icon.png"
              alt="Jobs offers received"
            />
          </div>
          <div className="text-left">
            <H2>12</H2>
            <Body>Interviews scheduled</Body>
          </div>
        </div>
        <div className="bg-orange-600 hover:bg-orange-400 transition-colors duration-300 text-white cursor-pointer rounded-2xl p-5 text-center flex items-center gap-4">
          <div className="p-2 rounded-full bg-white text-black">
            <img
              className="w-12 h-12"
              src="/Offers-icon.png"
              alt="Jobs offers received"
            />
          </div>
          <div className="text-left">
            <H2>2</H2>
            <Body>Jobs offers received</Body>
          </div>
        </div>
        <div className="bg-green-700 hover:bg-green-500 transition-colors duration-300 text-white cursor-pointer rounded-2xl p-5 text-center flex items-center gap-4">
          <div className="p-2 rounded-full bg-white text-black">
            <img
              className="w-12 h-12"
              src="/Lessons-icon.png"
              alt="Total lessions completed"
            />
          </div>
          <div className="text-left">
            <H2>3</H2>
            <Body>Total lessions completed</Body>
          </div>
        </div>
      </div>
      <div>
        <JobTable />
      </div>
    </section>
  );
}
