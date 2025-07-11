import PropTypes from "prop-types";

const JobTabs = ({ tab, setTab }) => (
  <div className="flex border-b mb-2 gap-4">
    <button
      className={`px-4 py-2 font-medium border-b-2 transition-colors duration-150 ${
        tab === "applicants"
          ? "border-purple-500 text-purple-700"
          : "border-transparent text-gray-500 hover:text-black"
      }`}
      onClick={() => setTab("applicants")}
    >
      Applicants
    </button>
    <button
      className={`px-4 py-2 font-medium border-b-2 transition-colors duration-150 ${
        tab === "job-details"
          ? "border-purple-500 text-purple-700"
          : "border-transparent text-gray-500 hover:text-black"
      }`}
      onClick={() => setTab("job-details")}
    >
      Job Details
    </button>
  </div>
);

JobTabs.propTypes = {
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
};

export default JobTabs;
