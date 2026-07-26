import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Sparkles, HeartPulse, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SplashPage = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const taglines = t('taglines') || ['Learn UPI Payments', 'Use WhatsApp Safely', 'Understand Aadhaar'];
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline(prev => (prev + 1) % taglines.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [taglines]);

  const langLabels = { en: 'English', hi: 'हिंदी', mr: 'मराठी', gu: 'ગુજરાતી', bn: 'বাংলা', ta: 'தமிழ்', te: 'తెలుగు' };
  const langs = ['en','hi','mr','gu','bn','ta','te'];

  const features = [
    { icon: '📱', text: t('feat1') || 'Learn UPI & Payments' },
    { icon: '🔒', text: t('feat2') || 'Stay safe from scams' },
    { icon: '🤝', text: t('feat3') || 'Get volunteer support' },
  ];

  return (
    <PageTransition className="min-h-screen flex flex-col relative z-10 w-full overflow-hidden">

      {/* Top image header bar */}
      <div 
        className="pt-16 pb-32 px-6 text-center relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(222,184,135,0.95)), url('/old.png')` }}
      >
        {/* Language selector */}
        <button
          onClick={() => setLang(langs[(langs.indexOf(lang) + 1) % langs.length])}
          className="absolute top-5 right-5 text-wa-dark hover:bg-wa-dark hover:text-white text-xs font-bold px-3 py-1.5 
                     rounded-full bg-white/60 transition border border-wa-dark/20 shadow-sm z-10"
        >
          🌐 {langLabels[lang]}
        </button>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 180 }}
          className="relative inline-block mb-5 z-10"
        >
          <div className="w-24 h-24 rounded-[28px] bg-white shadow-wa-lg flex items-center justify-center mx-auto border-2 border-wa-border">
            <span className="text-4xl font-black text-wa-teal leading-none">DS</span>
          </div>
          {/* Green ring pulse */}
          <span className="absolute inset-0 rounded-[28px] ring-4 ring-wa-teal/40 animate-ping-slow" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
          className="text-4xl font-black text-wa-dark mb-1 tracking-tight"
        >
          DigiSaathi
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-wa-subtext text-base font-bold mb-6"
        >
          {t('splashSubtitle') || 'Your trusted digital companion 🙏'}
        </motion.p>

        {/* Rotating tagline */}
        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentTagline}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-wa-dark font-bold text-sm px-4 py-1.5 rounded-full bg-white/60 border border-wa-dark/20 shadow-sm"
            >
              ✨ {taglines[currentTagline]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Glass card overlay */}
      <div className="flex-1 -mt-16 rounded-t-3xl bg-glass-panel backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.15)] px-6 pt-10 pb-10 border-t border-white/50 relative z-10">

        {/* Feature bullets – WhatsApp "what's new" style */}
        <div className="mb-8 space-y-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm"
            >
              <span className="text-2xl shrink-0">{f.icon}</span>
              <span className="text-wa-text font-semibold text-base">{f.text}</span>
              <CheckCircle size={18} className="text-wa-green ml-auto shrink-0" />
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <motion.button
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(37,211,102,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
            className="btn-wa-primary w-full h-14 rounded-2xl text-lg font-bold"
          >
            <Sparkles size={20} /> {t('seniorBtn') || "I'm a Senior Citizen"}
            <ArrowRight size={20} className="ml-auto" />
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/volunteer')}
            className="btn-wa-secondary w-full h-14 rounded-2xl text-lg font-bold border-2 border-wa-green text-wa-teal"
          >
            <HeartPulse size={20} /> {t('volunteerBtn') || "I'm a Volunteer"}
            <ArrowRight size={20} className="ml-auto" />
          </motion.button>
        </div>

        {/* Language grid */}
        <div className="mt-8">
          <p className="text-wa-subtext text-xs font-bold text-center uppercase tracking-widest mb-3">
            {t('chooseLang') || 'Choose language / भाषा चुनें'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {langs.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`wa-chip ${lang === l ? 'wa-chip-active' : 'wa-chip-inactive'}`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>
        </div>

        <p className="text-wa-subtext text-xs text-center mt-6">
          {t('trusted') || '⭐⭐⭐⭐⭐ Trusted by 10,000+ seniors across India'}
        </p>
      </div>
    </PageTransition>
  );
};

export default SplashPage;
