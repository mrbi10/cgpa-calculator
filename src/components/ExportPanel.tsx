// src/components/ExportPanel.tsx
import React from 'react';
import { useAppStore } from '../store/store';
import { Share2, FileDown, FileText } from 'lucide-react';
import pako from "pako";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export const ExportPanel: React.FC = () => {
  const semesters = useAppStore((state) => state.semesters);


const handleShareLink = async () => {
  try {
    if (!semesters || semesters.length === 0) {
      alert("No data to share.");
      return;
    }

    const jsonString = JSON.stringify({ semesters });
    // compress
    const compressed = pako.deflate(jsonString, { to: 'string' });
    // base64 encode
    const encoded = btoa(compressed);

    const url = `${window.location.origin}${window.location.pathname}?d=${encoded}`;
    console.log("Shareable URL:", url);

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      alert(" Shareable link copied!");
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("✅ Link copied!");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to create shareable link.");
  }
};



const handleExportPDF = () => {
  if (!semesters || semesters.length === 0) return alert("No data to export.");

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("CGPA Export Report", 14, 20);

  let yOffset = 30;

  semesters.forEach((semester) => {
    const rows = semester.courses
      .filter(c => c.grade)
      .map(c => [c.code, c.name, c.credits, c.grade]);

    if (rows.length) {
      doc.text(`Semester ${semester.id}`, 14, yOffset - 5);
      autoTable(doc, {
        startY: yOffset,
        head: [["Course Code", "Course Name", "Credits", "Grade"]],
        body: rows,
        theme: 'grid',
        headStyles: { fillColor: [14, 116, 144] },
        margin: { left: 14, right: 14 },
      });
      yOffset = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 10 : yOffset + 50;
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
        {/* <button
          onClick={handleShareLink}
          className="flex flex-col items-center space-y-1 text-gray-300 hover:text-sky-400 transition-colors"
          title="Copy a shareable link"
        >
          <Share2 size={24} />
          <span className="text-xs">Share Link</span>
        </button> */}
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
