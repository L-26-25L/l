"use client";

import { useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import CourseTable from "../components/CourseTable";
import { coursesData } from "../data/courses";

import GoalCard from "../components/GoalCard";
import QuizGauge from "../components/QuizGauge";
import BestQuizzesChart from "../components/BestQuizzesChart";
import CoursePie from "../components/CoursePie";
import DistributionDonut from "../components/DistributionDonut";

export default function Home() {
  const courses = ["Economy", "Math", "Administration", "Technology", "Islamic", "Arabica"];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState("dashboard");
  const [metrics, setMetrics] = useState(null);
  const [dashboardCourse, setDashboardCourse] = useState(courses[0]);

  // استخدام useCallback لمنع الـ Infinite Loop
  const handleMetricsChange = useCallback((newMetrics) => {
    setMetrics(newMetrics);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#EAEFEF" }}>
      <Sidebar
        courses={courses}
        onSelectCourse={(course) => {
          setSelectedCourse(course);
          setView("course");
        }}
        onDashboard={() => {
          setView("dashboard");
          setSelectedCourse(null);
        }}
      />

      <div style={{ padding: 40, flex: 1 }}>
        {view === "dashboard" && (
          <>
            <h1>My Grade Dashboard</h1>
            <select
              value={dashboardCourse}
              onChange={(e) => setDashboardCourse(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 6, marginBottom: 30, border: "1px solid #ccc" }}
            >
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* الحسابات في الخلفية */}
            <div style={{ display: "none" }}>
              <CourseTable
                data={coursesData[dashboardCourse]}
                onMetricsChange={handleMetricsChange}
              />
            </div>

            {metrics && (
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <GoalCard remaining={metrics.remainingForAPlus} />
                  <QuizGauge value={Number(metrics.bestQuizTotal)} max={10} />
                </div>

                <BestQuizzesChart quizzes={metrics.quizList} excluded={metrics.excludedIndex} />
                <CoursePie obtained={Number(metrics.totalObtained)} total={Number(metrics.totalPossible)} />
                <DistributionDonut rows={coursesData[dashboardCourse]} />
              </div>
            )}
          </>
        )}

        {view === "course" && selectedCourse && (
          <>
            <h1 style={{ marginBottom: 20 }}>{selectedCourse} Details</h1>
            <CourseTable
              data={coursesData[selectedCourse]}
              onMetricsChange={handleMetricsChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
