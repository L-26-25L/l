export default function Sidebar({ courses, onSelectCourse, onDashboard }) {
  return (
    <div
      style={{
        width: 220,
        background: "#30364F",
        color: "#ACBAC4",
        padding: 20,
        height: "100vh"
      }}
    >
      <h2
        style={{ marginBottom: 30, cursor: "pointer" }}
        onClick={onDashboard}
      >
        My Grade
      </h2>

      {courses.map((course) => (
        <div
          key={course}
          onClick={() => onSelectCourse(course)}
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
