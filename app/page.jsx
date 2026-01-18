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

  const [selectedCourse, setSelectedCourse] = useState("Economy");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar courses={courses} onSelect={setSelectedCourse} />

      <div style={{ padding: 40 }}>
        <h1>{selectedCourse}</h1>
        <p>هنا بتطلع الداشبورد والجدول 👌</p>
      </div>
    </div>
  );
}
