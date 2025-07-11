import CandidateLayout from "@/pages/dashboard/candidateLayout";
import CandidateDashboard from "@/pages/dashboard/CandidatesDashboard";
import Applications from "@/pages/dashboard/Applications";
import Courses from "@/pages/dashboard/Courses";
import Settings from "@/pages/dashboard/Settings";
import SavedJobs from "@/pages/dashboard/SavedJobs";
import Logout from "@/pages/dashboard/LogoutPage";

const Routes = {
  path: "candidate",
  element: <CandidateLayout />,
  children: [
    {
      // path: "dashboard",
      index: true,
      element: <CandidateDashboard />,
    },
    {
      path: "applications",
      element: <Applications />,
    },
    {
      path: "courses",
      element: <Courses />,
    },
    {
      path: "savedjobs",
      element: <SavedJobs />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "logout",
      element: <Logout />,
    },
  ],
};

export default Routes;
