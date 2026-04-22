import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { Phone, AlertCircle, CheckCircle, ChevronRight, BookOpen } from 'lucide-react';

const SeniorDashboard = () => {
  const { user, dbUser } = useContext(AuthContext);
  const { language } = useContext(SettingsContext);
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modRes, progRes, alertRes] = await Promise.all([
          axios.get('/modules'),
          axios.get('/modules/progress'),
          axios.get('/alerts')
        ]);
        setModules(modRes.data);
        setProgress(progRes.data);
        setAlerts(alertRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const overallProgress = modules.length > 0 
    ? Math.round((progress.filter(p => p.quizPassed).length / modules.length) * 100) 
    : 0;

  const today = new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  if (loading) return <div className="text-center p-12 text-2xl font-bold text-navy">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-10 pb-20 max-w-4xl mx-auto"
    >
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b-2 border-gray-100 pb-8 dark:border-gray-800">
        <div className="space-y-1">
          <h1 className="text-4xl">Namaste, {dbUser?.name || 'Aapke Saathi'}! 🙏</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">{today}</p>
        </div>
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Overall Learning</span>
            <span>{overallProgress}%</span>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${overallProgress}%` }}
               transition={{ duration: 1.5 }}
               className="h-full bg-saffron"
             />
          </div>
        </div>
      </header>

      {/* Fraud Alert Banner */}
      {alerts.length > 0 && (
        <motion.div 
          onClick={() => navigate('/fraud')}
          whileHover={{ scale: 1.02 }}
          className="bg-red-50 dark:bg-red-900 shadow-md border-l-8 border-red-600 p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-95"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 shrink-0">
               <AlertCircle size={40} />
            </div>
            <div>
              <h3 className="text-red-800 dark:text-red-100 text-2xl font-extrabold mb-1">New Fraud Warning!</h3>
              <p className="text-lg text-red-700 dark:text-red-200 font-medium">{alerts[0].title}</p>
            </div>
          </div>
          <ChevronRight size={32} className="text-red-500" />
        </motion.div>
      )}

      {/* Learning Modules */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {modules.map((mod) => {
          const modProg = progress.find(p => p.moduleId === mod.id);
          const isCompleted = modProg?.quizPassed;
          
          return (
            <Link 
              key={mod.id} 
              to={`/module/${mod.id}`}
              className="card group hover:border-saffron hover:shadow-2xl transition-all cursor-pointer block no-underline"
            >
              <div className="flex items-center gap-6 mb-4">
                <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform block">{mod.icon}</span>
                <div className="flex-grow">
                   <h3 className="text-2xl font-extrabold text-navy dark:text-saffron mb-0">{mod.title}</h3>
                   {isCompleted ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 w-fit mt-1">
                        <CheckCircle size={14} /> Completed
                      </span>
                   ) : (
                      <p className="text-base text-gray-500 mt-1">{mod.description}</p>
                   )}
                </div>
                <ChevronRight size={32} className="text-gray-300 group-hover:text-saffron" />
              </div>
            </Link>
          );
        })}
      </section>

      {/* Large Help Buttons */}
      <footer className="grid grid-cols-1 gap-6 pt-10">
        <button 
          onClick={() => navigate('/pairing')}
          className="bg-navy h-20 w-full text-white text-3xl flex items-center justify-center gap-4 hover:bg-opacity-95 shadow-2xl active:scale-95 transition-all rounded-3xl"
        >
          <Phone size={40} className="text-saffron" />
          Call My Volunteer
        </button>
      </footer
      >
    </motion.div>
  );
};

export default SeniorDashboard;
