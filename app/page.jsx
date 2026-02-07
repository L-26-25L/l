"use client";

import { useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import CourseTable from "../components/CourseTable";
import { coursesData } from "../data/courses";

// استيراد المكونات
import GoalCard from "../components/GoalCard";
import QuizGauge from "../components/QuizGauge";
import BestQuizzesChart from "../components/BestQuizzesChart";
import CoursePie from "../components/CoursePie";
import DistributionDonut from "../components/DistributionDonut";
import CourseBarChart from "../components/CourseBarChart"; 

export default function Home() {
  const courses = Object.keys(coursesData);
  const [view, setView] = useState("dashboard");
  const [metrics, setMetrics] = useState(null);
  const [dashboardCourse, setDashboardCourse] = useState(courses[0]);

  const handleMetricsChange = useCallback((newMetrics) => {
    setMetrics(newMetrics);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <Sidebar 
        courses={courses} 
        onSelectCourse={() => setView("course")} 
        onDashboard={() => setView("dashboard")} 
      />

      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {view === "dashboard" && (
          <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>My Grade Dashboard</h1>
              <select 
                value={dashboardCourse} 
                onChange={(e) => setDashboardCourse(e.target.value)}
                style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              >
                {courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ display: "none" }}>
              <CourseTable data={coursesData[dashboardCourse]} onMetricsChange={handleMetricsChange} />
            </div>

            {metrics && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* الصف العلوي - المربعات الأربعة */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "160px 1.2fr 1fr 1.2fr", 
                  gap: "12px", 
                  alignItems: "stretch" 
                }}>
                  
                  {/* 1. الهدف والقياس (يسار) */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={cardStyle}><GoalCard remaining={metrics.remainingForAPlus} /></div>
                    <div style={cardStyle}>
                      <p style={labelStyle}>Total best quizzes</p>
                      <QuizGauge value={metrics.bestQuizTotal} max={metrics.quizPossibleTotal || 20} />
                    </div>
                  </div>

                  {/* 2. أعمدة الكويزات */}
                  <div style={cardStyle}>
                    <p style={labelStyle}>Best 4 Quizzes</p>
                    <BestQuizzesChart quizzes={metrics.quizList} excluded={metrics.excludedIndex} />
                  </div>

                  {/* 3. إجمالي الدرجة (Pie) */}
                  <div style={cardStyle}>
                    <p style={labelStyle}>Total course grade</p>
                    <CoursePie obtained={Number(metrics.totalObtained)} total={100} />
                  </div>

                  {/* 4. توزيع الدرجات (Donut) */}
                  <div style={cardStyle}>
                    <p style={labelStyle}>Distribution of grades</p>
                    <DistributionDonut rows={coursesData[dashboardCourse]} />
                  </div>
                </div>

                {/* الصف السفلي - التحليلات والمستويات */}
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "12px" }}>
                  <div style={cardStyle}>
                     <p style={labelStyle}>Grade Analysis</p>
                     <div style={{height: "200px", width: "100%", background: "#f8fafc", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8"}}>
                        {/* سنضع هنا كود الـ Area Chart لاحقاً */}
                        Area Chart Loading...
                     </div>
                  </div>
                 {/* داخل صفحة page.jsx ابحثي عن CourseBarChart واستبدليه بهذا */}
<div style={cardStyle}>
  <p style={labelStyle}>Student level in courses</p>
  <CourseBarChart data={Object.keys(coursesData).map(courseName => {
    const data = coursesData[courseName];
    // حساب إجمالي الدرجات التي حصلتِ عليها في هذه المادة
    const totalObtained = data.reduce((sum, row) => sum + (Number(row.obtained) || 0), 0);
    // حساب إجمالي الدرجات الممكنة للمادة (عادة 100)
    const totalPossible = data.reduce((sum, row) => sum + (Number(row.total) || 0), 0);
    
    // تحويل النسبة لمقياس 50 (كما في تصميم الصورة)
    const gradeScale = totalPossible > 0 ? (totalObtained / totalPossible) * 50 : 0;
    
    return {
      name: courseName,
      grade: parseFloat(gradeScale.toFixed(1))
    };
  })} />
</div>
                </div>

              </div>
            )}
          </div>
        )}

        {view === "course" && (
          <div style={cardStyle}>
             <CourseTable data={coursesData[dashboardCourse]} onMetricsChange={handleMetricsChange} />
          </div>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%"
};

const labelStyle = {
  fontSize: "12px",
  color: "#64748b",
  marginBottom: "10px",
  fontWeight: "600",
  textAlign: "center",
  width: "100%"
};
