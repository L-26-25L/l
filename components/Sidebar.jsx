export default function Sidebar({ courses, onSelect }) {
  return (
    <div
      style={{
        width: 220,
        background: "#312936",
        color: "#d6b25e",
        padding: 20,
        height: "100vh"
      }}
    >
      <h2 style={{ marginBottom: 30 }}>My Grade</h2>

      {courses.map((course) => (
        <div
          key={course}
          onClick={() => onSelect(course)}
          style={{
            cursor: "pointer",
            marginBottom: 15
          }}
        >
          {course}
        </div>
      ))}
    </div>
  );
}
