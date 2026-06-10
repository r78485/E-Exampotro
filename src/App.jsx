import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Search, Moon, Sun, Home, Layers } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SubjectView from './components/SubjectView';
import ExamGenerator from './components/ExamGenerator';
import Sidebar from './components/Sidebar';
import OmrEvaluate from './components/OmrEvaluate';
import OmrGenerate from './components/OmrGenerate';
import InstitutionRegistration from './components/InstitutionRegistration';
import PdfBookProcessor from './components/PdfBookProcessor';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        {/* Navigation Bar */}
        <header className="bg-nctb-green dark:bg-gray-800 text-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-nctb-light" />
              <span className="text-xl font-bold tracking-wide">ই-প্রশ্ন ব্যাংক</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="খুঁজুন..." 
                  className="pl-9 pr-4 py-1 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                <Search className="w-5 h-5 absolute left-3 top-1.5 text-gray-400" />
              </div>
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-emerald-600 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Layout with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          
          {/* Main Content Area */}
          <main className="flex-grow container mx-auto px-4 py-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subject/:classId/:subjectId" element={<SubjectView />} />
              <Route path="/exam-generator" element={<ExamGenerator />} />
              <Route path="/omr-evaluate" element={<OmrEvaluate />} />
              <Route path="/omr-generate" element={<OmrGenerate />} />
              <Route path="/my-institution" element={<InstitutionRegistration />} />
              <Route path="/pdf-processor" element={<PdfBookProcessor />} />
              {/* Add placeholders for the other routes here if needed */}
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-auto py-6">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} E-Question Bank. Developed according to NCTB Guidelines.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
