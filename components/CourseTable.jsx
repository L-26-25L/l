import { useState } from "react";

export default function CourseTable({ data }) {
  const [rows, setRows] = useState(data);
  const [excludeQuiz, setExcludeQuiz] = useState(true);

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
    totalPossible * 0.90 - totalObtained
  ).toFixed(2);


  

  const handleGradeChange = (index, value) => {
    const updated = [...rows];
    updated[index].obtained = Number(value);
    setRows(updated);
  };

  return (
    <>
      {/* زر التحكم في نظام الكويز */}
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
            {excludeQuiz ? "❌ استبعاد أقل كويز" : "✔️ حساب كل الكويزات"}
          </button>
        </div>
      )}
<div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 20
        }}
      >
        <InfoBox label="Current Score" value={totalObtained} />
        <InfoBox label="Total Possible" value={totalPossible} />
        <InfoBox label="Percentage" value={${percentage}%} />
        <InfoBox label="Remaining for A+" value={remainingForAPlus} />
        <InfoBox label="Remaining for A" value={remainingForA} />
      </div>
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
                    style={{
                      width: 80,
                      padding: 5
                    }}
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
function InfoBox({ label, value }) {
  return (
    <div
      style={{
        background: "#f4f4fa",
        padding: 15,
        borderRadius: 10,
        minWidth: 140
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>
        {value}
      </div>
    </div>
  );
}
const th = { padding: 12, textAlign: "left" };
const td = { padding: 12, borderBottom: "1px solid #ddd" };
