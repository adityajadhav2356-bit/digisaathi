import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import axios from '../utils/axios';
import { PhoneCall, Calendar, Clock, Globe, UserCheck, ChevronLeft, ShieldCheck, Heart, Users, MessageSquare, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VolunteerPairing = () => {
  const { dbUser } = useContext(AuthContext);
  const { language } = useContext(SettingsContext);
  const navigate = useNavigate();

  const [volunteers, setVolunteers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Form states
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedLang, setSelectedLang] = useState(language);
  const [timeSlot, setTimeSlot] = useState('morning'); // morning, afternoon, evening

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [volRes, sessRes] = await Promise.all([
          axios.get('/volunteers'),
          axios.get('/volunteers/my-seniors') // In a real app we'd filter by seniorId on backend
        ]);
        setVolunteers(volRes.data);
        setSessions(sessRes.data.filter(s => s.seniorId === dbUser?.uid));
      } catch (err) {
        console.error("Failed to load pairing data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dbUser]);

  const handleRequest = async (e) => {
    e.preventDefault();
    setRequesting(true);
    try {
      await axios.post('/volunteers/request-session', {
        volunteerId: selectedVolunteer || (volunteers[0]?.id),
        language: selectedLang,
        scheduledAt: timeSlot
      });
      alert("Request Sent! A volunteer will call you soon. 🙏");
      setShowRequestForm(false);
      window.location.reload(); // Refresh to see session
    } catch (err) {
      console.error(err);
      alert("Failed to send request.");
    } finally {
      setRequesting(false);
    }
  };

  const slots = [
    { id: 'morning', label: 'Morning (10 AM - 12 PM)', icon: '☀️' },
    { id: 'afternoon', label: 'Afternoon (2 PM - 4 PM)', icon: '🌤️' },
    { id: 'evening', label: 'Evening (5 PM - 7 PM)', icon: '🌙' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto pb-24 space-y-12">
      <div className="flex items-center gap-6 mb-10">
        <button onClick={() => navigate('/dashboard')} className="btn-secondary min-w-0 px-4">
           <ChevronLeft size={32} />
        </button>
        <h1 className="text-navy dark:text-saffron mb-0">Call My Volunteer 📞</h1>
      </div>

      {!showRequestForm ? (
        <div className="space-y-12">
          {/* Main Action Card */}
          <div 
            onClick={() => setShowRequestForm(true)}
            className="card bg-saffron text-white p-12 text-center flex flex-col items-center gap-6 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 p-8 opacity-10">
               <Heart size={160} />
            </div>
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-saffron shadow-xl -mt-6">
               <PhoneCall size={56} className="animate-bounce-slow" />
            </div>
            <h2 className="text-4xl font-extrabold text-navy leading-tight mb-2">Request a Private Help Session</h2>
            <p className="text-2xl font-bold text-orange-950 opacity-80 max-w-lg">Get 1-on-1 help on any mobile app or government service from our verified youth volunteers.</p>
            <button className="btn-primary bg-navy text-white text-3xl font-black h-24 w-full max-w-md mt-6 shadow-2xl flex items-center justify-center gap-4">
               <Users size={40} /> TALK TO VOLUNTEER
            </button>
          </div>

          {/* Active / Past Sessions */}
          <section className="space-y-8">
            <h2 className="text-navy dark:text-gray-100 flex items-center gap-4">
               <UserCheck size={32} /> Your Session History
            </h2>
            {loading ? <p className="text-center text-xl">Loading sessions...</p> : sessions.length === 0 ? (
               <div className="card text-center p-20 bg-gray-50 border-dashed border-4 border-gray-200">
                  <p className="text-2xl text-gray-400 font-bold">No sessions found. Request your first one above!</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 gap-6">
                 {sessions.map(sess => (
                   <div key={sess.id} className="card p-8 border-l-8 border-navy hover:shadow-2xl transition-all shadow-lg bg-white dark:bg-gray-800">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-orange-50 dark:bg-navy rounded-full flex items-center justify-center text-saffron shadow-inner">
                               <ShieldCheck size={40} />
                            </div>
                            <div className="space-y-1">
                               <h3 className="text-2xl font-black text-navy dark:text-saffron mb-0 uppercase tracking-widest">{sess.status === 'completed' ? 'Session Done 🎉' : 'Requested... ⏳'}</h3>
                               <p className="text-lg font-bold text-gray-400 flex items-center gap-2">
                                  <Clock size={20} /> Slot: {sess.scheduledAt?.toUpperCase()}
                               </p>
                               <p className="text-lg font-bold text-gray-400 flex items-center gap-2">
                                  <Globe size={20} /> Lang: {sess.language === 'hi' ? 'Hindi' : 'English'}
                               </p>
                            </div>
                         </div>
                         <div className="flex flex-col gap-4">
                            <span className={`px-6 py-2 rounded-xl text-lg font-black uppercase text-center tracking-widest ${sess.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600 animate-pulse'}`}>
                               {sess.status}
                            </span>
                         </div>
                      </div>
                      {sess.notes && (
                         <div className="mt-8 p-6 bg-gray-50 dark:bg-navy rounded-2xl">
                            <p className="text-xl font-bold text-navy dark:text-gray-200 italic flex items-center gap-2">
                               <MessageSquare size={24} /> Volunteer Notes: "{sess.notes}"
                            </p>
                         </div>
                      )}
                   </div>
                 ))}
               </div>
            )}
          </section>
        </div>
      ) : (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card shadow-2xl p-10 space-y-10 border-t-[12px] border-navy relative">
           <button onClick={() => setShowRequestForm(false)} className="btn-secondary h-12 px-6 shadow-none absolute top-6 right-6">Back</button>
           
           <div className="text-center space-y-2 pb-6 border-b-2 border-gray-100 dark:border-navy">
              <h2 className="text-4xl text-navy dark:text-saffron font-black mb-1 flex items-center justify-center gap-4">
                 <ShieldCheck size={40} /> Request Form
              </h2>
              <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">Help is just a click away!</p>
           </div>

           <form onSubmit={handleRequest} className="space-y-10">
              <div className="space-y-6">
                 <label className="text-2xl font-black text-navy dark:text-gray-100 flex items-center gap-3">
                    <Globe size={24} /> 1. Select Language (भाषा चुनें)
                 </label>
                 <div className="grid grid-cols-2 gap-4">
                    {['hi', 'en'].map(l => (
                      <button 
                        key={l}
                        type="button"
                        onClick={() => setSelectedLang(l)}
                        className={`btn-secondary h-20 text-2xl font-black ${selectedLang === l ? 'bg-orange-50 border-saffron border-4' : ''}`}
                      >
                         {l === 'hi' ? 'Hindi / हिन्दी' : 'English'}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <label className="text-2xl font-black text-navy dark:text-gray-100 flex items-center gap-3">
                    <Calendar size={24} /> 2. Preferred Time Slot (समय चुनें)
                 </label>
                 <div className="grid grid-cols-1 gap-4">
                    {slots.map(s => (
                      <button 
                        key={s.id}
                        type="button"
                        onClick={() => setTimeSlot(s.id)}
                        className={`btn-secondary h-20 px-8 text-2xl font-black flex items-center justify-between ${timeSlot === s.id ? 'bg-orange-50 border-saffron border-4' : ''}`}
                      >
                         <span className="flex items-center gap-4">
                            <span className="text-3xl">{s.icon}</span> {s.label}
                         </span>
                         {timeSlot === s.id && <CheckCircle size={28} className="text-saffron" />}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="pt-8 border-t-2 border-gray-100 dark:border-navy">
                 <button 
                   type="submit" 
                   disabled={requesting}
                   className="btn-primary h-24 text-3xl font-black w-full bg-navy hover:bg-opacity-90 shadow-2xl flex items-center justify-center gap-4 uppercase active:scale-95"
                 >
                    {requesting ? 'Sending Request...' : 'Confirm Request 🙏'}
                 </button>
                 <p className="text-center mt-4 text-lg text-gray-500 font-bold">A volunteer will call you on your mobile number.</p>
              </div>
           </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VolunteerPairing;
