import React from "react";
import JobManagementMainPage from "@/components/adminPanel/jobManagement/JobManagementMainPage";
import { store } from "@/components/adminPanel/jobManagement/store";
import { Provider } from "react-redux";

const JobManagement = () => {
  return (
    <Provider store={store}>
      <JobManagementMainPage />
    </Provider>
  );
};

export default JobManagement;
