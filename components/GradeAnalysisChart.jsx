"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GradeAnalysisChart({ data = [] }) {
  if (!data || data.length === 0) {
    return <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#94a3b8' }}>No Data Available</div>;
  }

  return (
    <div style={{ width: '100%', height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorObtained" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a3a5a" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#1a3a5a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="type" 
            tick={{ fontSize: 9, fill: '#ACBAC4' }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis hide domain={[0, 'dataMax + 10']} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px', fontFamily: 'Garamond' }} />
          
          {/* الخط الأول: الدرجة الكلية (Total Grade) - خط رمادي مُنقط */}
          <Area 
            type="monotone" 
            dataKey="total" 
            stroke="#ACBAC4" 
            fill="transparent" 
            strokeDasharray="5 5" 
            name="Total Grade"
          />

          {/* الخط الثاني: درجتك (Obtained Grade) - خط كحلي عريض مع ظل */}
          <Area 
            type="monotone" 
            dataKey="obtained" 
            stroke="#1a3a5a" 
            fill="url(#colorObtained)" 
            strokeWidth={3}
            name="Your Grade"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
