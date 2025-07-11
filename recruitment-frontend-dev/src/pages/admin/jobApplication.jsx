import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { FaEnvelope, FaEnvelopeSquare } from "react-icons/fa";

const applications = [
  {
    id: "1",
    name: "Darlene Robertson",
    jobTitle: "Registered Nurse",
    employer: "HealthCorp",
    status: "Interviewed",
    appliedDate: "8/16/13",
  },
  {
    id: "2",
    name: "Jacob Jones",
    jobTitle: "Medical Assistant",
    employer: "Senior Living",
    status: "Applied",
    appliedDate: "8/21/19",
  },
  {
    id: "3",
    name: "Annette Black",
    jobTitle: "Nursing Assistant",
    employer: "MedGroup",
    status: "Interviewed",
    appliedDate: "8/21/15",
  },
  {
    id: "4",
    name: "Bessie Cooper",
    jobTitle: "CNA",
    employer: "Carewell clinic",
    status: "Shortlisted",
    appliedDate: "11/7/16",
  },
  {
    id: "5",
    name: "Guy Hawkins",
    jobTitle: "Administrative Assistant",
    employer: "MedGroup",
    status: "Applied",
    appliedDate: "5/7/16",
  },
  {
    id: "6",
    name: "Marvin McKinney",
    jobTitle: "Nursing Assistant",
    employer: "HealthCorp",
    status: "Rejected",
    appliedDate: "5/27/15",
  },
  {
    id: "7",
    name: "Cody Fisher",
    jobTitle: "Medical Assistant",
    employer: "MedGroup",
    status: "Interviewed",
    appliedDate: "9/8/16",
  },
  {
    id: "8",
    name: "Kristin Watson",
    jobTitle: "CNA",
    employer: "Phamacare",
    status: "Rejected",
    appliedDate: "5/27/15",
  },
  {
    id: "9",
    name: "Floyd Miles",
    jobTitle: "Nursing Assistant",
    employer: "HealthCorp",
    status: "Interviewed",
    appliedDate: "10/28/12",
  },
  {
    id: "10",
    name: "Eleanor Pena",
    jobTitle: "Medical Assistant",
    employer: "Carewell clinic",
    status: "Interviewed",
    appliedDate: "3/4/16",
  },
  {
    id: "11",
    name: "Cameron Williamson",
    jobTitle: "Registered Nurse",
    employer: "Carewell clinic",
    status: "Shortlisted",
    appliedDate: "4/21/12",
  },
  {
    id: "12",
    name: "Brooklyn Simmons",
    jobTitle: "Nursing Assistant",
    employer: "Phamacare",
    status: "Applied",
    appliedDate: "7/18/17",
  },
  {
    id: "13",
    name: "Dianne Russell",
    jobTitle: "Registered Nurse",
    employer: "Phamacare",
    status: "Rejected",
    appliedDate: "12/28/17",
  },
  {
    id: "14",
    name: "Ralph Edwards",
    jobTitle: "CNA",
    employer: "Phamacare",
    status: "Interviewed",
    appliedDate: "1/31/14",
  },
  {
    id: "15",
    name: "Esther Howard",
    jobTitle: "Nursing Assistant",
    employer: "Senior Living",
    status: "Rejected",
    appliedDate: "4/4/18",
  },
  {
    id: "16",
    name: "Courtney Henry",
    jobTitle: "Registered Nurse",
    employer: "Senior Living",
    status: "Interviewed",
    appliedDate: "10/6/13",
  },
];

const statusColors = {
  Applied: "bg-purple-100 text-purple-700",
  Interviewed: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function Applications() {
  const [filterJob, setFilterJob] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  // const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = applications.filter((app) => {
    const matchesJob = filterJob === "All" || app.jobTitle === filterJob;
    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    // const matchesSearch = app.name
    //   .toLowerCase()
    //   .includes(searchTerm.toLowerCase());
    // return matchesJob && matchesStatus && matchesSearch;
    return matchesJob && matchesStatus;
  });

  return (
    <div className="flex-1 bg-white p-6">
      {/* <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Applications</h2>
        <Input
          placeholder="Search Candidate..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 bg-gray-50 border-gray-200 text-sm"
        />
      </div> */}
      <div className="mb-4 flex space-x-4">
        <select
          value={filterJob}
          onChange={(e) => setFilterJob(e.target.value)}
          className="border border-gray-200 rounded-md p-2 text-sm bg-white"
        >
          <option value="All">All</option>
          <option value="Registered Nurse">Registered Nurse</option>
          <option value="Medical Assistant">Medical Assistant</option>
          <option value="Nursing Assistant">Nursing Assistant</option>
          <option value="CNA">CNA</option>
          <option value="Administrative Assistant">
            Administrative Assistant
          </option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-md p-2 text-sm bg-white"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Candidate</th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Employer</th>
              <th classClassName="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://i.pravatar.cc/40?img=${app.id}`}
                    />
                    <AvatarFallback>
                      {app.name.split(" ")[0][0] + app.name.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-900">{app.name}</span>
                </td>
                <td className="px-4 py-3">{app.jobTitle}</td>
                <td className="px-4 py-3">{app.employer}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-2 py-1 rounded",
                      statusColors[app.status]
                    )}
                  >
                    {app.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">{app.appliedDate}</td>
                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <FaEnvelope className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
