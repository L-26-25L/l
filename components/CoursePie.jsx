import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function CoursePie({ obtained, total }) {
  const data = [
    { name: "Obtained", value: Number(obtained) || 0 },
    { name: "Remaining", value: Math.max(0, (Number(total) || 100) - (Number(obtained) || 0)) }
  ];

  return (
    <div style={{ width: "100%", height: 180, position: "relative", minHeight: "180px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            innerRadius="65%" 
            outerRadius="90%" 
            startAngle={90} 
            endAngle={450}
            stroke="none"
          >
            <Cell fill="#1a3a5a" /> {/* اللون الكحلي للدرجة الحاصلة عليها */}
            <Cell fill="#e2e8f0" /> {/* لون رمادي فاتح للمتبقي */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* الرقم في المنتصف */}
      <div style={{ 
        position: "absolute", top: "50%", left: "50%", 
        transform: "translate(-50%, -50%)", textAlign: "center",
        pointerEvents: "none" // لضمان عدم تداخل النصوص مع الماوس
      }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#1a3a5a" }}>{obtained}</div>
        <div style={{ fontSize: "10px", color: "#64748b" }}>Total Grade</div>
      </div>
    </div>
  );
}
