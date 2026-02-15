export default function GoalCard({ remaining, targetLabel }) {
  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      {/* شكل ميدالية بسيط باستخدام CSS */}
      <div style={{ 
        width: '50px', 
        height: '50px', 
        background: '#C0C0C0', // فضي
        borderRadius: '50%', 
        margin: '0 auto 10px',
        border: '4px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>★</div>
      </div>
      
      <p style={{ fontSize: '11px', color: '#ACBAC4', margin: 0 }}>Remaining for {targetLabel}%</p>
      <h3 style={{ fontSize: '24px', color: '#30364F', margin: '5px 0' }}>{remaining}</h3>
    </div>
  );
}
