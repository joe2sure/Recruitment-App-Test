import React from "react";
import OverviewCardList from "./OverviewCardList";
import UserTable from "./UserTable";

const UserManagementMainPage = () => {
  return (
    <div className="px-8 py-3">
      <OverviewCardList />

      <UserTable />
    </div>
  );
};

export default UserManagementMainPage;
