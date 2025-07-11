import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * @typedef {Object} JobPost
 * @property {string} title
 * @property {'Interviewed' | 'Applied' | 'Shortlisted' | 'Rejected'} status
 * @property {string} organization
 */

/** @type {JobPost[]} */
const jobPosts = [
  {
    title: "Registered Nurse",
    status: "Interviewed",
    organization: "HealthCorp",
  },
  {
    title: "Medical Assistant",
    status: "Applied",
    organization: "Senior Living",
  },
  {
    title: "Nursing Assistant",
    status: "Interviewed",
    organization: "MedGroup",
  },
  {
    title: "CNA",
    status: "Shortlisted",
    organization: "Carewell clinic",
  },
  {
    title: "Administrative Assistant",
    status: "Applied",
    organization: "MedGroup",
  },
  {
    title: "Nursing Assistant",
    status: "Rejected",
    organization: "HealthCorp",
  },
];
export function TopJobPosts() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Interviewed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Interviewed
          </Badge>
        );
      case "Applied":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Applied
          </Badge>
        );
      case "Shortlisted":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Shortlisted
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader className="bg-purple-600">
          <TableRow>
            <TableHead className="text-white">Job Title</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Applicants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobPosts.map((job, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{getStatusBadge(job.status)}</TableCell>
              <TableCell>{job.organization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
