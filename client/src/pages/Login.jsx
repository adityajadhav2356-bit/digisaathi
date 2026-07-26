import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { pageTransition } from '../App';
import { Smartphone, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

const languages = [
  { code: 'hi', name: '🇮🇳 Hindi' },
  { code: 'en', name: 'English' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'bn', name: 'বাংলা' }
];

const Login = () => {
  const [phone, setPhone] = useState('7030027961');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState('en');
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length === 10) setStep(2);
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus logic
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      // Dummy check: assume existing user if phone is exactly '9999999999'
      if (phone === '9999999999') navigate('/home');
      else navigate('/details');
    }
  };

  return (
    <motion.div {...pageTransition} className="flex min-h-[90vh] items-center justify-center p-6 w-full gap-12 max-w-6xl mx-auto">
      
      {/* Left side desktop illustration (hidden on mobile) */}
      <div className="hidden lg:flex flex-col w-1/2 justify-center items-center opacity-80 animate-pulse">
        <div className="relative">
          <Smartphone size={250} className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]" strokeWidth={1} />
          <motion.div className="absolute -top-10 -right-10 bg-gradient-success p-6 rounded-[2rem] shadow-glow" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
            <ShieldCheck size={64} className="text-white" />
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 max-w-md card-glass p-8 sm:p-12 border-t-[6px] border-t-purple-500 relative z-10 transition-all duration-300">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Welcome Back! 👋</h1>
          <p className="text-lg text-textSecondary font-medium">Enter your mobile number to continue</p>
        </div>

        {step === 1 ? (
          <motion.form key="phone-step" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSendOTP} className="space-y-6">
            <div className="relative flex items-center bg-white/10 p-2 rounded-2xl border border-white/20 focus-within:ring-2 focus-within:ring-white/50 focus-within:bg-white/20 transition-all shadow-inner">
              <span className="pl-4 text-2xl">📱</span>
              <span className="pl-3 text-2xl font-bold text-white/50 border-r border-white/20 pr-3 mr-3">+91</span>
              <input 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full bg-transparent text-2xl font-bold text-white outline-none placeholder-white/30 tracking-wider py-2"
                placeholder="Mobile number"
                autoFocus
                required
              />
            </div>

            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.95 }}
              disabled={phone.length < 10}
              className={`w-full py-5 rounded-2xl bg-gradient-primary text-2xl font-black shadow-glow flex justify-center items-center gap-3 border border-white/20 ${phone.length < 10 ? 'opacity-50' : ''}`}
            >
              Send OTP <ArrowRight size={24} />
            </motion.button>
          </motion.form>
        ) : (
          <motion.form key="otp-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleVerify} className="space-y-8">
            <p className="text-center text-textSecondary font-bold bg-white/5 p-4 rounded-xl border border-white/10 uppercase tracking-widest text-sm flex items-center justify-center gap-2">
              <ShieldCheck size={20} className="text-green-400" /> OTP sent to {phone}
            </p>
            <div className="flex justify-between gap-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(e, i)}
                  className="w-[4rem] h-[5rem] sm:w-[5rem] sm:h-[6rem] text-center text-5xl font-black bg-white/10 border-2 border-white/20 rounded-2xl focus:bg-white/30 focus:border-white shadow-inner outline-none transition-all"
                />
              ))}
            </div>
            
            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.95 }}
              disabled={otp.join('').length < 4}
              className={`w-full py-5 rounded-2xl bg-gradient-success text-2xl font-black shadow-glow flex justify-center items-center border border-white/20 ${otp.join('').length < 4 ? 'opacity-50' : ''}`}
            >
              Verify & Continue
            </motion.button>
          </motion.form>
        )}

        <div className="mt-10 border-t border-white/10 pt-8 flex items-center flex-col gap-6">
          <p className="text-center text-textSecondary hover:text-white cursor-pointer font-medium underline underline-offset-4 decoration-white/30 decoration-2 transition-colors">
            New here? Register in 2 minutes
          </p>

          <div className="w-full">
            <p className="text-xs text-center text-textSecondary font-bold uppercase tracking-widest mb-4 flex justify-center items-center gap-2">
              <Globe size={14} /> Language
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLang(lang.code)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                    selectedLang === lang.code 
                      ? 'bg-gradient-warm text-brandBgDark border-transparent shadow-md' 
                      : 'bg-white/5 border-white/20 text-textSecondary hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
