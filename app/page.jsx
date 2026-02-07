"use client";

import { useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import CourseTable from "../components/CourseTable";
import { coursesData } from "../data/courses";

// استيراد المكونات (Dashboard)
import GoalCard from "../components/GoalCard";
import QuizGauge from "../components/QuizGauge";
import BestQuizzesChart from "../components/BestQuizzesChart";
import CoursePie from "../components/CoursePie";
import DistributionDonut from "../components/DistributionDonut";
import CourseBarChart from "../components/CourseBarChart"; 
import GradeAnalysisChart from "../components/GradeAnalysisChart";

export default function Home() {
  const courses = Object.keys(coursesData);
  const [view, setView] = useState("dashboard"); // لتحديد هل نحن في الداشبورد أو في جدول مادة
  const [metrics, setMetrics] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]); // المادة المختارة للجدول
  const [dashboardCourse, setDashboardCourse] = useState(courses[0]); // المادة المختارة للداشبورد (التصفية)

  const handleMetricsChange = useCallback((newMetrics) => {
    setMetrics(newMetrics);
  }, []);

  // دالة تُستدعى عند الضغط على أي مادة في الـ Sidebar
  const handleSidebarClick = (courseName) => {
    setSelectedCourse(courseName); // نحدد المادة التي ضغطتِ عليها
    setView("course"); // ننتقل فوراً لعرض الجدول
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      {/* تمرير الدالة للـ Sidebar */}
      <Sidebar 
        courses={courses} 
        onSelectCourse={handleSidebarClick} 
        onDashboard={() => setView("dashboard")} 
      />

      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        
        {/* --- حالة الداشبورد (My Grade Dashboard) --- */}
        {view === "dashboard" && (
          <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>My Grade Dashboard</h1>
              {/* زر التصفية واختيار المادة داخل الداشبورد */}
              <select 
                value={dashboardCourse} 
                onChange={(e) => setDashboardCourse(e.target.value)}
                style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              >
                {courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* حسابات مخفية للداشبورد فقط */}
            <div style={{ display: "none" }}>
              <CourseTable 
                key={`dash-${dashboardCourse}`} 
                data={coursesData[dashboardCourse]} 
                onMetricsChange={handleMetricsChange} 
              />
            </div>

            {metrics && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* الرسوم البيانية الأربعة العلوية */}
                <div style={{ display: "grid", gridTemplateColumns: "160px 1.2fr 1fr 1.2fr", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={cardStyle}><GoalCard remaining={metrics.remainingForAPlus} /></div>
                    <div style={cardStyle}>
                      <p style={labelStyle}>Total best quizzes</p>
                      <QuizGauge value={metrics.bestQuizTotal} max={metrics.quizPossibleTotal} />
                    </div>
                  </div>
                  <div style={cardStyle}>
                    <p style={labelStyle}>Best 4 Quizzes</p>
                    <BestQuizzesChart quizzes={metrics.quizList} excluded={metrics.excludedIndex} />
                  </div>
                  <div style={cardStyle}>
                    <p style={labelStyle}>Total course grade</p>
                    <CoursePie obtained={metrics.totalObtained} total={100} />
                  </div>
                  <div style={cardStyle}>
                    <p style={labelStyle}>Distribution of grades</p>
                    <DistributionDonut rows={coursesData[dashboardCourse]} />
                  </div>
                </div>

                {/* الرسوم البيانية السفلية */}
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "12px" }}>
                  <div style={cardStyle}>
                     <p style={labelStyle}>Grade Analysis</p>
                     <GradeAnalysisChart data={coursesData[dashboardCourse].map(i => ({ type: i.type, obtained: i.obtained }))} />
                  </div>
                  <div style={cardStyle}>
                    <p style={labelStyle}>Student level in courses</p>
                    <CourseBarChart data={Object.keys(coursesData).map(name => {
                      const rows = coursesData[name];
                      const totalObtained = rows.reduce((s, r) => s + (Number(r.obtained) || 0), 0);
                      return { name: name, grade: (totalObtained / 100) * 50 };
                    })} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- حالة جدول المقرر المستقل (عند الضغط من الـ Sidebar) --- */}
        {view === "course" && (
          <div>
            <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>{selectedCourse} - Detailed Grades</h2>
            <div style={cardStyle}>
               <CourseTable 
                 key={selectedCourse} // لضمان تحديث الجدول فوراً عند تغيير المادة
                 data={coursesData[selectedCourse]} 
                 onMetricsChange={() => {}} // لا نحتاج تحديث الداشبورد هنا
               />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const cardStyle = { background: "#fff", borderRadius: "12px", padding: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" };
const labelStyle = { fontSize: "12px", color: "#64748b", marginBottom: "10px", fontWeight: "600", textAlign: "center" };
