import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsContext } from '../context/SettingsContext';
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/axios';
import { Settings, User, Phone, Globe, Type, Moon, Sun, ChevronLeft, LogOut, Save, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const { fontSize, setFontSize, theme, setTheme, language, setLanguage } = useContext(SettingsContext);
  const { user, dbUser, setDbUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [emergencyPhone, setEmergencyPhone] = useState(dbUser?.emergencyContact || '');
  const [userName, setUserName] = useState(dbUser?.name || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await axios.post('/auth/profile', {
        name: userName,
        emergencyContact: emergencyPhone,
        fontPreference: fontSize,
        language
      });
      setDbUser(res.data.user);
      setMessage('Settings Saved! 🎉');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("Profile update failed", err);
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const fonts = [
    { id: 'normal', label: 'Normal Text', size: '18px' },
    { id: 'large', label: 'Large Text', size: '22px' },
    { id: 'x-large', label: 'Extra Large', size: '26px' },
  ];

  const langs = [
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'en', name: 'English' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto pb-24 space-y-8">
      <div className="flex items-center gap-6 mb-10">
        <button onClick={() => navigate('/dashboard')} className="btn-secondary min-w-0 px-4">
           <ChevronLeft size={32} />
        </button>
        <h1 className="text-navy dark:text-saffron mb-0"><Settings size={36} className="inline mr-2" /> Settings</h1>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-green-100 text-green-800 p-4 rounded-2xl text-center font-black text-xl mb-6 shadow-md">
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleUpdateProfile} className="space-y-10">
        {/* Profile Card */}
        <section className="card space-y-8 p-10 shadow-2xl overflow-visible relative">
           <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-50 dark:bg-orange-900 rounded-full flex items-center justify-center -z-10 opacity-20 transform -rotate-12">
              <User size={100} />
           </div>

           <div className="space-y-4">
              <label className="text-2xl font-black text-navy dark:text-gray-100 flex items-center gap-3">
                 <User size={24} /> Full Name (आपका नाम)
              </label>
              <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="input-field h-20 text-2xl font-bold" 
                placeholder="Ex. Rahul Kumar" 
              />
           </div>

           <div className="space-y-4">
              <label className="text-2xl font-black text-red-600 flex items-center gap-3">
                 <ShieldAlert size={24} /> Emergency Contact (आपातकालीन नंबर)
              </label>
              <div className="relative">
                 <input 
                   type="tel" 
                   value={emergencyPhone}
                   onChange={(e) => setEmergencyPhone(e.target.value)}
                   className="input-field h-20 text-2xl font-bold pl-16 border-red-200 focus:border-red-600" 
                   placeholder="Ex. 9876543210" 
                 />
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
                    <Phone size={32} />
                 </div>
              </div>
              <p className="text-lg text-gray-500 font-medium">We'll show this button during emergencies.</p>
           </div>
        </section>

        {/* Display Settings */}
        <section className="card p-10 space-y-10 shadow-2xl">
           <div className="space-y-6">
              <label className="text-2xl font-black text-navy dark:text-gray-100 flex items-center gap-3">
                 <Type size={24} /> Text Size (लिखावट का आकार)
              </label>
              <div className="grid grid-cols-1 gap-4">
                {fonts.map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => { setFontSize(f.id); handleUpdateProfile(); }}
                    className={`btn-secondary h-20 text-left px-8 w-full block shadow-none border-4 ${fontSize === f.id ? 'bg-orange-50 border-saffron' : 'border-gray-100'}`}
                  >
                    <div className="flex justify-between items-center w-full">
                       <span className="font-bold flex flex-col">
                          <span className="text-xl uppercase tracking-widest text-gray-500">{f.label}</span>
                          <span style={{ fontSize: f.size }} className="text-navy dark:text-gray-100">See this text size</span>
                       </span>
                       <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${fontSize === f.id ? 'bg-saffron border-saffron text-white' : 'border-gray-300'}`}>
                          {fontSize === f.id && <Save size={20} />}
                       </div>
                    </div>
                  </button>
                ))}
              </div>
           </div>

           <div className="space-y-6">
              <label className="text-2xl font-black text-navy dark:text-gray-100 flex items-center gap-3">
                 <Globe size={24} /> Language (भाषा)
              </label>
              <select 
                value={language} 
                onChange={(e) => { setLanguage(e.target.value); handleUpdateProfile(); }}
                className="input-field h-20 text-2xl appearance-none pr-12 font-black "
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1.5rem center', backgroundSize: '2rem', backgroundRepeat: 'no-repeat' }}
              >
                {langs.map(l => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
           </div>
           
           <div className="space-y-6 pt-4 border-t-2 border-gray-100 dark:border-gray-700">
              <label className="text-2xl font-black text-navy dark:text-gray-100 flex items-center gap-3">
                 {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />} Screen Mode (दिन/रात का मोड)
              </label>
              <button 
                type="button"
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} 
                className={`w-full h-20 rounded-3xl flex items-center justify-between px-8 text-2xl font-black transition-all ${theme === 'light' ? 'bg-navy text-white' : 'bg-saffron text-navy'}`}
              >
                 <span>{theme === 'light' ? 'Switch to Night Mode' : 'Switch to Day Mode'}</span>
                 <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    {theme === 'light' ? <Moon size={40} /> : <Sun size={40} />}
                 </div>
              </button>
           </div>
        </section>

        <div className="pt-10 flex flex-col gap-6">
           <button 
             type="submit" 
             disabled={saving}
             className="btn-primary h-24 text-3xl font-black w-full bg-navy hover:bg-opacity-90 shadow-2xl flex items-center justify-center gap-4 active:scale-95"
           >
              {saving ? 'Saving...' : 'SAVE ALL SETTINGS'}
              <Save size={40} />
           </button>
           
           <button 
             type="button"
             onClick={logout}
             className="btn-secondary h-20 text-2xl font-black w-full text-red-600 border-red-600 hover:bg-red-50 flex items-center justify-center gap-4 shadow-xl mb-12"
           >
              LOGOUT / लॉग आउट
              <LogOut size={32} />
           </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileSettings;
