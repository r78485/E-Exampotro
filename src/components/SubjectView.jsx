import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, CheckCircle2, HelpCircle, FileSignature } from 'lucide-react';

export default function SubjectView() {
  const { classId, subjectId } = useParams();
  const [activeTab, setActiveTab] = useState('mcq');

  // Basic mock data
  const mockMcq = [
    { id: 1, q: "বাংলাদেশের স্বাধীনতা দিবস কবে?", options: ["২১ ফেব্রুয়ারি", "২৬ মার্চ", "১৬ ডিসেম্বর", "১ বৈশাখ"], ans: 1, exp: "২৬ মার্চ বাংলাদেশের স্বাধীনতা দিবস।" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-nctb-emerald flex items-center"><ArrowLeft className="w-4 h-4 mr-1"/> হোম</Link>
        <ChevronRight className="w-4 h-4" />
        <span>Class {classId}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="capitalize">{subjectId}</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex space-x-4 border-b dark:border-gray-700 pb-4 mb-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('mcq')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'mcq' ? 'bg-nctb-emerald text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>MCQ Quiz</span>
          </button>
          <button 
            onClick={() => setActiveTab('cq')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'cq' ? 'bg-nctb-emerald text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <FileSignature className="w-5 h-5" />
            <span>সৃজনশীল প্রশ্ন (CQ)</span>
          </button>
          <button 
            onClick={() => setActiveTab('short')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'short' ? 'bg-nctb-emerald text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>সংক্ষিপ্ত প্রশ্ন</span>
          </button>
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'mcq' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold dark:text-white">বহুনির্বাচনি প্রশ্ন (MCQ)</h3>
              {mockMcq.map((q, i) => (
                <div key={q.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <p className="font-medium text-lg mb-4 dark:text-gray-100">{i + 1}. {q.q}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, idx) => (
                      <button key={idx} className="text-left px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-nctb-emerald dark:text-gray-200 transition">
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'cq' && (
            <div>
              <h3 className="text-xl font-bold dark:text-white mb-4">সৃজনশীল প্রশ্ন</h3>
              <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-xl border border-yellow-100 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2 font-bold">উদ্দীপক:</p>
                <p className="text-gray-800 dark:text-gray-100 italic">"রহিম সাহেব তার জমিতে নতুন জাতের ধান চাষ করলেন। ফলন ভালো হওয়ায় তিনি খুশি।"</p>
              </div>
              <div className="mt-4 space-y-3 dark:text-gray-200">
                <p>ক) জ্ঞানমূলক: কৃষিকাজ কী?</p>
                <p>খ) অনুধাবনমূলক: নতুন জাতের ধানের সুবিধা কী?</p>
                <p>গ) প্রয়োগমূলক: রহিম সাহেবের কাজটির ব্যাখ্যা দাও।</p>
                <p>ঘ) উচ্চতর দক্ষতা: উদ্দীপকের আলোকে কৃষির গুরুত্ব বিশ্লেষণ কর।</p>
              </div>
            </div>
          )}
          {activeTab === 'short' && (
            <div>
              <h3 className="text-xl font-bold dark:text-white mb-4">সংক্ষিপ্ত ও যোগ্যতাভিত্তিক প্রশ্ন</h3>
              <p className="dark:text-gray-300">New curriculum skill-based evaluation questions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
