// src/store/store.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Semester, Course } from '../lib/types';
import AnnaUCsePreset from '../data/AnnaU_CSE_R2021.json';

// For clarity, define the initial UI settings separately
const initialSettings = {
  theme: 'dark' as 'light' | 'dark',
  presetColor: 'blue' as 'blue' | 'green' | 'purple' | 'orange',
  fontSize: 'base' as 'sm' | 'base' | 'lg',
};

// Combine all state and actions into a single, clear interface
interface StoreState {
  // UI State
  theme: 'light' | 'dark';
  presetColor: 'blue' | 'green' | 'purple' | 'orange';
  fontSize: 'sm' | 'base' | 'lg';
  
  // Data State
  semesters: Semester[];
  usePresets: boolean;

  // Actions
  toggleTheme: () => void;
  setPresetColor: (color: StoreState['presetColor']) => void;
  setFontSize: (size: StoreState['fontSize']) => void;
  resetSettings: () => void;
  updateCourseGrade: (semesterId: number, courseId: string, grade: Course['grade']) => void;
}

export const useAppStore = create<StoreState>()(
  // The 'immer' middleware lets us write simpler, mutation-like update logic
  immer((set) => ({
    // Initial state of the application
    ...initialSettings, // Spread the initial UI settings
    semesters: AnnaUCsePreset as Semester[], // Load the preset data by default
    usePresets: true,

    // --- Actions ---

    // Action to toggle between light and dark themes
    toggleTheme: () =>
      set((state) => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
      }),

    // Action to set the accent color
    setPresetColor: (color) =>
      set((state) => {
        state.presetColor = color;
      }),

    // Action to set the global font size
    setFontSize: (size) =>
      set((state) => {
        state.fontSize = size;
      }),

    // Action to reset UI settings to their default values
    resetSettings: () => set(initialSettings),

    // Action to update the grade of a specific course
    updateCourseGrade: (semesterId, courseId, grade) =>
      set((state) => {
        const semester = state.semesters.find((s) => s.id === semesterId);
        if (semester) {
          const course = semester.courses.find((c) => c.id === courseId);
          if (course) {
            course.grade = grade;
          }
        }
      }),
  }))
);