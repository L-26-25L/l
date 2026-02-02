"use client";
 imoprt {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer}
from "recharts";
export default function CourseBarChart({ data }) {
  if (!data) return null;

  const chartData = data.map((item) => ({
    name: item.type,
    obtained: item.obtained,
    total: item.total
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ marginBottom: 10 }}>Grades Distribution</h3>

      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="obtained" fill="#734073" radius={[6, 6, 0, 0]} />
          <Bar dataKey="total" fill="#d1c4d8" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
