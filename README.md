# Anna University R-2021 CGPA Calculator (B.E. CSE)

A premium, fast, and accurate CGPA calculator tailored specifically for the **B.E. Computer Science & Engineering** curriculum under **Anna University's Regulation 2021**.

This tool provides students with a high-end interface to calculate, simulate, and visualize their academic performance.

**Live Demo (Mock):** [https://your-app-name.vercel.app](https://your-app-name.vercel.app)



---

## Features

-   **Regulation-Ready:** Implements the exact grade-point mapping and CGPA calculation rules as per the official Anna University Regulation 2021.
-   **CSE Preset:** Preloaded with the complete 8-semester course list for B.E. Computer Science & Engineering (R-2021), including course codes and credits.
-   **What-If Simulator:** Project your future CGPA by entering expected grades for upcoming semesters.
-   **Arrear/Reattempt Handling:** Automatically uses the best grade for a course in the final CGPA calculation, as mandated by the regulation.
-   **Visual Dashboards:** Interactive charts to visualize your semester-wise GPA trend, grade distribution, and more.
-   **Export & Share:** Export your results as a professional PDF, a CSV file, or share a unique, permanent link to your calculations.
-   **Modern UI/UX:** Built with a stunning, responsive design, including a dark/light theme toggle and subtle animations.
-   **Fully Accessible:** Adheres to WCAG standards for color contrast, keyboard navigation, and screen reader support.

---

## Authoritative Sources & Citations

The accuracy of this calculator is based on the following official documents from Anna University:

1.  **Academic Regulations 2021 (R-2021):**
    * **Source:** Anna University - Centre for Academic Courses
    * **Link:** [B.E./B.Tech. Full Time Regulations 2021 PDF](https://cac.annauniv.edu/Generic%20File/Regulations/2021/R-2021-UG-FT.pdf)
    * **Reference:** Page 10, Clause 8.5 for Grade-Point Mapping and Page 14, Clause 12.0 for CGPA Calculation & Reattempt Policy.

2.  **B.E. Computer Science & Engineering Curriculum (R-2021):**
    * **Source:** Anna University - Board of Studies
    * **Link:** [B.E. CSE R-2021 Curriculum & Syllabi PDF](https://www.studentcompanion.in/wp-content/uploads/2022/10/R2021-BE-CSE-Curriculum-Syllabi.pdf) (Note: Link to a well-known educational repository; official links can be updated as they become available on `annauniv.edu`).
    * **Reference:** Pages 3-10 for the semester-wise course lists and credit distribution.

---

## Technical Stack

-   **Framework:** React + TypeScript
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS + Framer Motion
-   **State Management:** Zustand
-   **Charts:** Recharts
-   **Testing:** Vitest (Unit) & Playwright (E2E)
-   **CI/CD:** GitHub Actions

---

## Configuration & Assumptions

### Grade-Point Mapping
The grade map is defined in `src/lib/config.ts` and can be easily updated if regulations change. The current implementation is:

```javascript
{
  'O': 10, 'A+': 9, 'A': 8, 'B+': 7,
  'B': 6, 'C': 5, 'RA': 0, 'SA': 0, 'W': 0,
}
```

### Arrear / Reappearance Policy
As per R-2021 regulations, this calculator assumes the **best grade** obtained in any course is used for CGPA calculation. The history of attempts can be logged, but only the highest-scoring attempt is factored into the final CGPA.

### Classification Thresholds
Classification (Distinction, First Class) is calculated based on CGPA and can be configured in `src/lib/config.ts`. The current defaults are:
-   **First Class with Distinction:** CGPA ≥ 8.5 and no history of arrears.
-   **First Class:** CGPA ≥ 7.0.

---

## Development & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/au-cgpa-calculator.git](https://github.com/your-username/au-cgpa-calculator.git)
    cd au-cgpa-calculator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Run tests:**
    ```bash
    npm test
    ```