import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import axios from '../utils/axios';
import { Users, Calendar, CheckSquare, Trophy, ChevronRight, MessageSquare, Clock, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VolunteerDashboard = () => {
  const { dbUser } = useContext(AuthContext);
  const { language } = useContext(SettingsContext);
  const [sessions, setSessions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('seniors'); // seniors, leaderboard

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionRes, leaderRes] = await Promise.all([
          axios.get('/volunteers/my-seniors'),
          axios.get('/volunteers/leaderboard')
        ]);
        setSessions(sessionRes.data);
        setLeaderboard(leaderRes.data);
      } catch (err) {
        console.error("Failed to load volunteer data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCompleteSession = async (sessionId) => {
    const notes = prompt("Add session notes (optional):");
    try {
      await axios.patch(`/volunteers/sessions/${sessionId}/complete`, { notes });
      // Update local state
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'completed', notes } : s));
      alert("Session completed! Thank you for your help. 💖");
    } catch (err) {
      console.error(err);
      alert("Failed to complete session.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto pb-24 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-gray-100 dark:border-gray-800 pb-10">
        <div className="space-y-1">
          <h1 className="text-4xl text-navy dark:text-saffron mb-2">Hello, Teacher {dbUser?.name}! 🎓</h1>
          <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">You've helped {sessions.filter(s => s.status === 'completed').length} seniors so far!</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-navy p-2 rounded-2xl shadow-inner border-2 border-gray-50 dark:border-navy">
           <button onClick={() => setActiveTab('seniors')} className={`h-16 px-8 rounded-xl text-xl font-bold transition-all shadow-none ${activeTab === 'seniors' ? 'bg-white dark:bg-gray-800 text-navy dark:text-saffron shadow-md scale-105' : 'text-gray-500'}`}>Paired Seniors</button>
           <button onClick={() => setActiveTab('leaderboard')} className={`h-16 px-8 rounded-xl text-xl font-bold transition-all shadow-none ${activeTab === 'leaderboard' ? 'bg-white dark:bg-gray-800 text-navy dark:text-saffron shadow-md scale-105' : 'text-gray-500'}`}>Leaderboard</button>
        </div>
      </header>

      {loading ? <p className="text-center text-xl">Loading teaching dashboard...</p> : (
        <AnimatePresence mode="wait">
          {activeTab === 'seniors' ? (
            <motion.div key="seniors" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
               <h2 className="text-3xl text-navy dark:text-gray-100 flex items-center gap-4">
                  <Users size={32} className="text-saffron" /> Your Active Sessions
               </h2>
               {sessions.length === 0 ? (
                 <div className="card text-center p-20 space-y-6 bg-gray-50 dark:bg-navy border-dashed border-4 border-gray-200 dark:border-navy">
                    <p className="text-2xl text-gray-400 font-bold">No paired seniors yet. Requests will appear here!</p>
                    <button className="btn-secondary h-16 px-8 bg-white border-navy text-navy font-black text-xl hover:bg-navy hover:text-white">WAIT FOR REQUESTS</button>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 gap-6">
                    {sessions.map(session => (
                      <div key={session.id} className="card p-8 border-l-8 border-navy hover:shadow-2xl transition-all shadow-xl bg-white dark:bg-gray-800">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                           <div className="flex items-center gap-6">
                              <div className="w-20 h-20 bg-blue-50 dark:bg-navy rounded-full flex items-center justify-center text-navy dark:text-saffron shadow-inner">
                                 <UserCheck size={40} />
                              </div>
                              <div className="space-y-1">
                                 <h3 className="text-2xl font-black text-navy dark:text-saffron mb-0 uppercase tracking-widest">{session.seniorId.slice(-6)} (Senior)</h3>
                                 <div className="flex items-center gap-2 text-lg font-bold text-gray-500">
                                    <MessageSquare size={18} />
                                    <span>Speaks: {session.language === 'hi' ? 'Hindi' : 'English'}</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-lg font-bold text-gray-500">
                                    <Clock size={18} />
                                    <span>Requested: {new Date(session.createdAt?.toDate ? session.createdAt.toDate() : session.createdAt).toLocaleString()}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="flex flex-col gap-4">
                              <span className={`px-4 py-2 rounded-xl text-sm font-black uppercase text-center tracking-widest ${session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                 {session.status}
                              </span>
                              {session.status !== 'completed' && (
                                 <button onClick={() => handleCompleteSession(session.id)} className="btn-primary h-16 bg-navy text-xl font-bold flex items-center gap-2 px-10 hover:bg-opacity-90 shadow-lg">
                                    <CheckSquare size={24} /> Mark Complete
                                 </button>
                              )}
                           </div>
                        </div>
                        {session.notes && (
                           <div className="mt-8 pt-6 border-t-2 border-gray-50 dark:border-gray-700">
                              <p className="text-lg font-bold text-navy dark:text-gray-300 italic flex items-center gap-2">
                                 <MessageSquare size={20} /> Your Notes: "{session.notes}"
                              </p>
                           </div>
                        )}
                      </div>
                    ))}
                 </div>
               )}
            </motion.div>
          ) : (
            <motion.div key="leaderboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
               <h2 className="text-3xl text-navy dark:text-gray-100 flex items-center gap-4">
                  <Trophy size={32} className="text-saffron" /> Top Volunteers
               </h2>
               <div className="card p-0 overflow-hidden shadow-2xl border-4 border-navy border-t-[12px]">
                  <table className="w-full text-left">
                     <thead className="bg-navy text-white text-xl uppercase tracking-widest">
                        <tr>
                           <th className="p-8">Rank</th>
                           <th className="p-8">Teacher ID</th>
                           <th className="p-8 text-right">Sessions Completed</th>
                        </tr>
                     </thead>
                     <tbody className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                        {leaderboard.length === 0 ? (
                           <tr><td colSpan="3" className="p-20 text-center text-gray-400">Be the first to help a senior today!</td></tr>
                        ) : leaderboard.map((item, index) => (
                           <tr key={index} className={`border-b-2 border-gray-50 dark:border-navy transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${index === 0 ? 'bg-orange-50 dark:bg-navy' : ''}`}>
                              <td className="p-8">
                                 <div className="flex items-center gap-4">
                                    {index < 3 ? <span className="text-4xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span> : `#${index + 1}`}
                                 </div>
                              </td>
                              <td className="p-8 text-navy dark:text-saffron font-black uppercase tracking-wider">{item.volunteerId.slice(-6)}</td>
                              <td className="p-8 text-right text-4xl font-black text-navy dark:text-white">
                                 <div className="flex items-center justify-end gap-3">
                                    {item.sessions} <CheckSquare size={32} className="text-green-500" />
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default VolunteerDashboard;
