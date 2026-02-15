"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// انتبهي: هنا نمرر allCourses (كل المواد) بدلاً من data (مادة واحدة)
export default function CourseBarChart({ allCourses = {} }) {
  
  const colors = ["#1a3a5a", "#2c5282", "#4299e1", "#63b3ed", "#90cdf4", "#cbd5e1"];

  // تجهيز البيانات: نحسب مجموع الدرجات لكل مادة
  const chartData = Object.keys(allCourses).map(courseName => {
    const rows = allCourses[courseName];
    // جمع كل الدرجات التي حصلتِ عليها في هذه المادة
    const totalObtained = rows.reduce((sum, row) => sum + (Number(row.obtained) || 0), 0);
    
    return {
      name: courseName,
      grade: totalObtained
    };
  });

  return (
    <div style={{ width: '100%', height: 200, paddingRight: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          
          {/* هنا جعلنا المدى إلى 100 لأن مجموع المادة عادة يكون 100 */}
          <XAxis 
            type="number" 
            domain={[0, 100]} 
            hide 
          /> 
          
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            width={80}
            style={{ fontSize: '11px', fontWeight: 'bold', fill: '#30364F', fontFamily: 'Garamond' }}
          />
          
          <Tooltip 
            cursor={{fill: '#f8fafc'}} 
            contentStyle={{borderRadius: '8px', border: 'none', fontSize: '12px', fontFamily: 'Garamond'}}
            formatter={(value) => [`${value} / 100`, 'Current Grade']}
          />

          <Bar dataKey="grade" barSize={15} radius={[0, 10, 10, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* مسطرة الأرقام من 0 إلى 100 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '9px', 
        color: '#ACBAC4', 
        paddingLeft: '110px',
        paddingRight: '30px',
        marginTop: '-5px',
        fontWeight: 'bold'
      }}>
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
}
