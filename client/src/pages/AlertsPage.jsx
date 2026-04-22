import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, ChevronLeft, Smartphone, CheckCircle, AlertTriangle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fraudAlerts } from '../data/alerts';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

const AlertsPage = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <PageTransition className="min-h-screen bg-wa-chatBg pb-28">

      {/* Header */}
      <header className="wa-header">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>
          <div>
            <h1 className="wa-header-title flex items-center gap-2">
              <ShieldAlert size={20} /> {t('staySafe') || 'Stay Safe'}
            </h1>
            <p className="text-white/65 text-xs">{t('learnToIdentify') || 'Learn to identify scams'}</p>
          </div>
        </div>
        {/* Alert count badge */}
        <div className="wa-dot">{fraudAlerts.length}</div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-3">

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3"
        >
          <span className="text-2xl shrink-0">⚠️</span>
          <p className="text-amber-800 text-sm font-semibold leading-snug">
            {t('alertInfoBanner') || 'Tap any alert to learn what to do. Never share OTP or PIN with anyone.'}
          </p>
        </motion.div>

        {/* Alerts list – WhatsApp chat list style */}
        <div className="wa-panel overflow-hidden divide-y divide-wa-border">
          {fraudAlerts.map((a, idx) => {
            const isHigh = a.severity === 'high';
            const isExpanded = expandedId === a.id;
            const localizedAlert = a.translations?.[lang] || a;

            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className={`cursor-pointer transition-colors ${isExpanded ? 'bg-wa-chatBg' : 'hover:bg-wa-chatBg'}`}
                onClick={() => setExpandedId(isExpanded ? null : a.id)}
              >
                <div className="flex items-center gap-4 px-4 py-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0
                    ${isHigh ? 'bg-red-100' : 'bg-orange-100'}`}>
                    {a.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`wa-badge text-[10px] font-black uppercase
                        ${isHigh ? 'wa-badge-red' : 'wa-badge-orange'}`}>
                        {a.severity}
                      </span>
                    </div>
                    <h3 className="font-bold text-wa-text text-base leading-snug">{localizedAlert.title}</h3>
                    <p className={`text-wa-subtext text-sm mt-0.5 ${isExpanded ? '' : 'line-clamp-1'}`}>
                      {localizedAlert.description}
                    </p>
                  </div>

                  {/* Expand arrow */}
                  <div className={`shrink-0 text-wa-subtext transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-1 border-t border-wa-border bg-wa-chatBg">
                        <div className="bg-white rounded-2xl p-4 border border-wa-border">
                          <div className="flex items-center gap-2 mb-2">
                            <Lock size={15} className="text-wa-teal" />
                            <span className="text-wa-teal text-xs font-black uppercase tracking-widest">
                              {t('whatToDo') || 'What To Do'}
                            </span>
                          </div>
                          <p className="text-wa-text text-sm font-medium leading-relaxed">
                            {localizedAlert.whatToDo}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Fraud Simulator */}
        <Simulator />
      </div>
    </PageTransition>
  );
};

const Simulator = () => {
  const [result, setResult] = useState(null);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="wa-panel overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-wa-teal to-wa-dark px-5 py-4 flex items-center gap-3">
        <Smartphone size={20} className="text-white" />
        <div>
          <h2 className="text-white font-black text-base">{t('fraudSimulator') || 'Fraud Simulator'}</h2>
          <p className="text-white/70 text-xs">{t('safeOrScam') || 'Is this Safe or a Scam?'}</p>
        </div>
      </div>

      <div className="p-5">
        {/* Fake phone screen */}
        <div className="max-w-xs mx-auto border-4 border-gray-200 rounded-[24px] overflow-hidden shadow-wa-md mb-5 bg-white">
          {/* Status bar */}
          <div className="bg-gray-800 text-white text-[10px] font-bold px-4 py-1.5 flex justify-between tracking-widest">
            <span>9:41</span>
            <span>{t('simTitle') || 'LOTTERY APP'}</span>
            <span>📶</span>
          </div>
          {/* Notification card */}
          <div className="p-5 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 ring-4 ring-red-100">
              <ShieldAlert size={28} className="text-red-500" />
            </div>
            <h3 className="text-gray-900 text-base font-black mb-1">{t('reqMoney') || 'You Won ₹25 Lakh!'}</h3>
            <p className="text-blue-600 font-bold bg-blue-50 py-1 px-3 rounded-xl mx-auto border border-blue-200 text-xs tracking-widest uppercase mb-4 inline-block">
              {t('fromKbc') || 'FROM: KBC LOTTERY'}
            </p>
            <div className="space-y-2 px-2">
              <div className="py-3 bg-gradient-to-r from-wa-teal to-wa-dark text-white rounded-xl text-sm font-black shadow">
                {t('payNow') || 'Pay ₹500 Processing Fee'}
              </div>
              <p className="text-red-500 font-bold text-[10px] uppercase tracking-widest animate-pulse">
                {t('enterPinToReceive') || 'ENTER PIN TO RECEIVE PRIZE'}
              </p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        {!result ? (
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setResult('safe')}
              className="btn-wa-secondary h-14 rounded-2xl font-bold border-2 border-wa-green text-wa-teal text-base flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} /> {t('safe') || 'Safe'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setResult('scam')}
              className="h-14 rounded-2xl font-bold bg-red-500 hover:bg-red-600 text-white text-base transition-all flex items-center justify-center gap-2"
            >
              <AlertTriangle size={20} /> {t('scam') || 'Scam!'}
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl p-5 border-2 text-center
              ${result === 'scam' ? 'bg-green-50 border-wa-green' : 'bg-red-50 border-red-400'}`}
          >
            <p className={`text-2xl font-black mb-2 ${result === 'scam' ? 'text-wa-teal' : 'text-red-500'}`}>
              {result === 'scam' ? (t('correct') || '✅ Correct!') : (t('danger') || '⚠️ Careful!')}
            </p>
            <p className="text-wa-text text-sm font-medium leading-relaxed mb-4">
              {result === 'scam'
                ? (t('simSafeAns') || "Great job! This is a classic scam. You NEVER need to pay to receive prize money.")
                : (t('simDangerAns') || "Careful! If someone asks you to pay to 'receive' a prize – it's always a scam.")}
            </p>
            <button
              onClick={() => setResult(null)}
              className="text-wa-teal font-bold text-sm border border-wa-teal px-4 py-2 rounded-xl hover:bg-wa-light transition"
            >
              {t('tryAnother') || 'Try Another →'}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AlertsPage;
