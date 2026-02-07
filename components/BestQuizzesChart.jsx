import { BarChart, Bar, XAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function BestQuizzesChart({ quizzes, excluded }) {
  return (
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={quizzes} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {quizzes.map((q, i) => (
              <Cell
                key={i}
                // أزرق فاتح للبقية، وأزرق غامق جداً للمستبعد كما في صورتك
                fill={i === excluded ? "#2c3e50" : "#8ab4d0"} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
