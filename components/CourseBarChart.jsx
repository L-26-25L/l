"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function CourseBarChart({ data }) {
  // ألوان هادئة واحترافية كما في الصورة الأصلية
  const colors = ["#6c5ce7", "#74b9ff", "#a29bfe", "#00cec9"];

  // نستخدم "حماية" للبيانات لضمان عدم ظهور أخطاء undefined
  const chartData = data || [
    { name: "MATH", grade: 0 },
    { name: "ECONOMY", grade: 0 },
    { name: "MARKETING", grade: 0 },
    { name: "TECH", grade: 0 },
  ];

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
          {/* المحور الأفقي يمثل الدرجات من 0 إلى 50 كما في الصورة */}
          <XAxis type="number" domain={[0, 50]} hide /> 
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            style={{ fontSize: '11px', fontWeight: 'bold', fill: '#64748b' }}
          />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Bar dataKey="grade" barSize={10} radius={[0, 10, 10, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* مسطرة الأرقام السفلية (اختياري) */}
      <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '10px', color: '#94a3b8', paddingLeft: '40px' }}>
        <span>35</span>
        <span>40</span>
        <span>45</span>
        <span>50</span>
      </div>
    </div>
  );
}
