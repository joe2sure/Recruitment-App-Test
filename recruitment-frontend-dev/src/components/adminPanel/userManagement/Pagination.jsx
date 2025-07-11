const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center mt-5 space-x-2">
    <button
      className="px-3 py-1 border rounded disabled:opacity-50"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Prev
    </button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-[#8B30E7] text-white' : ''}`}
        onClick={() => onPageChange(i + 1)}
      >
        {i + 1}
      </button>
    ))}
    <button
      className="px-3 py-1 border rounded disabled:opacity-50"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>
);


export default Pagination;
