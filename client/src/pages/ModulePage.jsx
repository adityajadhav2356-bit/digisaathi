import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle, Award, XCircle, Home, RotateCcw, Lightbulb, ExternalLink, ShieldCheck } from 'lucide-react';
import { modules } from '../data/modules';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';
import ContextualGraphic from '../components/ContextualGraphic';
import { getContextualPracticeLink, executeDeepLink } from '../utils/deepLinks';

const getScoreFeedback = (score, total, lang) => {
  const isPerfect = score === total;
  const isGood = score >= Math.ceil(total * 0.6); // 2 out of 3

  const feed = {
    en: {
      perfectTitle: "🎉 Perfect Score!",
      perfectSub: "Outstanding work! You have mastered this module! 🌟",
      passTitle: "👍 Good Job!",
      passSub: "You passed, but you can retry to get a perfect score!",
      retryTitle: "💪 Keep Learning!",
      retrySub: "Don't worry, try again and you will get a better score!"
    },
    hi: {
      perfectTitle: "🎉 बिल्कुल सही स्कोर!",
      perfectSub: "उत्कृष्ट काम! आपने इस मॉड्यूल में महारत हासिल कर ली है! 🌟",
      passTitle: "👍 बहुत बढ़िया!",
      passSub: "आप पास हो गए हैं, लेकिन पूरे अंक पाने के लिए फिर से प्रयास कर सकते हैं!",
      retryTitle: "💪 सीखते रहें!",
      retrySub: "चिंता न करें, फिर से प्रयास करें और आप बेहतर करेंगे!"
    },
    mr: {
      perfectTitle: "🎉 उत्कृष्ट गुण!",
      perfectSub: "खूप छान! तुम्ही या विषयावर पूर्ण विजय मिळवला आहे! 🌟",
      passTitle: "👍 उत्तम प्रयत्न!",
      passSub: "तुम्ही उत्तीर्ण झाला आहात, पण पूर्ण गुण मिळवण्यासाठी पुन्हा खेळू शकता!",
      retryTitle: "💪 शिकत राहा!",
      retrySub: "काळजी करू नका, पुन्हा प्रयत्न करा आणि तुम्ही नक्कीच यशस्वी व्हाल!"
    },
    gu: {
      perfectTitle: "🎉 ઉત્કૃષ્ટ ગુણ!",
      perfectSub: "ખૂબ સરસ! તમે આ વિષયમાં નિપુણતા મેળવી લીધી છે! 🌟",
      passTitle: "👍 સરસ પ્રયત્ન!",
      passSub: "તમે ઉત્તીર્ણ થયા છો, પણ સંપૂર્ણ ગુણ મેળવવા માટે ફરીથી પ્રયાસ કરો!",
      retryTitle: "💪 શીખતા રહો!",
      retrySub: "ચિંતા કરશો નહીં, ફરીથી પ્રયાસ કરો અને તમે વધુ સારું કરશો!"
    },
    ta: {
      perfectTitle: "🎉 அற்புதமான மதிப்பெண்!",
      perfectSub: "சிறந்த பணி! நீங்கள் இந்த தொகுதியில் தேர்ச்சி பெற்றுவிட்டீர்கள்! 🌟",
      passTitle: "👍 நல்ல முயற்சி!",
      passSub: "நீங்கள் தேர்ச்சி பெற்றுவிட்டீர்கள், ஆனால் முழு மதிப்பெண் பெற மீண்டும் முயற்சிக்கலாம்!",
      retryTitle: "💪 தொடர்ந்து கற்றுக்கொள்ளுங்கள்!",
      retrySub: "கவலைப்பட வேண்டாம், மீண்டும் முயற்சித்தால் நீங்கள் சிறப்படையலாம்!"
    },
    bn: {
      perfectTitle: "🎉 নিখুঁত স্কোর!",
      perfectSub: "অসাধারণ কাজ! আপনি এই মডিউলটি সম্পূর্ণরূপে আয়ত্ত করেছেন! 🌟",
      passTitle: "👍 ভালো চেষ্টা!",
      passSub: "আপনি উত্তীর্ণ হয়েছেন, তবে নিখুঁত স্কোরের জন্য আবার চেষ্টা করতে পারেন!",
      retryTitle: "💪 শিখতে থাকুন!",
      retrySub: "চিন্তা করবেন না, আবার চেষ্টা করুন এবং আপনি আরও ভালো করবেন!"
    },
    te: {
      perfectTitle: "🎉 అద్భుతమైన స్కోర్!",
      perfectSub: "అద్భుతమైన పని! మీరు ఈ విభాగంలో పూర్తి నైపుణ్యం సాధించారు! 🌟",
      passTitle: "👍 మంచి ప్రయత్నం!",
      passSub: "మీరు ఉత్తీర్ణత సాధించారు, కానీ పూర్తి స్కోర్ కోసం మళ్లీ ప్రయత్నించవచ్చు!",
      retryTitle: "💪 నేర్చుకుంటూ ఉండండి!",
      retrySub: "చింతించకండి, మళ్లీ ప్రయత్నించండి మరియు మీరు మెరుగవుతారు!"
    }
  };

  const currentFeed = feed[lang] || feed['en'];
  if (isPerfect) return { title: currentFeed.perfectTitle, sub: currentFeed.perfectSub, passed: true };
  if (isGood) return { title: currentFeed.passTitle, sub: currentFeed.passSub, passed: true };
  return { title: currentFeed.retryTitle, sub: currentFeed.retrySub, passed: false };
};

const ModulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const currentModules = modules[lang] || modules['en'] || modules;
  const data = currentModules.find(m => m.id === id) || currentModules[0];

  const [step, setStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // speak() defined first so useEffects can safely reference it
  const speak = useCallback(text => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const targetVoiceCode = {
      'en': 'en-IN', 'hi': 'hi-IN', 'mr': 'mr-IN',
      'gu': 'gu-IN', 'ta': 'ta-IN', 'bn': 'bn-IN', 'te': 'te-IN'
    }[lang] || 'en-IN';

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetVoiceCode;
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v =>
        v.lang === targetVoiceCode || v.lang.startsWith(lang)
      );
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };

    // Some browsers need voices to load first
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => doSpeak();
    }
  }, [lang]);

  // Pre-load voices on mount
  useEffect(() => {
    window.speechSynthesis.getVoices();
    return () => window.speechSynthesis.cancel();
  }, []);

  // Auto-read step content when step changes (only if already in speaking mode)
  useEffect(() => {
    if (isSpeaking && !showQuiz && !isComplete && data.steps[step]) {
      const s = data.steps[step];
      speak(`${s.title}. ${s.content}. ${s.tip || ''}`);
    }
  }, [step]); // eslint-disable-line

  // Auto-read results when quiz is completed
  useEffect(() => {
    if (isComplete) {
      const feedback = getScoreFeedback(score, data.quiz.length, lang);
      const scoreStr = t('scoreInfo')?.replace('{score}', score).replace('{total}', data.quiz.length)
        || `Score: ${score} / ${data.quiz.length}`;
      speak(`${feedback.title}. ${feedback.sub}. ${scoreStr}`);
    }
  }, [isComplete]); // eslint-disable-line

  // Auto-read quiz question and options when quizIndex changes (or when showQuiz becomes true)
  useEffect(() => {
    if (showQuiz && !isComplete && data.quiz[quizIndex]) {
      const q = data.quiz[quizIndex];
      const questionText = q.q || q.question;
      const optionsText = q.options.map((opt, i) => `${i + 1}. ${opt}`).join(". ");
      speak(`${questionText}. ${optionsText}`);
    }
  }, [quizIndex, showQuiz]); // eslint-disable-line


  const handleNext = () => {
    if (step < data.steps.length - 1) setStep(p => p + 1);
    else setShowQuiz(true);
  };

  const handleQuizAnswer = idx => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    const q = data.quiz[quizIndex];
    const correctIdx = q.correct !== undefined ? q.correct : q.answer;
    const isCorrect = idx === correctIdx;
    
    if (isCorrect) {
      setScore(p => p + 1);
    }

    setTimeout(() => {
      if (quizIndex < data.quiz.length - 1) {
        setQuizIndex(p => p + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsComplete(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        if (finalScore === data.quiz.length) {
          confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 }, colors: ['#25D366','#128C7E','#DCF8C6'] });
        }
      }
    }, 1400);
  };

  const resetModule = () => {
    setStep(0); setShowQuiz(false); setQuizIndex(0);
    setScore(0); setSelectedAnswer(null); setShowResult(false); setIsComplete(false);
  };

  /* ── Completion Screen ── */
  if (isComplete) {
    const feedback = getScoreFeedback(score, data.quiz.length, lang);
    return (
      <PageTransition className="min-h-screen bg-wa-chatBg flex flex-col items-center justify-center px-4 text-center pb-20 pt-6">
        {/* Result badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-6 shadow-wa-lg
            ${feedback.passed ? 'bg-gradient-to-br from-wa-green to-wa-teal' : 'bg-gradient-to-br from-red-400 to-red-600'}`}
        >
          {feedback.passed ? <Award size={48} className="text-white" /> : <XCircle size={48} className="text-white" />}
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-black text-wa-text mb-2 px-2">
          {feedback.title}
        </h1>
        <p className="text-wa-subtext text-base md:text-lg font-semibold mb-6 px-4 max-w-md">
          {feedback.sub}
        </p>
        <p className="text-wa-text text-lg font-bold mb-4">
          {t('scoreInfo')?.replace('{score}', score).replace('{total}', data.quiz.length)
            || `Score: ${score} / ${data.quiz.length}`}
        </p>

        {/* Score bar */}
        <div className="wa-progress-track w-full max-w-xs mb-8">
          <div className="wa-progress-fill" style={{ width: `${(score / data.quiz.length) * 100}%` }} />
        </div>

        <div className="w-full max-w-xs space-y-3">
          {feedback.passed ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/home')}
              className="btn-wa-primary w-full h-14 rounded-2xl text-lg flex items-center justify-center gap-2"
            >
              <Home size={22} /> {t('backToHome') || 'Back to Home'}
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={resetModule}
              className="btn-wa-secondary w-full h-14 rounded-2xl text-lg border-2 border-wa-teal text-wa-teal flex items-center justify-center gap-2"
            >
              <RotateCcw size={22} /> {t('tryAgain') || 'Try Again'}
            </motion.button>
          )}
        </div>
      </PageTransition>
    );
  }

  /* ── Quiz Screen ── */
  if (showQuiz) {
    const q = data.quiz[quizIndex];
    const progressPct = (quizIndex / data.quiz.length) * 100;
    return (
      <PageTransition className="min-h-screen bg-wa-chatBg pb-28">
        {/* Quiz header */}
        <header className="wa-header">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowQuiz(false)} className="p-2 rounded-full bg-wa-dark/10 hover:bg-wa-dark/20 transition">
              <ChevronLeft size={22} className="text-wa-dark" />
            </button>
            <div>
              <h1 className="wa-header-title text-lg md:text-xl">{t('quiz') || 'Quiz'}</h1>
              <p className="text-wa-subtext text-xs">
                {t('questionOf')?.replace('{current}', quizIndex + 1).replace('{total}', data.quiz.length)
                  || `Question ${quizIndex + 1} of ${data.quiz.length}`}
              </p>
            </div>
          </div>
          {/* Speak toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
              else {
                const questionText = q.q || q.question;
                const optionsText = q.options.map((opt, i) => `${i + 1}. ${opt}`).join(". ");
                speak(`${questionText}. ${optionsText}`);
              }
            }}
            className={`p-2.5 rounded-full transition ${isSpeaking ? 'bg-wa-teal text-white' : 'bg-wa-dark/10 text-wa-dark'}`}
          >
            {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </header>

        <div className="max-w-2xl mx-auto px-4 pt-4">
          {/* Progress */}
          <div className="wa-progress-track mb-6">
            <motion.div className="wa-progress-fill" animate={{ width: `${progressPct}%` }} />
          </div>

          <div className="wa-panel p-5 md:p-6 space-y-5">
            <h3 className="text-wa-text text-xl md:text-2xl font-black leading-snug">{q.q || q.question}</h3>
            <div className="space-y-3">
              {q.options.map((opt, oIndex) => {
                let style = 'border-wa-border bg-wa-chatBg text-wa-text hover:border-wa-teal hover:bg-wa-light';
                if (showResult) {
                  const correctIdx = q.correct !== undefined ? q.correct : q.answer;
                  if (oIndex === correctIdx) style = 'border-wa-green bg-wa-light text-wa-dark';
                  else if (selectedAnswer === oIndex) style = 'border-red-400 bg-red-50 text-red-700';
                  else style = 'border-wa-border bg-wa-chatBg text-wa-subtext opacity-50';
                }
                return (
                  <motion.button
                    key={oIndex}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleQuizAnswer(oIndex)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-2xl border-2 text-base md:text-lg font-semibold flex items-center justify-between transition-all ${style}`}
                  >
                    <span className="text-left pr-2">{opt}</span>
                    {showResult && oIndex === (q.correct !== undefined ? q.correct : q.answer) && <CheckCircle size={22} className="text-wa-teal shrink-0" />}
                    {showResult && selectedAnswer === oIndex && oIndex !== (q.correct !== undefined ? q.correct : q.answer) && <XCircle size={22} className="text-red-500 shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  /* ── Lesson Screen ── */
  const currentStep = data.steps[step];
  const progressPct = (step / (data.steps.length - 1)) * 100;

  return (
    <PageTransition className="min-h-screen bg-wa-chatBg pb-28">
      {/* Header */}
      <header className="wa-header">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="p-2 rounded-full bg-wa-dark/10 hover:bg-wa-dark/20 transition">
            <ChevronLeft size={22} className="text-wa-dark" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="wa-header-title truncate">{data.title}</h1>
            <p className="text-wa-subtext text-xs">
              {t('stepOf')?.replace('{step}', step + 1).replace('{total}', data.totalSteps)
                || `Step ${step + 1} of ${data.totalSteps}`}
            </p>
          </div>
        </div>
        {/* Speak toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
            else {
              speak(`${currentStep.title}. ${currentStep.content}. ${currentStep.tip || ''}`);
            }
          }}
          className={`p-2.5 rounded-full transition ${isSpeaking ? 'bg-wa-teal text-white' : 'bg-wa-dark/10 text-wa-dark'}`}
        >
          {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>
      </header>

      {/* Progress bar under header */}
      <div className="wa-progress-track rounded-none h-1.5">
        <motion.div className="wa-progress-fill h-full" animate={{ width: `${progressPct}%` }} />
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-5 pb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Dynamic Step Illustration */}
            <ContextualGraphic 
              title={currentStep.title} 
              content={currentStep.content} 
              moduleIcon={data.icon} 
              defaultColor={data.color} 
              imageUrl={currentStep.image}
            />

            {/* Content card */}
            <div className="wa-panel p-6 space-y-3">
              <h2 className="text-wa-text text-2xl font-black leading-snug">{currentStep.title}</h2>
              <p className="text-wa-subtext text-lg leading-relaxed">{currentStep.content}</p>
            </div>

            {/* Tip */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <Lightbulb size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-amber-800 font-medium text-sm leading-relaxed">{currentStep.tip}</p>
            </div>

            {/* Practice Target / Deep Link Injection */}
            {(() => {
              const practice = getContextualPracticeLink(data.title, currentStep.title, currentStep.content);
              if (!practice) return null;
              
              return (
                <div className="space-y-2.5 mt-4">
                  <motion.button
                     whileTap={{ scale: 0.96 }}
                     onClick={() => executeDeepLink(practice.url, practice.fallback)}
                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25 text-white rounded-2xl p-4 flex items-center justify-between border border-blue-400 cursor-pointer"
                  >
                     <div className="flex items-center gap-3">
                       <div className="bg-white/20 p-2.5 rounded-2xl shadow-inner backdrop-blur-sm">
                         <span className="text-2xl drop-shadow-sm">{practice.icon}</span>
                       </div>
                       <div className="text-left flex flex-col">
                          <span className="font-black text-lg tracking-wide">{practice.label}</span>
                          <span className="text-blue-100 font-medium text-xs tracking-wider uppercase opacity-90 block mt-0.5">Opens Installed App (GPay / PhonePe / Paytm)</span>
                       </div>
                     </div>
                     <div className="bg-white/10 p-2 rounded-full shrink-0">
                        <ExternalLink size={20} className="text-white opacity-90" />
                     </div>
                  </motion.button>

                  {/* Sandbox Simulator Option */}
                  <button
                    type="button"
                    onClick={() => navigate('/safety/simulator')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-300"
                  >
                    <ShieldCheck size={16} className="text-wa-teal" /> Or Practice Risk-Free in Safe Payment Simulator ➔
                  </button>
                </div>
              );
            })()}

            {/* AI Payment Safety Injection for UPI Module Only */}
            {data.id === 'upi' && (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/safety')}
                className="w-full mt-2 bg-gradient-to-r from-green-600 to-teal-600 shadow-md shadow-green-600/25 text-white rounded-2xl p-4 flex items-center gap-3 border border-green-500"
              >
                <div className="bg-white/20 p-2.5 rounded-full shadow-inner backdrop-blur-sm shrink-0">
                  <ShieldCheck size={28} className="text-white" />
                </div>
                <div className="text-left flex flex-col flex-1">
                  <span className="text-green-100 font-bold text-[10px] tracking-widest uppercase mb-0.5">Protect Yourself</span>
                  <span className="font-black text-base leading-tight">AI Payment Safety & Fraud Protection</span>
                </div>
                <ChevronRight size={20} className="text-white shrink-0 opacity-80" />
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-wa-border px-4 py-3 flex gap-3">
        <button
          onClick={() => step === 0 ? navigate('/home') : setStep(p => p - 1)}
          className="flex-1 h-12 rounded-2xl font-bold border-2 border-wa-border text-wa-subtext flex items-center justify-center gap-2 hover:border-wa-teal hover:text-wa-teal transition"
        >
          <ChevronLeft size={20} /> {t('back') || 'Back'}
        </button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="flex-[2] h-12 rounded-2xl btn-wa-primary text-base py-0"
        >
          {step === data.steps.length - 1 ? (t('takeQuiz') || 'Take Quiz 📝') : (t('next') || 'Next')}
          <ChevronRight size={20} className="ml-auto" />
        </motion.button>
      </div>
    </PageTransition>
  );
};

export default ModulePage;
