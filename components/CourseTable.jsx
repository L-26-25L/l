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

const th = { padding: 12, textAlign: "left" };
const td = { padding: 12, borderBottom: "1px solid #ddd" };
