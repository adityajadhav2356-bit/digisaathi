import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Award, Phone, Globe, Type, Edit2, BookOpen, Calendar, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyUser } from '../data/user';
import { dummyVolunteer } from '../data/volunteer';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [fontSize, setFontSize] = useState('Normal');
  const [profilePic, setProfilePic] = useState(() => localStorage.getItem('digisaathi_profile_pic') || null);

  const localizedUser     = dummyUser.translations?.[lang]      || dummyUser;
  const localizedVolunteer = dummyVolunteer.translations?.[lang] || dummyVolunteer;

  const getInitials = name => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const fontOptions = [
    { key: 'Normal',      label: 'A',  size: 'text-base' },
    { key: 'Large',       label: 'A',  size: 'text-lg' },
    { key: 'Extra Large', label: 'A',  size: 'text-xl' },
  ];

  const langOptions = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
  ];

  const badges = [
    { icon: '🥇', label: t('badges.firstModule') || 'First Module', earned: true },
    { icon: '🛡️', label: t('badges.fraudFighter') || 'Fraud Fighter', earned: true },
    { icon: '📅', label: t('badges.sevenDayStreak') || '7-Day Streak', earned: true },
    { icon: '🌟', label: t('badges.allStar') || 'All Star', earned: false },
  ];

  /* ── Profile Image Upload Logic ── */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert(t('invalidFileType') || 'Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    // Validate size (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(t('fileTooLarge') || 'File size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfilePic(base64String);
      localStorage.setItem('digisaathi_profile_pic', base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <PageTransition className="min-h-screen bg-wa-chatBg pb-28">

      {/* Header */}
      <header className="wa-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <h1 className="wa-header-title">{t('myProfile') || 'My Profile'}</h1>
        </div>
        <button className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition">
          <Edit2 size={18} className="text-white" />
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">

        {/* Profile Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="wa-panel p-6 flex items-center gap-5"
        >
          {/* Avatar & Upload */}
          <div className="relative shrink-0 group w-20 h-20">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-wa-teal to-wa-dark flex items-center justify-center ring-4 ring-wa-green/25 overflow-hidden relative">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-black text-white">{getInitials(localizedUser.name)}</span>
              )}
            </div>
            
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-wa-green hover:bg-green-600 rounded-full flex items-center justify-center border-2 border-white shadow pointer-events-none transition-colors z-10">
              <Edit2 size={13} className="text-white" />
            </div>

            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp" 
              onChange={handleImageUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
              title="Change Profile Picture"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-wa-text font-black text-xl leading-tight">{localizedUser.name}</h2>
            <p className="text-wa-subtext text-sm mt-0.5 flex items-center gap-1">
              📍 {localizedUser.city}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-amber-400" fill="#FBBF24" />
              ))}
              <span className="text-wa-subtext text-xs ml-1">5.0</span>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { icon: BookOpen, count: dummyUser.modulesCompleted?.length || 2, label: t('modulesDone') || 'Modules', color: 'text-wa-teal', bg: 'bg-teal-50 border-teal-100' },
            { icon: Phone,    count: dummyUser.sessionsCompleted || 5,         label: t('sessionsDone') || 'Sessions', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
            { icon: Calendar, count: dummyUser.daysActive || 14,               label: t('daysActive') || 'Days',     color: 'text-purple-500', bg: 'bg-purple-50 border-purple-100' },
          ].map(s => (
            <div key={s.label} className={`stat-card border ${s.bg}`}>
              <s.icon size={20} className={s.color} />
              <span className={`text-2xl font-black ${s.color}`}>{s.count}</span>
              <span className="text-wa-subtext text-[11px] font-bold uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Font Size setting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
          className="wa-panel p-5"
        >
          <h3 className="text-wa-text font-bold flex items-center gap-2 mb-4">
            <Type size={18} className="text-wa-teal" /> {t('fontSize') || 'Font Size'}
          </h3>
          <div className="flex gap-2">
            {fontOptions.map(f => (
              <button
                key={f.key}
                onClick={() => setFontSize(f.key)}
                className={`flex-1 py-3 rounded-xl font-bold ${f.size} border-2 transition-all
                  ${fontSize === f.key
                    ? 'border-wa-teal bg-wa-light text-wa-dark'
                    : 'border-wa-border text-wa-subtext hover:border-wa-teal hover:text-wa-teal bg-wa-chatBg'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="text-wa-subtext text-xs text-right mt-1">{fontSize}</p>
        </motion.div>

        {/* Language setting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="wa-panel p-5"
        >
          <h3 className="text-wa-text font-bold flex items-center gap-2 mb-4">
            <Globe size={18} className="text-wa-teal" /> {t('prefLang') || 'Language'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {langOptions.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`wa-chip ${lang === l.code ? 'wa-chip-active' : 'wa-chip-inactive'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact + Volunteer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
          className="grid grid-cols-1 gap-3"
        >
          {/* Emergency */}
          <div className="wa-panel p-4 border-l-4 border-l-red-500 flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
              <Phone size={18} className="text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-wa-subtext text-xs font-bold uppercase tracking-widest">{t('emergencyContact') || 'Emergency Contact'}</p>
              <p className="text-wa-text font-bold text-base mt-0.5">
                {localizedUser.emergencyContact?.name || dummyUser.emergencyContact?.name}
              </p>
              <p className="text-wa-subtext text-sm">{dummyUser.emergencyContact?.phone}</p>
            </div>
            <span className="wa-badge wa-badge-red">{localizedUser.emergencyContact?.relation || dummyUser.emergencyContact?.relation}</span>
          </div>

          {/* Volunteer */}
          <div className="wa-panel p-4 border-l-4 border-l-wa-green flex items-center gap-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya&backgroundColor=c0aede"
              alt="Volunteer"
              className="wa-avatar border-2 border-wa-green"
            />
            <div className="flex-1">
              <p className="text-wa-subtext text-xs font-bold uppercase tracking-widest">{t('myVolunteer') || 'My Volunteer'}</p>
              <p className="text-wa-text font-bold text-base mt-0.5">{localizedVolunteer.name || dummyVolunteer.name}</p>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#FBBF24" className="text-amber-400" />)}
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-wa-chatBg transition">
              <ChevronRight size={18} className="text-wa-subtext" />
            </button>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          className="wa-panel p-5"
        >
          <h3 className="text-wa-text font-bold flex items-center gap-2 mb-4">
            <Award size={18} className="text-amber-500" /> {t('yourBadges') || 'Your Badges'}
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((b, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center 
                  ${b.earned ? 'bg-amber-50 border-amber-200' : 'bg-wa-chatBg border-wa-border opacity-40'}`}
              >
                <span className="text-3xl">{b.icon}</span>
                <span className="text-[10px] font-bold text-wa-text leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sign out */}
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/')}
          className="btn-wa-danger w-full h-13 rounded-2xl text-base py-4"
        >
          <LogOut size={20} /> {t('signOut') || 'Sign Out'}
        </motion.button>

        {/* Access Volunteer Portal */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          onClick={() => navigate('/volunteer')}
          className="w-full mt-4 text-wa-teal font-bold text-sm tracking-wide hover:underline text-center"
        >
          Access Volunteer Portal →
        </motion.button>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;
