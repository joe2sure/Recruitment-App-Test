import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/employer/sidebar";
import Header from "../../components/employer/header";

const layout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default layout;
