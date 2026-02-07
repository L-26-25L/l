import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function QuizGauge({ value, max }) {
  const data = [
    { value: Number(value) },
    { value: Number(max) - Number(value) },
  ];
  const COLORS = ["#003f5c", "#f1f2f6"]; // أزرق غامق ورمادي فاتح جداً

  return (
    <div style={{ width: "100%", height: 120, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%" 
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="90%"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ 
        position: "absolute", bottom: "15%", left: "50%", 
        transform: "translateX(-50%)", textAlign: "center" 
      }}>
        <span style={{ fontSize: 22, fontWeight: "bold", color: "#4b6584" }}>{value}</span>
      </div>
    </div>
  );
}
