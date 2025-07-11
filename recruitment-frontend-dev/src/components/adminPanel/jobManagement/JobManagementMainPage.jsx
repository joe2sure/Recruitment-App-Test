import React from "react";
import JobManagementDropdown from "@/components/adminPanel/jobManagement/Dropdown";
import JobManagementTable from "@/components/adminPanel/jobManagement/Table";
import JobManagementButton from "@/components/adminPanel/jobManagement/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredJobs, setFilters } from "./store/jobSlice";
import { RiAddFill } from "react-icons/ri";

const statuses = ["All, Applied, Interviewed, Shortilsted, Rejected", "Applied", "Interviewed", "Shortilsted", "Rejected"];
const types = [
  "Full-time, Part-time, Contract",
  "Full-time",
  "Part-time",
  "Contract",
];
const depts = ["e.g., Surgery, Pediatrics", "Surgery", "Pediatrics", "Nursing"];
const locations = ["e.g., New York, Remote", "New York", "Remote"];
const sortBy = ["e.g., Newest, Most Applicants", "Newest", "Most Applicants"];

const JobManagementMainPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.jobs.filters);
  const jobs = useSelector(selectFilteredJobs);

  const columns = [
    { header: "", key: "checkbox" },
    { header: "Job Title", key: "title" },
    { header: "Type", key: "type" },
    { header: "Status", key: "status" },
    { header: "Applicants", key: "applicants" },
    { header: "Posted Date", key: "postedDate" },
  ];

  return (
    <div className="p-6 pt-0">
      <section className="mb-12 flex justify-end">
        <JobManagementButton className={"flex items-center gap-2"} onClick={() => navigate("/admin/job-management/new")}>
         <RiAddFill className="text-xl" /> New Offer
        </JobManagementButton>
      </section>

      <section className="flex w-full flex-wrap space-x-4 space-y-4 mb-10">
        <JobManagementDropdown
          label="Status"
          options={statuses}
          className={"!flex !flex-col !items-center !w-auto"}
          labelStyle={"!w-full !text-lg !font-semibold !text-[#676767] !mb-3.5"}
          inputStyle={"!w-full !border !border-[#ADADAD4A] !rounded-lg"}
          value={filters.status}
          onChange={(val) => dispatch(setFilters({ status: val }))}
        />
        <JobManagementDropdown
          label="Job Type"
          options={types}
          className={"!flex !flex-col !items-center !w-auto"}
          labelStyle={"!w-full !text-lg !font-semibold !text-[#676767] !mb-3.5"}
          inputStyle={"!w-full !border !border-[#ADADAD4A] !rounded-lg"}
          value={filters.type}
          onChange={(val) => dispatch(setFilters({ type: val }))}
        />
        <JobManagementDropdown
          label="Department"
          options={depts}
          className={"!flex !flex-col !items-center !w-auto"}
          labelStyle={"!w-full !text-lg !font-semibold !text-[#676767] !mb-3.5"}
          inputStyle={"!w-full !border !border-[#ADADAD4A] !rounded-lg"}
          value={filters.department}
          onChange={(val) => dispatch(setFilters({ department: val }))}
        />
        <JobManagementDropdown
          label="Location"
          options={locations}
          className={"!flex !flex-col !items-center !w-auto"}
          labelStyle={"!w-full !text-lg !font-semibold !text-[#676767] !mb-3.5"}
          inputStyle={"!w-full !border !border-[#ADADAD4A] !rounded-lg"}
          value={filters.location}
          onChange={(val) => dispatch(setFilters({ location: val }))}
        />
        <JobManagementDropdown
          label="Sort By"
          options={sortBy}
          className={"!flex !flex-col !items-center !w-auto"}
          labelStyle={"!w-full !text-lg !font-semibold !text-[#676767] !mb-3.5"}
          inputStyle={"!w-full !border !border-[#ADADAD4A] !rounded-lg"}
          value={filters.postedDate}
          onChange={(val) => dispatch(setFilters({ postedDate: val }))}
        />
      </section>
      <JobManagementTable columns={columns} data={jobs} />
      {jobs.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">No jobs posted yet</p>
          <JobManagementButton onClick={() => navigate("/admin/job-management/new")}>
            Post New Job
          </JobManagementButton>
        </div>
      )}
    </div>
  );
};

export default JobManagementMainPage;
