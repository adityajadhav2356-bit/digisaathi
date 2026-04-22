import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle, Smartphone, Award, XCircle, Home, RotateCcw } from 'lucide-react';

const moduleData = {
  1: {
    title: 'UPI Payments',
    steps: [
      { img: '💳', text: "What is UPI? UPI stands for Unified Payments Interface. It lets you send money using just your phone!" },
      { img: '📱', text: "Open any UPI app — like GPay, PhonePe, or Paytm by tapping the icon on your screen." },
      { img: '👤', text: "Tap 'Send Money' and enter the person's UPI ID or phone number." },
      { img: '₹', text: "Enter the amount you want to send. Double-check before proceeding." },
      { img: '🔒', text: "Enter your 4 or 6 digit UPI PIN to confirm. Never share this PIN with anyone!" },
      { img: '✅', text: "Done! You will see a green tick if payment is successful." }
    ],
    quiz: [
      { q: "What do you need to send money via UPI?", options: ["Phone Number / UPI ID", "Bank Branch Name", "Home Address"], answer: 0 },
      { q: "Should you share your UPI PIN?", options: ["Yes, to friends", "Never, it is secret", "Only to bank officials"], answer: 1 },
      { q: "How do you know payment was successful?", "options": ["Green Tick appears", "Red Cross appears", "Nothing happens"], answer: 0 }
    ]
  }
};

const LearningModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = moduleData[id] || moduleData[1];
  
  const [step, setStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    window.speechSynthesis.cancel();
    if (isSpeaking && !showQuiz) {
      speak(data.steps[step].text);
    }
    return () => window.speechSynthesis.cancel();
  }, [step, isSpeaking, showQuiz]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleNext = () => {
    if (step < data.steps.length - 1) setStep(prev => prev + 1);
    else setShowQuiz(true);
  };

  const handlePrev = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const submitQuiz = () => {
    let score = 0;
    data.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) score++;
    });
    setQuizScore(score);
    if (score === data.quiz.length) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#667eea', '#f093fb', '#4facfe'] });
    }
  };

  if (quizScore !== null) {
    const passed = quizScore === data.quiz.length;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[85vh] flex flex-col items-center justify-center p-6 text-center">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-glow ${passed ? 'bg-gradient-success' : 'bg-red-500'}`}>
           {passed ? <Award size={64} className="text-white drop-shadow-md" /> : <XCircle size={64} className="text-white" />}
        </div>
        <h1 className="text-5xl font-black mb-4">
          {passed ? '🎉 Module Complete!' : 'Not Quite There'}
        </h1>
        <p className="text-2xl text-textSecondary font-bold mb-10">
          You scored {quizScore} out of {data.quiz.length}
        </p>
        
        {passed ? (
          <button onClick={() => navigate('/home')} className="btn-primary h-20 w-full max-w-sm rounded-[2rem] text-2xl uppercase tracking-widest gap-4">
             <Home size={28} /> Back to Home
          </button>
        ) : (
          <button onClick={() => { setQuizScore(null); setQuizAnswers({}); setShowQuiz(false); setStep(0); }} className="btn-accent h-20 w-full max-w-sm rounded-[2rem] text-2xl uppercase tracking-widest gap-4">
             <RotateCcw size={28} /> Try Again
          </button>
        )}
      </motion.div>
    );
  }

  if (showQuiz) {
    return (
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 pb-32 pt-8">
        <div className="card-glass border-b-[6px] border-amber-400 text-center mb-8">
           <h2 className="text-3xl font-black text-amber-300">Quick Test</h2>
           <p className="text-lg text-textSecondary font-bold">Let's see what you remember!</p>
        </div>

        <div className="space-y-10">
          {data.quiz.map((q, qIndex) => (
             <div key={qIndex} className="card-glass bg-white/5 space-y-4">
                <h3 className="text-2xl font-bold mb-6">{qIndex + 1}. {q.q}</h3>
                <div className="space-y-3">
                   {q.options.map((opt, oIndex) => (
                      <button 
                        key={oIndex}
                        onClick={() => setQuizAnswers(prev => ({ ...prev, [qIndex]: oIndex }))}
                        className={`w-full py-5 px-6 rounded-2xl border text-xl font-bold flex items-center justify-between transition-all ${quizAnswers[qIndex] === oIndex ? 'bg-gradient-success border-transparent text-brandBgDark shadow-glow' : 'bg-white/5 border-white/20 hover:bg-white/10'}`}
                      >
                         {opt}
                         {quizAnswers[qIndex] === oIndex && <CheckCircle size={24} />}
                      </button>
                   ))}
                </div>
             </div>
          ))}

          <button 
            onClick={submitQuiz}
            disabled={Object.keys(quizAnswers).length < data.quiz.length}
            className={`btn-primary w-full h-20 rounded-[2rem] text-2xl font-black uppercase tracking-widest ${Object.keys(quizAnswers).length < data.quiz.length ? 'opacity-50' : 'animate-pulse'}`}
          >
            Submit Answers
          </button>
        </div>
      </motion.div>
    );
  }

  const progressPct = ((step) / (data.steps.length - 1)) * 100;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto flex flex-col min-h-[90vh] py-8 px-4 relative">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-white">{data.title}</h1>
        <p className="text-textSecondary font-bold uppercase tracking-widest text-sm">Step {step + 1} of {data.steps.length}</p>
        
        {/* Progress bar */}
        <div className="h-4 bg-white/10 rounded-full mt-6 overflow-hidden border border-white/10">
           <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} className="h-full bg-gradient-success shadow-glow"></motion.div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={step} 
          initial={{ x: 20, opacity: 0, scale: 0.95 }} 
          animate={{ x: 0, opacity: 1, scale: 1 }} 
          exit={{ x: -20, opacity: 0, scale: 0.95 }}
          className="flex-1 flex flex-col items-center justify-center text-center space-y-12 my-auto"
        >
          <div className="w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center shadow-glass border-8 border-white/10 relative">
             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/20 animate-spin-slow mix-blend-screen"></div>
             <span className="text-[100px] md:text-[140px] drop-shadow-2xl relative z-10">{data.steps[step].img}</span>
          </div>

          <p className="text-2xl md:text-4xl leading-relaxed md:leading-snug font-bold text-white max-w-2xl px-4 drop-shadow-sm">
             {data.steps[step].text}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Floating Read Aloud */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
          else speak(data.steps[step].text);
        }}
        className={`fixed top-8 right-8 w-16 h-16 rounded-full shadow-glow flex items-center justify-center z-50 ${isSpeaking ? 'bg-gradient-success border-2 border-white' : 'bg-white/10 border-2 border-white/30 backdrop-blur-md'}`}
      >
        {isSpeaking ? <Volume2 size={32} className="text-brandBgDark" /> : <VolumeX size={32} className="text-white" />}
      </motion.button>

      {/* Navigation Controls */}
      <div className="flex gap-4 w-full mt-auto pt-8 border-t border-white/10">
        <button 
          onClick={handlePrev}
          disabled={step === 0}
          className={`flex-1 btn-base h-20 text-xl md:text-2xl bg-white/5 disabled:opacity-30 border border-white/20`}
        >
           <ChevronLeft size={32} /> Back
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 btn-primary h-20 text-xl md:text-2xl w-full"
        >
           {step === data.steps.length - 1 ? 'Take Quiz' : 'Next'} <ChevronRight size={32} />
        </button>
      </div>

    </motion.div>
  );
};

export default LearningModule;
