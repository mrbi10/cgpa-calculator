// src/components/SettingsPanel.tsx
import React from 'react';
import { useAppStore } from '../store/store';
import { Sun, Moon, RefreshCw } from 'lucide-react';

const presetColors = ['blue', 'green', 'purple', 'orange'] as const;
const fontSizes = ['sm', 'base', 'lg'] as const;
const colorClasses: Record<string, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
};


export const SettingsPanel: React.FC = () => {
  const {
    theme,
    toggleTheme,
    presetColor,
    setPresetColor,
    fontSize,
    setFontSize,
    resetSettings
  } = useAppStore(state => state);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10 w-72 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Settings</h3>
        <button
          onClick={resetSettings}
          className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
          title="Reset to defaults"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-300">Theme</span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Preset Color Selector */}
      {/* <div className="flex justify-between items-center py-2">
        <span className="text-gray-300">Accent Color</span>
        <div className="flex items-center gap-2">
        {presetColors.map((color) => (
  <button
    key={color}
    onClick={() => setPresetColor(color)}
    className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
      presetColor === color ? 'ring-2 ring-offset-2 ring-white' : ''
    } ${colorClasses[color]}`}
    title={`Set accent color to ${color}`}
  />
))}

        </div>
      </div> */}

      {/* Font Size Selector */}
      <div className="flex justify-between items-center py-2">
        <span className="text-gray-300">Font Size</span>
        <div className="flex items-center gap-1 bg-gray-700 p-1 rounded-md">
          {fontSizes.map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-2 py-1 rounded transition-colors text-xs ${fontSize === size ? 'bg-blue-500 text-white' : 'hover:bg-gray-600 text-gray-300'
                }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};