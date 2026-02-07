import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, LabelList } from "recharts";

export default function BestQuizzesChart({ quizzes, excluded }) {
  // نجهز البيانات للتأكد من وجود مسميات واضحة
  const data = quizzes.map((q, index) => ({
    name: q.type || `Quiz ${index + 1}`,
    value: q.obtained
  }));

  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 25, right: 10, left: -25, bottom: 5 }}>
          <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 'auto']} />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
            {data.map((entry, i) => (
              <Cell key={i} fill={i === excluded ? "#2c3e50" : "#8ab4d0"} />
            ))}
            {/* إظهار الرقم فوق العمود */}
            <LabelList dataKey="value" position="top" style={{ fontSize: '12px', fill: '#1a3a5a', fontWeight: 'bold' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
