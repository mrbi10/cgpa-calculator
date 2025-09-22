// src/components/charts/GpaTrendChart.tsx
import React, { useMemo } from 'react';
import { Semester } from '../../lib/types';
import { semesterGPA } from '../../lib/calc';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface GpaTrendChartProps {
  semesters: Semester[];
}

export const GpaTrendChart: React.FC<GpaTrendChartProps> = ({ semesters }) => {
  const chartData = useMemo(() => {
    return semesters
      .map(sem => ({
        name: `Sem ${sem.id}`,
        gpa: parseFloat(semesterGPA(sem.courses).toFixed(3)),
      }))
      .filter(data => data.gpa > 0); // Only include semesters with a calculated GPA
  }, [semesters]);
  
  // Don't render the chart card if there's no data to show
  if (chartData.length < 1) {
    return null; 
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">GPA Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
          <XAxis dataKey="name" stroke="#A0AEC0" />
          <YAxis domain={[0, 10]} stroke="#A0AEC0" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#171E2C', // Matches card background
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
            labelStyle={{ color: '#E2E8F0' }}
          />
          <Legend wrapperStyle={{ color: '#A0AEC0' }}/>
          <Line type="monotone" dataKey="gpa" name="GPA" stroke="#38BDF8" strokeWidth={2} dot={{ r: 4, fill: '#38BDF8' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
