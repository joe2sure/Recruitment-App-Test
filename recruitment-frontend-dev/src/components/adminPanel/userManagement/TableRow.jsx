import { FiMoreVertical } from "react-icons/fi";

const TableRow = ({ user, selected, onToggle, index }) => (
  <tr className={index % 2 ? 'bg-[#D6C3E9]' : 'bg-white'}>
    <td className="py-2.5 px-3">
      <input type="checkbox" className="cursor-pointer" checked={selected} onChange={() => onToggle(user.id)} />
    </td>
    <td className="py-2.5 px-3 text-[0.9375rem] font-medium text-[#343434]">{user.id}</td>
    <td className="py-2.5 px-3 text-[0.9375rem] font-medium text-[#2C3E50]">{user.fullName}</td>
    <td className={`py-2.5 px-3 text-[0.9375rem] font-medium ${user.accountType === 'Candidate' ? 'text-[#00B16E]' : user.accountType === 'Employer' ? 'text-[#7E3000]' : 'text-[#0143BE]'}`}  >
      {user.accountType}
    </td>
    <td className={`py-2.5 px-3 text-[0.9375rem] font-medium ${user.status === 'Active' ? 'text-[#025E3B]' : user.status === 'Suspended' ? 'text-[#3A3A3A]' : 'text-[#753106]'}`}>
      {user.status}
    </td>
    <td className="py-2.5 px-3 text-[0.9375rem] text-[#343434] font-medium">{user.regDate}</td>
    <td className="py-2.5 px-3 text-[0.9375rem] text-[#343434] font-medium">{user.lastLogin}</td>
    <td className="py-2.5 px-3 text-center">
      <FiMoreVertical className="inline cursor-pointer" />
    </td>
  </tr>
);


export default TableRow;
