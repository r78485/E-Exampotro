import React, { useEffect, useState } from 'react';
import { Database, Trash2, Filter } from 'lucide-react';

export default function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('questionBank') || '[]');
    setQuestions(data);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updated = questions.filter((_, idx) => idx !== indexToDelete);
    setQuestions(updated);
    localStorage.setItem('questionBank', JSON.stringify(updated));
  };

  const filteredQuestions = filterType === 'all' 
    ? questions 
    : questions.filter(q => q.type === filterType);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <Database className="w-6 h-6 mr-2 text-nctb-emerald" />
          প্রশ্নব্যাংক
        </h2>
        
        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <Filter className="w-5 h-5 text-gray-400 ml-2" />
          <select 
            className="border-none bg-transparent focus:ring-0 text-sm text-gray-700 dark:text-gray-300"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">সব প্রশ্ন</option>
            <option value="mcq">এমসিকিউ (MCQ)</option>
            <option value="cq">সৃজনশীল (CQ)</option>
            <option value="short">সংক্ষিপ্ত প্রশ্ন</option>
          </select>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center text-gray-500">
          <p>প্রশ্নব্যাংকে এখনো কোন প্রশ্ন নেই।</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredQuestions.map((q, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative group">
              <button 
                onClick={() => handleDelete(idx)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="pr-12">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3 uppercase">
                  {q.type === 'mcq' ? 'MCQ' : q.type === 'cq' ? 'Creative Question' : 'Short Question'}
                </span>

                {q.type === 'mcq' && (
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-lg mb-3">{q.question}</p>
                    <ul className="grid grid-cols-2 gap-3 text-gray-600 dark:text-gray-400">
                      {q.options?.map((opt, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs mr-2">
                            {String.fromCharCode(2534 + i)}
                          </span>
                          {opt}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm font-medium text-emerald-600 mt-4 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded inline-block">
                      উত্তর: {q.answer}
                    </p>
                  </div>
                )}
                
                {q.type === 'cq' && (
                  <div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-4 text-justify">
                      <strong className="text-gray-800 dark:text-gray-200 block mb-1">উদ্দীপক:</strong>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{q.stimulus}</p>
                    </div>
                    <div className="space-y-4">
                      {q.questions?.map((sq, i) => (
                        <div key={i} className="flex flex-col border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0">
                          <p className="font-medium text-gray-800 dark:text-gray-200 flex justify-between">
                            <span>{sq.label}. {sq.question}</span>
                            <span className="text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 rounded text-sm">মান: {sq.marks}</span>
                          </p>
                          <p className="text-emerald-600 mt-2 text-sm">উত্তর/ইঙ্গিত: {sq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {q.type === 'short' && (
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-lg mb-2">{q.question}</p>
                    <p className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded inline-block">
                      উত্তর: {q.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
