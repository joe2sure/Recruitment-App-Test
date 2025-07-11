import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SearchIcon, ArrowLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MessageIcon from "@/assets/allApplicants/messageIcon.png";
import Profile from "@/components/employer/allApplicants/Profile";
import Resume from "@/components/employer/allApplicants/Resume";
import InterviewSchedule from "@/components/employer/allApplicants/InterviewSchedule";
import { Link } from "react-router-dom";

const Applicants = () => {
  const [search, setSearch] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState(mockApplicants);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const tableRef = useRef(null);

  useEffect(() => {
    const filtered = mockApplicants.filter((applicant) =>
      applicant.fullName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredApplicants(filtered);
    setCurrentPage(1);
  }, [search]);

  const handlePagination = (page) => {
    const totalPages = Math.ceil(filteredApplicants.length / rowsPerPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedApplicants = filteredApplicants.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredApplicants.length / rowsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 2 || i === totalPages || Math.abs(currentPage - i) <= 1) {
        pages.push(i);
      }
    }
    return pages;
  };

  if (selectedApplicant) {
    return (
      <section className="flex flex-col mt-6 md:mt-12 lg:mx-4 xl:mx-24">
        <div className="flex justify-between items-center lg:items-start gap-6 md:gap-0 mb-10">
            <div className="flex flex-col items-start">
                <div className="flex items-center md:space-x-2 cursor-pointer mb-2 md:mb-6" onClick={() => setSelectedApplicant(null)}>
                <ArrowLeft className="w-5 h-5 text-black" />
                {/* <span className="text-black font-semibold">Back to Applicants</span> */}
                </div>
                <h1 className="font-semibold text-[18px] md:text-[24px] lg:text-[32px] leading-[48px] tracking-[-3%] mb-2 md:mb-4">Applicant Details</h1>
                <h2 className="text-base lg:text-lg xl:text-2xl font-semibold text-black">{selectedApplicant.fullName}</h2>
                <div className="flex justify-start items-start md:items-center flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-1">
                    <p className="text-xs md:text-base xl:text-lg">{selectedApplicant.jobRole}</p>
                    <Link to={`/employer/messages`} className="bg-[#D6C3E9] px-4 py-1 rounded-lg">
                        <p className="flex items-center">Message <span className="ml-2"> <img src={MessageIcon} alt="msg" className="w-4 h-4 mt-1" /> </span> </p>
                    </Link>
                </div>
            </div>
            <div className="bg-[#D9D9D9] w-[154px] lg:w-[303px] h-[82px] lg:h-[161px] rounded-lg flex">

            </div>
        </div>

        <div className="flex space-x-3 md:space-x-6 border-b border-gray-300 text-xs md:text-sm">
          <button
            className={`pb-1 ${activeTab === "profile" ? "border-b-2 border-[#8B30E7]" : "cursor-pointer"}`}
            onClick={() => setActiveTab("profile")}
          >
            Applicant Profile
          </button>
          <button
            className={`pb-1 ${activeTab === "resume" ? "border-b-2 border-[#8B30E7]" : "cursor-pointer"}`}
            onClick={() => setActiveTab("resume")}
          >
            Resume
          </button>
          <button
            className={`pb-1 ${activeTab === "interview" ? "border-b-2 border-[#8B30E7]" : "cursor-pointer"}`}
            onClick={() => setActiveTab("interview")}
          >
            Interview Schedule
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "profile" && <Profile /> }
          {activeTab === "resume" && <Resume />}
          {activeTab === "interview" && < InterviewSchedule /> }
        </div>
      </section>
    );
  }

//   Main Page with Applicants List
  return (
    <>
      <section className="flex flex-col mt-12 mx-4">
        <h1 className="text-2xl font-semibold text-black">
          Total Applicants: {mockApplicants.length}
        </h1>
        <div
          className="mt-6 flex w-full max-w- items-center border border-gray-300 bg-[#fff] rounded-lg px-2.5
        hover:bg-[#D6C3E9] focus-visible:bg-[#D6C3E9] group"
        >
          <SearchIcon className="h-4 w-4 mr-2.5 group-focus-visible:bg-[#D6C3E9]" />
          <Input
            placeholder="Search Applicants"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!border-none
                group-focus-visible:bg-[#D6C3E9]"
          />
        </div>
        {/* All Applicants Table */}
        <div className="mt-10 overflow-x-auto border border-[#D6C3E9] rounded-lg p-4">
          <table className="w-full border-collapse table-auto items-center">
            <thead>
              <tr className="text-[#676767] text-[16px] font-semibold">
                <th className="py-2 px-4"></th>
                <th className="py-2 px-4 text-start">Full Name</th>
                <th className="py-2 px-4 text-center">Hiring Status</th>
                <th className="py-2 px-4 text-center">Applied Date</th>
                <th className="py-2 px-4 text-center">Job Role</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedApplicants.map((applicant) => (
                <tr key={applicant.fullName}>
                  <td className="py-2 px-4">
                    <Checkbox className={"!border-[2px] !border-[#D6C3E9] cursor-pointer"} />
                  </td>
                  <td className="py-2 px-4 font-normal text-[14px] leading-[21px] text-black">
                    {applicant.fullName}
                  </td>
                  <td className="py-2 px-4 font-normal text-[14px] leading-[21px] text-black">
                    <p className="bg-[#D6C3E9] px-4 py-1 rounded-full text-center">
                      {applicant.hiringStatus}
                    </p>
                  </td>
                  <td className="py-2 px-4 font-normal text-[14px] leading-[21px] text-black text-center">
                    {applicant.appliedDate}
                  </td>
                  <td className="py-2 px-4 font-semibold text-[16px] leading-[25.5px] text-[#25324B] text-center tracking-[-1%]">
                    {applicant.jobRole}
                  </td>
                  <td className="py-2 px-4 font-semibold text-[13px] leading-[20px] tracking-tight text-[#8B30E7] text-center">
                    <button onClick={() => setSelectedApplicant(applicant)} className="cursor-pointer">{applicant.action}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* End of All Applicants Table */}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 px-4">
          <div className="flex justify-center space-x-2 text-[#868c98]">
            <button
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-black disabled:text-gray-300 disabled:opacity-50 text-sm"
            >
              &lt;
            </button>

            {getPageNumbers().map((num, index) => (
              <button
                key={index}
                onClick={() => typeof num === "number" && handlePagination(num)}
                className={`px-3 text-sm py-1 ${
                  currentPage === num ? " rounded-full bg-[#D6C3E9] text-black" : ""
                }`}
                disabled={num === "..."}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-black disabled:text-gray-300 disabled:opacity-50 text-sm"
            >
              &gt;
            </button>
          </div>
        </div>
        {/* End of Pagination Controls */}
      </section>
    </>
  );
};

export default Applicants;

const mockApplicants = [
  { fullName: "Olivia Smith", hiringStatus: "Interviewing", appliedDate: "13 July, 2024", jobRole: "Registered Nurse", action: "See Application" },
  { fullName: "Liam Johnson", hiringStatus: "Pending", appliedDate: "13 July, 2024", jobRole: "Pharmacist", action: "See Application" },
  { fullName: "Emma Williams", hiringStatus: "Hired", appliedDate: "13 July, 2024", jobRole: "Medical Assistant", action: "See Application" },
  { fullName: "Noah Brown", hiringStatus: "Rejected", appliedDate: "13 July, 2024", jobRole: "Physical Therapist", action: "See Application" },
  { fullName: "Ava Jones", hiringStatus: "Pending", appliedDate: "13 July, 2024", jobRole: "Radiologic Technologist", action: "See Application" },
  { fullName: "Elijah Garcia", hiringStatus: "Interviewing", appliedDate: "13 July, 2024", jobRole: "Dentist", action: "See Application" },
  { fullName: "Sophia Martinez", hiringStatus: "Hired", appliedDate: "13 July, 2024", jobRole: "Occupational Therapist", action: "See Application" },
  { fullName: "William Rodriguez", hiringStatus: "Rejected", appliedDate: "13 July, 2024", jobRole: "Respiratory Therapist", action: "See Application" },
  { fullName: "Isabella Davis", hiringStatus: "Pending", appliedDate: "13 July, 2024", jobRole: "Phlebotomist", action: "See Application" },
  { fullName: "James Hernandez", hiringStatus: "Interviewing", appliedDate: "13 July, 2024", jobRole: "Clinical Laboratory Technician", action: "See Application" },
  { fullName: "Mia Lopez", hiringStatus: "Hired", appliedDate: "13 July, 2024", jobRole: "Medical Sonographer", action: "See Application" },
  { fullName: "Benjamin Gonzalez", hiringStatus: "Rejected", appliedDate: "13 July, 2024", jobRole: "Healthcare Administrator", action: "See Application" },
  { fullName: "Charlotte Wilson", hiringStatus: "Pending", appliedDate: "13 July, 2024", jobRole: "Medical Records Technician", action: "See Application" },
  { fullName: "Lucas Anderson", hiringStatus: "Interviewing", appliedDate: "13 July, 2024", jobRole: "Dietitian", action: "See Application" },
  { fullName: "Amelia Thomas", hiringStatus: "Hired", appliedDate: "13 July, 2024", jobRole: "Pharmacist", action: "See Application" },
  { fullName: "Henry Taylor", hiringStatus: "Rejected", appliedDate: "13 July, 2024", jobRole: "Nurse Practitioner", action: "See Application" },
  { fullName: "Evelyn Moore", hiringStatus: "Pending", appliedDate: "13 July, 2024", jobRole: "Speech-Language Pathologist", action: "See Application" },
  { fullName: "Alexander Jackson", hiringStatus: "Interviewing", appliedDate: "13 July, 2024", jobRole: "Emergency Medical Technician", action: "See Application" },
  { fullName: "Ella Martin", hiringStatus: "Hired", appliedDate: "13 July, 2024", jobRole: "Phlebotomist", action: "See Application" },
  { fullName: "Daniel Lee", hiringStatus: "Rejected", appliedDate: "13 July, 2024", jobRole: "Radiation Therapist", action: "See Application" },
  { fullName: "Harper Perez", hiringStatus: "Pending", appliedDate: "13 July, 2024", jobRole: "Medical Assistant", action: "See Application" },
  { fullName: "Michael White", hiringStatus: "Interviewing", appliedDate: "13 July, 2024", jobRole: "Registered Nurse", action: "See Application" },
  { fullName: "Abigail Harris", hiringStatus: "Hired", appliedDate: "13 July, 2024", jobRole: "Clinical Psychologist", action: "See Application" },
  { fullName: "Jackson Clark", hiringStatus: "Rejected", appliedDate: "13 July, 2024", jobRole: "Dentist", action: "See Application" },
  { fullName: "Emily Lewis", hiringStatus: "Pending", appliedDate: "13 July, 2024", jobRole: "Occupational Therapist", action: "See Application" },
  { fullName: "Sebastian Robinson", hiringStatus: "Interviewing", appliedDate: "13 July, 2024", jobRole: "Respiratory Therapist", action: "See Application" },
  { fullName: "Elizabeth Walker", hiringStatus: "Hired", appliedDate: "13 July, 2024", jobRole: "Physical Therapist", action: "See Application" },
  { fullName: "Jack Hall", hiringStatus: "Rejected", appliedDate: "13 July, 2024", jobRole: "Dietitian", action: "See Application" },
  { fullName: "Sofia Allen", hiringStatus: "Pending", appliedDate: "13 July, 2024", jobRole: "Healthcare Administrator", action: "See Application" },
  { fullName: "Owen Young", hiringStatus: "Interviewing", appliedDate: "13 July, 2024", jobRole: "Medical Sonographer", action: "See Application" }
];