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
    .filter((r) => r.type.toLowerCase().includes("quiz"))
    .map((q) => ({
      name: q.type,
      grade: q.obtained
    }));

  return (
    <div style={{ width: 300, height: 220 }}>
      <h4 style={{ marginBottom: 10 }}>Best Quizzes</h4>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={quizData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="grade" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}