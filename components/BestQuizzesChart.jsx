import { BarChart, Bar, XAxis, Tooltip, Cell, ResponsiveContainer, LabelList } from "recharts";

export default function BestQuizzesChart({ quizzes, excluded }) {
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={quizzes} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {quizzes.map((q, i) => (
              <Cell key={i} fill={i === excluded ? "#2c3e50" : "#8ab4d0"} />
            ))}
            {/* هذا السطر هو المسؤول عن إظهار الرقم فوق كل عمود */}
            <LabelList dataKey="value" position="top" style={{ fontSize: '12px', fill: '#64748b' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
