const ApplicantsSummaryChart = () => {
    // datset
  const data = [
    { label: 'Full Time', value: 45, color: 'bg-violet-400' },
    { label: 'Internship', value: 32, color: 'bg-yellow-400' },
    { label: 'Part-Time', value: 24, color: 'bg-teal-400' },
    { label: 'Remote', value: 22, color: 'bg-blue-500' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col gap-2 w-full max-w-3xl">
      <div className="flex h-4 w-full rounded-full overflow-hidden">
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              width: `${(item.value / total) * 100}%`, // rationalise then and share width accordingly
            }}
            className={`h-full ${item.color}`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className={`inline-block w-3 h-3 rounded-sm ${item.color}`}
            />
            <span className="text-gray-600">
              {item.label} : <span className="font-medium">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsSummaryChart;
