import React from "react";
import Heart from "@/assets/purple-heart.svg";
import Job1 from "@/assets/Job1.png";
import Job2 from "@/assets/Job2.png";
import Job3 from "@/assets/Job3.png";
import Recommendations from "@/components/candidate/Recommendations";

const jobs = [
  {
    title: "Medical Laboratory Technician",
    image: Job1,
    className: "w-[24px] h-[24px]",
  },
  {
    title: "Healthcare Assistant",
    image: Job2,
    className: "w-[24px] h-[24px]",
  },
  {
    title: "Health Information Manager",
    image: Job3,
    className: "w-[37.15px] h-[10px]",
  },
];

export default function SavedJobs() {
  return (
    <section className="w-full pt-4 pb-16 lg:px-24 px-4">
      <header className="my-8 flex items-center gap-2">
        <h1 className="font-poppins font-semibold text-[20px]">My Jobs</h1>
        <p className="font-poppins text-[16px] text-purple-900">
          ({jobs.length})
        </p>
      </header>

      <main className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white border-b-2 border-[#818181] px-2 md:px-4 py-4 rounded-md shadow-sm"
          >
            <div className="grid grid-cols-12 items-start gap-4">
              {/* Job Icon */}
              <div className="col-span-2 sm:col-span-1 flex justify-center">
                <div className="rounded-full w-[30px] h-[30px] md:w-[52px] md:h-[52px] border border-gray-200 flex items-center justify-center">
                  <img
                    src={job.image}
                    alt={job.title}
                    className={`${job.className} object-contain`}
                  />
                </div>
              </div>

              {/* Job Details */}
              <div className="col-span-8 sm:col-span-9">
                <h2 className="font-poppins font-bold text-[16px] pb-2">
                  {job.title}
                </h2>
                <p className="text-[14px] text-[#9865EE] font-normal flex flex-wrap gap-4 pb-3">
                  <span>Lagos, Nigeria</span>
                  <span>Allied Health</span>
                  <span>Full-Time</span>
                </p>
                <p className="text-[#757575] text-[14px] leading-[21px]">
                  Performs diagnostic tests on blood, tissue, and other samples.
                  Provides accurate lab results that help doctors diagnose and
                  treat illnesses.
                </p>
              </div>

              {/* Actions: Heart + View Button */}
              <div className="col-span-2 flex flex-col items-end justify-between space-y-4">
                <img src={Heart} alt="Save Job" className="w-5 h-5" />
                <button className="text-white bg-[#46007A] hover:bg-purple-700 transition duration-300 text-xs md:text-sm px-4 py-2 rounded-md">
                  View Job
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Recommendations section */}
        <Recommendations />
      </main>
    </section>
  );
}
