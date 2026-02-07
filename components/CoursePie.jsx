import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function CoursePie({ obtained, total }) {
  const data = [
    { name: "Obtained", value: obtained },
    { name: "Remaining", value: total - obtained }
  ];

  return (
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            innerRadius={0} 
            outerRadius="80%" 
            startAngle={90} 
            endAngle={450}
            stroke="none"
          >
            <Cell fill="#1a3a5a" /> {/* أزرق غامق */}
            <Cell fill="#9dc6e0" /> {/* أزرق فاتح */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
