"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DistributionDonut({ rows }) {
  // تدرجات الأزرق والكحلي الاحترافية والمتناسقة
  const colors = ["#1a3a5a", "#2c5282", "#4299e1", "#63b3ed", "#90cdf4", "#cbd5e1"];

  // نتحقق أن البيانات موجودة
  if (!rows || rows.length === 0) {
    return <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', paddingTop: '50px' }}>No Data Available</div>;
  }

  return (
    <div style={{ width: "100%", height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={rows}
            dataKey="total"
            nameKey="type"
            // استخدمنا أرقام ثابتة لضمان الظهور في المقاسات الصغيرة
            innerRadius={40}
            outerRadius={55}
            paddingAngle={3}
            stroke="none"
          >
            {rows.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '12px' }} 
          />
          
          {/* جعلنا الـ Legend في الأسفل بخط صغير جداً لتوفير مساحة للدائرة */}
          <Legend 
            verticalAlign="bottom" 
            align="center" 
            iconSize={8}
            wrapperStyle={{ fontSize: '9px', fontWeight: '600', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
