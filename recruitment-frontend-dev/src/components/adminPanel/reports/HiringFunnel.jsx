import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  LabelList,
} from "recharts";

export function HiringFunnel() {
  const [funnelData, setFunnelData] = useState([
    { name: "Applications", value: 1158, color: "#4285F4" },
    { name: "Screened", value: 754, color: "#34D399" },
    { name: "Interviewed", value: 230, color: "#22D3EE" },
    { name: "Offered", value: 145, color: "#FBBF24" },
    { name: "Hired", value: 126, color: "#F97316" },
  ]);

  // For mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setFunnelData([
        { name: "Applications", value: 1158, color: "#4285F4" },
        { name: "Screened", value: 754, color: "#34D399" },
        { name: "Interviewed", value: 230, color: "#22D3EE" },
        { name: "Offered", value: 145, color: "#FBBF24" },
        { name: "Hired", value: 126, color: "#F97316" },
      ]);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom bar shape for trapezoidal effect
  const CustomBar = (props) => {
    const { x, y, width, height, fill, index } = props;

    // Reduced width reduction for subtler trapezoidal effect
    const widthReduction = (funnelData.length - index) * -8;
    const adjustedWidth = Math.max(width - widthReduction, width * 0.85);

    return (
      <g>
        <path
          d={`
            M${x},${y}
            L${x + adjustedWidth},${y}
            L${x + width},${y + height}
            L${x},${y + height}
            Z
          `}
          fill={fill}
        />
      </g>
    );
  };

  // Robust label component for names inside bars
  const renderNameLabel = (props) => {
    const { x, y, width, height, payload } = props;
    const data = payload || props;

    // Safeguard against undefined data
    if (!data?.name || !x || !y || !width || !height) return null;

    return (
      <text
        x={x + 10}
        y={y + height / 2}
        fill="white"
        fontSize={window.innerWidth < 768 ? 14 : 14}
        fontWeight="700"
        textAnchor="start"
        dominantBaseline="middle"
      >
        {data.name}
      </text>
    );
  };

  // Robust label component for values outside bars
  const renderValueLabel = (props) => {
    const { x, y, width, height, value, payload } = props;
    const data = payload || props;
    const displayValue = value ?? data?.value;

    // Safeguard against undefined values
    if (typeof displayValue === "undefined" || !x || !y || !width || !height)
      return null;

    return (
      <text
        x={x + width + 10}
        y={y + height / 2}
        fill="#374151"
        fontSize={14}
        fontWeight="700"
        textAnchor="start"
        dominantBaseline="middle"
      >
        {displayValue.toLocaleString()}
      </text>
    );
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={funnelData}
          layout="vertical"
          barCategoryGap={8}
          margin={{ top: 20, right: 120, left: 20, bottom: 20 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip
            formatter={(value) => [value.toLocaleString(), "Candidates"]}
            labelStyle={{
              color: "#111827",
              fontWeight: "600",
              marginBottom: "4px",
            }}
            contentStyle={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              padding: "12px",
            }}
            cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
          />
          <Bar dataKey="value" maxBarSize={60} shape={<CustomBar />}>
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} index={index} />
            ))}
            <LabelList
              dataKey="name"
              content={renderNameLabel}
              position="insideLeft"
            />
            <LabelList
              dataKey="value"
              content={renderValueLabel}
              position="right"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
