"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CourseTable from "../components/CourseTable";
import { coursesData } from "../data/courses";

import GoalCard from "../components/GoalCard";
import QuizGauge from "../components/QuizGauge";
import BestQuizzesChart from "../components/BestQuizzesChart";
import CoursePie from "../components/CoursePie";
import DistributionDonut from "../components/DistributionDonut";

export default function Home() {
  const courses = [
    "Economy",
    "Math",
    "Administration",
    "Technology",
    "Islamic",
    "Arabica"
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState("dashboard");
  const [metrics, setMetrics] = useState(null);
  const [dashboardCourse, setDashboardCourse] = useState(courses[0]);

  return (
    <div style={{ display: "flex", background: "#EAEFEF" }}>
      {/* 🔹 Sidebar */}
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

      {/* 🔹 Main */}
      <div style={{ padding: 40, flex: 1 }}>

        {/* ================= DASHBOARD ================= */}
        {view === "dashboard" && (
          <>
            <h1>My Grade</h1>

            {/* اختيار المقرر */}
            <select
              value={dashboardCourse}
              onChange={(e) => setDashboardCourse(e.target.value)}
              style={{ padding: 8, borderRadius: 6, marginBottom: 30 }}
            >
              {courses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* نحسب المقاييس بالخلفية */}
            <div style={{ display: "none" }}>
              <CourseTable
                data={coursesData[dashboardCourse]}
                onMetricsChange={setMetrics}
              />
            </div>

            {/* ================= الصف العلوي ================= */}
            {metrics && (
              <div
                style={{
                  display: "flex",
                  gap: 30,
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                {/* Card + Gauge */}
                <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                  <GoalCard remaining={metrics.remainingForAPlus} />
                  <QuizGauge
                    value={metrics.bestQuizTotal || 0}
                    max={metrics.totalPossible}
                  />
                </div>

                {/* Best Quizzes Bar */}
                <BestQuizzesChart
                  quizzes={metrics.quizList || []}
                  excluded={metrics.excludedIndex}
                />

                {/* Pie */}
                <CoursePie
                  obtained={metrics.totalObtained}
                  total={metrics.totalPossible}
                />

                {/* Donut */}
                <DistributionDonut
                  rows={coursesData[dashboardCourse]}
                />
              </div>
            )}
          </>
        )}

        {/* ================= COURSE PAGE ================= */}
        {view === "course" && selectedCourse && (
          <>
            <h1>{selectedCourse}</h1>

            <CourseTable
              data={coursesData[selectedCourse]}
              onMetricsChange={setMetrics}
            />
          </>
        )}
      </div>
    </div>
  );
}
