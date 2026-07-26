import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertCircle, ShieldCheck, HelpCircle, CheckCircle, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingVoiceAssistant from '../../components/FloatingVoiceAssistant';
import PageTransition from '../../components/PageTransition';
import confetti from 'canvas-confetti';

const ScamAwarenessCenter = () => {
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const lessons = [
    {
      id: 1,
      title: "Never share OTP",
      icon: <Smartphone className="text-blue-500" />,
      color: "border-blue-200 bg-blue-50",
      content: "An OTP (One Time Password) is like a secret key. Bank officials, police, or customer care will NEVER ask for your OTP. If someone asks for it, it is a scam.",
      question: "Should you share your OTP with a bank manager who calls you?",
      options: ["Yes, because he is a bank manager", "No, never share OTP with anyone"],
      correct: 1
    },
    {
      id: 2,
      title: "QR Codes send money",
      icon: <AlertCircle className="text-amber-500" />,
      color: "border-amber-200 bg-amber-50",
      content: "You only scan a QR code or enter your UPI PIN when YOU are sending money. To receive money, you do not need to scan anything or enter a PIN.",
      question: "A buyer sends you a QR code and says 'Scan this to receive your money'. What do you do?",
      options: ["Scan it to get my money", "Do not scan it. It is a scam to steal money."],
      correct: 1
    },
    {
      id: 3,
      title: "Fake Customer Care",
      icon: <HelpCircle className="text-purple-500" />,
      color: "border-purple-200 bg-purple-50",
      content: "Never search for customer care numbers on Google. Scammers put fake numbers there. Always use the official app or the number on the back of your bank card.",
      question: "Where is the safest place to find your bank's phone number?",
      options: ["Searching on Google", "On the back of your ATM card"],
      correct: 1
    }
  ];

  const handleQuizAnswer = (idx, correctIdx) => {
    if (idx === correctIdx) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setQuizPassed(true);
    } else {
      alert("That's not right. Let's read the lesson again!");
      setQuizStarted(false);
    }
  };

  const getAudioText = () => {
    if (!activeLesson) return "Welcome to the Scam Awareness Center. Tap on any lesson to learn how to stay safe from frauds.";
    if (quizPassed) return "Congratulations! You answered correctly. You earned a safety badge.";
    if (quizStarted) return `Quiz time! ${activeLesson.question}. Tap the correct answer below.`;
    return `${activeLesson.title}. ${activeLesson.content}`;
  };

  return (
    <PageTransition className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <FloatingVoiceAssistant textToRead={getAudioText()} autoPlay={true} />

      <div className="w-full max-w-lg flex flex-col items-center mt-4">
        <div className="w-full flex items-center mb-8">
          <button onClick={() => activeLesson ? (setActiveLesson(null), setQuizStarted(false), setQuizPassed(false)) : navigate('/safety')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-black text-slate-800 ml-4">Scam Awareness</h1>
        </div>

        <AnimatePresence mode="wait">
          {!activeLesson ? (
            <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-4">
              <div className="bg-blue-600 text-white p-6 rounded-3xl mb-6 shadow-lg relative overflow-hidden">
                <BookOpen size={48} className="absolute right-[-10px] bottom-[-10px] opacity-20" />
                <h2 className="text-xl font-black mb-2">Learn & Earn Badges</h2>
                <p className="font-medium text-sm opacity-90">Read short safety lessons, answer one question, and earn a Trusted Citizen badge.</p>
              </div>

              {lessons.map(lesson => (
                <motion.button 
                  key={lesson.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full bg-white border-2 ${lesson.color} rounded-3xl p-5 flex items-center gap-4 shadow-sm text-left`}
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    {lesson.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{lesson.title}</h3>
                    <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-wider">Tap to read lesson</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div key="lesson" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
              
              {!quizStarted && !quizPassed && (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-200">
                    {activeLesson.icon}
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 mb-4">{activeLesson.title}</h2>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                    {activeLesson.content}
                  </p>
                  <button onClick={() => setQuizStarted(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl h-14 shadow-lg flex items-center justify-center gap-2 transition">
                    Take Short Quiz <ArrowLeft className="rotate-180" size={20} />
                  </button>
                </div>
              )}

              {quizStarted && !quizPassed && (
                <div className="bg-amber-50 rounded-3xl p-6 shadow-xl border border-amber-200">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-amber-600 mb-2">Quiz Time</h2>
                  <p className="text-xl font-black text-slate-800 mb-8 leading-snug">
                    {activeLesson.question}
                  </p>
                  <div className="space-y-3">
                    {activeLesson.options.map((opt, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleQuizAnswer(idx, activeLesson.correct)}
                        className="w-full bg-white border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-100 p-4 rounded-2xl text-left font-bold text-slate-700 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizPassed && (
                <div className="bg-green-500 rounded-3xl p-8 shadow-xl text-center text-white relative overflow-hidden mt-8">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-green-500">
                    <ShieldCheck size={48} />
                  </motion.div>
                  <h2 className="text-3xl font-black mb-2">Badge Earned!</h2>
                  <p className="font-medium text-lg mb-8 opacity-90">You are one step closer to becoming a digital expert.</p>
                  <button onClick={() => {setActiveLesson(null); setQuizStarted(false); setQuizPassed(false);}} className="w-full bg-white text-green-700 font-bold text-lg rounded-2xl h-14 shadow-lg transition hover:bg-green-50">
                    Learn Next Lesson
                  </button>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default ScamAwarenessCenter;
