import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Camera, User, Calendar, MapPin, Type, Globe, ShieldCheck, MessageCircle, Wallet, FileText, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { pageTransition } from '../App';

const UserDetails = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', age: '', city: 'Mumbai', font: 'Normal', language: 'en', goals: [], emergencyName: '', relation: 'Son', emergencyPhone: '', shareProgress: false
  });
  const navigate = useNavigate();

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleComplete = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#667eea', '#f093fb', '#4facfe']
    });
    localStorage.setItem('digiUser', JSON.stringify(formData));
    setTimeout(() => navigate('/home'), 1500);
  };

  const StepIndicator = () => (
    <div className="flex gap-4 w-full mb-10 mt-6 justify-center">
      {[1, 2, 3].map(s => (
        <motion.div key={s} 
          className={`h-3 flex-1 rounded-full overflow-hidden bg-white/10 shadow-inner`}
        >
          {step >= s && (
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "100%" }} 
              className={`h-full ${s === 1 ? 'bg-gradient-primary' : s === 2 ? 'bg-gradient-accent' : 'bg-gradient-success'} shadow-glow`}
            />
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div {...pageTransition} className="max-w-xl mx-auto p-6 min-h-[90vh] flex flex-col justify-center">
      
      <StepIndicator />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="card-glass border-t-8 border-t-purple-500">
            <h1 className="text-3xl font-black text-white text-center">Tell us about yourself 😊</h1>
            <p className="text-center text-textSecondary mb-8 uppercase tracking-widest text-xs font-bold">Step 1 of 3: Personal Details</p>

            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center relative cursor-pointer hover:bg-white/20 transition shadow-inner border border-white/20">
                <User size={64} className="text-white/50" />
                <div className="absolute bottom-0 right-0 p-3 bg-gradient-primary rounded-full shadow-glow">
                  <Camera size={20} className="text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={24} />
                <input type="text" placeholder="Full Name (आपका नाम)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="glass-input pl-14 h-16" />
              </div>
              <div className="flex gap-4">
                <div className="relative w-1/3">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={24} />
                  <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="glass-input pl-14 h-16" />
                </div>
                <div className="relative w-2/3">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={24} />
                  <select value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="glass-input pl-14 h-16 appearance-none text-white font-bold bg-brandBgMid outline-none cursor-pointer">
                    <option>Mumbai, MH</option>
                    <option>Delhi, DL</option>
                    <option>Bangalore, KA</option>
                    <option>Chennai, TN</option>
                  </select>
                </div>
              </div>

              <motion.button onClick={handleNext} disabled={!formData.name} className={`btn-primary w-full h-16 mt-8 ${!formData.name ? 'opacity-50' : ''}`}>
                Next Step <ArrowRight />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="card-glass border-t-8 border-t-pink-500">
            <h1 className="text-3xl font-black text-center mb-2">How would you like to learn?</h1>
            <p className="text-center text-textSecondary mb-8 uppercase tracking-widest text-xs font-bold">Step 2 of 3: Preferences</p>

            <div className="space-y-8">
              {/* Font Size */}
              <div>
                <h3 className="flex items-center gap-2 text-textSecondary mb-4"><Type size={20} /> Font Size</h3>
                <div className="flex justify-between gap-3">
                  {['Normal', 'Large', 'Extra Large'].map(f => (
                    <button key={f} onClick={() => setFormData({...formData, font: f})} className={`flex-1 py-4 px-2 rounded-xl text-center font-bold border transition ${formData.font === f ? 'bg-gradient-accent border-transparent shadow-glow' : 'bg-white/5 border-white/20 text-white/70'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="flex items-center gap-2 text-textSecondary mb-4"><Globe size={20} /> Preferred Language</h3>
                <div className="flex flex-wrap gap-3">
                  {['Hindi', 'English', 'Marathi', 'Tamil', 'Bengali'].map(l => (
                    <button key={l} onClick={() => setFormData({...formData, language: l})} className={`px-5 py-3 rounded-full font-bold border transition ${formData.language === l ? 'bg-gradient-warm text-brandBgDark border-transparent shadow-glow' : 'bg-white/5 border-white/20 text-white/70'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div>
                <h3 className="flex items-center gap-2 text-textSecondary mb-4"><Star size={20} /> Learning Goals</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'upi', label: 'UPI Payments', icon: Wallet, color: 'text-green-400' },
                    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-green-500' },
                    { id: 'govt', label: 'Govt Services', icon: FileText, color: 'text-blue-400' },
                    { id: 'safety', label: 'Stay Safe Online', icon: ShieldCheck, color: 'text-red-400' }
                  ].map(g => (
                    <button 
                      key={g.id} 
                      onClick={() => setFormData(prev => ({...prev, goals: prev.goals.includes(g.id) ? prev.goals.filter(id => id !== g.id) : [...prev.goals, g.id]}))}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl gap-2 border transition ${formData.goals.includes(g.id) ? 'bg-white/20 border-white shadow-inner' : 'bg-white/5 border-white/20'}`}
                    >
                      <g.icon size={36} strokeWidth={2.5} className={formData.goals.includes(g.id) ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : g.color} />
                      <span className="font-bold text-sm text-center">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.button onClick={handleNext} className="btn-accent w-full h-16 mt-4">
                Next Step <ArrowRight />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="card-glass border-t-8 border-t-cyan-500">
            <h1 className="text-3xl font-black text-center mb-2">Emergency Contact</h1>
            <p className="text-center text-textSecondary mb-8 uppercase tracking-widest text-xs font-bold">Step 3 of 3: Safety Net</p>
            <p className="text-center font-medium bg-red-500/10 p-4 rounded-xl text-red-100 border border-red-500/30 mb-8 italic">
              "Who should we notify if you need immediate assistance?"
            </p>

            <div className="space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={24} />
                <input type="text" placeholder="Contact Name" value={formData.emergencyName} onChange={e => setFormData({...formData, emergencyName: e.target.value})} className="glass-input pl-14 h-16" />
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">Relation:</span>
                <select value={formData.relation} onChange={e => setFormData({...formData, relation: e.target.value})} className="glass-input pl-28 h-16 appearance-none text-white font-bold bg-brandBgMid outline-none cursor-pointer">
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Spouse</option>
                  <option>Friend</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={24} />
                <input type="tel" placeholder="Mobile Number" value={formData.emergencyPhone} onChange={e => setFormData({...formData, emergencyPhone: e.target.value})} className="glass-input pl-14 h-16" />
              </div>

              <label className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition mt-4">
                <input type="checkbox" checked={formData.shareProgress} onChange={e => setFormData({...formData, shareProgress: e.target.checked})} className="w-6 h-6 rounded text-primary focus:ring-primary accent-green-400 cursor-pointer" />
                <span className="font-bold flex-1">Allow family to view my learning progress securely</span>
              </label>

              <motion.button onClick={handleComplete} disabled={!formData.emergencyName || !formData.emergencyPhone} className={`btn-success w-full h-16 mt-8 ${(!formData.emergencyName || !formData.emergencyPhone) ? 'opacity-50' : ''}`}>
                <CheckCircle size={28} /> Complete Setup 🎉
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserDetails;
