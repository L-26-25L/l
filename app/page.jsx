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

  1}
const handleMetricsChange = useCallback((newMetrics) => {
  console.log("METRICS 👉", newMetrics);
  console.log("QUIZ LIST 👉", newMetrics.quizList);

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
        
        {/* هـذا الجزء هو المحرك الذي يحسب البيانات - وضعناه بشكل مخفي تقنياً لكنه يعمل */}
        <div style={{ position: "absolute", opacity: 0, pointerEvents: "none", zIndex: -1 }}>
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

            {/* إذا كانت البيانات جاهزة، اعرض الرسوم */}
            {metrics ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* الصف العلوي */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "220px 1.3fr 1fr 1fr", 
                  gap: "20px", 
                  alignItems: "stretch" 
                }}>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={smallCardStyle}><GoalCard remaining={metrics.remainingForAPlus} /></div>
                    <div style={smallCardStyle}>
                      <p style={labelStyle}>Total best quizzes</p>
                      <div style={{width: '100%', height: '80px'}}><QuizGauge value={metrics.bestQuizTotal} max={metrics.quizPossibleTotal} /></div>
                    </div>
                  </div>

                  <div style={smallCardStyle}>
                    <p style={labelStyle}>Best 4 Quizzes</p>
                    <div style={{width: '100%', height: '140px'}}><BestQuizzesChart quizzes={metrics.quizList} excluded={metrics.excludedIndex} /></div>
                  </div>

                  <div style={smallCardStyle}>
                    <p style={labelStyle}>Total course grade</p>
                    <div style={{width: '100%', height: '140px'}}>
<CoursePie obtained={metrics.totalObtained} total={metrics.totalPossible} /></div>
                  </div>

                  <div style={smallCardStyle}>
                    <p style={labelStyle}>Distribution of grades</p>
                    <div style={{width: '100%', height: '140px'}}><DistributionDonut rows={coursesData[dashboardCourse]} /></div>
                  </div>
                </div>

                {/* الصف السفلي */}
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px" }}>
                  <div style={smallCardStyle}>
                     <p style={labelStyle}>Grade Analysis</p>
                     <div style={{width: '100%', height: '180px'}}>
                        <GradeAnalysisChart data={coursesData[dashboardCourse].map(i => ({ type: i.type, obtained: i.obtained }))} />
                     </div>
                  </div>
                  <div style={smallCardStyle}>
                    <p style={labelStyle}>Student level in courses</p>
                    <div style={{width: '100%', height: '180px'}}>
                        <CourseBarChart data={Object.keys(coursesData).map(name => {
                          const rows = coursesData[name];
                          const totalObtained = rows.reduce((s, r) => s + (Number(r.obtained) || 0), 0);
                          return { name: name, grade: (totalObtained / 100) * 50 };
                        })} />
                    </div>
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
            <div style={{ ...smallCardStyle, padding: '20px', alignItems: 'flex-start' }}>
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

// الستاييل الخاص بالكروت
const smallCardStyle = {
  background: "#ffffff",
  borderRadius: "10px",
  padding: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "140px",
  overflow: "hidden"
};

const labelStyle = {
  fontSize: "11px",
  color: "#64748b",
  marginBottom: "8px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  textAlign: "center"
};
