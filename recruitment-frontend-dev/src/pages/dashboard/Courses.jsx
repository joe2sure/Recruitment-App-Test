// import React, { useState } from "react";
// import CourseCard from "@/components/candidate/CourseCard";
// import ProgressBar from "@/components/candidate/ProgressBar";

// const CoursesPage = () => {
//   const [activeTab, setActiveTab] = useState("upcoming");

//   const courses = [
//     {
//       id: 1,
//       title: "HIPAA Compliance Training: 2025 Updates",
//       duration: "1h 30m",
//       progress: 0,
//       total: 30,
//     },
//     {
//       id: 2,
//       title: "Time Management for Nurses & Busy Clinicians",
//       duration: "0h 54m",
//       progress: 0,
//       total: 12,
//     },
//     {
//       id: 3,
//       title: "Geriatric Care Certification: Aging Population Essentials",
//       duration: "1h 04m",
//       progress: 0,
//       total: 23,
//     },
//   ];

//   const recommendedCourses = [
//     {
//       id: 1,
//       title: "From RN to Nurse Practitioner: Your Step-by-Step Career Roadmap",
//       category: "Career Advancement",
//       lessons: 12,
//       description:
//         "This course teaches you how to advance in your career by increasing your ski...",
//     },
//     {
//       id: 2,
//       title: "AI in Healthcare: Tools Every Clinician Should Know",
//       category: "Technical & Digital Health",
//       lessons: 12,
//       description:
//         "This course teaches you how to advance in your career by increasing your ski...",
//     },
//     {
//       id: 3,
//       title: "Ethics in Healthcare: Case for Decision-Making",
//       category: "Compliance & Safety",
//       lessons: 12,
//       description:
//         "This course teaches you how to improve your career by increasing your ski...",
//     },
//   ];

//   return (
//     <div className="p-6 bg-white">
//       <h1 className="text-2xl font-bold text-black mb-6">Courses</h1>

//       {/* Status Tabs */}
//       <div className="flex justify-end mb-6">
//         <div className="flex space-x-3">
//           <button
//             className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
//               activeTab === "upcoming"
//                 ? "bg-purple-600 text-white"
//                 : "bg-gray-200 text-gray-600"
//             }`}
//             onClick={() => setActiveTab("upcoming")}
//           >
//             Upcoming
//           </button>
//           <button
//             className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border border-purple-500 ${
//               activeTab === "inProgress"
//                 ? "bg-purple-600 text-white"
//                 : "bg-white text-gray-500"
//             }`}
//             onClick={() => setActiveTab("inProgress")}
//           >
//             In Progress
//           </button>
//           <button
//             className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border border-purple-500  ${
//               activeTab === "completed"
//                 ? "bg-purple-600 text-white"
//                 : "bg-white text-gray-500"
//             }`}
//             onClick={() => setActiveTab("completed")}
//           >
//             Completed
//           </button>
//         </div>
//       </div>

//       {/* Course Table */}
//       <div className="mb-12">
//         <div className="border-b border-gray-200">
//           <div className="grid grid-cols-12 py-3 text-sm text-purple-600">
//             <div className="col-span-5">Course</div>
//             <div className="col-span-2">Duration</div>
//             <div className="col-span-3">Progress</div>
//             <div className="col-span-2"></div>
//           </div>
//         </div>

//         {courses.map((course) => (
//           <div
//             key={course.id}
//             className="grid grid-cols-12 py-4 border-b border-gray-100 shadow-gray-400 items-center"
//           >
//             <div className="col-span-5">
//               <p className="text-base font-medium text-gray-900">
//                 {course.title}
//               </p>
//             </div>
//             <div className="col-span-2">
//               <p className="text-base text-gray-900">{course.duration}</p>
//             </div>
//             {/* <div className="col-span-3">
//               <div className="flex items-center">
//                 <ProgressBar value={course.progress} max={course.total} />
//                 <span className="ml-2 text-sm text-purple-500">
//                   {course.progress}/{course.total} (
//                   {Math.round((course.progress / course.total) * 100) || 0}%)
//                 </span>
//               </div>
//             </div> */}
//             <div className="col-span-3 w-full">
//               {/* Labels above the progress bar */}
//               <div className="flex justify-between mb-1 px-1 text-sm">
//                 <span className="text-gray-500">
//                   {course.progress}/{course.total}
//                 </span>
//                 <span className="ml-2 text-sm text-purple-500 whitespace-nowrap">
//                   ({Math.round((course.progress / course.total) * 100) || 0}%)
//                 </span>
//                 {/* <span className="text-purple-600">{course.total}</span> */}
//               </div>

//               {/* Progress bar with percentage to the right */}
//               <div className="flex items-center w-full">
//                 <ProgressBar
//                   value={course.progress}
//                   max={course.total}
//                   className="flex-1"
//                 />
//               </div>
//             </div>

//             <div className="col-span-2 text-right">
//               <button className="bg-purple-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
//                 Start
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recommended Section */}
//       <div className="mb-8">
//         <div className="mb-6 flex justify-center">
//           <h2 className="text-xl bg-gray-50 font-medium text-purple-800 px-6 py-2 border border-purple-500  rounded-full">
//             Recommended
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {recommendedCourses.map((course) => (
//             <CourseCard key={course.id} course={course} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;
import React, { useState } from "react";
import CourseCard from "@/components/candidate/CourseCard";
import ProgressBar from "@/components/candidate/ProgressBar";

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  // (useState < "upcoming") | "inProgress" | ("completed" > "upcoming");

  const courses = [
    {
      id: 1,
      title: "HIPAA Compliance Training: 2025 Updates",
      duration: "1h 30m",
      progress: 0,
      total: 30,
    },
    {
      id: 2,
      title: "Time Management for Nurses & Busy Clinicians",
      duration: "0h 54m",
      progress: 0,
      total: 12,
    },
    {
      id: 3,
      title: "Geriatric Care Certification: Aging Population Essentials",
      duration: "1h 04m",
      progress: 0,
      total: 23,
    },
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: "From RN to Nurse Practitioner: Your Step-by-Step Career Roadmap",
      category: "Career Advancement",
      lessons: 12,
      description:
        "This course teaches you how to advance in your career by increasing your ski...",
    },
    {
      id: 2,
      title: "AI in Healthcare: Tools Every Clinician Should Know",
      category: "Technical & Digital Health",
      lessons: 12,
      description:
        "This course teaches you how to advance in your career by increasing your ski...",
    },
    {
      id: 3,
      title: "Ethics in Healthcare: Case for Decision-Making",
      category: "Compliance & Safety",
      lessons: 12,
      description:
        "This course teaches you how to improve your career by increasing your ski...",
    },
  ];

  const renderTabs = () => {
    const tabs = [
      { id: "upcoming", label: "Upcoming" },
      { id: "inProgress", label: "In Progress" },
      { id: "completed", label: "Completed" },
    ];

    return (
      <div className="flex space-x-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-600 border border-purple-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold text-black mb-6">Courses</h1>

      {/* Tabs */}
      <div className="flex justify-end mb-6">{renderTabs()}</div>

      {/* Course Table */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <div className="grid grid-cols-12 py-3 text-sm text-purple-600">
            <div className="col-span-5">Course</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-3">Progress</div>
            <div className="col-span-2"></div>
          </div>
        </div>

        {courses.map((course) => (
          <div
            key={course.id}
            className="grid grid-cols-12 py-4 border-b border-gray-100 items-center"
          >
            <div className="col-span-5">
              <p className="text-base font-medium text-gray-900">
                {course.title}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-base text-gray-900">{course.duration}</p>
            </div>
            <div className="col-span-3 w-full">
              <div className="flex justify-between mb-1 px-1 text-sm">
                <span className="text-gray-500">
                  {course.progress}/{course.total}
                </span>
                <span className="text-purple-500">
                  ({Math.round((course.progress / course.total) * 100) || 0}%)
                </span>
              </div>
              <div className="flex items-center w-full">
                <ProgressBar
                  value={course.progress}
                  max={course.total}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="col-span-2 text-right">
              <button className="bg-purple-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                Start
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Section */}
      <div className="mb-8">
        <div className="mb-6 flex justify-center">
          <h2 className="text-xl bg-gray-50 font-medium text-purple-800 px-6 py-2 border border-purple-500 rounded-full">
            Recommended
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
