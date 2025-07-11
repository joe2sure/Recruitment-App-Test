import Layout from "@/pages/employer/layout";
import Dashboard from "@/pages/employer/employerdashboard";

import Messages from "@/pages/employer/messages";
import EmployerProfile from "@/pages/employer/EmployerProfile";
import Logout from "@/pages/dashboard/LogoutPage";
import Applicants from "@/pages/employer/Applicants";
import JobListing from "@/pages/employer/JobListing";
import MySchedule from "@/pages/employer/MySchedule";
import HelpCenter from "@/pages/employer/HelpCenter";
import AllApplicants from "@/pages/employer/AllApplicants";
import EmployerSettings from "@/pages/employer/employerSettings";
import PostJob from "@/pages/employer/postJob"

const Routes = {
  path: "employer",
  element: <Layout />,
  children: [
    {
      // path: "dashboard",
      index: true,
      element: <Dashboard />,
    },
    {
      path : "dashboard/post-job",
      element: <PostJob />
    },
    {
      path: "clientprofile",
      element: <EmployerProfile />,
    },
    {
      path: "messages",
      element: <Messages />,
    },
    {
      path: "joblisting",
      element: <JobListing />,
    },
    {
      path: "allapplicants",
      element: <AllApplicants />,
    },
    {
      path: "settings",
      element: <EmployerSettings />,
    },
    {
      path: "helpCenter",
      element: <HelpCenter />,
    },
  ],
};

export default Routes;
