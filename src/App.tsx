// src/App.tsx
import React, { useMemo } from 'react';
import { useAppStore } from './store/store';
import { cumulativeCGPA } from './lib/calc';
import { SemesterEditor } from './components/SemesterEditor';
import { GpaTrendChart } from './components/charts/GpaTrendChart';
import { GradeDistributionChart } from './components/charts/GradeDistributionChart';
import { ExportPanel } from './components/ExportPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

// A simple component to display the classification pill
const ClassificationPill: React.FC<{ cgpa: number }> = ({ cgpa }) => {
  let text = 'Second Class';
  let color = 'bg-orange-500/20 text-orange-300';

  if (cgpa >= 8.5) {
    text = 'First Class with Distinction';
    color = 'bg-green-500/20 text-green-300';
  } else if (cgpa >= 7.0) {
    text = 'First Class';
    color = 'bg-sky-500/20 text-sky-300';
  } else if (cgpa < 5.0 && cgpa > 0) {
    text = 'Needs Improvement';
    color = 'bg-red-500/20 text-red-300';
  }
  
  if (cgpa === 0) return null;

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`px-3 py-1 text-sm font-medium rounded-full ${color}`}
    >
      {text}
    </motion.div>
  );
};

function App() {
  const semesters = useAppStore((state) => state.semesters);
  const theme = useAppStore((state) => state.theme);

  // useMemo ensures that CGPA is only recalculated when semester data changes
  const cgpa = useMemo(() => cumulativeCGPA(semesters), [semesters]);

  return (
    <div className={theme}>
      <main className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Data Entry */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">Anna University CGPA Calculator</h1>
            <p className="text-gray-400">R-2021 | Computer Science & Engineering</p>
            {semesters.map((semester) => (
              <SemesterEditor key={semester.id} semesterId={semester.id} />
            ))}
          </div>

          {/* Right Column: Dashboard & Visuals */}
          <div className="lg:col-span-1 space-y-8 sticky top-8">
            <motion.div layout className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10 text-center">
              <h2 className="text-lg font-medium text-gray-400">Your CGPA</h2>
              <div className="text-7xl font-bold tracking-tighter my-2 text-sky-400">
                <CountUp start={0} end={cgpa} decimals={3} duration={1.5} />
              </div>
              <ClassificationPill cgpa={cgpa} />
            </motion.div>
            
            <WhatIfSimulator />
            <GpaTrendChart semesters={semesters} />
            <GradeDistributionChart />
            <ExportPanel />
            <SettingsPanel />
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
