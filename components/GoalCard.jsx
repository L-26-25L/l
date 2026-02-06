export default function GoalCard({ remaining }) {
  return (
    <div style={{
      background:"#734073",
      color:"#fff",
      borderRadius:14,
      padding:20,
      width:160,
      height:120,
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between"
    }}>
      <div style={{fontSize:14,opacity:.8}}>Goal to A+</div>
      <div style={{fontSize:26,fontWeight:"bold"}}>{remaining}</div>
      <div style={{fontSize:22}}>🏆</div>
    </div>
  );
}
