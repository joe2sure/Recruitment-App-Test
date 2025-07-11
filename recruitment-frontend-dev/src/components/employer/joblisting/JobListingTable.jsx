import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge";

const statusColor = {
  Live: "bg-purple-100 text-purple-700",
  Closed: "bg-gray-200 text-gray-700",
};

const typeColor = {
  Fulltime: "bg-purple-100 text-purple-700",
  Freelance: "bg-blue-100 text-blue-700",
};

const JobListingTable = ({ jobs = [], search = "", onSelectJob }) => {
  // Filter jobs by search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left font-semibold">Roles</th>
            <th className="px-6 py-3 text-left font-semibold">Status</th>
            <th className="px-6 py-3 text-left font-semibold">Date Posted</th>
            <th className="px-6 py-3 text-left font-semibold">Due Date</th>
            <th className="px-6 py-3 text-left font-semibold">Job Type</th>
            <th className="px-6 py-3 text-left font-semibold">Applicants</th>
            <th className="px-6 py-3 text-left font-semibold">Applied</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job, idx) => (
            <tr
              key={job.id || idx}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectJob && onSelectJob(job)}
            >
              <td className="px-6 py-4 font-medium">{job.title}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[job.status]}`}>{job.status}</span>
              </td>
              <td className="px-6 py-4">{job.datePosted}</td>
              <td className="px-6 py-4">{job.dueDate}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColor[job.type]}`}>{job.type}</span>
              </td>
              <td className="px-6 py-4">{job.applicants}</td>
              <td className="px-6 py-4">{job.applied}</td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-gray-700 text-xl">&#x2026;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

JobListingTable.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      datePosted: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      applicants: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      applied: PropTypes.string,
    })
  ),
  search: PropTypes.string,
  onSelectJob: PropTypes.func,
};

export default JobListingTable;
