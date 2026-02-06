import { RadialBarChart, RadialBar } from "recharts";

export default function QuizGauge({ value, max }) {
  const data = [{ value }];

  return (
    <div style={{ width:160, height:120 }}>
      <RadialBarChart
        innerRadius="70%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar dataKey="value" fill="#836191" />
      </RadialBarChart>

      <div style={{ textAlign:"center", marginTop:-30 }}>
        {value}/{max}
      </div>
    </div>
  );
}
