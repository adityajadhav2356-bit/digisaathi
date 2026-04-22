import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell, User, CheckCircle, Video, Clock, LayoutDashboard, Calendar, Settings, LogOut, Check, X, ShieldAlert } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import { subscribeToBookings, updateBookingStatus } from '../../utils/bookingStore';
import SessionWorkspace from '../../components/SessionWorkspace';
import VolunteerOverview from '../../components/VolunteerOverview';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // overview, requests, ongoing, completed, schedule, settings
  const [volunteer] = useState({ name: 'Aditya Jadhav', rating: '4.9', sessions: 24, languages: ['English', 'Hindi', 'Marathi'] });

  useEffect(() => {
    // Realtime Sync from our bookingStore!
    const unsubscribe = subscribeToBookings((data) => {
      setBookings(data || []);
    });
    return unsubscribe;
  }, []);

  const handleStatusChange = (id, newStatus) => {
    updateBookingStatus(id, newStatus);
  };

  const getFilteredBookings = () => {
    if (activeTab === 'requests') return bookings.filter(b => b.status === 'pending');
    if (activeTab === 'ongoing') return bookings.filter(b => b.status === 'accepted' || b.status === 'in_progress');
    if (activeTab === 'completed') return bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');
    return [];
  };

  const getTimeAgo = (dateStr) => {
    const min = Math.floor((new Date() - new Date(dateStr)) / 60000);
    if (min < 1) return 'Just now';
    if (min < 60) return `${min}m ago`;
    return `${Math.floor(min/60)}h ago`;
  };

  return (
    <PageTransition className="min-h-screen flex flex-col md:flex-row relative z-10 w-full overflow-hidden">
      
      {/* Desktop / Core Sidebar Navbar (Professional Layout for Volunteers) */}
      <aside className="w-full md:w-64 bg-glass-dark backdrop-blur-2xl border-r border-white/10 flex-shrink-0 md:min-h-screen flex flex-col pb-6 md:pb-0 shadow-2xl relative z-20">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-black">V</div>
            <h1 className="text-white font-black tracking-tight text-xl">Volunteer Portal</h1>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 mb-6">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya&backgroundColor=c0aede" className="w-12 h-12 bg-blue-100 rounded-full" alt="Me" />
            <div>
              <p className="text-white font-bold text-sm leading-tight">{volunteer.name}</p>
              <div className="flex items-center gap-1 mt-0.5 text-blue-400">
                <span className="text-xs font-bold">★ {volunteer.rating}</span>
                <span className="text-slate-500 text-[10px]">&bull; {volunteer.sessions} Sessions</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Control Center' },
            { id: 'requests', icon: Bell, label: 'Incoming Requests', count: bookings.filter(b=>b.status==='pending').length },
            { id: 'ongoing', icon: Video, label: 'Ongoing Clients', count: bookings.filter(b=>b.status==='accepted' || b.status === 'in_progress').length },
            { id: 'schedule', icon: Calendar, label: 'My Schedule' },
            { id: 'completed', icon: CheckCircle, label: 'All History' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition font-semibold text-sm
                ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <tab.icon size={18} /> {tab.label}
              {tab.count > 0 && (
                <span className={`ml-auto px-2 py-0.5 text-[10px] rounded-full font-bold ${activeTab === tab.id ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto px-4 pt-4 border-t border-slate-800">
          <button onClick={() => navigate('/volunteer')} className="w-full flex items-center gap-3 p-3 rounded-xl transition font-semibold text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400">
            <LogOut size={18} /> Sign Out securely
          </button>
        </div>
      </aside>

      {/* Main Content Dashboard */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-4xl max-w-screen-xl">
        
        <header className="flex justify-between items-end mb-8 border-b border-wa-teal/20 pb-4">
          <div>
            <h2 className="text-2xl font-black text-wa-dark capitalize drop-shadow-sm">
              {activeTab === 'requests' ? 'Incoming Help Requests' 
               : activeTab === 'ongoing' ? 'Ongoing Sessions' 
               : activeTab === 'schedule' ? 'Availability Calendar'
               : activeTab === 'overview' ? 'Operational Overview'
               : activeTab === 'settings' ? 'Volunteer Profile Settings'
               : 'Session History'}
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Synchronizing with DigiSaathi local nodes in real-time.
            </p>
          </div>
        </header>

        <div className="space-y-4">
          {activeTab === 'overview' ? (
            <VolunteerOverview bookings={bookings} />
          ) : ['schedule', 'settings'].includes(activeTab) ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="wa-panel-lg p-8">
               <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                     <Settings size={30} />
                  </div>
                  <h3 className="text-slate-800 font-bold text-xl mb-2">Module Active: {activeTab}</h3>
                  <p className="text-slate-500 font-medium max-w-sm">This page has been successfully integrated and routed in the portal architecture. Placeholder for future expansion.</p>
               </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {getFilteredBookings().length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="wa-panel py-20 text-center flex flex-col items-center justify-center border-dashed border-2">
                  <ShieldAlert size={40} className="mx-auto text-slate-300 mb-3" />
                  <h3 className="text-slate-500 font-bold text-lg">No {activeTab} at the moment.</h3>
                  <p className="text-slate-400 text-sm">When seniors request assistance on their app, it will appear here instantly.</p>
                </motion.div>
              ) : getFilteredBookings().map((booking) => (
              <motion.div 
                key={booking.id}
                layout
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="wa-panel p-5 flex flex-col gap-5 w-full"
              >
                {/* Profile Box */}
                <div className="flex w-full md:flex-row flex-col gap-5 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center md:items-start gap-4 md:w-1/4">
                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 overflow-hidden shrink-0 relative">
                      {booking.seniorAvatar ? <img src={booking.seniorAvatar} className="w-full h-full object-cover"/> : <User className="text-slate-400" size={24}/>}
                      {booking.isSOS && <span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span></span>}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg leading-tight ${booking.isSOS ? 'text-red-600' : 'text-slate-800'}`}>{booking.seniorName}</h3>
                      <p className="text-slate-500 font-medium text-xs mt-1 bg-slate-100 px-2 py-0.5 rounded inline-block select-all">{booking.seniorPhone}</p>
                    </div>
                  </div>

                {/* Need Info & Insights */}
                <div className="flex-1 space-y-3 border-l-0 md:border-l border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 pl-0 md:pl-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-blue-100">
                      Topic
                    </span>
                    <span className="font-semibold text-slate-700 text-sm">{booking.topic}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-amber-100">
                      Time Slot
                    </span>
                    <span className="font-semibold text-slate-700 text-sm">{booking.timeSlot} • <span className="font-normal text-slate-400 line-clamp-1">{getTimeAgo(booking.createdAt)}</span></span>
                  </div>
                  
                  {/* SENIOR PROFILE INSIGHTS WIDGET */}
                  <div className="flex gap-2 flex-wrap mt-2">
                    <span className="px-2 text-[10px] font-bold bg-slate-100 text-slate-500 rounded-md py-1 border border-slate-200">
                      🗣️ Prefers: {['English','Hindi','Marathi'][booking.seniorName.length % 3]}
                    </span>
                    <span className="px-2 text-[10px] font-bold bg-slate-100 text-slate-500 rounded-md py-1 border border-slate-200">
                      🐢 Needs patient pacing
                    </span>
                    {(booking.rating?.score > 0) && (
                      <span className="px-2 text-[10px] font-bold bg-amber-50 text-amber-600 rounded-md py-1 border border-amber-200 flex items-center gap-1">
                         Given Star: {booking.rating?.score}/5
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2 shrink-0 md:w-32 justify-end">
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={()=>handleStatusChange(booking.id, 'accepted')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl shadow focus:ring-2 flex items-center justify-center gap-1.5 transition">
                        <Check size={16}/> Accept
                      </button>
                      <button onClick={()=>handleStatusChange(booking.id, 'cancelled')} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition">
                        <X size={16}/> Decline
                      </button>
                    </>
                  )}

                  {booking.status === 'accepted' && (
                    <>
                      <button onClick={()=>{ alert(`Calling ${booking.seniorPhone}...`); handleStatusChange(booking.id, 'completed'); }} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-xl shadow flex items-center justify-center gap-1.5 transition">
                        <Video size={16}/> Video Call
                      </button>
                      <button onClick={()=>handleStatusChange(booking.id, 'completed')} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition">
                        <CheckCircle size={16}/> Mark Done
                      </button>
                    </>
                  )}

                  {(booking.status === 'completed' || booking.status === 'cancelled') && (
                    <div className={`py-2 px-3 rounded-xl font-bold text-sm text-center border mt-auto ${booking.status === 'completed' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                      {booking.status.toUpperCase()}
                    </div>
                  )}
                </div>
                </div>

                {/* Session Workspace (Chat & Tasks) */}
                {(booking.status === 'accepted' || booking.status === 'in_progress') && (
                  <SessionWorkspace booking={booking} userRole="volunteer" />
                )}

              </motion.div>
            ))}
          </AnimatePresence>
          )}
        </div>

      </main>
    </PageTransition>
  );
};

export default VolunteerDashboard;
