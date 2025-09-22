// src/components/WhatIfSimulator.tsx
import React from 'react';
// Note: The logic for this component would need to be added to `calc.ts` 
// and the state managed in `store.ts`. This is a UI-only example for now.

export const WhatIfSimulator: React.FC = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">What-If Simulator</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="target-cgpa" className="block text-sm text-gray-400 mb-1">Target CGPA</label>
          <input
            type="number"
            id="target-cgpa"
            step="0.1"
            placeholder="e.g., 8.5"
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>
        <p className="text-center text-gray-300 text-sm">
          To achieve this, you need an average GPA of <span className="font-bold text-sky-400">8.75</span> in the remaining semesters.
        </p>
      </div>
    </div>
  );
};
