import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Award, Phone, Globe, Type, Moon, Sun, Edit2, ShieldAlert, BookOpen, Star, Calendar, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pageTransition } from '../App';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Learner', city: 'Mumbai', font: 'Normal', language: 'en', emergencyName: '', emergencyPhone: '' });
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('digiUser');
    if (data) setUser(JSON.parse(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('digiUser');
    localStorage.removeItem('tempRole');
    navigate('/login');
  };

  return (
    <motion.div {...pageTransition} className="max-w-4xl mx-auto px-4 py-8 pb-32 space-y-10">
      
      {/* Header Profile Info */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-primary shadow-glow">
            <div className="w-full h-full bg-brandBgDark rounded-full p-2">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=transparent`} alt="Avatar" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition">
             <Edit2 size={16} />
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-black">{user.name}</h1>
          <p className="text-textSecondary font-bold mt-1 uppercase tracking-widest text-sm bg-white/5 py-1 px-4 rounded-full border border-white/10 w-fit mx-auto">📍 {user.city}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
         <div className="card-glass p-4 text-center border-t-4 border-purple-400">
            <BookOpen size={24} className="mx-auto mb-2 text-purple-400" />
            <h3 className="text-2xl font-black mb-0">2</h3>
            <p className="text-[10px] text-textSecondary uppercase font-bold tracking-wider">Modules Done</p>
         </div>
         <div className="card-glass p-4 text-center border-t-4 border-pink-400">
            <Calendar size={24} className="mx-auto mb-2 text-pink-400" />
            <h3 className="text-2xl font-black mb-0">1</h3>
            <p className="text-[10px] text-textSecondary uppercase font-bold tracking-wider">Sessions Done</p>
         </div>
         <div className="card-glass p-4 text-center border-t-4 border-blue-400">
            <Award size={24} className="mx-auto mb-2 text-blue-400" />
            <h3 className="text-2xl font-black mb-0">3</h3>
            <p className="text-[10px] text-textSecondary uppercase font-bold tracking-wider">Days Active</p>
         </div>
      </div>

      {/* Settings Section */}
      <div className="card-glass space-y-6">
        <h2 className="text-xl font-black flex items-center gap-3 border-b border-white/10 pb-4">
           <Settings size={24} className="text-gray-400" /> App Settings
        </h2>

        <div className="space-y-3">
          <label className="text-sm font-bold text-textSecondary flex items-center gap-2"><Type size={16} /> Font Size</label>
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
             {['Normal', 'Large', 'Extra Large'].map(f => (
               <button key={f} onClick={() => setUser({...user, font: f})} className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${user.font === f ? 'bg-gradient-success text-brandBgDark shadow-sm' : 'hover:bg-white/10'}`}>
                  {f}
               </button>
             ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-textSecondary flex items-center gap-2"><Globe size={16} /> Language</label>
          <div className="flex flex-wrap gap-2">
             {['Hindi', 'English', 'Marathi', 'Tamil', 'Bengali'].map(l => (
               <button key={l} onClick={() => setUser({...user, language: l})} className={`px-4 py-2 text-sm font-bold rounded-full transition border ${user.language === l ? 'bg-gradient-warm text-brandBgDark border-transparent shadow-sm' : 'bg-transparent border-white/20 hover:bg-white/10'}`}>
                  {l}
               </button>
             ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <label className="text-sm font-bold text-textSecondary flex items-center gap-2">
             {darkMode ? <Moon size={16} /> : <Sun size={16} />} Dark Mode
          </label>
          <button onClick={() => setDarkMode(!darkMode)} className={`w-14 h-8 rounded-full p-1 transition-colors ${darkMode ? 'bg-green-400' : 'bg-gray-600'}`}>
             <motion.div layout className={`w-6 h-6 rounded-full bg-white shadow-sm ${darkMode ? 'ml-auto' : ''}`} />
          </button>
        </div>
      </div>

      {/* Emergency Contact & Volunteer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="card-glass border-4 border-red-500/30 bg-red-500/5 relative overflow-hidden">
            <ShieldAlert size={120} className="absolute -bottom-10 -right-10 text-red-500/10 pointer-events-none" />
            <div className="flex justify-between items-start mb-4 relative z-10">
               <h3 className="text-lg font-black text-red-300 flex items-center gap-2 mb-0"><Phone size={20} /> Emergency Contact</h3>
               <button className="text-white/50 hover:text-white"><Edit2 size={16} /></button>
            </div>
            <div className="relative z-10">
               <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-white mb-1">{user.emergencyName || 'Not Set'}</p>
               <p className="text-sm text-red-200/80 font-mono tracking-widest">{user.emergencyPhone || '---'}</p>
            </div>
         </div>

         <div className="card-glass border-4 border-indigo-500/30 bg-indigo-500/5">
            <h3 className="text-lg font-black text-indigo-300 flex items-center gap-2 mb-4"><User size={20} /> My Volunteer</h3>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-indigo-900 border-2 border-indigo-400 p-0.5 overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=c0aede" alt="Volunteer" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                     <p className="font-bold text-lg mb-1">Priya Sharma</p>
                     <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                  </div>
               </div>
               <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition">Request</button>
            </div>
         </div>
      </div>

      {/* Achievements */}
      <div>
         <h2 className="text-xl font-black flex items-center gap-3 mb-6"><Award size={24} className="text-yellow-400" /> Your Badges</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
               { icon: '🥇', label: 'First Module' },
               { icon: '🛡️', label: 'Fraud Fighter' },
               { icon: '📅', label: '7-Day Streak' },
               { icon: '🌟', label: 'Quick Learner' }
            ].map((badge, i) => (
               <div key={i} className="card-glass p-6 text-center bg-white/5 hover:bg-white/10 transition cursor-default">
                  <span className="text-5xl drop-shadow-lg mb-4 block">{badge.icon}</span>
                  <span className="text-sm font-bold text-textSecondary">{badge.label}</span>
               </div>
            ))}
         </div>
      </div>

      <button onClick={handleLogout} className="btn-danger w-full h-16 font-black uppercase tracking-widest gap-3 drop-shadow-xl mt-12 mb-8">
         <LogOut size={24} /> Sign Out Securely
      </button>

    </motion.div>
  );
};

export default Profile;
