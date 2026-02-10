import { BarChart, Bar, XAxis, Tooltip, Cell, ResponsiveContainer, LabelList } from "recharts";

export default function BestQuizzesChart({ quizzes, excluded }) {
  // ألوان التدرج الأزرق
  const colors = ["#8ab4d0", "#76a1c1", "#628eb2", "#4e7ba3"];

  // 1. أضف هذا التحقق لمنع الخطأ في حال كانت البيانات لم تصل بعد
  if (!quizzes || quizzes.length === 0) {
    return <div style={{ fontSize: '12px', color: '#94a3b8' }}>No Quiz Data</div>;
  }

  return (
    /* 2. جعلنا الارتفاع 100% ليأخذ المساحة التي حددتها له في صفحة الـ Page وهي الـ 140px */
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={quizzes} 
          margin={{ top: 25, right: 10, left: 10, bottom: 5 }}
        >
          {/* تأكد أن dataKey يطابق المسمى الموجود في ملف البيانات courses.js */}
          <XAxis 
            dataKey="name" 
            tick={{fontSize: 10}} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
          
          <Bar dataKey="obtained" radius={[4, 4, 0, 0]}>
            {quizzes.map((q, i) => (
              <Cell 
                key={`cell-${i}`} 
                fill={i === excluded ? "#2c3e50" : colors[i % colors.length]} 
              />
            ))}
            <LabelList 
              dataKey="obtained" 
              position="top" 
              style={{ fontSize: '11px', fontWeight: 'bold', fill: '#475569' }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
