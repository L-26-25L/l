import CourseTable from "../components/CourseTable";
import { coursesData } from "../data/courses";

"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

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
            <h1>Dashboard</h1>
            <p>هنا بتطلع الرسوم البيانية ✨</p>
          </>
        )}

      {view === "course" && selectedCourse && (
  <>
    <h1>{selectedCourse}</h1>
    <CourseTable data={coursesData[selectedCourse]} />
  </>
)}
      </div>
    </div>
  );
}
