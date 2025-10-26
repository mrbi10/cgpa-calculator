// src/App.tsx
import React, { useMemo } from 'react';
import { useEffect } from 'react';
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
import { AppInitializer } from './components/AppInitializer'
import pako from "pako";

// Classification pill
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
  const setSemesters = useAppStore((state) => state.setSemesters);
  const semesters = useAppStore((state) => state.semesters);
  const theme = useAppStore((state) => state.theme);
  const presetColor = useAppStore((state) => state.presetColor);
  const fontSize = useAppStore((state) => state.fontSize);

  const cgpa = useMemo(() => cumulativeCGPA(semesters), [semesters]);

  // Tailwind dynamic classes fallback
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  // Map font sizes to Tailwind classes
  const fontClass = fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base';

  // Map accent colors to actual hex values
  const accentColors: Record<string, string> = {
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f97316',
  };

  const colorClassMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-500',
    green: 'text-green-500 bg-green-500',
    purple: 'text-purple-500 bg-purple-500',
    orange: 'text-orange-500 bg-orange-500',
  };
  const accentColor = accentColors[presetColor] || '#3b82f6';

  // Handle compressed URL data (shorter links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('d'); // compressed data
    if (data) {
      try {
        const decoded = pako.inflate(atob(data), { to: 'string' });
        const json = JSON.parse(decoded);
        if (json.semesters) setSemesters(json.semesters);
      } catch (error) {
        console.error('Failed to load URL data', error);
      }
    }
  }, [setSemesters]);

  return (
    <>
      <AppInitializer />
      <div
        className={`${bgColor} ${textColor} ${fontClass} min-h-screen transition-colors duration-300`}
        style={{ accentColor }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">Anna University CGPA Calculator</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
              R-2021 | Computer Science & Engineering
            </p>
            {semesters.map((semester) => (
              <SemesterEditor key={semester.id} semesterId={semester.id} />
            ))}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-8 sticky top-8">
            <motion.div
              layout
              className={`${theme === 'dark'
                ? 'bg-gray-800/50 border-white/10'
                : 'bg-gray-100/50 border-gray-300/20'
                } backdrop-blur-sm p-6 rounded-lg shadow-lg text-center border transition-colors duration-300`}
            >
              <h2 className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-lg font-medium`}>
                Your CGPA
              </h2>
              <div className="text-7xl font-bold tracking-tighter my-2 text-sky-400">
                <CountUp start={0} end={cgpa} decimals={3} duration={1.5} />
              </div>
              <ClassificationPill cgpa={cgpa} />
            </motion.div>

            <GpaTrendChart semesters={semesters} />
            <GradeDistributionChart />
            <ExportPanel />
            <SettingsPanel />
          </div>
        </div>
        {/* Footer */}
        {/* Footer */}
        <div className={`mt-12 py-4 text-center text-sm rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} shadow-inner transition-colors duration-300`}>
          Developed by <span className="font-semibold">Mrbi 💙</span> | For issues & inquiries:
          <a href="tel:6369189844" className="underline ml-1 hover:text-sky-500 transition-colors">6369189844</a>,
          <a href="mailto:abinanthan1006@gmail.com" className="underline ml-1 hover:text-sky-500 transition-colors">abinanthan1006@gmail.com</a> |
          <a href="https://portfolio.mrbi.live/" target="_blank" rel="noopener noreferrer" className="underline ml-1 hover:text-sky-500 transition-colors">
            Portfolio
          </a>
        </div>

      </div>
    </>
  );
}



export default App;
