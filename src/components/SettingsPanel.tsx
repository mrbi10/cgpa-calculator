// src/components/SettingsPanel.tsx
import React from 'react';
import { useAppStore } from '../store/store';
import { Sun, Moon } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const { theme, toggleTheme } = useAppStore(state => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
      <div className="flex justify-between items-center">
        <span className="text-gray-300">Theme</span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      {/* Preset toggle would go here */}
    </div>
  );
};
