import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { RxCaretDown } from "react-icons/rx";


const UserTable = () => {
  const users = useSelector((state) => state.users.list);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(users.length / pageSize);
  const pagedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleAll = () => {
    if (selectedIds.length === pagedUsers.length) setSelectedIds([]);
    else setSelectedIds(pagedUsers.map(u => u.id));
  };
  const toggleOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

//   console.log(pagedUsers)

  return (
    <div className=" rounded-lg overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        {/* <button
          className={`px-4 py-2 rounded ${selectedIds.length ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          disabled={!selectedIds.length}
        >
          Bulk Delete ({selectedIds.length})
        </button> */}
        <h4 className="text-lg font-semibold">Users Profile</h4>
        <button className="flex items-center gap-2 text-sm font-medium px-3 py-2 bg-[#FCFCFC] border border-[#ADADAD4A] rounded-lg">Filter <RxCaretDown /></button>
      </div>
      <table className="min-w-full">
        <TableHeader allSelected={selectedIds.length === pagedUsers.length} onToggleAll={toggleAll} />
        <tbody>
          {pagedUsers.map((user, index) => (
            <TableRow key={user.id} user={user} selected={selectedIds.includes(user.id)} onToggle={toggleOne} index={index} />
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};


export default UserTable;
