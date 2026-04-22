import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, CheckCircle, Video, PhoneCall, BookOpen, AlertTriangle, ChevronRight, Zap, Search, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { dummyUser } from '../data/user';
import { dummyVolunteer } from '../data/volunteer';
import { modules } from '../data/modules';
import { useLanguage } from '../context/LanguageContext';
import { subscribeToBookings, createBooking } from '../utils/bookingStore';
import SessionWorkspace from '../components/SessionWorkspace';

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } },
};

const HomePage = () => {
  const navigate = useNavigate();
  const { lang, t, setLang } = useLanguage();
  const currentModules = modules[lang] || modules['en'];
  const localizedUser = dummyUser.translations?.[lang] || dummyUser;
  const localizedVolunteer = dummyVolunteer.translations?.[lang] || dummyVolunteer;
  
  const [bookings, setBookings] = useState([]);
  
  React.useEffect(() => {
    const unsubscribe = subscribeToBookings((data) => {
      // Filter bookings for this simulated Senior User (just use active requests)
      // Since it's a hackathon demo, we'll grab mapping of the latest request they made
      setBookings(data || []);
    });
    return unsubscribe;
  }, []);

  const activeBooking = bookings.find(b => ['pending', 'accepted', 'in_progress'].includes(b.status));

  const handleManualSearch = () => {
    window.open('https://www.google.com/', '_blank', 'noopener,noreferrer');
  };

  const completedCount = (currentModules || []).filter(m => m.completed).length;
  const totalCount = (currentModules || []).length;
  const progressPct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <PageTransition className="min-h-screen bg-wa-chatBg pb-28">

      {/* ── WhatsApp-style Header ── */}
      <header className="wa-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-black text-sm">DS</span>
          </div>
          <div>
            <h1 className="wa-header-title">DigiSaathi</h1>
            <p className="text-white/70 text-xs font-medium">
              {t('greeting')?.replace('{name}', localizedUser.name?.split(' ')[0]) || `Hello, ${localizedUser.name?.split(' ')[0]}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => { const langs = ['en','hi','mr','ta','bn']; setLang(langs[(langs.indexOf(lang)+1)%langs.length]); }}
            className="text-white/80 hover:text-white text-xs font-bold px-2.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 transition border border-white/20"
          >
            🌐 {lang === 'en' ? 'EN' : lang === 'hi' ? 'HI' : lang === 'mr' ? 'MR' : lang === 'ta' ? 'TA' : 'BN'}
          </button>
          {/* Notification */}
          <button
            className="relative p-2 rounded-full hover:bg-white/15 transition"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-white" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-wa-teal animate-pulse" />
          </button>
          {/* Profile */}
          <button onClick={() => navigate('/profile')} className="p-1.5 rounded-full hover:bg-white/15 transition">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">

        {/* ── Progress Hero Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-wa-teal to-wa-dark rounded-3xl p-5 text-white shadow-wa-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm font-medium">{t('overallProgress') || 'Overall Progress'}</p>
              <p className="text-3xl font-black mt-0.5">{progressPct}%</p>
            </div>
            {/* Circular progress */}
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="30" stroke="rgba(255,255,255,0.2)" strokeWidth="7" fill="none" />
                <circle cx="36" cy="36" r="30"
                  stroke="#DCF8C6" strokeWidth="7" fill="none"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${2 * Math.PI * 30 * (1 - progressPct / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-black">{progressPct}%</span>
            </div>
          </div>
          <div className="wa-progress-track bg-white/20">
            <div className="wa-progress-fill" style={{ width: `${progressPct}%`, background: '#DCF8C6' }} />
          </div>
          <p className="text-white/70 text-xs mt-2 font-medium">
            {t('completedOf')?.replace('{completed}', completedCount).replace('{total}', totalCount)
              || `${completedCount} of ${totalCount} modules completed`}
          </p>
        </motion.div>

        {/* ── Urgent Alert Banner ── */}
        <motion.button
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/alerts')}
          className="w-full flex items-center gap-4 bg-red-50 rounded-2xl p-4 border border-red-200 shadow-wa text-left"
        >
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-red-600 font-bold text-sm">{t('urgentAlert') || '⚠️ Urgent Alert'}</p>
            <p className="text-red-800 font-semibold text-base truncate">{t('fakeKyc') || 'Fake KYC scam circulating — Stay alert!'}</p>
          </div>
          <ChevronRight size={18} className="text-red-400 shrink-0" />
        </motion.button>

        {/* ── Learning Modules ── */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-wa-text font-black text-lg flex items-center gap-2">
              <BookOpen size={20} className="text-wa-teal" />
              {t('startLearning') || 'Learning Modules'}
            </h2>
            <button className="text-wa-teal text-sm font-bold hover:underline">
              {t('seeAll') || 'See all'}
            </button>
          </div>

          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-3"
          >
            {(currentModules || []).map(mod => (
              <motion.div
                key={mod.id}
                variants={stagger.item}
                onClick={() => navigate(`/module/${mod.id}`)}
                className="module-card flex items-center gap-4 p-4"
              >
                {/* Module Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${mod.color} shadow-wa`}>
                  <span className="text-2xl">{mod.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-wa-text text-base truncate">{mod.title}</h3>
                    {mod.completed && (
                      <CheckCircle size={18} className="text-wa-green shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-wa-subtext text-sm leading-snug line-clamp-1 mb-2">{mod.description}</p>
                  {/* Progress bar */}
                  <div className="wa-progress-track">
                    <div className={`wa-progress-fill`} style={{ width: mod.completed ? '100%' : '15%' }} />
                  </div>
                </div>

                <ChevronRight size={18} className="text-wa-border shrink-0" />
              </motion.div>
            ))}

            {/* ── Explore Other (Manual Search Tab) ── */}
            <motion.div
              variants={stagger.item}
              onClick={handleManualSearch}
              className="module-card flex items-center justify-between gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 cursor-pointer shadow-md"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex-1">
                <h3 className="font-black text-blue-900 text-lg flex items-center gap-2">
                  <Search size={22} className="text-blue-600" />
                  {t('exploreOther') || 'Explore Other'}
                </h3>
                <p className="text-blue-700 text-sm font-semibold mt-0.5">
                  {t('searchHelper') || 'Search anything you want to learn'}
                </p>
              </div>
              
              <div className="relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-4 bg-white text-blue-600 border-blue-100 shadow-sm relative z-10">
                  <Search size={24} />
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* ── Dynamic Volunteer Support Hub (Real-time Link) ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="wa-panel-lg p-5 border-l-4 border-l-wa-green shadow-xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-wa-dark flex items-center gap-2">
              <PhoneCall size={24} className="text-wa-teal" />
              {t('upcomingSession') || 'Volunteer Support'}
            </h3>
            {activeBooking?.status === 'pending' && <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">Searching for match...</span>}
          </div>

          {!activeBooking ? (
            <div className="flex flex-col gap-4">
              <p className="text-slate-500 font-medium text-sm">Need help with a tutorial or having an issue online? Our volunteers are ready to assist you safely.</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => createBooking({ name: localizedUser.name, phone: '9876543210', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Senior' }, 'General Internet Help', 'ASAP', false)}
                  className="flex-1 bg-wa-light hover:bg-wa-green hover:text-white transition-all text-wa-dark font-bold py-3 rounded-xl border border-wa-green flex items-center justify-center gap-2"
                >
                  <User size={18}/> Ask for a Volunteer
                </button>
                <button 
                  onClick={() => createBooking({ name: localizedUser.name, phone: '9876543210', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Senior' }, 'EMERGENCY SCAM/FRAUD', 'URGENT', true)}
                  className="flex-1 bg-red-50 hover:bg-red-500 hover:text-white transition-all text-red-600 font-bold py-3 rounded-xl border border-red-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <AlertTriangle size={18} className="animate-bounce"/> Emergency SOS
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200 overflow-hidden">
                  <span className="font-black text-blue-500">V</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{activeBooking.status === 'pending' ? 'Assigning Volunteer...' : localizedVolunteer.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">Status: <span className="uppercase text-wa-teal font-black">{activeBooking.status}</span></p>
                </div>
              </div>

              {['accepted', 'in_progress'].includes(activeBooking.status) && (
                <div className="-mx-2">
                   <SessionWorkspace booking={activeBooking} userRole="senior" />
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Quick Actions ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '💳', label: t('upiPayment') || 'UPI Payment', path: '/module/upi', color: 'bg-blue-50 text-blue-600 border-blue-100' },
            { icon: '💬', label: t('whatsapp')   || 'WhatsApp',    path: '/module/whatsapp', color: 'bg-green-50 text-green-600 border-green-100' },
            { icon: '🆔', label: t('aadhaar')    || 'Aadhaar',    path: '/module/aadhaar', color: 'bg-orange-50 text-orange-600 border-orange-100' },
          ].map(q => (
            <motion.button
              key={q.label}
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate(q.path)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${q.color} transition-all`}
            >
              <span className="text-3xl">{q.icon}</span>
              <span className="text-xs font-bold text-center leading-snug">{q.label}</span>
            </motion.button>
          ))}
        </div>

      </div>

      {/* ── Floating Call Button ── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="wa-fab animate-pulse-green"
      >
        <PhoneCall size={24} />
      </motion.button>
    </PageTransition>
  );
};

export default HomePage;
