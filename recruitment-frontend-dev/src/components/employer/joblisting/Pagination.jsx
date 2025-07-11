import PropTypes from "prop-types";

const Pagination = ({ page = 1, totalPages = 5, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      <button
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => onPageChange && onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        &lt;
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold ${
            page === idx + 1
              ? "bg-purple-100 text-purple-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => onPageChange && onPageChange(idx + 1)}
          aria-current={page === idx + 1 ? "page" : undefined}
        >
          {idx + 1}
        </button>
      ))}
      <button
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => onPageChange && onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
