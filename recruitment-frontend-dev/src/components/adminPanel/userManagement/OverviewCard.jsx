const OverviewCard = ({ icon, label, count, bgColor }) => (
  <div className="flex items-center h-[134px] pl-[1.82rem] bg-white rounded-xl border border-[#E5E7EB] md:w-auto">
    <div className={`p-3 rounded-full text-2xl text-[#E6E6E6] ${bgColor}`}>{icon}</div>
    <div className="ml-4">
      <p className="text-xl font-semibold text-[#676767]">{label}</p>
      <p className="text-[2.15rem] text-[#1D1D1D] font-extrabold">{count.toLocaleString()}</p>
    </div>
  </div>
);


export default OverviewCard;