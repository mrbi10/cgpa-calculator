// src/store/store.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Semester, Course } from '../lib/types';
import AnnaUCsePreset from '../data/AnnaU_CSE_R2021.json';

// Defines the shape of our application's state
interface AppState {
  semesters: Semester[];
  usePresets: boolean;
  theme: 'light' | 'dark';
}

// Defines the actions that can modify the state
interface AppActions {
  updateCourseGrade: (semesterId: number, courseId: string, grade: Course['grade']) => void;
  // We can add more actions later, like adding/removing courses
  toggleTheme: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  // The 'immer' middleware lets us write simpler, mutation-like update logic
  immer((set) => ({
    // Initial state of the application
    semesters: AnnaUCsePreset as Semester[], // Load the preset data by default
    usePresets: true,
    theme: 'dark', // Default to dark mode

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

    // Action to toggle between light and dark themes
    toggleTheme: () =>
      set((state) => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
      }),
  }))
);
