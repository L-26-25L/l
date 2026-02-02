"use client";
import {PieChart,Pie,Cell} from "recharts";
export default function ProgressRing({ percentage }) {
  const data = [
    { name: "Completed", value: percentage },
    { name: "Remaining", value: 100 - percentage }
  ];

  const COLORS = ["#734073", "#e6e6ef"];

  return (
    <PieChart width={180} height={180}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
        startAngle={90}
        endAngle={-270}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 20, fontWeight: "bold" }}
      >
        {percentage}%
      </text>
    </PieChart>
  );
}
