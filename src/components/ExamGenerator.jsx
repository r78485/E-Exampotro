import React, { useState } from 'react';
import { Printer, Download, Sparkles, Loader2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ExamGenerator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    class: '8',
    subject: 'bangla',
    book: '',
    chapter: '',
    formats: []
  });
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  const handleFormatChange = (format) => {
    setFormData(prev => {
      const formats = prev.formats.includes(format)
        ? prev.formats.filter(f => f !== format)
        : [...prev.formats, format];
      return { ...prev, formats };
    });
  };

  const handleGenerate = async () => {
    if (!formData.book || !formData.chapter || formData.formats.length === 0) {
      alert('বই, অধ্যায় এবং কমপক্ষে একটি প্রশ্ন ফরমেট সিলেক্ট করুন।');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setGeneratedData(data);
        
        // Save to Suggestions
        const newSuggestion = {
          id: data.suggestionId,
          ...formData,
          date: new Date().toISOString(),
          questions: data.questions
        };
        
        const existingSuggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
        localStorage.setItem('suggestions', JSON.stringify([newSuggestion, ...existingSuggestions]));
        
        // Save to Question Bank
        const existingBank = JSON.parse(localStorage.getItem('questionBank') || '[]');
        localStorage.setItem('questionBank', JSON.stringify([...data.questions, ...existingBank]));

      } else {
        alert(data.error || 'প্রশ্ন তৈরি করতে সমস্যা হয়েছে।');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('সার্ভারের সাথে কানেক্ট করতে সমস্যা হয়েছে। দয়া করে সার্ভার চালু আছে কিনা চেক করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-nctb-emerald" />
          ১ ক্লিকে প্রশ্ন তৈরী (AI Generated)
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">শ্রেণী (Class)</label>
              <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">বিষয় (Subject)</label>
              <select className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                <option value="bangla">Bangla</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">বইয়ের নাম (Book Name)</label>
              <input type="text" placeholder="যেমন: বাংলা ব্যাকরণ" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                value={formData.book} onChange={e => setFormData({...formData, book: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">অধ্যায়/চ্যাপ্টার (Chapter)</label>
              <input type="text" placeholder="যেমন: সন্ধি (অধ্যায় ৩)" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
                value={formData.chapter} onChange={e => setFormData({...formData, chapter: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">প্রশ্ন ফরমেট নির্বাচন করুন</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-emerald-500 transition-all">
                <input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500 w-5 h-5"
                  checked={formData.formats.includes('Creative MCQ')} onChange={() => handleFormatChange('Creative MCQ')} />
                <span className="text-gray-700 dark:text-gray-200">সিজোনশীল এমসিকিউ (Creative MCQ)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-emerald-500 transition-all">
                <input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500 w-5 h-5"
                  checked={formData.formats.includes('Creative Question')} onChange={() => handleFormatChange('Creative Question')} />
                <span className="text-gray-700 dark:text-gray-200">সিজেনশীল প্রশ্ন (Creative Question)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-emerald-500 transition-all">
                <input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500 w-5 h-5"
                  checked={formData.formats.includes('Short Question')} onChange={() => handleFormatChange('Short Question')} />
                <span className="text-gray-700 dark:text-gray-200">সংক্ষিপ্ত প্রশ্ন (Short Question)</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl flex justify-center items-center font-bold text-lg transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-70"
            >
              {loading ? (
                <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> প্রশ্ন তৈরি হচ্ছে...</>
              ) : (
                <><Sparkles className="w-6 h-6 mr-2" /> সাজেশন ও প্রশ্ন তৈরি করুন</>
              )}
            </button>
          </div>
        </div>
      </div>

      {generatedData && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-emerald-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <span className="bg-emerald-100 text-emerald-800 p-2 rounded-lg mr-3">সফল!</span>
              প্রশ্ন তৈরি হয়েছে
            </h3>
            <div className="flex gap-3">
              <button onClick={() => navigate('/suggestions')} className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium transition-colors">
                সাজেশন দেখুন
              </button>
              <button onClick={() => navigate('/question-bank')} className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 font-medium transition-colors">
                প্রশ্নব্যাংকে যান
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300">
            <p>আপনার তৈরি করা প্রশ্নগুলো অটোমেটিকভাবে <strong>প্রশ্নব্যাংক</strong> এবং <strong>রেডি সাজেশন</strong> মেনুতে জমা করা হয়েছে।</p>
          </div>
        </div>
      )}
    </div>
  );
}
