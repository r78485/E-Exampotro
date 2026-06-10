import React, { useState } from 'react';
import { Upload, FileText, Loader2, BookOpen, Languages, CheckCircle2 } from 'lucide-react';

export default function PdfBookProcessor() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  // Mock data for processed chapters
  const mockChapters = [
    {
      id: 1,
      title: 'অধ্যায় ১: ভৌত রাশি ও পরিমাপ / Chapter 1: Physical Quantities and Measurement',
      banglaContent: `পদার্থবিজ্ঞান হলো বিজ্ঞানের একটি প্রাচীন শাখা। এ শাখায় ভৌত জগৎ এবং এর নিয়মাবলি নিয়ে আলোচনা করা হয়। 
বিজ্ঞানের অন্যান্য শাখা যেমন- রসায়ন, জীববিজ্ঞান ইত্যাদি পদার্থবিজ্ঞানের মৌলিক নিয়মের উপর ভিত্তি করে গড়ে উঠেছে।`,
      englishContent: `Physics is an ancient branch of science. It deals with the physical world and its laws. 
Other branches of science like chemistry, biology, etc. are built upon the fundamental principles of physics.`
    },
    {
      id: 2,
      title: 'অধ্যায় ২: গতি / Chapter 2: Motion',
      banglaContent: `সময়ের সাথে কোনো বস্তুর অবস্থানের পরিবর্তনকে গতি বলে। 
যদি কোনো বস্তুর অবস্থানের পরিবর্তন না হয় তবে তাকে স্থির বস্তু বলে। গতির বিভিন্ন প্রকার রয়েছে যেমন রৈখিক গতি, ঘূর্ণন গতি ইত্যাদি।`,
      englishContent: `The change in position of an object over time is called motion. 
If an object does not change its position, it is called a stationary object. There are various types of motion such as linear motion, rotational motion, etc.`
    }
  ];

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('অনুগ্রহ করে একটি সঠিক PDF ফাইল নির্বাচন করুন। (Please select a valid PDF file.)');
    }
  };

  const processFile = () => {
    if (!file) return;
    setIsProcessing(true);
    // Simulate API call and processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-emerald-600" />
          বই প্রসেসিং (Book Processing)
        </h1>
      </div>

      {!isProcessed ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto mt-10">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">পিডিএফ বই আপলোড করুন</h2>
              <p className="text-gray-500 dark:text-gray-400">
                আপনার বইয়ের পিডিএফ ভার্সন আপলোড করলে সিস্টেম স্বয়ংক্রিয়ভাবে অধ্যায় অনুযায়ী বাংলা ও ইংরেজি অংশ আলাদা করে ফেলবে।
              </p>
            </div>

            {!file ? (
              <div>
                <input
                  type="file"
                  id="pdf-upload"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="pdf-upload"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-sm transition-colors duration-200"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  PDF নির্বাচন করুন
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 py-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">{file.name}</span>
                </div>
                
                <button
                  onClick={processFile}
                  disabled={isProcessing}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 shadow-sm transition-colors duration-200"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      প্রসেস করা হচ্ছে (Processing)...
                    </>
                  ) : (
                    <>
                      <Languages className="w-5 h-5 mr-2" />
                      ভাষা ও অধ্যায় আলাদা করুন
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chapter List (Sidebar) */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h3 className="font-bold text-gray-800 dark:text-white">অধ্যায়সমূহ (Chapters)</h3>
            </div>
            <div className="overflow-y-auto flex-1 p-2 space-y-1">
              {mockChapters.map((chapter, idx) => (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(idx)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors duration-150 ${
                    activeChapter === idx
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {chapter.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content View */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <h2 className="font-bold text-lg text-gray-800 dark:text-white truncate">
                {mockChapters[activeChapter].title}
              </h2>
              <button 
                onClick={() => { setFile(null); setIsProcessed(false); }}
                className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                নতুন পিডিএফ আপলোড করুন
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
              {/* Bengali Section */}
              <div className="flex-1 bg-amber-50/50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center mb-4 pb-2 border-b border-amber-200 dark:border-amber-800/50">
                  <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-md text-sm font-bold">বাংলা ভার্সন</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-lg font-bengali">
                  {mockChapters[activeChapter].banglaContent}
                </p>
              </div>

              {/* English Section */}
              <div className="flex-1 bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center mb-4 pb-2 border-b border-blue-200 dark:border-blue-800/50">
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-md text-sm font-bold">English Version</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-lg">
                  {mockChapters[activeChapter].englishContent}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
