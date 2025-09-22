// src/lib/calc.ts
import { Course, Semester, SimulationResult } from './types';
import { ANNA_U_R2021_GRADE_MAP as gradeMap } from './config';

/**
 * Converts a letter grade to its corresponding grade point.
 * Returns 0 if the grade is invalid or null.
 * @param grade The letter grade ('O', 'A+', 'RA', etc.).
 * @returns The numeric grade point.
 */
export function gradeToPoint(grade: string | null): number {
  if (grade === null || !gradeMap.hasOwnProperty(grade)) {
    return 0;
  }
  return gradeMap[grade];
}

/**
 * Calculates the GPA for a single semester.
 * Formula: GPA = Σ(Credit × Grade Point) / Σ(Credit)
 * @param courses An array of courses for one semester.
 * @returns The calculated semester GPA.
 */
export function semesterGPA(courses: Course[]): number {
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    if (course.grade !== null && course.credits > 0) {
      const point = gradeToPoint(course.grade);
      totalPoints += course.credits * point;
      totalCredits += course.credits;
    }
  });

  if (totalCredits === 0) {
    return 0;
  }

  return totalPoints / totalCredits;
}

/**
 * Calculates the cumulative CGPA across all semesters, correctly handling reattempts.
 * For any given course code, only the attempt with the highest grade is counted.
 * @param semesters An array of all semester data.
 * @returns The final calculated CGPA.
 */
export function cumulativeCGPA(semesters: Semester[]): number {
  const bestAttempts = new Map<string, { points: number; credits: number }>();

  // Go through every course in every semester
  semesters.flatMap(sem => sem.courses).forEach(course => {
    if (course.grade === null || !course.code) return;

    const currentPoint = gradeToPoint(course.grade);
    const existingAttempt = bestAttempts.get(course.code);

    // If this is the first time seeing this course, or if the new grade is better,
    // store it as the best attempt.
    if (!existingAttempt || currentPoint > existingAttempt.points) {
      bestAttempts.set(course.code, {
        points: currentPoint,
        credits: course.credits,
      });
    }
  });

  let totalWeightedPoints = 0;
  let totalCredits = 0;

  // Calculate final CGPA using only the best attempts
  for (const attempt of bestAttempts.values()) {
    totalWeightedPoints += attempt.points * attempt.credits;
    totalCredits += attempt.credits;
  }

  if (totalCredits === 0) {
    return 0;
  }

  return totalWeightedPoints / totalCredits;
}
