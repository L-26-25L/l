"use client";

import { useState, useEffect, useMemo } from "react";

export default function CourseTable({ data, onMetricsChange }) {
  const [rows, setRows] = useState(data);
  const [excludeQuiz, setExcludeQuiz] = useState(true);

  useEffect(() => {
    setRows(data);
  }, [data]);

  // استخدام useMemo هنا يحسن الأداء ويمنع الـ Infinite Loop
  const quizzes = rows.filter((r) => r.type.toLowerCase().includes("quiz"));

  const lowestQuiz =
    excludeQuiz && quizzes.length > 0
      ? quizzes.reduce((min, q) => (q.obtained < min.obtained ? q : min))
      : null;

  const effectiveRows = rows.filter((r) => r !== lowestQuiz);

  const totalPossible = effectiveRows.reduce((s, r) => s + r.total, 0);
  const totalObtained = effectiveRows.reduce((s, r) => s + r.obtained, 0);

  const percentage = totalPossible > 0 ? ((totalObtained / totalPossible) * 100).toFixed(1) : 0;
  const remainingForAPlus = Math.max(0, totalPossible * 0.95 - totalObtained).toFixed(1);
  const remainingForA = Math.max(0, totalPossible * 0.9 - totalObtained).toFixed(1);

  const bestQuizTotal = quizzes.reduce((s, q) => s + q.obtained, 0) - (lowestQuiz?.obtained || 0);

  useEffect(() => {
    const excludedIndex = lowestQuiz ? quizzes.findIndex((q) => q === lowestQuiz) : -1;
    
    onMetricsChange?.({
      totalObtained,
      totalPossible,
      percentage,
      remainingForAPlus,
      remainingForA,
      bestQuizTotal,
      quizList: quizzes,
      excludedIndex
    });
  // تقليل التبعيات للقيم الأساسية فقط لمنع التكرار غير الضروري
  }, [totalObtained, totalPossible, excludeQuiz]);

  const handleChange = (i, val) => {
    const copy = [...rows];
    copy[i] = { ...copy[i], obtained: Number(val) };
    setRows(copy);
  };

  return (
    <>
      {quizzes.length > 0 && (
        <button
          onClick={() => setExcludeQuiz(!excludeQuiz)}
          style={btnStyle(excludeQuiz)}
        >
          {excludeQuiz ? "❌ Exclude Lowest Quiz" : "✔️ Count All Quizzes"}
        </button>
      )}

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Assessment Type</th>
            <th style={th}>Total Grade</th>
            <th style={th}>Grade Obtained</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isExcluded = row === lowestQuiz;
            return (
              <tr key={i} style={{ opacity: isExcluded ? 0.4 : 1, background: isExcluded ? "#eee" : "white" }}>
                <td style={td}>{row.type}</td>
                <td style={td}>{row.total}</td>
                <td style={td}>
                  <input
                    type="number"
                    value={row.obtained}
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{ width: 70 }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const btnStyle = (exclude) => ({
  marginBottom: 15,
  padding: 8,
  background: exclude ? "#734073" : "#666",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
});

const table = { width: "100%", background: "#fff", borderCollapse: "collapse" };
const th = { padding: 10, background: "#f0f0f0", textAlign: "left" };
const td = { padding: 10, borderBottom: "1px solid #ddd" };
