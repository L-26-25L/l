"use client";

import { useState, useEffect, useMemo } from "react";

export default function CourseTable({ data, onMetricsChange }) {
  const [rows, setRows] = useState(data);
  const [excludeQuiz, setExcludeQuiz] = useState(true);

  // تحديث الصفوف عند تغيير المقرر من الخارج (Sidebar)
  useEffect(() => {
    setRows(data);
  }, [data]);

  // منطق الحسابات
  const quizzes = useMemo(() => 
    rows.filter((r) => 
      r && r.type && typeof r.type === 'string' && r.type.toLowerCase().includes("quiz")
    ), [rows]
  );

  const lowestQuiz = useMemo(() => {
    return excludeQuiz && quizzes.length > 0
      ? quizzes.reduce((min, q) => (q.obtained < min.obtained ? q : min))
      : null;
  }, [excludeQuiz, quizzes]);

  const effectiveRows = useMemo(() => rows.filter((r) => r !== lowestQuiz), [rows, lowestQuiz]);

  const totalPossible = effectiveRows.reduce((s, r) => s + r.total, 0);
  const totalObtained = effectiveRows.reduce((s, r) => s + r.obtained, 0);

  const percentage = totalPossible > 0 ? ((totalObtained / totalPossible) * 100).toFixed(1) : 0;
  const remainingForAPlus = Math.max(0, totalPossible * 0.95 - totalObtained).toFixed(1);
  const remainingForA = Math.max(0, totalPossible * 0.9 - totalObtained).toFixed(1);
  const bestQuizTotal = quizzes.reduce((s, q) => s + q.obtained, 0) - (lowestQuiz?.obtained || 0);

  // إرسال البيانات المحدثة للداشبورد (الـ Page)
  useEffect(() => {
    const excludedIndex = lowestQuiz ? quizzes.findIndex((q) => q === lowestQuiz) : -1;
    const quizPossibleTotal = quizzes.reduce((s, q) => s + q.total, 0) - (lowestQuiz?.total || 0);

    const timer = setTimeout(() => {
      onMetricsChange?.({
        totalObtained,
        totalPossible,
        percentage,
        remainingForAPlus,
        remainingForA,
        bestQuizTotal,
        quizPossibleTotal,
        quizList: quizzes.map(q => ({
          name: q.type,
          obtained: q.obtained
        })),
        excludedIndex
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [totalObtained, totalPossible, excludeQuiz, onMetricsChange, quizzes, lowestQuiz, percentage, remainingForAPlus, remainingForA, bestQuizTotal]);
const handleChange = (i, val) => {
  // 1. إنشاء نسخة من الصفوف الحالية لتعديلها
  const copy = [...rows];

  // 2. السماح بترك الخانة فارغة أو كتابة نقطة مؤقتاً (للسماح بكتابة 9.5 مثلاً)
  if (val === "" || val === ".") {
    copy[i] = { ...copy[i], obtained: val };
    setRows(copy);
    // نرسل البيانات حتى وهي فارغة ليتم تصفير الرسوم مؤقتاً
    onMetricsChange?.(copy); 
    return;
  }

  // 3. تحديث القيمة في النسخة
  copy[i] = { ...copy[i], obtained: val };
  
  // 4. حفظ النسخة الجديدة في الـ State الخاصة بالجدول
  setRows(copy);

  // 5. التحديث الفوري: إرسال النسخة الجديدة للمكون الأب (Page.jsx)
  // هذا السطر هو الذي يجعل الدائرة والمنحنى يتحركون فوراً
  onMetricsChange?.(copy); 
};

  const numVal = parseFloat(val);
  const copy = [...rows];
  // نحدث القيمة كـ string في الإدخال لسهولة الكتابة، لكن الحسابات ستأخذها كرقم
  copy[i] = { ...copy[i], obtained: val }; 
  setRows(copy);

  // تحديث البيانات فوراً في الـ Parent (الصفحة الرئيسية)
  // هذا سيضمن أن Pie Chart وباقي الأشكال تتحرك فور كتابة الرقم
  onMetricsChange?.(calculateMetrics(copy)); 
};

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <h3 style={{ fontSize: '14px', color: '#1e293b', margin: 0 }}>Assessment Breakdown</h3>
        {quizzes.length > 0 && (
          <button
            onClick={() => setExcludeQuiz(!excludeQuiz)}
            style={{
              padding: "6px 12px", 
              background: excludeQuiz ? "#fef2f2" : "#f0fdf4",
              color: excludeQuiz ? "#991b1b" : "#166534", 
              border: `1px solid ${excludeQuiz ? "#fecaca" : "#bbf7d0"}`,
              borderRadius: 6, 
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: "600",
              transition: "all 0.2s"
            }}
          >
            {excludeQuiz ? "❌ Lowest Quiz Excluded" : "✔️ Counting All Quizzes"}
          </button>
        )}
      </div>

      <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={thStyle}>Assessment Type</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Obtained</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isExcluded = row === lowestQuiz;
              return (
                <tr key={i} style={{ 
                  background: isExcluded ? "#fff1f2" : "white",
                  transition: "background 0.3s"
                }}>
                  <td style={{ ...tdStyle, color: isExcluded ? "#94a3b8" : "#1e293b", fontWeight: isExcluded ? "400" : "500" }}>
                    {row.type} {isExcluded && <span style={{fontSize: '9px', color: '#ef4444'}}>(Excluded)</span>}
                  </td>
                  <td style={tdStyle}>{row.total}</td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      value={row.obtained}
                      onChange={(e) => handleChange(i, e.target.value)}
                      style={{ 
                        width: 60, 
                        padding: "4px 8px", 
                        borderRadius: 4, 
                        border: "1px solid #cbd5e1",
                        fontSize: "13px",
                        textAlign: "center",
                        background: isExcluded ? "#f8fafc" : "white"
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = { 
  padding: "10px 12px", 
  textAlign: "left", 
  borderBottom: "1px solid #e2e8f0", 
  fontSize: "12px", 
  color: "#64748b",
  fontWeight: "600"
};

const tdStyle = { 
  padding: "10px 12px", 
  borderBottom: "1px solid #f1f5f9", 
  fontSize: "13px" 
};
