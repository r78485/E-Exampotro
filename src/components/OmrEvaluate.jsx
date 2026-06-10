import React from 'react';
import { UploadCloud, Camera, CheckCircle2, Trash2, FolderUp } from 'lucide-react';

export default function OmrEvaluate() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[600px] max-w-lg mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Advanced OMR Evaluator 3.0</span>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Drag and Drop Area */}
        <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
            <UploadCloud className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Drag & drop OMR sheets here, or choose an option below:</p>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-2 bg-[#28a745] hover:bg-[#218838] text-white rounded-md text-sm font-medium transition shadow-sm">
              <FolderUp className="w-4 h-4" /> Browse Files
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-md text-sm font-medium transition shadow-sm">
              <Camera className="w-4 h-4" /> Start Camera
            </button>
          </div>
        </div>

        {/* Bottom Alert and Button */}
        <div className="border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-4">
          <div className="text-center text-red-500 text-xs font-medium border border-red-100 dark:border-red-900 bg-red-50 dark:bg-red-900/20 py-2 rounded">
            আপনাকে টোকেন ক্রয় করতে হবে! <br/>
            <a href="#" className="text-blue-500 hover:underline">Create Token</a>
          </div>
          
          <button className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-400 font-bold rounded-full cursor-not-allowed uppercase text-sm tracking-wider">
            Evaluate Now!
          </button>
        </div>

      </div>

    </div>
  );
}
