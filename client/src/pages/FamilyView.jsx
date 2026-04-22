import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../utils/axios';
import { ShieldCheck, Calendar, Activity, CheckCircle, ChevronLeft, AlertCircle, Clock, Award, BookOpen } from 'lucide-react';

const FamilyView = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`/family/${uid}`);
        setData(res.data);
      } catch (err) {
        console.error("Family view fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [uid]);

  if (loading) return <div className="text-center p-20 text-2xl font-black text-navy">Loading Senior's Progress...</div>;
  if (!data) return <div className="text-center p-20 text-2xl font-black text-red-600">Senior Not Found</div>;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto pb-24 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b-2 border-gray-100 dark:border-gray-800">
         <div className="space-y-2">
            <h1 className="text-4xl text-navy dark:text-saffron mb-1">Caregiver View Profile 🛡️</h1>
            <p className="text-2xl font-black uppercase tracking-widest text-gray-400">Monitoring for: {data.name}</p>
         </div>
         <button onClick={() => navigate(-1)} className="btn-secondary min-w-0 px-8 h-16 text-xl font-bold flex items-center gap-2">
            <ChevronLeft size={24} /> Back
         </button>
      </header>

      <AnimatePresence>
        {data.inactiveAlert && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            className="bg-red-50 dark:bg-red-900 border-l-[12px] border-red-600 p-8 rounded-3xl shadow-2xl flex items-center gap-8 animate-pulse"
          >
             <div className="w-20 h-20 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 shrink-0">
                <AlertCircle size={44} />
             </div>
             <div>
                <h3 className="text-3xl font-black text-red-800 dark:text-red-100 mb-1 leading-tight">Attention Needed!</h3>
                <p className="text-xl font-bold text-red-700 dark:text-red-200">This user hasn't logged in for {data.daysSinceLogin} days. Please check in with them via phone.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="card p-10 space-y-4 shadow-2xl border-t-8 border-navy flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-50 dark:bg-navy rounded-full flex items-center justify-center text-navy dark:text-saffron mb-2">
               <Clock size={44} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-0">Last Active</h3>
            <p className="text-3xl font-black text-navy dark:text-white leading-tight">
               {data.lastLogin ? new Date(data.lastLogin).toLocaleDateString(undefined, {
                  month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
               }) : 'Never'}
            </p>
         </div>

         <div className="card p-10 space-y-4 shadow-2xl border-t-8 border-saffron flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900 rounded-full flex items-center justify-center text-saffron mb-2">
               <Award size={44} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-0">Modules Done</h3>
            <p className="text-6xl font-black text-navy dark:text-white leading-none">{data.modulesCompleted}</p>
         </div>
      </section>

      <section className="card p-10 space-y-10 shadow-2xl">
         <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-100 dark:border-navy">
            <Activity size={32} className="text-navy dark:text-saffron" />
            <h2 className="text-3xl font-black text-navy dark:text-gray-100 mb-0 uppercase tracking-widest">Detail Activity</h2>
         </div>

         <div className="space-y-8">
            {data.progress.length === 0 ? (
               <p className="text-center text-2xl font-bold text-gray-400 py-10 italic">No learning modules started yet.</p>
            ) : data.progress.map(p => (
               <div key={p.id} className="flex items-center justify-between gap-6 group">
                  <div className="flex items-center gap-6">
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all ${p.quizPassed ? 'bg-green-100 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
                        {p.quizPassed ? <CheckCircle size={32} /> : <BookOpen size={32} />}
                     </div>
                     <div className="space-y-1">
                        <h3 className="text-2xl font-black text-navy dark:text-saffron mb-0 uppercase tracking-widest">{p.moduleId.replace('-', ' ')}</h3>
                        <p className="text-lg font-bold text-gray-400">Steps Read: {p.stepsCompleted}</p>
                     </div>
                  </div>
                  <div className="flex flex-col items-end">
                     {p.quizPassed ? (
                        <span className="text-green-600 font-extrabold text-lg flex items-center gap-1 uppercase tracking-tighter">
                           Passed <Award size={18} />
                        </span>
                     ) : (
                        <span className="text-orange-500 font-extrabold text-lg uppercase tracking-tighter">In Progress</span>
                     )}
                     <span className="text-sm font-bold text-gray-400">
                        {new Date(p.updatedAt?.toDate ? p.updatedAt.toDate() : p.updatedAt).toLocaleDateString()}
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </section>

      <footer className="text-center p-12 space-y-4">
         <div className="flex items-center justify-center gap-3 text-navy dark:text-saffron">
            <ShieldCheck size={28} />
            <p className="text-xl font-black uppercase tracking-widest">DigiSaathi Secure View</p>
         </div>
         <p className="text-lg text-gray-400 font-bold">This summary link is private. Do not share it unauthorized.</p>
      </footer>
    </motion.div>
  );
};

export default FamilyView;
