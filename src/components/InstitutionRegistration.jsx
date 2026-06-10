import React, { useState, useEffect } from 'react';
import { Save, Building2, MapPin, Phone } from 'lucide-react';

export default function InstitutionRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    division: '',
    district: '',
    upazila: '',
    phone: '',
    address: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load existing data if any
    const savedData = localStorage.getItem('institutionData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('institutionData', JSON.stringify(formData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mt-8">
      <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <Building2 className="w-8 h-8 text-nctb-emerald" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">প্রতিষ্ঠান রেজিস্ট্রেশন</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            প্রতিষ্ঠানের নাম <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="name"
            required
            placeholder="প্রতিষ্ঠানের সম্পূর্ণ নাম লিখুন"
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              বিভাগ <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="division"
              required
              placeholder="বিভাগ"
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              value={formData.division} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              জেলা <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="district"
              required
              placeholder="জেলা"
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              value={formData.district} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              উপজেলা <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="upazila"
              required
              placeholder="উপজেলা"
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              value={formData.upazila} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <Phone className="w-4 h-4 mr-1" /> ফোন নম্বর
          </label>
          <input 
            type="tel" 
            name="phone"
            placeholder="যোগাযোগের নম্বর"
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <MapPin className="w-4 h-4 mr-1" /> নির্দিষ্ট ঠিকানা লিখুন (যদি থাকে)
          </label>
          <textarea 
            name="address"
            placeholder="এখানে জেলা বা উপজেলা লিখবেন না..."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition resize-none"
            value={formData.address} 
            onChange={handleChange} 
          ></textarea>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg flex justify-center items-center font-bold transition shadow-md"
          >
            <Save className="w-5 h-5 mr-2" /> 
            {isSaved ? 'সংরক্ষিত হয়েছে!' : 'রেজিস্টার্ড করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}
