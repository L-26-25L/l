import { useState, useEffect } from "react";

export default function CourseTable({ data, onMetricsChange }) {
  const [rows, setRows] = useState(data);
  const [excludeQuiz, setExcludeQuiz] = useState(true);

  // تحديث الصفوف عند تغيير المقرر
  useEffect(() => {
    setRows(data);
  }, [data]);

  const quizzes = rows.filter((row) =>
    row.type.toLowerCase().includes("quiz")
  );

  const lowestQuiz =
    excludeQuiz && quizzes.length > 0
      ? quizzes.reduce((min, q) =>
          q.obtained < min.obtained ? q : min
        )
      : null;

  const effectiveRows = rows.filter(
    (row) => row !== lowestQuiz
  );

  const totalPossible = effectiveRows.reduce(
    (sum, r) => sum + r.total,
    0
  );

  const totalObtained = effectiveRows.reduce(
    (sum, r) => sum + r.obtained,
    0
  );

  const percentage =
    totalPossible > 0
      ? ((totalObtained / totalPossible) * 100).toFixed(2)
      : 0;

  const remainingForAPlus = Math.max(
    0,
    totalPossible * 0.95 - totalObtained
  ).toFixed(2);

  const remainingForA = Math.max(
    0,
    totalPossible * 0.9 - totalObtained
  ).toFixed(2);
  
const bestQuizzesTotal = effectiveRows
  .filter(r => r.type.toLowerCase().includes("quiz"))
  .reduce((sum, r) => sum + r.obtained, 0);
  
  // إرسال المقاييس للداشبورد
  useEffect(() => {
    onMetricsChange?.({
      totalObtained,
      totalPossible,
      percentage,
      remainingForAPlus,
      remainingForA, 
      bestQuizzesTotal
    });
  }, [
    totalObtained,
    totalPossible,
    percentage,
    remainingForAPlus,
    remainingForA,
    onMetricsChange
  ]);

  const handleGradeChange = (index, value) => {
    const updated = [...rows];
    updated[index].obtained = Number(value);
    setRows(updated);
  };

  return (
    <>
      {quizzes.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <button
            onClick={() => setExcludeQuiz(!excludeQuiz)}
            style={{
              padding: "6px 12px",
              background: excludeQuiz ? "#734073" : "#aaa",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            {excludeQuiz
              ? "❌ Exclude Lowest Quiz"
              : "✔️ Count All Quizzes"}
          </button>
        </div>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden"
        }}
      >
        <thead style={{ background: "#e6e6ef" }}>
          <tr>
            <th style={th}>Assessment Type</th>
            <th style={th}>Total Grade</th>
            <th style={th}>Grade Obtained</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => {
            const isExcluded = lowestQuiz && row === lowestQuiz;

            return (
              <tr
                key={index}
                style={{
                  background: isExcluded ? "#f0f0f0" : "transparent",
                  opacity: isExcluded ? 0.5 : 1
                }}
              >
                <td style={td}>{row.type}</td>
                <td style={td}>{row.total}</td>
                <td style={td}>
                  <input
                    type="number"
                    value={row.obtained}
                    onChange={(e) =>
                      handleGradeChange(index, e.target.value)
                    }
                    style={{ width: 80, padding: 5 }}
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

/* 🔽 Styles */
const th = { padding: 12, textAlign: "left" };
const td = { padding: 12, borderBottom: "1px solid #ddd" };
