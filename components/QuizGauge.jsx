import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function QuizGauge({ value, max }) {
  const data = [
    { value: Number(value) },
    { value: Math.max(0, Number(max) - Number(value)) },
  ];
  const COLORS = ["#1a3a5a", "#f1f2f6"]; 

  return (
    <div style={{ width: "100%", height: 100, position: "relative" }}> {/* قللنا الارتفاع لـ 100 */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"  // نزلنا المركز للقاع لتبدو نصف دائرة
            startAngle={180}
            endAngle={0}
            innerRadius="75%"
            outerRadius="100%"
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div style={{ 
        position: "absolute", bottom: "-5px", left: "50%", 
        transform: "translateX(-50%)", textAlign: "center" 
      }}>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#1a3a5a" }}>{value}</div>
        <div style={{ fontSize: "10px", color: "#94a3b8" }}>{max}</div>
      </div>
    </div>
  );
}
