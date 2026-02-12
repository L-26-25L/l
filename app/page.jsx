"use client";

import { useState, useCallback, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import CourseTable from "../components/CourseTable";
import { coursesData as initialData } from "../data/courses";

// استيراد المكونات
import GoalCard from "../components/GoalCard";
import QuizGauge from "../components/QuizGauge";
import BestQuizzesChart from "../components/BestQuizzesChart";
import CoursePie from "../components/CoursePie";
import DistributionDonut from "../components/DistributionDonut";
import CourseBarChart from "../components/CourseBarChart"; 
import GradeAnalysisChart from "../components/GradeAnalysisChart";

export default function Home() {
  const [allCourses, setAllCourses] = useState(initialData);
  const coursesNames = Object.keys(allCourses);
  
  const [view, setView] = useState("dashboard");
  const [metrics, setMetrics] = useState(null);
  const [dashboardCourse, setDashboardCourse] = useState(coursesNames[0]);
  const [targetGrade, setTargetGrade] = useState(95);

  // دالة إضافة مادة جديدة (ستظهر عند الضغط على الزائد في السايدبار)
  const addNewCourse = () => {
    const name = prompt("Enter New Course Name:");
    if (name && !allCourses[name]) {
      setAllCourses({
        ...allCourses,
        [name]: [
          { type: "Quiz 1", total: 10, obtained: 0 },
          { type: "Midterm", total: 30, obtained: 0 },
          { type: "Final", total: 40, obtained: 0 }
        ]
      });
      setDashboardCourse(name);
      setView("course"); // ينقلك فوراً لتعبئة بيانات المادة الجديدة
    }
  };

  const handleMetricsChange = useCallback((newMetrics) => {
    setMetrics(newMetrics);
  }, []);

  const remainingForTarget = useMemo(() => {
    if (!metrics) return 0;
    return Math.max(0, (metrics.totalPossible * (targetGrade / 100)) - metrics.totalObtained).toFixed(1);
  }, [metrics, targetGrade]);

  return (
    // استخدام خط Garamond والألوان الجديدة في الحاوية الرئيسية
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "#f8fafc", 
      fontFamily: "'EB Garamond', Garamond, serif" 
    }}>
      
      {/* الخطوة 1: تثبيت السايدبار (Sticky Sidebar) */}
      <aside style={{ 
        position: "sticky", 
        top: 0, 
        height: "100vh", 
        zIndex: 100 
      }}>
        <Sidebar 
          courses={coursesNames} 
          onSelectCourse={(name) => { setDashboardCourse(name); setView("course"); }} 
          onDashboard={() => setView("dashboard")}
          onAddCourse={addNewCourse} // نمرر الدالة هنا
          sidebarColor="#30364F" // اللون الجديد للسايدبار
          textColor="#ACBAC4"    // لون النصوص الجديد
        />
      </aside>

      <main style={{ flex: 1, padding: "25px", overflowY: "auto" }}>
        
        {/* المحرك المخفي */}
        <div style={{ display: "none" }}>
          <CourseTable 
            key={`calc-${dashboardCourse}`} 
            data={allCourses[dashboardCourse]} 
            onMetricsChange={handleMetricsChange} 
          />
        </div>

        {view === "dashboard" && metrics && (
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              {/* تعديل لون العنوان My Grade */}
              <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#30364F" }}>
                My Grade Dashboard
              </h1>
              
              <select 
                value={dashboardCourse} 
                onChange={(e) => setDashboardCourse(e.target.value)}
                style={selectStyle}
              >
                {coursesNames.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* الصف العلوي */}
              <div style={{ display: "grid", gridTemplateColumns: "220px 1.3fr 1fr 1.1fr", gap: "25px" }}>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ ...smallCardStyle, position: "relative" }}>
                    {/* زر اختيار الدرجة المتبقية ^ */}
                    <select 
                      value={targetGrade}
                      onChange={(e) => setTargetGrade(Number(e.target.value))}
                      style={targetSelectStyle}
                    >
                      <option value="95">A+</option>
                      <option value="90">A</option>
                      <option value="85">B+</option>
                      <option value="82">B</option>
                      <option value="77">C+</option>
                      <option value="72">C</option>
                    </select>
                    <GoalCard remaining={remainingForTarget} targetLabel={targetGrade} />
                  </div>
                  
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
                  <DistributionDonut rows={allCourses[dashboardCourse]} />
                </div>
              </div>

              {/* الصف السفلي */}
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "25px" }}>
                <div style={smallCardStyle}>
                   <p style={labelStyle}>Grade Analysis (Obtained vs Total)</p>
                   <GradeAnalysisChart data={allCourses[dashboardCourse]} />
                </div>
                <div style={smallCardStyle}>
                  <p style={labelStyle}>Student Level In Courses</p>
                  <CourseBarChart allCourses={allCourses} />
                </div>
              </div>

            </div>
          </div>
        )}

        {view === "course" && (
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "20px", color: "#30364F", fontSize: "22px" }}>{dashboardCourse} Details</h2>
            <div style={{ background: "#fff", padding: '20px', borderRadius: '15px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
               <CourseTable 
                 key={dashboardCourse} 
                 data={allCourses[dashboardCourse]} 
                 onMetricsChange={() => {}} 
               />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// الستايلات المضافة
const selectStyle = { 
  padding: "8px 15px", 
  borderRadius: "10px", 
  border: "1px solid #ACBAC4", 
  color: "#30364F", 
  fontSize: "14px",
  outline: "none",
  background: "#fff"
};

const targetSelectStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "#f1f5f9",
  borderRadius: "5px",
  fontSize: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  color: "#30364F"
};

const smallCardStyle = { 
  background: "#ffffff", 
  borderRadius: "15px", 
  padding: "18px", 
  boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const labelStyle = { 
  fontSize: "13px", 
  color: "#ACBAC4", 
  marginBottom: "15px", 
  fontWeight: "600",
  textTransform: "uppercase" 
};
