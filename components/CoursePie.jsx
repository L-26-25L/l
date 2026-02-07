import { PieChart, Pie, Cell, ResponsiveContainer, Text } from "recharts";

export default function CoursePie({ obtained, total }) {
  const data = [
    { name: "Obtained", value: Number(obtained) },
    { name: "Remaining", value: Math.max(0, Number(total) - Number(obtained)) }
  ];

  return (
    <div style={{ width: "100%", height: 180, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            innerRadius="65%" // جعلناها مفرغة قليلاً ليوضع الرقم بالمنتصف
            outerRadius="90%" 
            startAngle={90} 
            endAngle={450}
            stroke="none"
          >
            <Cell fill="#1a3a5a" />
            <Cell fill="#9dc6e0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* هذا الجزء هو الذي يظهر الرقم في المنتصف */}
      <div style={{ 
        position: "absolute", top: "50%", left: "50%", 
        transform: "translate(-50%, -50%)", textAlign: "center" 
      }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#1a3a5a" }}>{obtained}</div>
        <div style={{ fontSize: "10px", color: "#64748b" }}>Total Grade</div>
      </div>
    </div>
  );
}
