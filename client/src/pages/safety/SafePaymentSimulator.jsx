import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, QrCode, ArrowLeft, Send, History, IndianRupee, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingVoiceAssistant from '../../components/FloatingVoiceAssistant';
import PageTransition from '../../components/PageTransition';
import confetti from 'canvas-confetti';

const SafePaymentSimulator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('home'); // home, scan, amount, pin, success

  const pageAudioTexts = {
    home: "This is the Safe Payment Simulator. No real money will be used here. You can practice sending money or checking your balance safely. Tap 'Scan QR' to start practicing.",
    scan: "Imagine pointing your camera at a QR code in a shop. We are simulating a scan now.",
    amount: "You are paying Ramesh Grocery. Enter an amount like 50 rupees, then tap Pay.",
    pin: "Never share your UPI PIN with anyone. Enter your secret 4-digit PIN to confirm the simulated payment.",
    success: "Great job! You successfully completed a practice payment. You are learning fast!"
  };

  const handleSuccess = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setStep('success');
  };

  return (
    <PageTransition className="min-h-screen bg-slate-900 p-4 md:p-8 flex flex-col items-center">
      <FloatingVoiceAssistant textToRead={pageAudioTexts[step]} autoPlay={true} />

      {/* Persistent Top Warning */}
      <div className="w-full max-w-sm bg-blue-600 text-white font-bold text-center py-2 rounded-b-3xl shadow-lg mb-6 flex items-center justify-center gap-2 text-sm z-10 fixed top-0 left-1/2 -translate-x-1/2">
        <Info size={16} /> PRACTICE MODE - NO REAL MONEY
      </div>

      <div className="w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden mt-12 relative min-h-[700px] border-8 border-slate-800">
        
        {/* Mock Phone Header */}
        <div className="bg-blue-600 p-6 text-white pb-8 rounded-b-3xl relative z-10 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => step === 'home' ? navigate('/safety') : setStep('home')} className="hover:bg-white/20 p-2 rounded-full transition">
              <ArrowLeft size={24} />
            </button>
            <div className="font-bold text-lg tracking-wide">MyUPI</div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md font-bold">
              SJ
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {step === 'home' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="opacity-80 text-sm font-medium">UPI ID: senior.john@upi</p>
                <div className="mt-4 flex gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl flex-1 flex flex-col items-center justify-center backdrop-blur-sm cursor-pointer" onClick={() => setStep('scan')}>
                    <QrCode size={32} className="mb-2" />
                    <span className="font-bold text-sm">Scan QR</span>
                  </div>
                  <div className="bg-white/20 p-3 rounded-2xl flex-1 flex flex-col items-center justify-center backdrop-blur-sm cursor-pointer" onClick={() => setStep('scan')}>
                    <Send size={32} className="mb-2" />
                    <span className="font-bold text-sm">Send</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mock Phone Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            
            {step === 'home' && (
              <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h3 className="font-black text-slate-800 mb-4">Recent Practice History</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg">M</div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">Milk Shop</p>
                      <p className="text-xs text-slate-400">Yesterday • Practice</p>
                    </div>
                    <div className="font-bold text-slate-800">- ₹45</div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-lg">E</div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">Electricity Bill</p>
                      <p className="text-xs text-slate-400">3 days ago • Practice</p>
                    </div>
                    <div className="font-bold text-slate-800">- ₹820</div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'scan' && (
              <motion.div key="scan" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-10">
                <div className="w-48 h-48 border-4 border-blue-500 rounded-3xl relative flex items-center justify-center bg-slate-100 overflow-hidden mb-8">
                  <QrCode size={80} className="text-slate-300" />
                  <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                  ></motion.div>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Simulating QR Scan...</h3>
                <p className="text-sm text-slate-500 text-center mb-6">Point camera at QR code</p>
                
                <button onClick={() => setStep('amount')} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg">Mock Scan Success</button>
              </motion.div>
            )}

            {step === 'amount' && (
              <motion.div key="amount" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-2xl mb-4">R</div>
                <h2 className="text-xl font-black text-slate-800">Ramesh Grocery</h2>
                <p className="text-slate-500 text-sm mb-8">ramesh@upi</p>

                <div className="flex items-center justify-center text-4xl font-black text-slate-800 mb-8 border-b-2 border-slate-200 pb-2">
                  <IndianRupee size={32} className="mr-2 text-slate-400" />
                  <input type="number" placeholder="0" className="w-32 text-center outline-none bg-transparent" defaultValue="50" />
                </div>

                <button onClick={() => setStep('pin')} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg text-lg">Pay Securely</button>
              </motion.div>
            )}

            {step === 'pin' && (
              <motion.div key="pin" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center pt-8">
                <h2 className="text-xl font-black text-slate-800 mb-2">Enter UPI PIN</h2>
                <p className="text-slate-500 text-sm mb-8 text-center px-4">Keep your PIN secret. Do not share with anyone.</p>
                
                <div className="flex gap-4 mb-12">
                  {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-2xl font-black text-slate-800">•</div>)}
                </div>

                <button onClick={handleSuccess} className="w-full bg-green-600 hover:bg-green-700 transition text-white font-bold py-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2">
                  <CheckCircle /> Confirm Practice Payment
                </button>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={60} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Payment Successful!</h2>
                <p className="text-slate-500 mb-8">₹50 sent to Ramesh Grocery (Practice)</p>
                
                <button onClick={() => setStep('home')} className="w-full bg-blue-100 text-blue-700 font-bold py-4 rounded-2xl transition hover:bg-blue-200">
                  Back to Simulator Home
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </PageTransition>
  );
};

export default SafePaymentSimulator;
