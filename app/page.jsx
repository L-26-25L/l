"use client";

import { useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import CourseTable from "../components/CourseTable"; // تأكد من المسار الصحيح
import { coursesData } from "../data/courses";

// استيراد المكونات المعدلة
import GoalCard from "../components/GoalCard";
import QuizGauge from "../components/QuizGauge";
import BestQuizzesChart from "../components/BestQuizzesChart";
import CoursePie from "../components/CoursePie";
import DistributionDonut from "../components/DistributionDonut";

export default function Home() {
  const courses = Object.keys(coursesData);
  const [view, setView] = useState("dashboard");
  const [metrics, setMetrics] = useState(null);
  const [dashboardCourse, setDashboardCourse] = useState(courses[0]);

  const handleMetricsChange = useCallback((newMetrics) => {
    setMetrics(newMetrics);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar 
        courses={courses} 
        onSelectCourse={() => setView("course")} 
        onDashboard={() => setView("dashboard")} 
      />

      <div style={{ flex: 1, padding: "30px", overflow: "hidden" }}>
        {view === "dashboard" && (
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
              <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b" }}>My Grade Dashboard</h1>
              <select 
                value={dashboardCourse} 
                onChange={(e) => setDashboardCourse(e.target.value)}
                style={{ padding: "8px 15px", borderRadius: "8px", border: "1px solid #e2e8f0", outline: "none" }}
              >
                {courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* الحسابات المخفية */}
            <div style={{ display: "none" }}>
              <CourseTable data={coursesData[dashboardCourse]} onMetricsChange={handleMetricsChange} />
            </div>

            {metrics && (
              /* --- الهيكل الأساسي للصف العلوي (GRID) --- */
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "200px 1.4fr 1fr 1.4fr", 
                gap: "20px", 
                alignItems: "stretch" 
              }}>
                
                {/* 1. العمود الأيسر: Goal + Gauge فوق بعض */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={cardStyle}><GoalCard remaining={metrics.remainingForAPlus} /></div>
                // داخل صفحة page.jsx
<div style={{ 
  display: "grid", 
  gridTemplateColumns: "160px 1.2fr 1fr 1.2fr", // صغرنا العمود الأول لـ 160px
  gap: "10px", // قللنا المسافة بين المربعات
  alignItems: "stretch" 
}}>
  {/* المكونات كما هي */}
</div>
</div>
                </div>

                {/* 2. عمود الأعمدة (Best Quizzes) */}
                <div style={cardStyle}>
                  <p style={labelStyle}>Best Quizzes</p>
                  <BestQuizzesChart quizzes={metrics.quizList} excluded={metrics.excludedIndex} />
                </div>

                {/* 3. عمود الـ Pie (Total Grade) */}
                <div style={cardStyle}>
                  <p style={labelStyle}>Total course grade for semester</p>
                  <CoursePie obtained={Number(metrics.totalObtained)} total={100} />
                </div>

                {/* 4. عمود الدونات (Distribution) */}
                <div style={cardStyle}>
                  <p style={labelStyle}>Distribution of course grades</p>
                  <DistributionDonut rows={coursesData[dashboardCourse]} />
                </div>

              </div>
            )}
          </div>
        )}

        {view === "course" && (
          <div style={cardStyle}>
             {/* هنا يوضع جدول التفاصيل عند الضغط على المادة من السايدبار */}
             <CourseTable data={coursesData[dashboardCourse]} onMetricsChange={handleMetricsChange} />
          </div>
        )}
      </div>
    </div>
  );
}

// تحديث ستايل الكروت
const cardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "12px", // قللنا الحشو الداخلي
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "160px" // حددنا حد أدنى للارتفاع لتوحيد الأشكال
};

const labelStyle = {
  fontSize: "13px",
  color: "#64748b",
  marginBottom: "15px",
  fontWeight: "600",
  textAlign: "center",
  width: "100%"
};
