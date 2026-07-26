import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, ArrowLeft, ShieldAlert, Mic, MicOff, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingVoiceAssistant from '../../components/FloatingVoiceAssistant';
import PageTransition from '../../components/PageTransition';

const TransactionRiskAnalysis = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(true);
  const [riskLevel, setRiskLevel] = useState('high'); // safe, medium, high
  const [voiceConfirming, setVoiceConfirming] = useState(false);
  const [micActive, setMicActive] = useState(false);
  
  const pageAudioText = analyzing 
    ? "Analyzing your transaction for potential risks. Please wait." 
    : "Warning! This transaction looks suspicious. We detected a new receiver and a large payment amount. Please listen to the voice confirmation carefully.";

  const voicePrompt = "You are about to send ₹2,500 to Rahul Sharma using UPI. Please confirm if you know this person. Say 'Yes' to continue or 'Cancel' to stop.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const triggerVoiceConfirmation = () => {
    setVoiceConfirming(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(voicePrompt);
      utterance.lang = 'en-IN';
      utterance.rate = 0.85;
      utterance.onend = () => {
        // Start "listening" for response after prompt
        setMicActive(true);
        setTimeout(() => setMicActive(false), 5000); // mock listening timeout
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <PageTransition className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <FloatingVoiceAssistant textToRead={pageAudioText} autoPlay={true} />

      <div className="w-full max-w-lg flex flex-col items-center mt-4">
        <div className="w-full flex items-center justify-between mb-8">
          <button onClick={() => navigate('/safety')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-200 shadow-sm">
            <Eye size={18} /> AI Active
          </div>
        </div>

        <AnimatePresence mode="wait">
          {analyzing ? (
            <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center mt-20">
              <div className="relative w-32 h-32 mb-6">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-8 border-blue-100 rounded-full border-t-blue-600"></motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck size={48} className="text-blue-600 animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-slate-800">Analyzing Risk...</h2>
              <p className="text-slate-500 font-medium mt-2">Checking receiver details & amount</p>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
              
              <div className={`w-full rounded-3xl p-6 shadow-xl mb-6 relative overflow-hidden ${riskLevel === 'high' ? 'bg-red-500 shadow-red-500/20 text-white' : 'bg-amber-500 shadow-amber-500/20 text-white'}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                    {riskLevel === 'high' ? <ShieldAlert size={28} className="text-white" /> : <AlertTriangle size={28} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">AI Risk Analysis</p>
                    <h2 className="text-2xl font-black">{riskLevel === 'high' ? 'High Risk!' : 'Medium Risk'}</h2>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20 relative z-10 mb-6">
                  <p className="font-medium text-lg leading-snug">
                    This transaction looks suspicious because the receiver is new and the amount is unusually large.
                  </p>
                </div>

                <div className="space-y-3 relative z-10">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Risk Factors Detected</p>
                  <div className="flex items-center gap-2 bg-black/10 px-4 py-3 rounded-xl font-bold">
                    <span className="w-2 h-2 rounded-full bg-white"></span> New receiver (Never paid before)
                  </div>
                  <div className="flex items-center gap-2 bg-black/10 px-4 py-3 rounded-xl font-bold">
                    <span className="w-2 h-2 rounded-full bg-white"></span> Unusually large amount (₹2,500)
                  </div>
                </div>
              </div>

              {!voiceConfirming ? (
                <div className="flex flex-col gap-3">
                  <button onClick={triggerVoiceConfirmation} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-2xl h-16 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition">
                    <Mic size={24} /> Proceed with Voice Confirmation
                  </button>
                  <button onClick={() => navigate('/safety')} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-lg rounded-2xl h-14 transition border-2 border-transparent">
                    Cancel Transaction
                  </button>
                </div>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center relative overflow-hidden">
                  
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 transition-all ${micActive ? 'bg-blue-100 text-blue-600 animate-pulse border-4 border-blue-200 shadow-[0_0_20px_#3b82f640]' : 'bg-slate-100 text-slate-400'}`}>
                    {micActive ? <Mic size={40} /> : <MicOff size={40} />}
                  </div>

                  <h3 className="text-xl font-black text-slate-800 mb-2">{micActive ? 'Listening...' : 'Voice Confirmation'}</h3>
                  <p className="text-slate-500 font-medium text-sm mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                    "{voicePrompt}"
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-left mb-6">
                    <div className="bg-green-50 text-green-700 p-3 rounded-xl border border-green-200 font-bold text-sm flex items-center justify-center gap-2">Say "Yes"</div>
                    <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-200 font-bold text-sm flex items-center justify-center gap-2">Say "Cancel"</div>
                  </div>
                  
                  <button onClick={() => {window.speechSynthesis.cancel(); navigate('/safety');}} className="text-slate-400 font-bold text-sm hover:text-slate-600">
                    Stop & Cancel
                  </button>
                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default TransactionRiskAnalysis;
