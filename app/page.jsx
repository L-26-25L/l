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
import GradeAnalysisChart from "../components/GradeAnalysisChart";

export default function Home() {
  const courses = Object.keys(coursesData);
  const [view, setView] = useState("dashboard");
  const [metrics, setMetrics] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [dashboardCourse, setDashboardCourse] = useState(courses[0]);

  // دالة استقبال البيانات من الجدول
  const handleMetricsChange = useCallback((newMetrics) => {
    // قمنا بإزالة الكود العشوائي الذي كان هنا
    setMetrics(newMetrics);
  }, []);

  const handleSidebarClick = (courseName) => {
    setSelectedCourse(courseName);
    setView("course");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: 'sans-serif' }}>
      <Sidebar 
        courses={courses} 
        onSelectCourse={handleSidebarClick} 
        onDashboard={() => setView("dashboard")} 
      />

      <div style={{ flex: 1, padding: "25px", overflowY: "auto" }}>
        
        {/* المحرك المخفي للحسابات - يضمن تحديث الأرقام فوراً */}
        <div style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }}>
          <CourseTable 
            key={`calc-${dashboardCourse}`} 
            data={coursesData[dashboardCourse]} 
            onMetricsChange={handleMetricsChange} 
          />
        </div>

        {view === "dashboard" && (
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              <h1 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>My Grade Dashboard</h1>
              <select 
                value={dashboardCourse} 
                onChange={(e) => setDashboardCourse(e.target.value)}
                style={{ padding: "5px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              >
                {courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {metrics ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                
                {/* الصف العلوي - مسافات واضحة */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "220px 1.3fr 1fr 1.1fr", 
                  gap: "25px", 
                  alignItems: "stretch" 
                }}>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={smallCardStyle}><GoalCard remaining={metrics.remainingForAPlus} /></div>
                    <div style={smallCardStyle}>
                      <p style={labelStyle}>Total best quizzes</p>
                      <QuizGauge value={metrics.bestQuizTotal} max={metrics.quizPossibleTotal} />
                    </div>
                  </div>

                  <div style={smallCardStyle}>
                    <p style={labelStyle}>Best 4 Quizzes</p>
                    <BestQuizzesChart quizzes={metrics.quizList} excluded={metrics.excludedIndex} />
                  </div>

                  <div style={smallCardStyle}>
                    <p style={labelStyle}>Total course grade</p>
                    <CoursePie obtained={metrics.totalObtained} total={metrics.totalPossible} />
                  </div>

                  <div style={smallCardStyle}>
                    <p style={labelStyle}>Distribution of grades</p>
                    <DistributionDonut rows={coursesData[dashboardCourse]} />
                  </div>
                </div>

                {/* الصف السفلي */}
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "25px" }}>
                  <div style={smallCardStyle}>
                     <p style={labelStyle}>Grade Analysis</p>
                     <GradeAnalysisChart data={coursesData[dashboardCourse].map(i => ({ type: i.type, obtained: i.obtained }))} />
                  </div>
                  <div style={smallCardStyle}>
                    <p style={labelStyle}>Student level in courses</p>
                    <CourseBarChart data={Object.keys(coursesData).map(name => {
                      const rows = coursesData[name];
                      const totalObtained = rows.reduce((s, r) => s + (Number(r.obtained) || 0), 0);
                      return { name: name, grade: (totalObtained / 100) * 50 };
                    })} />
                  </div>
                </div>

              </div>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#64748b' }}>
                Loading Dashboard Data...
              </div>
            )}
          </div>
        )}

        {view === "course" && (
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "20px", fontSize: "18px", color: "#1e293b" }}>{selectedCourse} Details</h2>
            <div style={{ background: "#fff", padding: '20px', borderRadius: '12px', boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
               <CourseTable 
                 key={selectedCourse} 
                 data={coursesData[selectedCourse]} 
                 onMetricsChange={() => {}} 
               />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const smallCardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "150px"
};

const labelStyle = {
  fontSize: "11px",
  color: "#64748b",
  marginBottom: "10px",
  fontWeight: "600",
  textTransform: "uppercase",
  textAlign: "center"
};