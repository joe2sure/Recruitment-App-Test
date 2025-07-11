import React from "react";
import { H1, H2, Body } from "@/components/ui";
import { Eye, ClipboardPaste  } from 'lucide-react';
import JobViewsBarChart from "@/components/employer/barChart"
import ApplicantsSummaryChart from "@/components/employer/lineChart"


const StatisticCard = ({ header, value }) => {
  return(
    <div className="p-5 bg-secondary-300 rounded-lg min-h-full flex flex-col gap-5 min-w-full">
      <Body>{ header }</Body>
      <H2>{ value }</H2>
    </div>
  )
}

const ViewsCard = ({ title, icon, value, iconBg }) => {
  return(
    <div className="p-5 border flex flex-col h-35 gap-3" >
      <div className="flex justify-between"> <p className="font-bold" >{ title }</p> <span className={`p-1 rounded-full cursor-pointer ${iconBg}`}>{ icon }</span> </div>
      <div className="flex gap-1 flex-col items-start"> <H2>{ value }</H2> <span className="text-purple-800">This Week</span> </div>
    </div>
  )
}

const employerdashboard = () => {
  return(
    <section >
      <div className="grid grid-cols-1 md:grid-rows-[320px_1fr_1fr]">
        <div className="p-5" >
          <H1>Hello, John</H1>
          <Body className="mt-3" >Here is your jobs listing statistic reports from May 13 - May 25</Body>
          <div className="grid grid-cols-1 place-items-center md:grid-cols-3 gap-10 mt-10 px-4" >
            <StatisticCard header={"New candidates to review"} value={"75"} />
            <StatisticCard header={"Shedule for today"} value={"3"} />
            <StatisticCard header={"Jobs opened"} value={"12"} />
            
          </div>
        </div>
        <div className="p-5 grid gap-8 grid-cols-1 md:grid-cols-[1fr_220px] " >
          <JobViewsBarChart />
          <div className=" grid rid-cols-1 sm:grid-cols-2 md:grid-rows-2 md:grid-cols-none gap-13" >
            <ViewsCard title={"Job Views"} icon={ <Eye size={24} color="white" /> } iconBg={"bg-amber-300"} value={"2,342"}  />
            <ViewsCard title={"Job Applied"} icon={ <ClipboardPaste size={22}  color="white" /> } iconBg={"bg-purple-500"} value={"654"} />
          </div>
        </div>

        <div className="p-5" >
          <div className="p-5 grid grid-cols-1 md:grid-cols-2" >
          <div >
            <Body className="mb-3">Applicants Summary</Body>
            <H2>67 Applicants</H2>
          </div>
          <div className="p-5 grid grid-rows-2" >
            <ApplicantsSummaryChart />
          </div>
        </div>
        </div>
      </div>
    </section>
  )
};

export default employerdashboard;
