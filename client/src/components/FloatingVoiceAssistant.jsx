import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const FloatingVoiceAssistant = ({ textToRead, autoPlay = true, position = 'bottom-right' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false); // For future microphone integration

  const { lang } = useLanguage();

  useEffect(() => {
    if (autoPlay && textToRead) {
      speak(textToRead);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [textToRead, autoPlay, lang]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const targetVoiceCode = {
        'en': 'en-IN', 'hi': 'hi-IN', 'mr': 'mr-IN',
        'gu': 'gu-IN', 'ta': 'ta-IN', 'bn': 'bn-IN', 'te': 'te-IN'
      }[lang] || 'en-IN';
      
      utterance.lang = targetVoiceCode;
      utterance.rate = 0.9; // Slightly slower for seniors
      utterance.onend = () => setIsPlaying(false);
      utterance.onstart = () => setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speak(textToRead);
    }
  };

  const positions = {
    'bottom-right': 'bottom-40 right-4 md:bottom-16 md:right-8',
    'bottom-left': 'bottom-40 left-4 md:bottom-16 md:left-8',
    'top-right': 'top-20 right-4',
  };

  return (
    <div className={`fixed z-50 flex flex-col gap-3 ${positions[position]}`}>
      {/* Speaker Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleSpeech}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-blue-900/20 text-white transition-all border-4 ${isPlaying ? 'bg-blue-600 border-blue-300 animate-pulse' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
        aria-label="Toggle Voice Guidance"
      >
        {isPlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
      </motion.button>
    </div>
  );
};

export default FloatingVoiceAssistant;
