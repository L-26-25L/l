"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function CourseBarChart({ data }) {
  // ألوان متناسقة مع الهوية الكحلية والزرقاء التي اخترناها
  const colors = ["#1a3a5a", "#2c5282", "#4299e1", "#63b3ed", "#90cdf4", "#cbd5e1"];

  // نضمن أن البيانات ليست فارغة
  const chartData = data && data.length > 0 ? data : [
    { name: "MATH", grade: 0 },
    { name: "ECONOMY", grade: 0 },
    { name: "MARKETING", grade: 0 },
    { name: "TECH", grade: 0 },
  ];

  return (
    <div style={{ width: '100%', height: 200, paddingRight: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          {/* أضفنا خلفية خفيفة جداً للأعمدة */}
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          
          {/* المحور الأفقي: جعلناه يظهر بشكل شفاف جداً بدلاً من hide لضمان رسم الأعمدة */}
          <XAxis 
            type="number" 
            domain={[0, 50]} 
            tick={{fontSize: 0}} 
            axisLine={false} 
            tickLine={false} 
            height={0}
          /> 
          
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            width={80}
            style={{ fontSize: '10px', fontWeight: '600', fill: '#475569' }}
          />
          
          <Tooltip 
            cursor={{fill: '#f8fafc'}} 
            contentStyle={{borderRadius: '8px', border: 'none', fontSize: '12px'}}
          />

          {/* زيادة barSize لضمان ظهور العمود بشكل واضح */}
          <Bar dataKey="grade" barSize={12} radius={[0, 10, 10, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* مسطرة الأرقام السفلية - قمت بتعديل توزيعها لتطابق الأعمدة */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '9px', 
        color: '#94a3b8', 
        paddingLeft: '110px',
        paddingRight: '30px',
        marginTop: '-10px'
      }}>
        <span>0</span>
        <span>10</span>
        <span>20</span>
        <span>30</span>
        <span>40</span>
        <span>50</span>
      </div>
    </div>
  );
}
