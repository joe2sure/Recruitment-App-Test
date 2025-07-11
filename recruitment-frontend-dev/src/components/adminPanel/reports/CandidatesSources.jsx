import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

// Sample data for candidate sources
const data = [
  { name: "Online Job Boards", value: 45, color: "#4285F4" },
  { name: "Careers Page", value: 25, color: "#FBBC05" },
  { name: "Referral", value: 18, color: "#34A853" },
  { name: "Other", value: 12, color: "#16B8F3" },
];

// Custom legend that includes percentages
const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <ul className="flex flex-col gap-2 text-sm mt-4">
      {payload.map((entry, index) => (
        <li key={`legend-${index}`} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-sm">{entry.value}</span>
          <span className="text-muted-foreground">{data[index].value}%</span>
        </li>
      ))}
    </ul>
  );
};

export function CandidatesSources() {
  return (
    <div className="h-[300px] w-full flex">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              animationDuration={1000}
              animationBegin={200}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, "Percentage"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
