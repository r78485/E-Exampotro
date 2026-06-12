import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

export default function OmrGenerate() {
  const [instName, setInstName] = useState('');
  const [address, setAddress] = useState('');
  const [bubbleSize, setBubbleSize] = useState('SMALL');
  const [infoType, setInfoType] = useState('DIGITAL');
  const [questionCount, setQuestionCount] = useState(100);

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto items-start">
      
      {/* Left: OMR Preview Visual (Mocked representation of the OMR sheet) */}
      <div className="flex-1 bg-white p-8 rounded-lg shadow-sm border border-gray-200 overflow-hidden min-w-[600px] flex justify-center">
        {/* A simple visual CSS representation of the OMR to match the vibe */}
        <div className="border-[3px] border-gray-800 p-8 w-[600px] relative font-sans bg-white">
          {/* Alignment markers */}
          <div className="absolute top-2 left-2 w-5 h-5 bg-black"></div>
          <div className="absolute top-2 right-2 w-5 h-5 bg-black"></div>
          <div className="absolute bottom-2 left-2 w-5 h-5 bg-black"></div>
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-black"></div>
          
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase text-red-600 mb-1">{instName || 'INSTITUTION NAME'}</h2>
            <p className="text-sm text-red-600">{address || 'Address or custom information'}</p>
          </div>

          {bubbleSize === 'SMALL' && (
            <div className="mb-6">
              <div className="text-center text-red-600 font-bold mb-4 bg-red-100 py-1">এই বক্সে কোনো দাগ দেয়া যাবে না।</div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-2 border border-red-500 p-2">
                  <div className="flex items-center gap-2"><div className="w-4 h-4 border border-red-500"></div> <span className="text-red-600 text-xs font-bold">অর্ধ-বার্ষিক পরীক্ষা</span></div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 border border-red-500"></div> <span className="text-red-600 text-xs font-bold">বার্ষিক পরীক্ষা</span></div>
                </div>
                <div className="flex flex-col gap-2 border border-red-500 p-2">
                  <div className="flex items-center gap-2"><div className="w-4 h-4 border border-red-500"></div> <span className="text-red-600 text-xs font-bold">মডেল টেস্ট পরীক্ষা</span></div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 border border-red-500"></div> <span className="text-red-600 text-xs font-bold">.................. পরীক্ষা</span></div>
                </div>
                <div className="flex items-stretch border border-red-500">
                  <div className="text-red-600 text-xs font-bold bg-red-100 p-2 flex items-center border-r border-red-500">প্রশ্নের সেট কোড</div>
                  <div className="flex gap-2 p-2 items-center">
                    {['ক','খ','গ','ঘ'].map(opt => <div key={opt} className="w-5 h-5 rounded-full border border-red-500 flex items-center justify-center text-red-500 font-bold text-[10px]">{opt}</div>)}
                  </div>
                </div>
                <div className="w-16 h-16 bg-gray-800 flex items-center justify-center border-2 border-black">
                  <span className="text-[8px] text-white">QR</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
                <div className="flex gap-2 items-end"><span className="text-black font-bold text-sm">নাম:</span> <div className="border-b border-red-500 border-dashed flex-1"></div></div>
                <div className="flex gap-2 items-end"><span className="text-black font-bold text-sm">রোল:</span> <div className="border-b border-red-500 border-dashed flex-1"></div></div>
                <div className="flex gap-2 items-end"><span className="text-black font-bold text-sm">শ্রেণি:</span> <div className="border-b border-red-500 border-dashed flex-1"></div></div>
                <div className="flex gap-2 items-end"><span className="text-black font-bold text-sm">বিভাগ:</span> <div className="border-b border-red-500 border-dashed flex-1"></div></div>
                <div className="flex gap-2 items-end col-span-2"><span className="text-black font-bold text-sm">বিষয়:</span> <div className="border-b border-red-500 border-dashed flex-1"></div></div>
              </div>
            </div>
          )}

          {bubbleSize === 'BIG' && infoType === 'MANUAL' && (
            <div className="flex gap-4 mb-8">
              <div className="border border-red-500 p-2 text-center w-24">
                <div className="bg-red-100 text-red-800 text-xs font-bold mb-2">শ্রেণী</div>
                <div className="flex flex-col items-center gap-1">
                  {[6,7,8,9,10].map(n => <div key={n} className="w-4 h-4 rounded-full border border-red-500 text-[8px] flex items-center justify-center text-red-500">{n}</div>)}
                </div>
              </div>
              
              <div className="border border-red-500 p-2 flex-grow">
                <div className="bg-red-100 text-red-800 text-xs font-bold mb-2 text-center">রোল নম্বর</div>
                <div className="flex justify-between px-4">
                  {[1,2,3,4,5].map(col => (
                     <div key={col} className="flex flex-col items-center gap-1">
                       {[0,1,2,3,4,5,6,7,8,9].map(n => <div key={n} className="w-4 h-4 rounded-full border border-red-500 text-[8px] flex items-center justify-center text-red-500">{n}</div>)}
                     </div>
                  ))}
                </div>
              </div>

              <div className="border border-red-500 p-2 text-center w-32">
                <div className="bg-red-100 text-red-800 text-xs font-bold mb-2">বিষয় কোড</div>
                 <div className="flex justify-between px-2">
                  {[1,2,3].map(col => (
                     <div key={col} className="flex flex-col items-center gap-1">
                       {[0,1,2,3,4,5,6,7,8,9].map(n => <div key={n} className="w-4 h-4 rounded-full border border-red-500 text-[8px] flex items-center justify-center text-red-500">{n}</div>)}
                     </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {bubbleSize === 'BIG' && infoType === 'DIGITAL' && (
            <div className="mb-8 flex flex-col border border-red-500 relative">
              <div className="p-4 border-b-2 border-dashed border-red-500 relative">
                <div className="absolute top-2 right-2 w-16 h-16 bg-gray-800 flex justify-center items-center text-[10px] text-white">QR</div>
                <h3 className="font-bold text-red-600 mb-2">স্টুডেন্ট পার্ট (Student Part)</h3>
                <div className="grid grid-cols-2 gap-4 w-3/4">
                  <div className="flex gap-2 items-end"><span className="text-black text-sm font-bold">নাম:</span> <div className="border-b border-red-500 border-dashed flex-1"></div></div>
                  <div className="flex gap-2 items-end"><span className="text-black text-sm font-bold">রোল:</span> <div className="border-b border-red-500 border-dashed flex-1"></div></div>
                  <div className="flex gap-2 items-end"><span className="text-black text-sm font-bold">বিষয়:</span> <div className="border-b border-red-500 border-dashed flex-1"></div></div>
                </div>
              </div>
              <div className="p-4 bg-red-50">
                <h3 className="font-bold text-red-600 mb-2">ওএমআর পার্ট (OMR Part) - সিকিউরড</h3>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-red-600 w-2/3">এই অংশে শিক্ষার্থীর কোনো ব্যক্তিগত তথ্য থাকবে না। শুধুমাত্র একটি অটো-জেনারেটেড নম্বর এবং কিউআর কোড থাকবে।</p>
                  <div className="w-16 h-16 bg-gray-800 flex justify-center items-center text-[10px] text-white">QR</div>
                </div>
                <div className="mt-2 text-center font-bold text-xl tracking-widest">#{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>
            </div>
          )}

          <div className="text-center font-bold text-red-600 text-sm mb-4 border-b-2 border-red-500 pb-1 uppercase">বহুনির্বাচনি অভীক্ষার উত্তরপত্র</div>

          {/* Questions Grid */}
          <div className={`grid gap-4 ${questionCount > 60 ? 'grid-cols-4' : (questionCount > 40 ? 'grid-cols-3' : 'grid-cols-2')}`}>
            {[...Array(Math.ceil(questionCount / 25))].map((_, col) => (
              <div key={col} className="border border-red-500">
                <div className="bg-red-100 text-red-800 text-[10px] font-bold flex justify-between px-2 py-1 border-b border-red-500">
                  <span>প্রশ্ন</span><span>উত্তর</span>
                </div>
                <div className="p-2 space-y-1.5">
                  {[...Array(25)].map((_, i) => {
                    const qNum = col * 25 + i + 1;
                    if (qNum > questionCount) return null;
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-red-600 w-4">{qNum}</span>
                        <div className="flex gap-1">
                          {['ক','খ','গ','ঘ'].map(opt => <div key={opt} className="w-4 h-4 rounded-full border border-red-500 text-[8px] flex items-center justify-center text-red-500 font-bold">{opt}</div>)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Settings Sidebar */}
      <div className="w-full md:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shrink-0 rounded-lg shadow-sm space-y-6">
        
        <div className="text-center pb-4 border-b dark:border-gray-700">
          <span className="font-semibold dark:text-gray-200">সেটিংস</span>
        </div>

        <button className="w-full bg-[#28a745] hover:bg-[#218838] text-white py-2 rounded flex items-center justify-center gap-2 transition">
          <Download className="w-4 h-4" /> ডাউনলোড
        </button>

        <div className="space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold border-b pb-1">হেডার</p>
          
          <div>
            <input 
              type="text" 
              placeholder="প্রতিষ্ঠানের নাম" 
              value={instName}
              onChange={e => setInstName(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">Size</span>
              <input type="range" className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <span className="text-xs">14</span>
            </div>
          </div>

          <div>
            <input 
              type="text" 
              placeholder="ঠিকানা বা কাস্টম কোনো তথ্য" 
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white mt-4"
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">Size</span>
              <input type="range" className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <span className="text-xs">14</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold border-b pb-1">টেমপ্লেট নির্বাচন করুন</p>
          <div className="flex gap-2">
            <div className="border-2 border-emerald-500 p-1 rounded cursor-pointer">
              <div className="w-16 h-20 bg-red-100/50 border border-red-200 flex flex-col gap-1 p-1">
                <div className="h-2 bg-red-200 w-full"></div>
                <div className="flex gap-1 h-full">
                  <div className="flex-1 bg-red-200/50"></div>
                  <div className="flex-1 bg-red-200/50"></div>
                </div>
              </div>
              <div className="text-[10px] text-center mt-1 text-emerald-600 font-bold">ইপ্রশ্নব্যাংক ডিফল্ট</div>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 p-1 rounded cursor-pointer opacity-50">
              <div className="w-16 h-20 bg-gray-100 border flex flex-col gap-1 p-1">
                <div className="h-2 bg-gray-300 w-full"></div>
                <div className="flex gap-1 h-full">
                   <div className="flex-1 bg-gray-200"></div>
                </div>
              </div>
              <div className="text-[10px] text-center mt-1">সাধারণ</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold border-b pb-1">সিগনেচার কাস্টমাইজ অপশন</p>
          <div className="grid grid-cols-4 gap-2">
            <button className="h-8 rounded bg-[#f25e6e] border-2 border-gray-800"></button>
            <button className="h-8 rounded bg-[#4facfe]"></button>
            <button className="h-8 rounded bg-[#43e97b]"></button>
            <button className="h-8 rounded bg-[#fa709a]"></button>
            <button className="h-8 rounded bg-[#f6d365]"></button>
            <button className="h-8 rounded bg-[#a18cd1]"></button>
            <button className="h-8 rounded bg-[#8fd3f4]"></button>
            <button className="h-8 rounded bg-[#84fab0]"></button>
          </div>
        </div>

        <div className="space-y-3">
           <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold border-b pb-1">গোলা ভরাট আকার</p>
           <div className="flex gap-2">
             <button onClick={() => setBubbleSize('SMALL')} className={`flex-1 rounded py-1 text-xs font-bold transition-colors ${bubbleSize === 'SMALL' ? 'bg-[#f25e6e] text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'}`}>SMALL</button>
             <button onClick={() => setBubbleSize('BIG')} className={`flex-1 rounded py-1 text-xs font-bold transition-colors ${bubbleSize === 'BIG' ? 'bg-[#f25e6e] text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'}`}>BIG</button>
           </div>
        </div>

        {bubbleSize === 'BIG' && (
          <div className="space-y-3">
             <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold border-b pb-1">পরীক্ষা ও পরীক্ষার্থীর তথ্যের ধরণ</p>
             <div className="flex gap-2">
               <button onClick={() => setInfoType('DIGITAL')} className={`flex-1 rounded py-1 text-xs font-bold transition-colors ${infoType === 'DIGITAL' ? 'bg-[#f25e6e] text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'}`}>DIGITAL</button>
               <button onClick={() => setInfoType('MANUAL')} className={`flex-1 rounded py-1 text-xs font-bold transition-colors ${infoType === 'MANUAL' ? 'bg-[#f25e6e] text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'}`}>MANUAL</button>
             </div>
          </div>
        )}

        <div className="space-y-3">
           <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold border-b pb-1">প্রশ্ন সংখ্যা</p>
           <div className="flex gap-2">
             {[40, 60, 80, 100].map(num => (
               <button 
                 key={num}
                 onClick={() => setQuestionCount(num)} 
                 className={`flex-1 rounded py-1 text-xs font-bold transition-colors ${questionCount === num ? 'bg-[#f25e6e] text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}
               >
                 {num}
               </button>
             ))}
           </div>
        </div>

        <div className="border border-green-200 bg-green-50 text-green-700 py-2 px-3 rounded flex items-center justify-center gap-2 text-sm font-medium mt-4">
          <CheckCircle2 className="w-4 h-4" /> This OMR is scannable.
        </div>

      </div>

    </div>
  );
}
