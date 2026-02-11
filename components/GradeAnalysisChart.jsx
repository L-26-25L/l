"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GradeAnalysisChart({ data }) {
  // حماية للبيانات: إذا كانت فارغة، لا نعرض "Loading" بل نعرض حاوية فارغة أنيقة
  if (!data || data.length === 0) {
    return <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#94a3b8' }}>No Grade Data Yet</div>;
  }

  return (
    <div style={{ width: '100%', height: 180, minHeight: '180px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            {/* التدرج اللوني الذي يعطي شكل الظل تحت المنحنى */}
            <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a3a5a" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#1a3a5a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#f1f5f9" 
          />
          
          <XAxis 
            dataKey="type" 
            tick={{ fontSize: 9, fill: '#64748b' }} 
            axisLine={false} 
            tickLine={false}
            interval={0} // لضمان ظهور جميع أسماء التقييمات (كويز، ميد..)
          />
          
          <YAxis hide domain={[0, 'dataMax + 5']} /> 
          
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
          />
          
          <Area 
            type="monotone" // يجعل المنحنى ناعماً وانسيابياً
            dataKey="obtained" 
            stroke="#1a3a5a" 
            fillOpacity={1} 
            fill="url(#colorGrade)" 
            strokeWidth={2}
            animationDuration={1500} // سرعة رسم المنحنى عند التحميل
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
