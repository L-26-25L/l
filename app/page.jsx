"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CourseTable from "../components/CourseTable";
import { coursesData } from "../data/courses";
import ProgressRing from "../components/ProgressRing";

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
    <div style={{ display: "flex" }}>
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

            {metrics && (
              <div style={{ display: "flex", gap: 20 }}>
                <InfoBox label="Current Score" value={metrics.totalObtained} />
                <InfoBox label="Total Possible" value={metrics.totalPossible} />
                <InfoBox label="Percentage" value={metrics.percentage + "%"} />
              </div>
            )}

            {metrics && (
              <div style={{ marginTop: 40 }}>
                <ProgressRing percentage={Number(metrics.percentage)} />
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
