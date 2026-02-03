"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CourseTable from "../components/CourseTable";
import { coursesData } from "../data/courses";

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
    <div style={{ display: "flex",background: "#EAEFEF",minHeight: "100vh" }}>
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
            <h1>My Grade</h1>

            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <select
                value={dashboardCourse}
                onChange={(e) => setDashboardCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* المقاييس */}
{metrics && (
  <div
    style={{
      display: "flex",
      gap: 16,
      marginTop: 20,
      flexWrap: "wrap"
    }}
  >
    <InfoBox label="Grade Obtained" value={metrics.totalObtained} />
    <InfoBox label="Total Grade" value={metrics.totalPossible} />
    <InfoBox label="Percentage" value={metrics.percentage + "%"} />
    <InfoBox label="Remaining for A+" value={metrics.remainingForAPlus} />
    <InfoBox label="Remaining for A" value={metrics.remainingForA} />
    <InfoBox label="Best Quizzes Total" value={metrics.bestQuizzesTotal} />
  </div>
)}
             {metrics && (
  <div style={{ marginTop: 30 }}>
    <div style={{ marginBottom: 8, fontSize: 14 }}>
      Progress
    </div>

    <div
      style={{
        width: "100%",
        height: 18,
        background: "#dcdede",
        borderRadius: 10,
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: `${metrics.percentage}%`,
          height: "100%",
          background: "#734073",
          transition: "0.4s"
        }}
      />
    </div>
  </div>
)} 
            
            <div style={{ display: "none" }}>
              <CourseTable
                data={coursesData[dashboardCourse]}
                onMetricsChange={setMetrics}
              />
            </div>
          </>
        )}

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

function InfoBox({ label, value }) {
  return (
    <div style={{ padding: 15, background: "#f4f4fa" }}>
      <div>{label}</div>
      <strong>{value}</strong>
    </div>
  );
}
