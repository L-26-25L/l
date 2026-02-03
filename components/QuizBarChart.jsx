"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function QuizBarChart({ rows }) {
  if (!rows) return null;

  const quizData = rows
    .filter(r => r.type.toLowerCase().includes("quiz"))
    .map(r => ({
      name: r.type,
      obtained: r.obtained,
      total: r.total
    }));

  if (quizData.length === 0) return null;

  return (
    <div style={{ width: "100%", height: 320 }}>
      <h3 style={{ marginBottom: 10 }}>Quiz Performance</h3>

      <ResponsiveContainer>
        <BarChart data={quizData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="obtained" />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
