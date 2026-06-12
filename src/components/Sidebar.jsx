import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Zap, 
  Database, 
  Package, 
  FileText, 
  Settings, 
  ListTodo, 
  Globe, 
  Users, 
  Building2, 
  CreditCard, 
  FileScan, 
  PlaySquare, 
  PlusSquare, 
  KeyRound, 
  CheckSquare, 
  HelpCircle, 
  PhoneCall, 
  MessageSquareQuote
} from 'lucide-react';

const menuGroups = [
  {
    title: 'মেইন মেনু',
    items: [
      { name: 'ড্যাশবোর্ড', icon: LayoutDashboard, path: '/' },
      { name: '১ ক্লিকে প্রশ্ন তৈরী', icon: Zap, path: '/exam-generator' },
      { name: 'প্রশ্নব্যাংক', icon: Database, path: '/question-bank' },
      { name: 'প্যাকেজ', icon: Package, path: '/packages' },
      { name: 'রেডি প্রশ্ন/সাজেশন', icon: FileText, path: '/suggestions' },
    ]
  },
  {
    title: 'ব্যবস্থাপনা',
    items: [
      { name: 'বই আপলোড (পিডিএফ/টেক্সট)', icon: FileScan, path: '/pdf-processor' },
      { name: 'আমার তৈরী প্রশ্ন', icon: ListTodo, path: '/my-questions' },
      { name: 'অনলাইন পরীক্ষা', icon: Globe, path: '/online-exam' },
      { name: 'শিক্ষার্থী', icon: Users, path: '/students' },
    ]
  },
  {
    title: 'প্রতিষ্ঠান সংক্রান্ত',
    items: [
      { name: 'আমার প্রতিষ্ঠান', icon: Building2, path: '/my-institution' },
      { name: 'আমার সাবস্ক্রিপশন', icon: CreditCard, path: '/subscription' },
    ]
  },
  {
    title: 'OMR সংক্রান্ত',
    items: [
      { name: 'OMR টিউটোরিয়াল', icon: PlaySquare, path: '/omr-tutorial' },
      { name: 'OMR তৈরী', icon: PlusSquare, path: '/omr-generate' },
      { name: 'OMR টোকেন', icon: KeyRound, path: '/omr-token' },
      { name: 'OMR মূল্যায়ন', icon: CheckSquare, path: '/omr-evaluate' },
    ]
  },
  {
    title: 'হেল্প লাইন',
    items: [
      { name: 'যোগাযোগ', icon: PhoneCall, path: '/contact' },
      { name: 'মতামত', icon: MessageSquareQuote, path: '/feedback' },
    ]
  }
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block overflow-y-auto shrink-0 h-[calc(100vh-64px)] sticky top-16 scrollbar-thin">
      <div className="p-4 space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-3">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <li key={itemIdx}>
                    <Link 
                      to={item.path}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-nctb-emerald transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
