// src/tests/unit/calc.test.ts
import { describe, it, expect } from 'vitest';
import { gradeToPoint, semesterGPA, cumulativeCGPA } from '../../lib/calc';
import { Course, Semester } from '../../lib/types';

describe('Calculation Logic', () => {
  it('correctly maps grades to points', () => {
    expect(gradeToPoint('O')).toBe(10);
    expect(gradeToPoint('A+')).toBe(9);
    expect(gradeToPoint('RA')).toBe(0);
    expect(gradeToPoint(null)).toBe(0);
    expect(gradeToPoint('Z')).toBe(0); // Invalid grade
  });

  it('calculates semester GPA correctly', () => {
    const courses: Course[] = [
      { id: '1', code: 'C1', name: 'Course 1', credits: 4, grade: 'O' }, // 4 * 10 = 40
      { id: '2', code: 'C2', name: 'Course 2', credits: 3, grade: 'A' }, // 3 * 8 = 24
      { id: '3', code: 'C3', name: 'Course 3', credits: 3, grade: 'B+' },// 3 * 7 = 21
    ];
    // Total points = 85, Total credits = 10. GPA = 8.5
    expect(semesterGPA(courses)).toBe(8.5);
  });
  
  it('handles reattempts correctly in CGPA calculation (best grade)', () => {
    const semesters: Semester[] = [
      {
        id: 1,
        courses: [{ id: '1', code: 'MA101', name: 'Maths', credits: 4, grade: 'RA' }]
      },
      {
        id: 2,
        courses: [
          { id: '2', code: 'CS101', name: 'Programming', credits: 3, grade: 'A+' }, // 3*9=27
          { id: '3', code: 'MA101', name: 'Maths', credits: 4, grade: 'A' }       // 4*8=32 (this one should be used)
        ]
      }
    ];
    // Total Points = 27 + 32 = 59. Total Credits = 3 + 4 = 7. CGPA = 59/7
    expect(cumulativeCGPA(semesters)).toBeCloseTo(8.42857);
  });
});