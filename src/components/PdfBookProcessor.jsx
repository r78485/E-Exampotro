import React, { useState } from 'react';
import { Upload, FileText, Loader2, BookOpen, Languages, CheckCircle2, Type } from 'lucide-react';

export default function PdfBookProcessor() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const [uploadMode, setUploadMode] = useState('pdf');
  const [bookName, setBookName] = useState('');
  const [bookClass, setBookClass] = useState('');
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [mcqText, setMcqText] = useState('');
  const [shortQuestionText, setShortQuestionText] = useState('');
  const [creativeQuestionText, setCreativeQuestionText] = useState('');

  const [mockChapters, setMockChapters] = useState([]);
  const [error, setError] = useState(null);

  const processText = () => {
    if (!bookName.trim() || !bookClass.trim() || !textTitle.trim() || !textContent.trim()) {
      setError('বইয়ের নাম, শ্রেণী, অধ্যায়ের নাম এবং টেক্সট অবশ্যই প্রদান করুন।');
      return;
    }
    setIsProcessing(true);
    setError(null);
    
    // Simulate text processing
    setTimeout(() => {
      setMockChapters([{
        id: Date.now(),
        title: textTitle,
        banglaContent: textContent,
        englishContent: 'অনুবাদ করার জন্য প্রস্তুত...'
      }]);
      setActiveChapter(0);
      setIsProcessed(true);
      setIsProcessing(false);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('অনুগ্রহ করে একটি সঠিক PDF ফাইল নির্বাচন করুন। (Please select a valid PDF file.)');
    }
  };

  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      // Send the file to our Node.js backend
      const response = await fetch('http://localhost:5000/api/process-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to process PDF');
      }

      const data = await response.json();
      
      if (data.chapters && data.chapters.length > 0) {
        setMockChapters(data.chapters);
        setActiveChapter(0);
        setIsProcessed(true);
      } else {
        throw new Error('No chapters could be extracted from this PDF.');
      }
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err.message || 'পিডিএফ প্রসেস করার সময় একটি সমস্যা হয়েছে।');
    } finally {
      setIsProcessing(false);
    }
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
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-3xl mx-auto mt-10">
          
          <div className="flex justify-center space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
            <button
              onClick={() => setUploadMode('pdf')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${uploadMode === 'pdf' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              <FileText className="w-5 h-5 mr-2" />
              PDF আপলোড
            </button>
            <button
              onClick={() => setUploadMode('text')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${uploadMode === 'text' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              <Type className="w-5 h-5 mr-2" />
              টেক্সট বই লিখুন
            </button>
          </div>

          {uploadMode === 'pdf' ? (
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
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                      {error}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">টেক্সট লিখে বই আপলোড করুন</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  সরাসরি টেক্সট কপি করে পেস্ট করুন অথবা লিখুন। এটি অটোমেশন করার জন্য অত্যন্ত কার্যকর।
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">বইয়ের নাম</label>
                  <input
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="যেমন: পদার্থবিজ্ঞান ১ম পত্র"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">শ্রেণী</label>
                  <input
                    type="text"
                    value={bookClass}
                    onChange={(e) => setBookClass(e.target.value)}
                    placeholder="যেমন: একাদশ-দ্বাদশ"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">অধ্যায়ের নাম</label>
                <input
                  type="text"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  placeholder="যেমন: প্রথম অধ্যায় - ভৌত জগৎ ও পরিমাপ"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">বইয়ের মূল টেক্সট</label>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="এখানে বইয়ের মূল টেক্সট লিখুন বা পেস্ট করুন..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">বহু নির্বাচনী প্রশ্ন (MCQ)</label>
                <textarea
                  value={mcqText}
                  onChange={(e) => setMcqText(e.target.value)}
                  placeholder="এখানে বহু নির্বাচনী প্রশ্ন লিখুন বা পেস্ট করুন..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">সংক্ষিপ্ত প্রশ্ন</label>
                <textarea
                  value={shortQuestionText}
                  onChange={(e) => setShortQuestionText(e.target.value)}
                  placeholder="এখানে সংক্ষিপ্ত প্রশ্ন লিখুন বা পেস্ট করুন..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">সৃজনশীল প্রশ্ন</label>
                <textarea
                  value={creativeQuestionText}
                  onChange={(e) => setCreativeQuestionText(e.target.value)}
                  placeholder="এখানে সৃজনশীল প্রশ্ন লিখুন বা পেস্ট করুন..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>
              <button
                onClick={processText}
                disabled={isProcessing}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 shadow-sm transition-colors duration-200 mt-4"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    প্রসেস করা হচ্ছে...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    টেক্সট সেভ করুন ও প্রসেস করুন
                  </>
                )}
              </button>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                  {error}
                </div>
              )}
            </div>
          )}
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
