import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function DistributionDonut({ rows }) {
  const colors = ["#c5d8e1","#b5c8d8","#a5b8cf","#95a8c6","#8598bd"];

  return (
    <PieChart width={240} height={240}>
      <Pie
        data={rows}
        dataKey="total"
        nameKey="type"
        innerRadius={60}
        outerRadius={90}
      >
        {rows.map((_, i) => (
          <Cell key={i} fill={colors[i % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
