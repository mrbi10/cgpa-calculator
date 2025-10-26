import React, { useState } from 'react';

export const WhatIfSimulator: React.FC = () => {
  const [target, setTarget] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  // You can later pull these values dynamically from your store
  const currentCGPA = 8.2;
  const totalSemesters = 8;
  const completedSemesters = 4;
  const remainingSemesters = totalSemesters - completedSemesters;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setTarget(e.target.value);

    if (isNaN(val) || val <= 0) {
      setMessage(null);
      return;
    }

    // Formula for required average GPA in remaining semesters
    const needed =
      (val * totalSemesters - currentCGPA * completedSemesters) /
      remainingSemesters;

    if (needed > 10) {
      setMessage(
        `Even with a perfect 10.0 in all remaining semesters, you can't reach a CGPA of ${val}.`
      );
    } else if (needed < 0) {
      setMessage(`You’ve already surpassed that target!`);
    } else {
      setMessage(
        `To achieve a CGPA of ${val.toFixed(2)}, you need an average GPA of ${needed.toFixed(
          2
        )} in the remaining semesters.`
      );
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">What-If Simulator</h3>
      <div className="space-y-3">
        <div>
          <label
            htmlFor="target-cgpa"
            className="block text-sm text-gray-400 mb-1"
          >
            Target CGPA
          </label>
          <input
            type="number"
            id="target-cgpa"
            step="0.1"
            placeholder="e.g., 8.5"
            value={target}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {message && (
          <p className="text-center text-gray-300 text-sm">
            {message.split(' ').map((word, i) =>
              word === '10.0' ? (
                <span key={i} className="font-bold text-sky-400">
                  {word + ' '}
                </span>
              ) : (
                word + ' '
              )
            )}
          </p>
        )}
      </div>
    </div>
  );
};
