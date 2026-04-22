import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Smartphone, ArrowRight, ShieldCheck, Globe, CheckCircle, ChevronLeft, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import axios from '../utils/axios';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
];

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();
  const { setLang, lang, t } = useLanguage();

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    if (phone.length !== 10 || cooldown > 0) return;

    setLoading(true);
    try {
      const res = await axios.post('/auth/request-otp', { phone });
      setCooldown(60);
      setStep(2);
      showToast(t('otpSent') || 'OTP sent successfully!', 'success');

      // Demo Mode Auto-Fill!
      if (res.data.isDemoMode && res.data.demoOtp) {
        setTimeout(() => {
          setOtp(res.data.demoOtp.split(''));
          showToast(`🛠️ DEMO MODE: Auto-filling OTP (${res.data.demoOtp}) for presentation.`, 'success');
        }, 800);
      }

    } catch (err) {
      if (err.message === 'Network Error' || !err.response) {
        // BACKEND OFFLINE FALLBACK (Perfect for Vercel/Hackathon Demos!)
        console.warn('Backend is offline. Using Frontend-Only Demo Mode Fallback.');
        setCooldown(60);
        setStep(2);
        showToast(t('otpSent') || 'OTP generated (Backend Offline)!', 'success');
        
        window.frontendDemoOtp = "5921"; // Fixed fallback
        setTimeout(() => {
          setOtp(window.frontendDemoOtp.split(''));
          showToast(`🛠️ DEMO MODE: Auto-filling fallback OTP (5921).`, 'success');
        }, 800);
      } else {
        const message = err.response?.data?.error || 'Failed to send OTP. Please try again.';
        showToast(message, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) document.getElementById(`otp-${index + 1}`).focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 4) return;

    setLoading(true);
    
    // Abstract success logic to handle both real API and frontend-fallback effortlessly
    const finalizeLogin = (token, isNewUser, userObj) => {
      localStorage.setItem('digisaathi_token', token);
      showToast(t('otpSuccess') || 'Verified! Welcome 🎉', 'success');
      setTimeout(() => {
        if (isNewUser) {
          navigate('/details');
        } else {
          sessionStorage.setItem('digisaathi_user', JSON.stringify(userObj));
          navigate('/home');
        }
      }, 1500);
    };

    try {
      if (window.frontendDemoOtp) {
        if (otpString !== window.frontendDemoOtp) throw new Error('Invalid Offline Fallback OTP');
        finalizeLogin('demo-hackathon-token', true, { phone });
        return;
      }

      const res = await axios.post('/auth/verify-otp', { phone, otp: otpString });
      finalizeLogin(res.data.token, res.data.isNewUser, res.data.user);

    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Invalid OTP. Please try again.';
      showToast(message, 'error');
      setOtp(['', '', '', '']); // Clear input on error
      document.getElementById('otp-0').focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center relative p-4 lg:p-10">
      
      <div className="w-full max-w-md flex flex-col wa-panel-lg shadow-[0_24px_60px_rgba(0,0,0,0.12)]">

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: -60, opacity: 0 }} animate={{ y: 12, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <div className={`${toast.type === 'success' ? 'bg-wa-teal' : 'bg-red-500'} text-white px-6 py-3 rounded-2xl shadow-wa-lg font-bold flex items-center gap-2 mt-4`}>
              <CheckCircle size={20} /> {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Area */}
      <div className="pt-10 pb-8 px-6 relative overflow-hidden bg-white/20 border-b border-white/20">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2" />

        {step === 2 && !loading && (
          <button
            onClick={() => { setStep(1); setOtp(['','','','']); }}
            className="absolute left-4 top-5 p-2 rounded-full bg-white/15 hover:bg-white/25 transition"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>
        )}

        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-[22px] bg-white shadow-wa-md flex items-center justify-center mx-auto mb-4"
          >
            <ShieldCheck size={36} className="text-wa-teal" />
          </motion.div>
          <h1 className="text-3xl font-black text-wa-teal mb-1">
            {step === 1 ? (t('welcomeBack') || 'Welcome Back!') : (t('enterOtp') || 'Enter OTP')}
          </h1>
          <p className="text-wa-subtext text-sm font-medium">
            {step === 1
              ? (t('enterMobile') || 'Enter your mobile number to continue')
              : (t('otpSent') || `OTP sent to +91 ${phone}`)
            }
          </p>
        </div>
      </div>

      {/* White card form */}
      <div className="flex-1 bg-white/40 px-6 pt-8 pb-10">

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="phone-form"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSendOTP}
              className="space-y-5"
            >
              {/* Phone input */}
              <div>
                <label className="text-wa-subtext text-xs font-bold uppercase tracking-widest mb-2 block">
                  {t('mobileLabel') || 'Mobile Number'}
                </label>
                <div className="flex items-center gap-0 bg-white/50 backdrop-blur-md border border-white/60 focus-within:border-wa-teal focus-within:bg-white/80 rounded-2xl overflow-hidden transition-all shadow-inner">
                  <div className="flex items-center gap-2 px-4 py-4 border-r border-wa-border shrink-0">
                    <span className="text-xl">🇮🇳</span>
                    <span className="text-wa-text font-bold">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 bg-transparent px-4 py-4 text-xl font-bold text-wa-text outline-none placeholder-wa-border tracking-widest"
                    placeholder="•••• •••• ••"
                    autoFocus
                    required
                  />
                  {phone.length === 10 && (
                    <CheckCircle size={20} className="text-wa-green mr-4 shrink-0" />
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                whileTap={phone.length === 10 && !loading ? { scale: 0.97 } : {}}
                disabled={phone.length < 10 || loading}
                className={`btn-wa-primary w-full h-14 rounded-2xl text-lg flex items-center justify-center gap-2 ${phone.length < 10 || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? <Loader className="animate-spin" size={20} /> : <Smartphone size={20} />}
                {loading ? 'Sending...' : (t('sendOtp') || 'Send OTP')}
                {!loading && <ArrowRight size={20} className="ml-auto" />}
              </motion.button>
            </motion.form>

          ) : (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              onSubmit={handleVerify}
              className="space-y-6"
            >
              {/* Sent to info */}
              <div className="bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm rounded-2xl px-4 py-3 flex items-center gap-3">
                <ShieldCheck size={18} className="text-wa-teal shrink-0" />
                <p className="text-wa-subtext text-sm font-medium">
                  {t('otpSent') || 'OTP sent to'} <span className="text-wa-text font-bold">+91 {phone}</span>
                </p>
              </div>

              {/* OTP boxes */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOTPChange(e, i)}
                    className={`w-16 h-16 text-center text-4xl font-black rounded-2xl border-2 outline-none transition-all
                      ${digit ? 'border-wa-teal bg-wa-light text-wa-dark' : 'border-wa-border bg-wa-chatBg text-wa-text'}
                      focus:border-wa-teal focus:bg-wa-light`}
                  />
                ))}
              </div>

              <motion.button
                type="submit"
                whileTap={otp.join('').length === 4 && !loading ? { scale: 0.97 } : {}}
                disabled={otp.join('').length < 4 || loading}
                className={`btn-wa-primary w-full h-14 rounded-2xl text-lg flex justify-center gap-2 ${otp.join('').length < 4 || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? <Loader className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
                {loading ? 'Verifying...' : (t('verifyContinue') || 'Verify & Continue')}
              </motion.button>

              <div className="text-center">
                <button 
                  type="button" 
                  onClick={handleSendOTP}
                  disabled={cooldown > 0 || loading}
                  className={`text-sm font-bold transition-colors ${cooldown > 0 ? 'text-wa-subtext cursor-not-allowed' : 'text-wa-teal hover:underline'}`}
                >
                  {cooldown > 0 ? `Resend OTP in ${cooldown}s` : (t('resendOtp') || "Didn't receive? Resend OTP")}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Language selector */}
        {step === 1 && (
          <div className="mt-8 pt-6 border-t border-wa-border">
            <p className="text-wa-subtext text-xs font-bold text-center uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <Globe size={13} /> {t('languageInfo') || 'Choose your language'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {languages.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`wa-chip ${lang === l.code ? 'wa-chip-active' : 'wa-chip-inactive'}`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
