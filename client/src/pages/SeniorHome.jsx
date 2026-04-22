import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, User, CheckCircle, Video, PhoneCall, Wallet, MessageCircle, FileText, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pageTransition } from '../App';

const modules = [
  { id: 1, title: 'UPI Payments', desc: 'Send & receive money using PhonePe or GPay.', icon: Wallet, color: 'from-green-400 to-green-600', progress: 100 },
  { id: 2, title: 'WhatsApp Basics', desc: 'Make video calls and send photos to family.', icon: MessageCircle, color: 'from-blue-400 to-indigo-600', progress: 50 },
  { id: 3, title: 'Aadhaar & DigiLocker', desc: 'Keep your documents safe digitally.', icon: FileText, color: 'from-orange-400 to-red-500', progress: 0 },
  { id: 4, title: 'Fraud Protection', desc: 'Learn how to identify and avoid scams.', icon: ShieldCheck, color: 'from-purple-500 to-pink-600', progress: 0 },
];

const SeniorHome = () => {
  const [user, setUser] = useState({ name: 'Learner' });
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('digiUser');
    if (data) setUser(JSON.parse(data));
  }, []);

  return (
    <motion.div {...pageTransition} className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-32">
      
      {/* Top Navbar */}
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-glass">
        <div className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-success flex items-center gap-2">
          <span className="bg-gradient-success text-brandBgDark rounded-full w-8 h-8 flex items-center justify-center text-sm">DS</span>
          DigiSaathi
        </div>
        <div className="flex gap-4">
          <button className="relative p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-brandBgMid pulse"></span>
          </button>
          <button onClick={() => navigate('/profile')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <User size={24} />
          </button>
        </div>
      </div>

      {/* Greeting Card */}
      <div className="card-glass bg-gradient-to-r from-white/10 to-white/5 border-l-[6px] border-l-purple-400 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Namaste, {user.name.split(' ')[0]} ji! 🙏</h1>
          <p className="text-lg text-green-300 font-bold tracking-wide">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-textSecondary mt-2">You're doing great! Let's continue learning today.</p>
        </div>
        
        <div className="flex items-center gap-6 bg-brandBgDark/50 p-4 rounded-3xl border border-white/10">
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/10">
            {/* SVG Progress Circle */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="44" cy="44" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
              <circle cx="44" cy="44" r="40" stroke="#00f2fe" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="251" className="animate-[stroke_1.5s_ease-out_forwards]" style={{ strokeDashoffset: 251 - (251 * 0.3) }} />
            </svg>
            <span className="text-2xl font-black text-white drop-shadow-md">30%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white">Overall Progress</span>
            <span className="text-textSecondary text-sm font-medium uppercase tracking-widest mt-1">1 of 4 completed</span>
          </div>
        </div>
      </div>

      {/* Fraud Alert Banner */}
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/alerts')}
        className="card-glass border-l-8 border-l-red-500 bg-red-500/10 cursor-pointer flex items-center gap-4 py-4"
      >
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shrink-0 shadow-glow">
          <AlertTriangle size={28} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-red-400 font-black mb-1">⚠️ Urgent Fraud Alert</h3>
          <p className="text-white font-medium">Fake KYC call scam reported near you. Tap to learn how to identify it.</p>
        </div>
      </motion.div>

      {/* Learning Modules */}
      <div>
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
           <BookOpen size={28} className="text-blue-400" /> Start Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map(mod => (
            <motion.div 
              key={mod.id}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(102,126,234,0.4)" }}
              onClick={() => navigate(`/module/${mod.id}`)}
              className="card-glass cursor-pointer border-t-[6px] border-t-white/30 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${mod.color} group-hover:opacity-40 transition-opacity duration-300`}></div>
              <div className="relative z-10 flex gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-glow bg-gradient-to-br ${mod.color}`}>
                  <mod.icon size={32} strokeWidth={2.5} className="text-white drop-shadow-md" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 text-white">{mod.title}</h3>
                  <p className="text-sm font-medium text-textSecondary mb-4 leading-relaxed">{mod.desc}</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full shadow-glow bg-gradient-to-r ${mod.color}`} style={{ width: `${mod.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-black min-w-[32px]">{mod.progress}%</span>
                    {mod.progress === 100 && <CheckCircle size={18} className="text-green-400" />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Volunteer Session */}
      <div className="card-glass border-4 border-indigo-500/30 bg-indigo-500/10">
        <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
          <PhoneCall size={24} className="text-indigo-400" /> Upcoming Volunteer Call
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-5 w-full">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-indigo-400 flex items-center justify-center shadow-glow overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=c0aede" alt="Volunteer" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-lg text-white">Priya Sharma</p>
              <p className="text-indigo-300 font-medium text-sm mt-1 uppercase tracking-widest">Today at 4:00 PM</p>
            </div>
          </div>
          <button className="btn-success w-full sm:w-auto h-14 shrink-0 rounded-2xl font-black text-lg">
            <Video size={20} /> Join Call
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-6 w-20 h-20 rounded-full bg-gradient-accent text-white shadow-glow flex flex-col items-center justify-center z-40 border-4 border-brandBgMid pulse"
      >
        <PhoneCall size={28} />
        <span className="text-[10px] uppercase font-black tracking-tighter mt-1 leading-none">Help</span>
      </motion.button>

    </motion.div>
  );
};

export default SeniorHome;
