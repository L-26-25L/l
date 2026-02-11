"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function CoursePie({ obtained, total }) {
  // نجهز البيانات مع التأكد أنها أرقام
  const valObtained = Number(obtained) || 0;
  const valTotal = Number(total) || 100;
  
  const data = [
    { name: "Obtained", value: valObtained },
    { name: "Remaining", value: Math.max(0, valTotal - valObtained) }
  ];

  return (
    // أضفنا عرض ثابت بسيط للحاوية الخارجية لضمان استقرار الرسم
    <div style={{ width: "100%", height: 150, position: "relative", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            // استبدلنا النسب بـ أرقام بكسلية (Radius) لضمان الظهور
            innerRadius={45} 
            outerRadius={60} 
            startAngle={90} 
            endAngle={450}
            stroke="none"
            paddingAngle={0}
          >
            {/* اللون الكحلي للدرجة الحاصلة عليها */}
            <Cell fill="#1a3a5a" /> 
            {/* لون رمادي فاتح للمتبقي */}
            <Cell fill="#f1f5f9" /> 
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* الرقم في المنتصف - قمنا بتصغير الخط قليلاً ليتناسب مع المقاسات الجديدة */}
      <div style={{ 
        position: "absolute", 
        textAlign: "center",
        pointerEvents: "none",
        marginTop: "-5px" // تعديل بسيط لرفع النص للمركز تماماً
      }}>
        <div style={{ fontSize: "20px", fontWeight: "800", color: "#1a3a5a", lineHeight: 1 }}>
          {valObtained}
        </div>
        <div style={{ fontSize: "9px", color: "#94a3b8", marginTop: "2px", fontWeight: "600" }}>
          OUT OF {valTotal}
        </div>
      </div>
    </div>
  );
}
