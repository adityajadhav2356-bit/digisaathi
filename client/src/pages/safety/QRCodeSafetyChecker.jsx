import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, QrCode, ShieldAlert, ShieldCheck, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingVoiceAssistant from '../../components/FloatingVoiceAssistant';
import PageTransition from '../../components/PageTransition';

const QRCodeSafetyChecker = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null); // 'safe', 'warning'

  useEffect(() => {
    // Simulate scan delay then randomly assign safe or warning
    const timer = setTimeout(() => {
      setScanning(false);
      setResult(Math.random() > 0.5 ? 'safe' : 'warning');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getAudioText = () => {
    if (scanning) return "AI is scanning the QR code to check if the receiver is genuine.";
    if (result === 'safe') return "Safe QR Code. This merchant is verified. You can proceed with the payment safely.";
    return "Warning! Verify before paying. This QR code has risk indicators. The receiver is unknown.";
  };

  return (
    <PageTransition className="min-h-screen bg-slate-900 p-4 md:p-8 flex flex-col items-center">
      <FloatingVoiceAssistant textToRead={getAudioText()} autoPlay={true} />
      
      <div className="w-full max-w-sm flex items-center justify-between mb-8 mt-4">
        <button onClick={() => navigate('/safety')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm text-white hover:bg-white/20 transition border border-white/20">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">QR Safety Check</h1>
      </div>

      <AnimatePresence mode="wait">
        {scanning ? (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center flex-1 w-full py-10">
            <div className="relative w-64 h-64 border-4 border-blue-500 rounded-3xl mb-8 flex items-center justify-center bg-slate-800 overflow-hidden">
              <QrCode size={120} className="text-slate-600" />
              <motion.div 
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6]"
              ></motion.div>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Analyzing QR Code...</h2>
            <p className="text-slate-400 font-medium">Checking merchant reputation</p>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm">
            <div className={`w-full rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center mb-6 border-4 ${result === 'safe' ? 'bg-green-500 border-green-400 shadow-green-500/20 text-white' : 'bg-red-500 border-red-400 shadow-red-500/20 text-white'}`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner relative z-10">
                {result === 'safe' ? <ShieldCheck size={40} className="text-white" /> : <ShieldAlert size={40} className="text-white" />}
              </div>
              
              <h2 className="text-3xl font-black mb-2 relative z-10">{result === 'safe' ? 'Safe QR' : 'Warning!'}</h2>
              <p className="font-bold opacity-90 text-sm relative z-10 mb-6 bg-black/20 p-3 rounded-xl inline-block">
                {result === 'safe' ? 'Verified Merchant Account' : 'Verify before paying'}
              </p>

              {result === 'warning' && (
                <div className="bg-white/10 p-4 rounded-xl text-left border border-white/20 relative z-10 text-sm font-medium">
                  <p className="mb-2 uppercase tracking-widest text-xs font-bold opacity-70">Risk Indicators</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Unknown merchant</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Newly created UPI ID</li>
                  </ul>
                </div>
              )}
            </div>

            <button onClick={() => navigate('/safety')} className="w-full bg-white text-slate-800 font-bold text-lg rounded-2xl h-14 shadow-lg transition hover:bg-slate-100">
              {result === 'safe' ? 'Continue to Pay' : 'Cancel & Go Back'}
            </button>
            
            {result === 'warning' && (
              <button onClick={() => setScanning(true)} className="w-full mt-4 text-slate-400 font-bold hover:text-white transition">
                Scan another QR
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default QRCodeSafetyChecker;
