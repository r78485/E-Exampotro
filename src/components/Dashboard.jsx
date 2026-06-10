import React from 'react';
import { PlusSquare, FileText, CheckSquare, Globe, Clock, DollarSign, MessageCircle, BarChart3, Mail, CheckCircle2, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in text-gray-800 dark:text-gray-100 max-w-6xl mx-auto">
      
      {/* Top 4 Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => navigate('/exam-generator')} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition flex flex-col items-center justify-center space-y-3">
          <PlusSquare className="w-8 h-8 text-emerald-600" />
          <span className="font-semibold text-sm">১ ক্লিকে প্রশ্ন তৈরী</span>
          <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
        </button>
        <button className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition flex flex-col items-center justify-center space-y-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <span className="font-semibold text-sm">রেডি প্রশ্ন</span>
        </button>
        <button onClick={() => navigate('/omr-evaluate')} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition flex flex-col items-center justify-center space-y-3">
          <CheckSquare className="w-8 h-8 text-indigo-600" />
          <span className="font-semibold text-sm">OMR Evaluator</span>
        </button>
        <button className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition flex flex-col items-center justify-center space-y-3">
          <Globe className="w-8 h-8 text-purple-600" />
          <span className="font-semibold text-sm">অনলাইন পরীক্ষা তৈরী</span>
        </button>
      </div>

      {/* Impact & Updates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Impact Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 text-center">
          <h3 className="font-bold text-lg mb-1 flex justify-center items-center gap-2">
            <span className="text-xl">🚀</span> ইপ্রশ্নব্যাংকের লাইভ ইমপ্যাক্ট!
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">এখন পর্যন্ত শিক্ষকদের সাশ্রয় হওয়া সময় ও খরচ</p>
          
          <div className="flex justify-center gap-4 mb-6">
            <button className="px-4 py-1.5 bg-[#0f2847] text-white rounded-full text-sm font-medium">সকল ব্যবহারকারী</button>
            <button className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">আমার সঞ্চয়</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-green-200 dark:border-green-800 rounded-xl p-4 bg-green-50/50 dark:bg-green-900/20">
              <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium text-sm">সঞ্চয় হওয়া সময়</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">২০.৮৪ লাখ ঘন্টা</div>
              <div className="text-[10px] text-gray-500 mt-1">৮৯.৮৯ হাজার দিন বা ২৪৬.৯ বছর সময় বাঁচান!</div>
            </div>
            <div className="border border-green-200 dark:border-green-800 rounded-xl p-4 bg-green-50/50 dark:bg-green-900/20">
              <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium text-sm">সঞ্চয় হওয়া টাকা</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">৮.৬৯ কোটি টাকা</div>
              <div className="text-[10px] text-gray-500 mt-1">প্রতি প্রশ্ন = ১.৫ টাকা হিসেবে গণনা</div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-4">* প্রতিটি প্রশ্ন = ৫ মিনিট সাশ্রয় (প্রশ্ন তৈরী ও সম্পাদনার সময় বিবেচনা করে)</p>
        </div>

        {/* Updates Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-yellow-200 dark:border-yellow-800 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 text-center font-bold text-yellow-800 dark:text-yellow-400 flex items-center justify-center gap-2">
            <span>📢</span> ইপ্রশ্নব্যাংক আপডেট!
          </div>
          <div className="p-6 flex-grow">
            <p className="text-sm leading-relaxed mb-4">
              সফটওয়্যারের নতুন ফিচার, জরুরি আপডেট এবং নির্দেশনা – সবই আগে পাবেন আমাদের মেসেঞ্জার/হোয়াটসঅ্যাপ চ্যানেলে।
            </p>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span>দেরি না করে এখনই যুক্ত হন — না হলে গুরুত্বপূর্ণ কিছু মিস হয়ে যেতে পারে!</span>
            </div>
          </div>
          <div className="p-4 flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition shadow-md">
              <span>🔔</span> চ্যানেলে এখনই যুক্ত হোন
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      <div className="bg-green-100 dark:bg-green-900/40 rounded-xl overflow-hidden border border-green-200 dark:border-green-800">
        <div className="bg-green-200 dark:bg-green-800/60 p-2 text-center font-bold text-green-800 dark:text-green-300">
          💬 মতামত জানান!
        </div>
        <div className="p-6 text-center space-y-3">
          <h4 className="font-bold text-lg">আপনার চাওয়া, আমাদের দায়িত্ব!</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            প্রশ্ন তৈরী, OMR ইভ্যালুয়েটসহ যেকোনো উন্নতিতে আপনার মতামতই আমাদের সবচেয়ে গুরুত্বপূর্ণ!
          </p>
          <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-6 py-1.5 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            মতামত দিন
          </button>
        </div>
      </div>

      {/* Bottom Grid: Live DB & Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Database Update Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 text-center">
          <h3 className="font-bold mb-2"><span className="text-red-500">🔴 LIVE</span> ডাটাবেস আপডেট!</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            প্রতিদিন নতুন প্রশ্ন যুক্ত হচ্ছে আমাদের ডাটাবেসে! নিচে দেখুন আজকে কোন কোন শ্রেনীর কত প্রশ্ন যুক্ত হয়েছে লাইভ চার্টে।
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" /> New Question Added 6 minutes ago
          </div>
          
          {/* Simple CSS Chart */}
          <div className="h-48 border-b border-l border-gray-200 dark:border-gray-700 relative flex items-end justify-between px-4 pb-0 pt-6">
            {/* Y-axis labels */}
            <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400 pb-0">
              <span>2600-</span>
              <span>1950-</span>
              <span>1300-</span>
              <span>650-</span>
              <span>0-</span>
            </div>
            
            {/* Bars */}
            <div className="flex flex-col items-center w-8">
              <div className="text-[10px] mb-1">839</div>
              <div className="w-full bg-emerald-600 rounded-t-sm" style={{height: '35%'}}></div>
              <div className="text-[10px] mt-2">02 Jun</div>
            </div>
            <div className="flex flex-col items-center w-8">
              <div className="text-[10px] mb-1">1093</div>
              <div className="w-full bg-emerald-600 rounded-t-sm" style={{height: '45%'}}></div>
              <div className="text-[10px] mt-2">04 Jun</div>
            </div>
            <div className="flex flex-col items-center w-8">
              <div className="text-[10px] mb-1">688</div>
              <div className="w-full bg-emerald-600 rounded-t-sm" style={{height: '25%'}}></div>
              <div className="text-[10px] mt-2">05 Jun</div>
            </div>
            <div className="flex flex-col items-center w-8">
              <div className="text-[10px] mb-1">2085</div>
              <div className="w-full bg-emerald-600 rounded-t-sm" style={{height: '80%'}}></div>
              <div className="text-[10px] mt-2">06 Jun</div>
            </div>
            <div className="flex flex-col items-center w-8">
              <div className="text-[10px] mb-1">2432</div>
              <div className="w-full bg-emerald-600 rounded-t-sm" style={{height: '95%'}}></div>
              <div className="text-[10px] mt-2">07 Jun</div>
            </div>
            <div className="flex flex-col items-center w-8">
              <div className="text-[10px] mb-1">1923</div>
              <div className="w-full bg-emerald-600 rounded-t-sm" style={{height: '75%'}}></div>
              <div className="text-[10px] mt-2">08 Jun</div>
            </div>
          </div>
          <div className="text-[10px] text-gray-400 mt-6 mb-4">বারগুলোর উপরে হোভার করে তথ্য জানুন</div>
          <div className="flex justify-center gap-4 text-[10px] font-medium">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> একাদশ/দ্বাদশ</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> নবম-দশম</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> ষষ্ঠ-অষ্টম</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> তৃতীয়-পঞ্চম</span>
          </div>
        </div>

        {/* Live Chat / Support */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 text-center flex flex-col items-center justify-center">
          <h3 className="font-bold mb-4">লাইভ চ্যাট</h3>
          <p className="font-bold text-sm mb-2">আপনার কথা আমাদের কাছে সবচেয়ে মূল্যবান!</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            যেকোনো প্রশ্ন, পরামর্শ বা সমস্যার দ্রুত সমাধানে আমরা সবসময় আছি আপনার পাশে।
          </p>
          
          <div className="w-full max-w-xs space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 rounded-full py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <PhoneCall className="w-4 h-4 text-gray-400" /> +880 1711-476706
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full py-2 text-sm transition">
              <MessageCircle className="w-4 h-4" /> Open WhatsApp
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-[#0084FF] hover:bg-[#0073e6] text-white rounded-full py-2 text-sm transition">
              <MessageCircle className="w-4 h-4" /> Open Messenger
            </button>
            
            <div className="flex items-center gap-2 text-gray-400 text-xs py-2">
              <span className="h-px bg-gray-200 dark:bg-gray-700 flex-grow"></span>
              OR
              <span className="h-px bg-gray-200 dark:bg-gray-700 flex-grow"></span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" /> Mail: hello@eproshnobank.com
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
