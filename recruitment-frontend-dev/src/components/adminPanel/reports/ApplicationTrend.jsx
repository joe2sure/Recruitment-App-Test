import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

// Sample data for application trends over time
const data = [
  { name: "Feb", value: 35 },
  { name: "Mar", value: 28 },
  { name: "Apr", value: 78 },
  { name: "May", value: 25 },
  { name: "Jun", value: 58 },
  { name: "Jul", value: 75 },
  { name: "Aug", value: 40 },
  { name: "Sep", value: 43 },
  { name: "Oct", value: 65 },
  { name: "Nov", value: 32 },
  { name: "Dec", value: 78 },
  { name: "Jan", value: 48 },
];

export function ApplicationTrend() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => [`${value} applications`, "Count"]}
            labelStyle={{ fontWeight: "bold", color: "#333" }}
          />
          <ReferenceArea
            y1={0}
            y2={100}
            fill="url(#colorGradient)"
            fillOpacity={0.2}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: "#8884d8" }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
