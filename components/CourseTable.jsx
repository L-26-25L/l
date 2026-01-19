export default function CourseTable({ data }) {
  // نطلع الكويزات فقط
  const quizzes = data.filter((row) =>
    row.type.toLowerCase().includes("quiz")
  );

  // أقل درجة كويز
  const lowestQuiz =
    quizzes.length > 0
      ? quizzes.reduce((min, q) =>
          q.obtained < min.obtained ? q : min
        )
      : null;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 20,
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden"
      }}
    >
      <thead style={{ background: "#e6e6ef" }}>
        <tr>
          <th style={thStyle}>Assessment Type</th>
          <th style={thStyle}>Total Grade</th>
          <th style={thStyle}>Grade Obtained</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => {
          const isExcluded =
            lowestQuiz && row === lowestQuiz;

          return (
            <tr
              key={index}
              style={{
                background: isExcluded ? "#f0f0f0" : "transparent",
                opacity: isExcluded ? 0.5 : 1
              }}
            >
              <td style={tdStyle}>{row.type}</td>
              <td style={tdStyle}>{row.total}</td>
              <td style={tdStyle}>{row.obtained}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const thStyle = {
  padding: 12,
  textAlign: "left"
};

const tdStyle = {
  padding: 12,
  borderBottom: "1px solid #ddd"
};
