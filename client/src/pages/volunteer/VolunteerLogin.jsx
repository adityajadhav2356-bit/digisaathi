import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, BookOpen } from 'lucide-react';
import PageTransition from '../../components/PageTransition';

const VolunteerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@volunteer.org');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      sessionStorage.setItem('ds_volunteer_token', 'mock-vol-token-123');
      navigate('/volunteer/dashboard');
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md">
        
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
            <BookOpen size={30} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">DigiSaathi Portal</h1>
          <p className="text-slate-500 font-medium tracking-wide text-sm uppercase mt-1">Youth Volunteer Platform</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100">
          <div className="flex items-center gap-3 mb-6 bg-blue-50 text-blue-700 p-3 rounded-xl border border-blue-100">
            <ShieldCheck size={20} className="shrink-0" />
            <p className="text-xs font-bold leading-tight">Secure portal for certified youth volunteers assisting senior citizens.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Email / ID</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" size={20} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-base font-semibold rounded-2xl h-14 pl-12 pr-4 focus:bg-white focus:border-blue-500 focus:ring-0 transition-all outline-none" 
                  placeholder="volunteer@college.edu" 
                />
              </div>
            </div>

            <div>
              <label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" size={20} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-base font-semibold rounded-2xl h-14 pl-12 pr-4 focus:bg-white focus:border-blue-500 focus:ring-0 transition-all outline-none" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <motion.button 
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl h-14 mt-6 shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-colors"
            >
              Sign In to Portal <ArrowRight size={20} />
            </motion.button>
          </form>
        </div>

        <button onClick={() => navigate('/')} className="w-full mt-6 text-slate-400 font-bold text-sm hover:text-slate-600 transition">
          ← Back to Senior App
        </button>

      </motion.div>
    </PageTransition>
  );
};

export default VolunteerLogin;
