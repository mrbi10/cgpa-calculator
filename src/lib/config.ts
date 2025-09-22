// src/lib/config.ts
import { GradeMap } from './types';

// The official grade-to-point mapping for Anna University's R-2021
export const ANNA_U_R2021_GRADE_MAP: GradeMap = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'RA': 0, // Reappearance
  'SA': 0, // Shortage of Attendance
  'W': 0,  // Withdrawal
};

// Thresholds for classifying the student's performance based on CGPA
export const CLASSIFICATION_THRESHOLDS = {
  DISTINCTION: 8.5,
  FIRST_CLASS: 7.0,
  SECOND_CLASS: 5.0,
};

// The policy for handling reattempts (the best grade is always used)
export const REATTEMPT_POLICY = 'BEST_GRADE';
