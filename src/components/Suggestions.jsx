import React, { useEffect, useState } from 'react';
import { FileText, Printer, Trash2 } from 'lucide-react';

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('suggestions') || '[]');
    setSuggestions(data);
  }, []);

  const handleDelete = (id) => {
    const updated = suggestions.filter(s => s.id !== id);
    setSuggestions(updated);
    localStorage.setItem('suggestions', JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <FileText className="w-6 h-6 mr-2 text-nctb-emerald" />
          রেডি প্রশ্ন / সাজেশন
        </h2>
      </div>

      {suggestions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center text-gray-500">
          <p>এখনো কোন সাজেশন তৈরি করা হয়নি। "১ ক্লিকে প্রশ্ন তৈরী" মেনু থেকে নতুন সাজেশন তৈরি করুন।</p>
        </div>
      ) : (
        <div className="space-y-6">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    বই: {suggestion.book} | অধ্যায়: {suggestion.chapter}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    শ্রেণী: {suggestion.class} | বিষয়: {suggestion.subject} | 
                    তারিখ: {new Date(suggestion.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Print">
                    <Printer className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(suggestion.id)}
                    className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors" title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {suggestion.questions.map((q, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    {q.type === 'mcq' && (
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">{idx + 1}. {q.question}</p>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                          {q.options?.map((opt, i) => (
                            <li key={i}>{String.fromCharCode(2534 + i)}. {opt}</li> // ক, খ, গ, ঘ
                          ))}
                        </ul>
                        <p className="text-sm font-medium text-emerald-600 mt-2">উত্তর: {q.answer}</p>
                      </div>
                    )}
                    
                    {q.type === 'cq' && (
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 mb-3 text-justify">
                          <strong>উদ্দীপক: </strong>
                          {q.stimulus}
                        </p>
                        <div className="space-y-3 pl-4 text-sm text-gray-700 dark:text-gray-300">
                          {q.questions?.map((sq, i) => (
                            <div key={i} className="flex flex-col">
                              <p className="font-medium flex justify-between">
                                <span>{sq.label}. {sq.question}</span>
                                <span className="text-gray-400">({sq.marks})</span>
                              </p>
                              <p className="text-emerald-600 mt-1">উত্তর/ইঙ্গিত: {sq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {q.type === 'short' && (
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">{idx + 1}. {q.question}</p>
                        <p className="text-sm font-medium text-emerald-600">উত্তর: {q.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
