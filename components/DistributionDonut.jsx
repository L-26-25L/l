import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DistributionDonut({ rows }) {
  // تدرجات السماوي الباهت كما طلبت
  const colors = ["#001f3f", "#1e90ff", "#4682b4", "#87ceeb", "#add8e6", "#b0c4de"];

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={rows}
            dataKey="total"
            nameKey="type"
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={2}
          >
            {rows.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
