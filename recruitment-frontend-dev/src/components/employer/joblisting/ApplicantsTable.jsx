import PropTypes from "prop-types";
import UserAvatar from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";

const stageColor = {
  "In Review": "bg-yellow-100 text-yellow-800",
  "Shortlisted": "bg-purple-100 text-purple-700",
  Interview: "bg-blue-100 text-blue-700",
  Hired: "bg-green-100 text-green-700",
  Declined: "bg-gray-200 text-gray-700",
};

const ApplicantsTable = ({ applicants = [], search = "" }) => {
  // Filter by search
  const filtered = applicants.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left font-semibold">
              <input type="checkbox" className="accent-purple-500" />
            </th>
            <th className="px-4 py-3 text-left font-semibold">Full Name</th>
            <th className="px-4 py-3 text-left font-semibold">Hiring Stage</th>
            <th className="px-4 py-3 text-left font-semibold">Applied Date</th>
            <th className="px-4 py-3 text-left font-semibold">Action</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-4">
                <input type="checkbox" className="accent-purple-500" />
              </td>
              <td className="px-4 py-4 flex items-center gap-3">
                <UserAvatar src={a.avatar} alt={a.name} fallbackId={a.id} size={36} />
                <span className="font-medium">{a.name}</span>
              </td>
              <td className="px-4 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stageColor[a.stage] || "bg-gray-100 text-gray-700"}`}>{a.stage}</span>
              </td>
              <td className="px-4 py-4">{a.appliedDate}</td>
              <td className="px-4 py-4">
                <button className="text-purple-600 font-semibold hover:underline">See Application</button>
              </td>
              <td className="px-4 py-4 text-right">
                <button className="text-gray-400 hover:text-gray-700 text-xl">&#x2026;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ApplicantsTable.propTypes = {
  applicants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      avatar: PropTypes.string,
      name: PropTypes.string.isRequired,
      stage: PropTypes.string.isRequired,
      appliedDate: PropTypes.string.isRequired,
    })
  ),
  search: PropTypes.string,
};

export default ApplicantsTable;
