import { BarChart, Bar, XAxis, Tooltip, Cell, ResponsiveContainer, LabelList } from "recharts";

export default function BestQuizzesChart({ quizzes, excluded }) {
  // ألوان التدرج الأزرق
  const colors = ["#8ab4d0", "#76a1c1", "#628eb2", "#4e7ba3"];

  return (
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={quizzes} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Bar dataKey="obtained" radius={[4, 4, 0, 0]}>
            {quizzes.map((q, i) => (
              <Cell 
                key={i} 
                // إذا كان هو الكويز المستبعد لونه غامق جداً، وإلا يأخذ لون من المصفوفة
                fill={i === excluded ? "#2c3e50" : colors[i % colors.length]} 
              />
            ))}
            <LabelList dataKey="obtained" position="top" style={{ fontSize: '12px', fontWeight: 'bold' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
