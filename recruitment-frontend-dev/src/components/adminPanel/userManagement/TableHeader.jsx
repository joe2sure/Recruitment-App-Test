const TableHeader = ({ allSelected, onToggleAll }) => (
  <thead className="bg-[#8B30E7] text-white">
    <tr>
      <th className="py-2.5 px-3">
        {/* <input type="checkbox" checked={allSelected} onChange={onToggleAll} /> */}
      </th>
      {['User ID', 'Full Name', 'Account Type', 'Status', 'Reg. Date', 'Last Login', ''].map((h) => (
        <th key={h} className="py-2.5 px-3 text-left text-[0.9375rem] font-semibold">{h}</th>
      ))}
    </tr>
  </thead>
);


export default TableHeader;
