import React from "react";
import { useSelector } from "react-redux";
import OverviewCard from "./OverviewCard";
import { FaBuilding, FaUser, FaUsers, FaUserShield } from "react-icons/fa";

const OverviewCardList = () => {
  const users = useSelector((state) => state.users.list);
  const counts = {
    Candidate: users.filter((u) => u.accountType === "Candidate").length,
    Employer: users.filter((u) => u.accountType === "Employer").length,
    Admin: users.filter((u) => u.accountType === "Admin").length,
  };

  return (
    <>
      <h4 className="text-lg font-semibold text-[#1D1D1D] mb-2">Overview</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <OverviewCard
          icon={<FaUsers />}
          label="Candidates"
          count={counts.Candidate}
          bgColor={"bg-[#2B72FB]"}
        />
        <OverviewCard
          icon={<FaBuilding />}
          label="Employers"
          count={counts.Employer}
          bgColor={"bg-[#27AE60]"}
        />
        <OverviewCard
          icon={<FaUserShield />}
          label="Admins"
          count={counts.Admin}
          bgColor={"bg-[#BF8167]"}
        />
      </div>
    </>
  );
};

export default OverviewCardList;
