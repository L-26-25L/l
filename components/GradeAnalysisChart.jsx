import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GradeAnalysisChart({ data }) {
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a3a5a" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#1a3a5a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          {/* المحور X هو نوع التقييم Assessment Type */}
          <XAxis dataKey="type" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
          {/* المحور Y هو الدرجة */}
          <YAxis hide domain={[0, 'auto']} /> 
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="obtained" 
            stroke="#1a3a5a" 
            fillOpacity={1} 
            fill="url(#colorGrade)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
