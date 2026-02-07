export default function GoalCard({ remaining }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "5px 10px"
    }}>
      <div style={{ textAlign: "left" }}>
        <h2 style={{ fontSize: 28, margin: 0, color: "#4b6584" }}>{remaining}</h2>
        <p style={{ fontSize: 14, fontWeight: "bold", color: "#2f3542", margin: 0 }}>
          Remaining to...
        </p>
      </div>
      <div style={{ fontSize: 35, color: "#4b0082" }}>🏆</div>
    </div>
  );
}
