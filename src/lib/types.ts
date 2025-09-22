// src/lib/types.ts

// Defines the structure for a single course
export interface Course {
  id: string; // A unique identifier, like a UUID
  code: string; // Course code, e.g., "HS3151"
  name: string;
  credits: number;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'RA' | 'SA' | 'W' | null;
  isReattempt?: boolean;
  previousAttempts?: { grade: string; date: string }[];
}

// Defines the structure for a semester, which contains multiple courses
export interface Semester {
  id: number; // The semester number, e.g., 1, 2, 3...
  courses: Course[];
}

// Defines the structure for the result of a CGPA simulation
export interface SimulationResult {
  projectedCGPA: number;
  requiredGradePoints: number;
}

// Defines the type for the grade-to-point mapping object
export interface GradeMap {
  [grade: string]: number;
}
