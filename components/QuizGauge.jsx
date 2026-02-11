"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function QuizGauge({ value, max }) {
  // التأكد من أن القيم أرقام صحيحة
  const val = Number(value) || 0;
  const m = Number(max) || 10; // قيمة افتراضية في حال عدم وجود بيانات

  const data = [
    { value: val },
    { value: Math.max(0, m - val) }
  ];

  // ألوان متناسقة: كحلي للتقدم، ورمادي فاتح للخلفية
  const COLORS = ["#1a3a5a", "#f1f5f9"];

  return (
    <div style={{ width: "100%", height: 100, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%" // رفعناه قليلاً ليناسب الحاوية الصغيرة
            startAngle={180}
            endAngle={0}
            innerRadius={45} // أقطار ثابتة لضمان الظهور
            outerRadius={60}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* عرض الرقم في المنتصف أسفل القوس */}
      <div style={{
        position: "absolute",
        bottom: "0px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: "16px", fontWeight: "800", color: "#1a3a5a" }}>{val}</span>
        <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>/{m}</span>
      </div>
    </div>
  );
}
