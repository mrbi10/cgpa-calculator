// src/components/ExportPanel.tsx
import React from 'react';
import { useAppStore } from '../store/store';
import { Share2, FileDown, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const ExportPanel: React.FC = () => {
  const semesters = useAppStore((state) => state.semesters);

  const handleShareLink = () => {
    try {
      const stateToShare = { semesters };
      const jsonString = JSON.stringify(stateToShare);
      const encodedState = btoa(jsonString);
      const url = `${window.location.origin}?data=${encodedState}`;
      navigator.clipboard.writeText(url);
      alert('Shareable link copied to clipboard!');
    } catch (error) {
      console.error("Failed to create shareable link:", error);
      alert("Could not create a shareable link.");
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("CGPA Export Report", 14, 20);

    semesters.forEach((semester, index) => {
      const rows = semester.courses
        .filter((course) => course.grade) // include only graded courses
        .map((course) => [
          course.code,
          course.name,
          course.credits,
          course.grade,
        ]);

      if (rows.length > 0) {
        (doc as any).autoTable({
          head: [["Course Code", "Course Name", "Credits", "Grade"]],
          body: rows,
          startY: index === 0 ? 30 : (doc as any).lastAutoTable.finalY + 10,
          theme: "grid",
          headStyles: { fillColor: [30, 64, 175] }, // Tailwind indigo-800
        });
        doc.text(`Semester ${semester.id}`, 14, (doc as any).lastAutoTable.finalY - rows.length * 8 - 4);
      }
    });

    doc.save("cgpa_export.pdf");
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Semester,Course Code,Course Name,Credits,Grade\n";
    semesters.forEach((semester) => {
      semester.courses.forEach((course) => {
        if (course.grade) {
          const row = [semester.id, course.code, `"${course.name}"`, course.credits, course.grade].join(",");
          csvContent += row + "\n";
        }
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cgpa_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Export & Share</h3>
      <div className="flex justify-around items-center">
        <button
          onClick={handleShareLink}
          className="flex flex-col items-center space-y-1 text-gray-300 hover:text-sky-400 transition-colors"
          title="Copy a shareable link"
        >
          <Share2 size={24} />
          <span className="text-xs">Share Link</span>
        </button>
        <button
          onClick={handleExportPDF}
          className="flex flex-col items-center space-y-1 text-gray-300 hover:text-sky-400 transition-colors"
          title="Download as PDF"
        >
          <FileDown size={24} />
          <span className="text-xs">Export PDF</span>
        </button>
        <button
          onClick={handleExportCSV}
          className="flex flex-col items-center space-y-1 text-gray-300 hover:text-sky-400 transition-colors"
          title="Download as CSV"
        >
          <FileText size={24} />
          <span className="text-xs">Export CSV</span>
        </button>
      </div>
    </div>
  );
};
