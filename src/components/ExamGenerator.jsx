import React, { useState } from 'react';
import { Printer, Download } from 'lucide-react';

export default function ExamGenerator() {
  const [formData, setFormData] = useState({ class: '8', subject: 'bangla', mcqCount: 10, cqCount: 2 });

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4">Exam Paper Generator</h2>
      
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
            <select className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <select className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
              <option value="bangla">Bangla</option>
              <option value="math">Mathematics</option>
              <option value="science">Science</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of MCQs</label>
            <input type="number" min="0" max="50" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.mcqCount} onChange={e => setFormData({...formData, mcqCount: parseInt(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of CQs</label>
            <input type="number" min="0" max="10" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.cqCount} onChange={e => setFormData({...formData, cqCount: parseInt(e.target.value)})} />
          </div>
        </div>

        <div className="pt-6 flex space-x-4">
          <button className="flex-1 bg-nctb-emerald hover:bg-emerald-600 text-white py-3 rounded-lg flex justify-center items-center font-bold transition">
            <Printer className="w-5 h-5 mr-2" /> Print Paper
          </button>
          <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg flex justify-center items-center font-bold transition">
            <Download className="w-5 h-5 mr-2" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
