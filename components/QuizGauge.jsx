import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function QuizGauge({ value, max }) {
  // الحساب يعتمد على البيانات القادمة من الجدول مباشرة
  const data = [
    { value: Number(value) }, // درجاتي التي حصلت عليها
    { value: Math.max(0, Number(max) - Number(value)) }, // المتبقي للوصول للدرجة الكاملة
  ];
  
  const COLORS = ["#1a3a5a", "#f1f2f6"]; // اللون الغامق لدرجتك، والفاتح للمتبقي

  return (
    <div style={{ width: "100%", height: 140, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%" 
            startAngle={180} // بداية نصف الدائرة من اليسار
            endAngle={0}     // نهاية نصف الدائرة في اليمين
            innerRadius="70%"
            outerRadius="100%"
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* إظهار الأرقام الحقيقية في المنتصف كما في الصورة بالضبط */}
      <div style={{ 
        position: "absolute", bottom: "15%", left: "50%", 
        transform: "translateX(-50%)", textAlign: "center" 
      }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1a3a5a" }}>
          {value}
        </div>
        <div style={{ fontSize: "10px", color: "#94a3b8" }}>
          0 / {max} {/* هنا يظهر إجمالي درجات أعمال الترم (الكويزات) تلقائياً */}
        </div>
      </div>
    </div>
  );
}
