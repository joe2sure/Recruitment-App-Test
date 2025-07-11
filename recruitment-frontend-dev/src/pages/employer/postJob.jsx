import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Briefcase, ArrowLeft, ClipboardList, Gift } from "lucide-react";
import { JobDescription, JobInfo, BasicInformation } from "./dashboardTabs";
import { Link, useNavigate } from "react-router-dom";

export default function PostJob() {
  const [currentStep, setCurrentStep] = useState("job-info");
  const stepsOrder = ["job-info", "job-desc", "perks-benifit"];
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/employer/");
  };

  return (
    <>
      <div className="mb-5 flex items-center justify-start gap-3">
        <button
          onClick={handleBackClick}
          className="cursor-pointer p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={24} className="text-gray-600 hover:text-gray-800" />
        </button>
        <h2 className="text-2xl font-bold mb-2">Post a Job</h2>
      </div>

      <Tabs value={currentStep} onValueChange={setCurrentStep}>
        <TabsList className="grid grid-cols-3 h-fit  w-full rounded-none border-gray-300 ">
          <TabsTrigger
            value="job-info"
            className="group text-purple-600 rounded-none border-0 
        focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent shadow-none data-[state=active]:shadow-none
        "
          >
            <div className="flex items-center gap-2 text-purple-600 w-full pb-1.5">
              <span className="hidden group-data-[state=active]:block rounded-full bg-secondary-500 p-2">
                <Briefcase size={20} className="text-white w-6 h-6 " />
              </span>
              <div className="flex flex-col items-start">
                <span className="hidden group-data-[state=active]:block text-lg text-black font-light">
                  Step 1/3
                </span>
                <span className="font-medium">Job Information</span>
              </div>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="job-desc"
            className="group text-purple-600 rounded-none border-0
        focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent shadow-none data-[state=active]:shadow-none
        "
          >
            <div className="flex items-center gap-2 text-purple-600 w-full pb-1.5">
              <span className="hidden group-data-[state=active]:block rounded-full bg-secondary-500 p-2">
                <ClipboardList size={20} className="text-white w-6 h-6 " />
              </span>
              <div className="flex flex-col items-start">
                <span className="hidden group-data-[state=active]:block text-lg text-black font-light">
                  Step 2/3
                </span>
                <span className="font-medium">Job Description</span>
              </div>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="perks-benifit"
            className="group  text-purple-600 rounded-none border-0 
        focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent shadow-none data-[state=active]:shadow-none
        "
          >
            <div className="flex items-center gap-2 text-purple-600 w-full pb-1.5">
              <span className="hidden group-data-[state=active]:block rounded-full bg-secondary-500 p-2">
                <Gift size={20} className="text-white w-6 h-6 " />
              </span>
              <div className="flex flex-col items-start">
                <span className="hidden group-data-[state=active]:block text-lg text-black font-light">
                  Step 3/3
                </span>
                <span className="font-medium">Perks & Benefit</span>
              </div>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="mb-8 relative h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 transition-all duration-500"
            style={{
              width: `${
                ((stepsOrder.indexOf(currentStep) + 1) / stepsOrder.length) *
                100
              }%`,
            }}
          />
        </div>

        <TabsContent value="job-info" className={""}>
          <JobInfo setCurrentStep={setCurrentStep} />
        </TabsContent>

        <TabsContent value="job-desc">
          <JobDescription setCurrentStep={setCurrentStep} />
        </TabsContent>

        <TabsContent value="perks-benifit">
          <BasicInformation />
        </TabsContent>
      </Tabs>
    </>
  );
}
