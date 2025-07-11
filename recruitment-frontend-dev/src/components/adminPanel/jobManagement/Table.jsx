import React from "react";


const statusColor = status => {
  switch (status) {
    case "Interviewed":  return "text-[#2E8B57]";
    case "Shortilsted":   return "text-[#296EEE]";
    case "Applied":  return "text-[#8B30E7]";
    case "Rejected":  return "text-[#F51720]";
    default:        return "text-gray-800";
  }
};

const JobManagementTable = ({ columns, data }) => (
  <table className="min-w-full table-auto">
    <thead className="bg-[#8B30E7] text-white">
      <tr>
        <th className="px-0 py-2 w-10">
        </th>
        {columns.map(col => (
          <th key={col.key} className="px-2.5 py-2 text-left">
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr
          key={row.id}
          className={index % 2 ? "bg-[#D6C3E9]" : "bg-white"}
        >
          <td className="py-2.5 px-2 text-center">
            <input type="checkbox" className="cursor-pointer border-none" />
          </td>

          {columns.map(col => {
            const extraClass =
              col.key == "status"
                ? statusColor(row.status)
                : "text-[#2C3E50]";

            return (
              <td
                key={col.key}
                className={`py-2.5 px-3 text-[0.9375rem] font-medium ${extraClass}`}
              >
                {row[col.key]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export default JobManagementTable;
