export default function GoalCard({ remaining }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div>
        <h2 style={{ fontSize: "32px", margin: 0, color: "#1a3a5a" }}>{remaining}</h2>
        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#64748b", margin: 0 }}>
          Remaining to <span style={{ color: "#4b0082" }}>A+</span>
        </p>
      </div>
      <div style={{ fontSize: "40px" }}>🏆</div>
    </div>
  );
}
