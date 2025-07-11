import Header from "@/components/candidate/header";
import Sidebar from "@/components/candidate/sideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const CandidateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar - fixed height and position */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main layout */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Fixed Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CandidateLayout;
