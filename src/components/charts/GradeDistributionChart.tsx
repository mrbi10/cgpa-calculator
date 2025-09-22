// src/components/charts/GradeDistributionChart.tsx
import React, { useMemo } from 'react';
import { useAppStore } from '../../store/store';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ANNA_U_R2021_GRADE_MAP } from '../../lib/config';

const COLORS = ['#0EA5E9', '#22D3EE', '#67E8F9', '#A5F3FC', '#8B5CF6', '#A78BFA', '#C4B5FD', '#F87171'];

export const GradeDistributionChart: React.FC = () => {
  const semesters = useAppStore((state) => state.semesters);

  const gradeData = useMemo(() => {
    const gradeCounts: { [grade: string]: number } = {};
    semesters.flatMap(s => s.courses).forEach(course => {
      if (course.grade) {
        gradeCounts[course.grade] = (gradeCounts[course.grade] || 0) + 1;
      }
    });

    return Object.keys(ANNA_U_R2021_GRADE_MAP)
      .filter(grade => gradeCounts[grade] > 0)
      .map(grade => ({ name: grade, value: gradeCounts[grade] }));
  }, [semesters]);

  if (gradeData.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Grade Distribution</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={gradeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {gradeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#171E2C', borderColor: 'rgba(255, 255, 255, 0.2)' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
