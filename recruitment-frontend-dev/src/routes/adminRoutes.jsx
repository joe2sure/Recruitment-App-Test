import AdminProvider from "@/components/providers/AdminProvider";
import AdminLayout from "@/pages/admin/LayoutPage";
import JobAppilcation from "@/pages/admin/jobApplication";
import AdminDashBoard from "@/pages/admin/dashboard";
import Reports from "@/pages/admin/reports";
import TrainingCenter from "@/pages/admin/trainingCenter";
import Overview from "@/components/adminPanel/training/Overview";
import Tutorials from "@/components/adminPanel/training/Tutorials";
import AddTutorial from "@/components/adminPanel/training/AddTutorial";

import Security from "@/pages/admin/security";
import OfferManagement from "@/pages/admin/offerManagement";
import SystemSetting from "@/pages/admin/systemSetting";
import GeneralSettings from "@/components/adminPanel/GeneralSettings";
import UserMangement from "@/pages/admin/userManagement";
import JobManagement from "@/pages/admin/jobManagement";
import JobManagementAddJobForm from "@/components/adminPanel/jobManagement/JobManagementAddJobForm";
import Payments from "@/pages/admin/payment";
import CommunicationHub from "@/pages/admin/communication";
import Applications from "@/pages/admin/jobApplication";

const Routes = {
  path: "admin",
  element: (
    <AdminProvider>
      <AdminLayout />
    </AdminProvider>
  ),
  children: [
    {
      index: true,
      element: <AdminDashBoard />,
    },
    {
      path: "job-applications",
      element: <Applications />,
    },
    {
      path: "communication",
      element: <CommunicationHub />,
    },
    {
      path: "Reports",
      element: <Reports />,
    },
    {
      path: "security",
      element: <Security />,
    },
    {
      path: "offer-management",
      element: <OfferManagement />,
    },
    {
      path: "Payments",
      element: <Payments />,
    },
    {
      path: "training-center",
      element: <TrainingCenter />,
      children: [
        {
          // index: true,
          path: "overview",
          element: <Overview />,
        },
        {
          path: "overview/add-tutorial",
          element: <AddTutorial />,
        },
        {
          path: "tutorials",
          element: <Tutorials />,
        },
      ],
    },
    {
      path: "Security",
      element: <Security />,
    },
    {
      path: "user-management",
      element: <UserMangement />,
    },
    {
      path: "job-management",
      element: <JobManagement />,
    },
    {
      path: "job-management/new",
      element: <JobManagementAddJobForm />,
    },
    {
      path: "system-settings",
      element: <SystemSetting />,
      children: [
        {
          index: true,
          element: <GeneralSettings />,
        },
      ],
    },
  ],
};

export default Routes;
