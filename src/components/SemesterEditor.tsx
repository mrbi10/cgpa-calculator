// src/components/SemesterEditor.tsx
import React from 'react';
import { useAppStore } from '../store/store';
import { semesterGPA } from '../lib/calc';
import { CourseRow } from './CourseRow';
import { AnimatePresence, motion } from 'framer-motion';

interface SemesterEditorProps {
  semesterId: number;
}

export const SemesterEditor: React.FC<SemesterEditorProps> = ({ semesterId }) => {
  // Select only the specific semester data needed to prevent unnecessary re-renders
  const semester = useAppStore((state) => state.semesters.find(s => s.id === semesterId));
  const gpa = semester ? semesterGPA(semester.courses) : 0;

  if (!semester) {
    return null; // Don't render if the semester doesn't exist
  }

  return (
    <motion.div 
      layout 
      className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Semester {semester.id}</h3>
        <span className="text-lg font-mono px-3 py-1 bg-sky-500/20 text-sky-300 rounded-md">
          GPA: {gpa.toFixed(3)}
        </span>
      </div>
      <div className="space-y-2">
        {/* AnimatePresence allows for smooth adding/removing of courses */}
        <AnimatePresence>
          {semester.courses.map((course) => (
            <CourseRow key={course.id} course={course} semesterId={semester.id} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
