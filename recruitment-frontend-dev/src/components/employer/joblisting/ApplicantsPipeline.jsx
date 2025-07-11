import PropTypes from "prop-types";
import UserAvatar from "@/components/UserAvatar";

const STAGES = [
  {
    key: "inReview",
    label: "In Review",
    color: "border-yellow-400",
    dot: "bg-yellow-400",
  },
  {
    key: "shortlisted",
    label: "Shortlisted",
    color: "border-purple-500",
    dot: "bg-purple-500",
  },
  {
    key: "interview",
    label: "Interview",
    color: "border-blue-400",
    dot: "bg-blue-400",
  },
  {
    key: "hired",
    label: "Hired",
    color: "border-green-500",
    dot: "bg-green-500",
  },
  {
    key: "declined",
    label: "Declined",
    color: "border-gray-400",
    dot: "bg-gray-400",
  },
];

const ApplicantsPipeline = ({ applicants = [], search = "" }) => {
  // Group applicants by stage
  const grouped = STAGES.reduce((acc, stage) => {
    acc[stage.label] = [];
    return acc;
  }, {});
  applicants.forEach((a) => {
    const stage = a.stage || "In Review";
    if (grouped[stage]) grouped[stage].push(a);
  });

  // Filter by search
  Object.keys(grouped).forEach((stage) => {
    grouped[stage] = grouped[stage].filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STAGES.map((stage) => (
        <div
          key={stage.key}
          className={`min-w-[260px] bg-white rounded-xl border-t-4 ${stage.color} shadow-sm flex-1`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stage.dot}`}></span>
              <span className="font-semibold text-gray-700">{stage.label}</span>
            </div>
            <span className="text-xs text-gray-500 font-semibold">
              {grouped[stage.label].length}
            </span>
            <button className="text-gray-400 hover:text-gray-700 text-xl">
              &#x2026;
            </button>
          </div>
          <div className="p-2 flex flex-col gap-3">
            {grouped[stage.label].map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-lg border p-3 flex gap-3 items-center"
              >
                <UserAvatar
                  src={a.avatar}
                  alt={a.name}
                  fallbackId={a.id}
                  size={40}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 truncate">
                    {a.name}
                  </div>
                  <div className="text-xs text-purple-600 font-medium cursor-pointer">
                    View Profile
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Applied on {a.appliedDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

ApplicantsPipeline.propTypes = {
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

export default ApplicantsPipeline;
