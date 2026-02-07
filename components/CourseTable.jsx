"use client";

import { useState, useEffect, useMemo } from "react";

export default function CourseTable({ data, onMetricsChange }) {
  const [rows, setRows] = useState(data);
  const [excludeQuiz, setExcludeQuiz] = useState(true);

  // تحديث الصفوف عند تغيير المقرر من الخارج
  useEffect(() => {
    setRows(data);
  }, [data]);

  // الحسابات المنطقية
 const quizzes = rows.filter((r) => 
  r.type && typeof r.type === 'string' && r.type.toLowerCase().includes("quiz")
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

// --- بداية التعديل (الخطوة رقم 3) ---
useEffect(() => {
  // 1. تحديد أي كويز هو المستبعد
  const excludedIndex = lowestQuiz ? quizzes.findIndex((q) => q === lowestQuiz) : -1;
  
  // 2. حساب إجمالي الدرجات المتاحة للكويزات (القيمة القصوى للـ Gauge)
  const quizPossibleTotal = quizzes.reduce((s, q) => s + q.total, 0) - (lowestQuiz?.total || 0);

  // 3. إرسال كل البيانات للوحة التحكم (Dashboard)
  const timer = setTimeout(() => {
    onMetricsChange?.({
      totalObtained,        // إجمالي درجاتك في المادة (للدائرة المكتملة)
      totalPossible,       // إجمالي الدرجات الممكنة (100)
      percentage,          // النسبة المئوية
      remainingForAPlus,   // المتبقي للـ A+ (للكرت العلوي)
      remainingForA,
      bestQuizTotal,       // درجتك الحالية في الكويزات (لـ رقم الـ Gauge)
      quizPossibleTotal,   // إجمالي الكويزات (لـ حد الـ Gauge الأقصى)
      quizList: quizzes,   // قائمة الكويزات (للأعمدة)
      excludedIndex        // مكان العمود الغامق
    });
  }, 50);

  return () => clearTimeout(timer);
}, [totalObtained, totalPossible, excludeQuiz, onMetricsChange, quizzes, lowestQuiz]);
// --- نهاية التعديل ---

  const handleChange = (i, val) => {
    const copy = [...rows];
    copy[i] = { ...copy[i], obtained: Number(val) };
    setRows(copy);
  };

  return (
    <>
      {quizzes.length > 0 && (
        <button
          onClick={() => setExcludeQuiz(!excludeQuiz)}
          style={{
            marginBottom: 15, padding: "8px 16px", background: "#734073",
            color: "#fff", border: "none", borderRadius: 6, cursor: "pointer"
          }}
        >
          {excludeQuiz ? "❌ Exclude Lowest Quiz" : "✔️ Count All Quizzes"}
        </button>
      )}

      <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse", borderRadius: 8, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={th}>Assessment Type</th>
            <th style={th}>Total Grade</th>
            <th style={th}>Grade Obtained</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isExcluded = row === lowestQuiz;
            return (
              <tr key={i} style={{ opacity: isExcluded ? 0.4 : 1, background: isExcluded ? "#eee" : "white" }}>
                <td style={td}>{row.type}</td>
                <td style={td}>{row.total}</td>
                <td style={td}>
                  <input
                    type="number"
                    value={row.obtained}
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{ width: 70, padding: 4 }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const th = { padding: 12, textAlign: "left", borderBottom: "2px solid #ddd" };
const td = { padding: 12, borderBottom: "1px solid #ddd" };
