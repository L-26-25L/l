import { BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";

export default function BestQuizzesChart({ quizzes, excluded }) {
  return (
    <BarChart width={350} height={240} data={quizzes}>
      <XAxis dataKey="name" />
      <Tooltip />

      <Bar dataKey="value">
        {quizzes.map((q, i) => (
          <Cell
            key={i}
            fill={i === excluded ? "#ddd" : "#734073"}
          />
        ))}
      </Bar>
    </BarChart>
  );
}
