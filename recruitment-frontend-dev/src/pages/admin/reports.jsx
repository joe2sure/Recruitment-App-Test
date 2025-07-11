import { MetricCards } from "@/components/adminPanel/reports/MetricCards";
import { HiringFunnel } from "@/components/adminPanel/reports/HiringFunnel";
import { ApplicationTrend } from "@/components/adminPanel/reports/ApplicationTrend";
import { CandidatesSources } from "@/components/adminPanel/reports/CandidatesSources";
import { TopJobPosts } from "@/components/adminPanel/reports/TopJobPosts";

export default function ReportsAnalytics() {
  return (
    <div className="container mx-auto overflow-y-auto min-h-screen p-4">
      <MetricCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Hiring Funnel</h2>
          <HiringFunnel />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Application over time</h2>
          <ApplicationTrend />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Top Job Posts</h2>
          <TopJobPosts />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Candidates by Source</h2>
          <CandidatesSources />
        </div>
      </div>
    </div>
  );
}

// export default function ReportsAnalytics() {
//   return (
//     <div className="container mx-auto">
//       <MetricCards />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Hiring Funnel</h2>
//           <HiringFunnel />
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Application over time</h2>
//           <ApplicationTrend />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Top Job Posts</h2>
//           <TopJobPosts />
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Candidates by Source</h2>
//           <CandidatesSources />
//         </div>
//       </div>
//     </div>
//   );
// }
