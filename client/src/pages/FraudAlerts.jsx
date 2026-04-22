import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, HelpCircle, ChevronLeft, Fingerprint, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pageTransition } from '../App';

const alerts = [
  { id: 1, type: "Phone Call", title: "Fake KYC Call", desc: "Someone calls claiming to be from your bank and asks for Aadhaar/OTP. NEVER share OTP with anyone.", tips: ["Hang up immediately.", "Go to branch if unsure."], color: "border-red-500 text-red-100 bg-red-500/10" },
  { id: 2, type: "UPI Scam", title: "Fake UPI Request", desc: "A payment REQUEST is not the same as receiving money. Entering PIN on a request sends YOUR money away.", tips: ["If asked for PIN to RECEIVE money, it's a scam.", "Decline the request."], color: "border-orange-500 text-orange-100 bg-orange-500/10" },
  { id: 3, type: "SMS Scam", title: "Lottery Fraud", desc: "You did NOT win a lottery. Anyone asking for 'processing fee' to release prize money is a scammer.", tips: ["Do not reply.", "Block the sender."], color: "border-yellow-500 text-yellow-100 bg-yellow-500/10" },
  { id: 4, type: "App Fraud", title: "Fake Government App", desc: "Download apps only from official Play Store. Fake apps steal your banking details.", tips: ["Check developer name.", "Read reviews before downloading."], color: "border-purple-500 text-purple-100 bg-purple-500/10" },
  { id: 5, type: "WhatsApp", title: "OTP Theft", desc: "No bank, government, or company will ever ask for your OTP over call or WhatsApp.", tips: ["OTP means DO NOT SHARE.", "Ignore such messages."], color: "border-pink-500 text-pink-100 bg-pink-500/10" }
];

const FraudAlerts = () => {
  const navigate = useNavigate();

  return (
    <motion.div {...pageTransition} className="max-w-4xl mx-auto px-4 pb-32">
      <div className="flex items-center gap-6 mb-10 pt-8">
        <button onClick={() => navigate('/home')} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/20">
           <ChevronLeft size={36} className="text-white" />
        </button>
        <div>
          <h1 className="text-4xl font-black text-white mb-1 tracking-tight flex items-center gap-3">
            <ShieldAlert size={36} className="text-red-400" /> Stay Safe Online
          </h1>
          <p className="text-textSecondary font-bold uppercase tracking-widest text-sm">Learn to identify and avoid scams</p>
        </div>
      </div>

      <div className="space-y-6">
        {alerts.map(a => (
          <motion.div key={a.id} whileHover={{ y: -4 }} className={`card-glass border-l-8 ${a.color} flex flex-col md:flex-row gap-6 p-6`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-white/10 shadow-inner border border-white/20 shrink-0`}>
              <AlertTriangle size={40} className="drop-shadow-md text-white/90" />
            </div>
            <div>
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 bg-white/5`}>{a.type}</span>
              <h2 className="text-2xl font-black text-white mt-3 mb-2">{a.title}</h2>
              <p className="text-lg font-medium text-white/80 leading-relaxed mb-4">{a.desc}</p>
              <div className="bg-brandBgDark/50 p-4 rounded-xl border border-white/10 space-y-2">
                <p className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Lock size={16} className="text-green-400" /> What to do:
                </p>
                <ul className="list-disc pl-6 text-green-100 font-medium space-y-1">
                  {a.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Simulator />

    </motion.div>
  );
};

const Simulator = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="mt-16 card-glass border-t-8 border-t-brandBgDark p-6 md:p-10 relative overflow-hidden bg-white/5">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none scale-150">
        <Fingerprint size={300} />
      </div>

      <div className="text-center mb-10 relative z-10">
        <h2 className="text-3xl font-black text-white mb-2 flex justify-center items-center gap-4">
          <Smartphone size={36} className="text-purple-400" /> Fraud Simulator
        </h2>
        <p className="text-lg text-textSecondary font-bold">Is this transaction safe or a scam?</p>
      </div>

      <div className="flex flex-col items-center justify-center relative z-10">
         {/* Fake App Screen */}
         <div className="w-full max-w-sm h-auto bg-white border-8 border-gray-600 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden mb-10 pb-8 text-center pt-10">
            <div className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-8">Secure Payment App</div>
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 shadow-inner mb-6 ring-4 ring-red-100">
               <ShieldAlert size={48} />
            </div>
            <h3 className="text-gray-900 text-2xl font-black px-6 mb-2">Requesting ₹50,000 for "Lottery Prize Release"</h3>
            <p className="text-blue-600 text-lg font-bold bg-blue-50 py-1 px-4 rounded-xl mx-auto border border-blue-200 uppercase tracking-widest mb-8">From: KBC Prize Dept</p>
            
            <div className="px-6 space-y-4">
               <div className="py-4 bg-brandBgDark text-white rounded-2xl text-xl font-black shadow-lg">PAY NOW</div>
               <p className="text-red-500 font-bold text-sm uppercase tracking-widest animate-pulse">Enter PIN to receive money</p>
            </div>
         </div>

         {!result ? (
           <div className="grid grid-cols-2 gap-4 w-full h-24 max-w-lg">
              <button 
                onClick={() => setResult('safe')}
                className="btn-success text-2xl"
              >
                 <CheckCircle size={28} /> Safe
              </button>
              <button 
                onClick={() => setResult('scam')}
                className="btn-danger text-2xl shadow-glow"
              >
                 <AlertTriangle size={28} /> Scam
              </button>
           </div>
         ) : (
           <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className={`text-center p-8 rounded-[2rem] border-4 w-full max-w-lg ${result === 'scam' ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-500'}`}>
              <h2 className={`text-4xl font-black mb-4 ${result === 'scam' ? 'text-green-300' : 'text-red-300'}`}>
                {result === 'scam' ? 'CORRECT! 🎉' : 'DANGER! 🛑'}
              </h2>
              <p className="text-xl font-medium text-white shadow-sm leading-relaxed mb-8">
                {result === 'scam' 
                  ? "Great job! This is a classic scam. You NEVER need to enter your PIN to receive prize money."
                  : "Careful! You NEVER enter a PIN to receive money. If it asks for a PIN, money is leaving your account."}
              </p>
              <button onClick={() => setResult(null)} className="btn-base bg-white/10 hover:bg-white/20 w-full text-xl h-16 border border-white/30">
                Try Another Example
              </button>
           </motion.div>
         )}
      </div>
    </div>
  );
};

export default FraudAlerts;
