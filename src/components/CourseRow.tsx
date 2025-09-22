// src/components/CourseRow.tsx
import React from 'react';
import { useAppStore } from '../store/store';
import { Course } from '../lib/types';
import { gradeToPoint } from '../lib/calc';
import { ANNA_U_R2021_GRADE_MAP } from '../lib/config';
import { motion } from 'framer-motion';

interface CourseRowProps {
  course: Course;
  semesterId: number;
}

export const CourseRow: React.FC<CourseRowProps> = ({ course, semesterId }) => {
  // Get the action to update a grade from our store
  const updateCourseGrade = useAppStore((state) => state.updateCourseGrade);
  const gradePoint = gradeToPoint(course.grade);

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Cast the value to the correct type for our state
    const newGrade = e.target.value as Course['grade'];
    updateCourseGrade(semesterId, course.id, newGrade || null);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-12 gap-2 items-center p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
    >
      <div className="col-span-2 text-sm text-gray-400 truncate" title={course.code}>{course.code}</div>
      <div className="col-span-5 text-gray-200 truncate" title={course.name}>{course.name}</div>
      <div className="col-span-1 text-center text-gray-300">{course.credits}</div>
      <div className="col-span-2">
        <select
          value={course.grade ?? ''}
          onChange={handleGradeChange}
          aria-label={`Grade for ${course.name}`}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white focus:ring-2 focus:ring-sky-500 outline-none"
        >
          <option value="">--</option>
          {Object.keys(ANNA_U_R2021_GRADE_MAP).map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>
      <div className="col-span-2 text-center text-lg font-mono text-amber-400">
        {/* Show weighted points (Credits * Grade Point) */}
        {course.grade ? (gradePoint * course.credits).toFixed(1) : '-'}
      </div>
    </motion.div>
  );
};
