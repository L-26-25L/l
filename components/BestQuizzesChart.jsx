
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList
} from "recharts";

export default function BestQuizzesChart({ quizzes = [], excluded }) {
  // مصفوفة ألوان متدرجة وأنيقة
  const colors = ["#1a3a5a", "#2c5282", "#4299e1", "#90cdf4"];

  if (!quizzes || quizzes.length === 0) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#94a3b8" }}>
        No Quiz Data
      </div>
    );
  }

  return (
    // السر هنا: أضفنا minHeight و minWidth لضمان أن الرسمة لا تتقلص لصفر بكسل
    <div style={{ width: "100%", height: "100%", minHeight: "150px", minWidth: "200px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
           data={quizzes} 
           margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        >
          {/* تأكدي أن dataKey يطابق "name" لأننا أرسلناه من CourseTable كـ name */}
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 9, fill: '#64748b' }} 
            axisLine={false}
            tickLine={false}
          />
          
          {/* أضفنا YAxis مخفي ليعرف الـ Bar كيف يحسب الارتفاع تلقائياً */}
          <YAxis hide domain={[0, 'dataMax + 2']} />

          <Tooltip 
            cursor={{fill: 'transparent'}}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
          />

          <Bar dataKey="obtained" radius={[4, 4, 0, 0]} barSize={30}>
            {quizzes.map((entry, i) => (
              <Cell
                key={`cell-${i}`}
                // إذا كان هذا الكويز هو المستبعد، نعطيه لون رمادي فاتح، وإلا نختار من المصفوفة
                fill={i === excluded ? "#e2e8f0" : colors[i % colors.length]}
              />
            ))}

            {/* إظهار الدرجة فوق كل عمود بخط صغير وأنيق */}
            <LabelList 
              dataKey="obtained" 
              position="top" 
              style={{ fontSize: '10px', fontWeight: 'bold', fill: '#1e293b' }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
