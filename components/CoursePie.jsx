import { PieChart, Pie, Cell } from "recharts";

export default function CoursePie({ obtained, total }) {
  const data = [
    { name:"Mine", value: obtained },
    { name:"Remaining", value: total - obtained }
  ];

  return (
    <PieChart width={220} height={220}>
      <Pie data={data} dataKey="value" outerRadius={80}>
        <Cell fill="#5baee5" />
        <Cell fill="#e6e6ef" />
      </Pie>
    </PieChart>
  );
}
