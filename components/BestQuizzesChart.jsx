
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList
} from "recharts";

export default function BestQuizzesChart({ quizzes = [], excluded }) {

  const colors = ["#8ab4d0", "#76a1c1", "#628eb2", "#4e7ba3"];

  // لو البيانات ما وصلت
  if (!quizzes.length) {
    return (
      <div style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#94a3b8"
      }}>
        No Quiz Data
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <BarChart data={quizzes}>

          {/* ⚠️ أهم سطر — لازم يطابق اسم الحقل في بياناتك */}
          <XAxis dataKey="type" tick={{ fontSize: 10 }} />

          <Tooltip />

          <Bar dataKey="obtained" radius={[5,5,0,0]}>
            {quizzes.map((_, i) => (
              <Cell
                key={i}
                fill={i === excluded ? "#cbd5e1" : colors[i % colors.length]}
              />
            ))}

            <LabelList dataKey="obtained" position="top" />
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </d
