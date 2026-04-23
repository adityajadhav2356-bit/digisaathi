import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle, Award, XCircle, Home, RotateCcw, Lightbulb, ExternalLink } from 'lucide-react';
import { modules } from '../data/modules';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';
import ContextualGraphic from '../components/ContextualGraphic';
import { getContextualPracticeLink, executeDeepLink } from '../utils/deepLinks';

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

  useEffect(() => {
    window.speechSynthesis.cancel();
    if (isSpeaking && !showQuiz && !isComplete) speak(data.steps[step].content);
    return () => window.speechSynthesis.cancel();
  }, [step, isSpeaking, showQuiz, isComplete]);

  const speak = text => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleNext = () => {
    if (step < data.steps.length - 1) setStep(p => p + 1);
    else setShowQuiz(true);
  };

  const handleQuizAnswer = idx => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === data.quiz[quizIndex].answer) {
      setScore(p => p + 1);
      setTimeout(() => {
        if (quizIndex < data.quiz.length - 1) {
          setQuizIndex(p => p + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setIsComplete(true);
          confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 }, colors: ['#25D366','#128C7E','#DCF8C6'] });
        }
      }, 1400);
    } else {
      setTimeout(() => setIsComplete(true), 1400);
    }
  };

  const resetModule = () => {
    setStep(0); setShowQuiz(false); setQuizIndex(0);
    setScore(0); setSelectedAnswer(null); setShowResult(false); setIsComplete(false);
  };

  /* ── Completion Screen ── */
  if (isComplete) {
    const passed = score === data.quiz.length;
    return (
      <PageTransition className="min-h-screen bg-wa-chatBg flex flex-col items-center justify-center px-6 text-center pb-20">
        {/* Result badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-wa-lg
            ${passed ? 'bg-gradient-to-br from-wa-green to-wa-teal' : 'bg-gradient-to-br from-red-400 to-red-600'}`}
        >
          {passed ? <Award size={56} className="text-white" /> : <XCircle size={56} className="text-white" />}
        </motion.div>

        <h1 className="text-4xl font-black text-wa-text mb-2">
          {passed ? (t('moduleComplete') || '🎉 Well Done!') : (t('notQuiteThere') || 'Not Quite!')}
        </h1>
        <p className="text-wa-subtext text-lg font-semibold mb-2">
          {t('scoreInfo')?.replace('{score}', score).replace('{total}', data.quiz.length)
            || `Score: ${score} / ${data.quiz.length}`}
        </p>

        {/* Score bar */}
        <div className="wa-progress-track w-full max-w-xs mb-10">
          <div className="wa-progress-fill" style={{ width: `${(score / data.quiz.length) * 100}%` }} />
        </div>

        {passed ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/home')}
            className="btn-wa-primary w-full max-w-xs h-14 rounded-2xl text-lg"
          >
            <Home size={22} /> {t('backToHome') || 'Back to Home'}
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={resetModule}
            className="btn-wa-secondary w-full max-w-xs h-14 rounded-2xl text-lg border-2 border-wa-teal text-wa-teal"
          >
            <RotateCcw size={22} /> {t('tryAgain') || 'Try Again'}
          </motion.button>
        )}
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
            <button onClick={() => setShowQuiz(false)} className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition">
              <ChevronLeft size={22} className="text-white" />
            </button>
            <div>
              <h1 className="wa-header-title">{t('quiz') || 'Quiz'}</h1>
              <p className="text-white/70 text-xs">
                {t('questionOf')?.replace('{current}', quizIndex + 1).replace('{total}', data.quiz.length)
                  || `Question ${quizIndex + 1} of ${data.quiz.length}`}
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 pt-4">
          {/* Progress */}
          <div className="wa-progress-track mb-6">
            <motion.div className="wa-progress-fill" animate={{ width: `${progressPct}%` }} />
          </div>

          <div className="wa-panel p-6 space-y-5">
            <h3 className="text-wa-text text-2xl font-black leading-snug">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((opt, oIndex) => {
                let style = 'border-wa-border bg-wa-chatBg text-wa-text hover:border-wa-teal hover:bg-wa-light';
                if (showResult) {
                  if (oIndex === q.answer) style = 'border-wa-green bg-wa-light text-wa-dark';
                  else if (selectedAnswer === oIndex) style = 'border-red-400 bg-red-50 text-red-700';
                  else style = 'border-wa-border bg-wa-chatBg text-wa-subtext opacity-50';
                }
                return (
                  <motion.button
                    key={oIndex}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleQuizAnswer(oIndex)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-2xl border-2 text-lg font-semibold flex items-center justify-between transition-all ${style}`}
                  >
                    <span className="text-left">{opt}</span>
                    {showResult && oIndex === q.answer && <CheckCircle size={22} className="text-wa-teal shrink-0" />}
                    {showResult && selectedAnswer === oIndex && oIndex !== q.answer && <XCircle size={22} className="text-red-500 shrink-0" />}
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
          <button onClick={() => navigate('/home')} className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition">
            <ChevronLeft size={22} className="text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="wa-header-title truncate">{data.title}</h1>
            <p className="text-white/65 text-xs">
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
            else speak(currentStep.content);
          }}
          className={`p-2.5 rounded-full transition ${isSpeaking ? 'bg-wa-light text-wa-dark' : 'bg-white/15 text-white'}`}
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
                <motion.button
                   whileTap={{ scale: 0.96 }}
                   onClick={() => executeDeepLink(practice.url, practice.fallback)}
                   className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 shadow-md shadow-blue-500/25 text-white rounded-2xl p-4 flex items-center justify-between border border-blue-400"
                >
                   <div className="flex items-center gap-3">
                     <div className="bg-white/20 p-2.5 rounded-2xl shadow-inner backdrop-blur-sm">
                       <span className="text-2xl drop-shadow-sm">{practice.icon}</span>
                     </div>
                     <div className="text-left flex flex-col">
                        <span className="font-black text-lg tracking-wide">{practice.label}</span>
                        <span className="text-blue-50 font-medium text-xs tracking-wider uppercase opacity-90 block mt-0.5">Practice Safely • Real App</span>
                     </div>
                   </div>
                   <div className="bg-white/10 p-2 rounded-full shrink-0">
                      <ExternalLink size={20} className="text-white opacity-90" />
                   </div>
                </motion.button>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-wa-border px-4 py-3 flex gap-3">
        <button
          onClick={() => setStep(p => p - 1)}
          disabled={step === 0}
          className="flex-1 h-12 rounded-2xl font-bold border-2 border-wa-border text-wa-subtext flex items-center justify-center gap-2 disabled:opacity-30 hover:border-wa-teal hover:text-wa-teal transition"
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
