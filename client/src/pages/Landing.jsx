import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { pageTransition } from '../App';
import { Star, ArrowRight, HeartPulse, Sparkles } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const taglines = ["Learn UPI", "Stay Safe Online", "Connect with Family", "Use DigiLocker"];
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleRole = (role) => {
    localStorage.setItem('tempRole', role);
    navigate('/login');
  };

  return (
    <motion.div {...pageTransition} className="flex flex-col items-center justify-center min-h-[90vh] text-center px-6 relative z-10 w-full max-w-lg mx-auto">
      
      {/* Logo */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.8, type: "spring" }}
        className="w-32 h-32 rounded-[2rem] bg-gradient-success flex items-center justify-center mb-6 shadow-glow rotate-3 border-4 border-white/20"
      >
        <span className="text-5xl font-black text-white drop-shadow-md">DS</span>
      </motion.div>

      {/* Hero Text */}
      <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">DigiSaathi</h1>
      <p className="text-xl text-textSecondary font-medium mb-6 flex items-center gap-2 justify-center">
        Your trusted digital companion 🙏
      </p>

      {/* Animated Tagline */}
      <div className="h-14 flex items-center justify-center mb-10 w-full">
        <motion.p
          key={currentTagline}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          ✨ {taglines[currentTagline]}
        </motion.p>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-5">
        <motion.button 
          whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(102,126,234,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRole('senior')}
          className="w-full h-20 rounded-[2rem] bg-gradient-primary text-2xl font-black text-white flex items-center justify-between px-8 border border-white/20"
        >
          <span className="flex items-center gap-4"><Sparkles size={28} /> I am a Senior Learner</span>
          <ArrowRight size={28} />
        </motion.button>

        <motion.button 
          whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(245,87,108,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRole('volunteer')}
          className="w-full h-20 rounded-[2rem] bg-gradient-accent text-2xl font-black text-white flex items-center justify-between px-8 border border-white/20"
        >
          <span className="flex items-center gap-4"><HeartPulse size={28} /> I am a Youth Volunteer</span>
          <ArrowRight size={28} />
        </motion.button>
      </div>

      {/* Trust Footer */}
      <div className="mt-12 flex flex-col items-center gap-2 opacity-80">
        <div className="flex gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
        </div>
        <p className="text-sm font-bold text-textSecondary tracking-wider uppercase">
          Trusted by 10,000+ seniors across India
        </p>
      </div>

    </motion.div>
  );
};

export default Landing;
