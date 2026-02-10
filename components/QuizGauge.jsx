import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function QuizGauge({ value, max }) {
  // الحساب: القيمة التي حصل عليها الطالب مقابل المجموع الممكن للكويزات
  const data = [
    { value: value },
    { value: max - value }
  ];

  const COLORS = ["#4f46e5", "#e2e8f0"]; // بنفسجي للأداء، رمادي للمفقود

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%" // ننزله للأسفل ليعطي شكل العداد (Gauge)
            startAngle={180}
            endAngle={0}
            innerRadius={30}
            outerRadius={45}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* عرض الرقم في المنتصف */}
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center"
      }}>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>{value}</span>
        <span style={{ fontSize: "10px", color: "#64748b" }}>/{max}</span>
      </div>
    </div>
  );
}
