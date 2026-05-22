import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Loader, ChevronLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

const VoiceAssistantPage = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [history, setHistory] = useState([]);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = false;

      // Configure with current language
      rec.lang = LANGUAGES[lang]?.voice || 'en-IN';

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);

      rec.onresult = event => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleUserSpeech(text, true);
      };

      recognitionRef.current = rec;
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, [lang]);

  // Handle language change - update recognition language
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = LANGUAGES[lang]?.voice || 'en-IN';
    }
  }, [lang]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      synthRef.current?.cancel();
      setIsSpeaking(false);
      recognitionRef.current?.start();
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleUserSpeech(inputText.trim(), false);
    setInputText('');
  };

  const handleUserSpeech = async (userText, wasSpoken = true) => {
    setLoading(true);
    const currentHistory = [...history];
    setHistory(h => [...h, { role: 'user', text: userText }]);

    try {
      const botResponse = await processQuery(userText, lang, currentHistory);
      setResponse(botResponse);
      setHistory(h => [...h, { role: 'ai', text: botResponse }]);
      if (wasSpoken) speakResponse(botResponse, lang);
    } catch {
      const err = getErrorMessage(lang);
      setResponse(err);
      setHistory(h => [...h, { role: 'ai', text: err }]);
      if (wasSpoken) speakResponse(err, lang);
    } finally {
      setLoading(false);
    }
  };

  // Text-to-Speech in selected language
  const speakResponse = (text, currentLang) => {
    synthRef.current?.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetVoiceCode = LANGUAGES[currentLang]?.voice || 'en-IN';
    utterance.lang = targetVoiceCode;
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = synthRef.current?.getVoices() || [];
    const selectedVoice = voices.find(voice =>
      voice.lang === targetVoiceCode || voice.lang.startsWith(currentLang)
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current?.speak(utterance);
  };

  const processQuery = async (query, currentLang, chatHistory) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Missing API Key');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

      const formattedHistory = chatHistory.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      }));

      const chat = model.startChat({
        history: formattedHistory,
      });

      const result = await chat.sendMessage(query);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.warn("Gemini API Error:", error);
      return `Detailed Error: ${error.message}.`;
    }
  };

  const getErrorMessage = (currentLang) => {
    const errors = {
      en: "Sorry, I couldn't understand that. Please try again.",
      hi: "क्षमा करें, मैं समझ नहीं पाया। कृपया फिर से प्रयास करें।",
      mr: "माफ करा, मला ते समजले नाही. कृपया पुन्हा प्रयत्न करा.",
      gu: "માફ કરશો, હું તે સમજી શક્યો નહીં. કૃપા કરીને ફરી પ્રયાસ કરો.",
      bn: "দুঃখিত, আমি বুঝতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।",
      ta: "மன்னிக்கவும், எனக்கு புரியவில்லை. மீண்டும் முயற்சிக்கவும்.",
      te: "క్షమించండి, నాకు అర్థం కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి."
    };
    return errors[currentLang] || errors.en;
  };

  const quickQuestions = [
    "How do I use UPI?",
    "What is Aadhaar?",
    "How to send WhatsApp message?",
    "How to stay safe from scams?",
  ];

  return (
    <PageTransition className="min-h-screen bg-wa-chatBg flex flex-col">
      {/* Header */}
      <header className="wa-header">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition">
            <ChevronLeft size={22} className="text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-wa-green flex items-center justify-center">
                <Mic size={18} className="text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-300 rounded-full border-2 border-wa-teal" />
            </div>
            <div>
              <h1 className="wa-header-title">{t('voiceAssistant') || 'AI Assistant'}</h1>
              <p className="text-white/65 text-xs">{(LANGUAGES[lang]?.nativeName) || 'Ask me anything'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Welcome bubble */}
        {history.length === 0 && (
          <div className="flex justify-start">
            <div className="wa-bubble max-w-xs text-base">
              <p className="font-medium text-wa-text">
                👋 Namaste! I'm your DigiSaathi AI assistant. Ask me absolutely anything — from general knowledge and advice, to coding help and daily life questions!
              </p>
              <p className="text-wa-subtext text-xs mt-2 text-right">Now</p>
            </div>
          </div>
        )}

        {/* Chat history */}
        {history.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-wa-green flex items-center justify-center mr-2 shrink-0 self-end">
                {isSpeaking && i === history.length - 1 ? (
                  <Volume2 size={14} className="text-white animate-pulse" />
                ) : (
                  <Mic size={14} className="text-white" />
                )}
              </div>
            )}
            <div className={msg.role === 'user' ? 'wa-bubble-sent' : 'wa-bubble'}>
              <p className="text-wa-text text-base font-medium">{msg.text}</p>
              <p className="text-wa-subtext text-[10px] text-right mt-1">
                {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                {msg.role === 'user' && ' ✓✓'}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-wa-green flex items-center justify-center shrink-0">
              <Loader size={14} className="text-white animate-spin" />
            </div>
            <div className="wa-bubble">
              <div className="flex gap-1.5 items-center py-1">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-wa-subtext block"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick questions */}
      {history.length === 0 && (
        <div className="px-4 pb-2">
          <p className="text-wa-subtext text-xs font-bold uppercase tracking-widest mb-2">Quick questions</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map(q => (
              <button
                key={q}
                onClick={() => handleUserSpeech(q)}
                className="wa-chip wa-chip-inactive text-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="bg-white border-t border-wa-border px-4 py-3 pb-safe">
        {/* Transcript/Input preview */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleTextSubmit} className="flex-1 flex items-center bg-wa-chatBg border border-wa-border rounded-2xl px-4 py-2">
            <input
              type="text"
              value={isListening ? (transcript || t('listeningDotDotDot') || '🎙️ Listening...') : inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isListening || loading}
              placeholder={t('askSomething') || "Ask something..."}
              className={`flex-1 bg-transparent border-none outline-none text-sm font-medium ${isListening ? 'text-wa-teal animate-pulse italic' : 'text-wa-text'}`}
            />
            {inputText.trim() && !isListening && (
              <button type="submit" className="text-wa-teal p-1">
                <Send size={20} />
              </button>
            )}
          </form>

          {/* Speak last response */}
          {response && !isListening && (
            <button
              onClick={() => speakResponse(response, lang)}
              className={`p-3 rounded-full border transition ${isSpeaking ? 'bg-wa-light border-wa-teal text-wa-teal' : 'bg-wa-chatBg border-wa-border text-wa-teal hover:bg-wa-light'}`}
            >
              <Volume2 size={20} className={isSpeaking ? 'animate-pulse' : ''} />
            </button>
          )}

          {/* Mic button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleListening}
            disabled={loading}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-wa-lg transition-all relative shrink-0
              ${isListening ? 'bg-red-500' : loading ? 'bg-wa-border' : 'bg-gradient-to-br from-wa-green to-wa-teal'}`}
          >
            {isListening && <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-50" />}
            {loading
              ? <Loader size={20} className="text-white animate-spin" />
              : isListening
                ? <MicOff size={20} className="text-white" />
                : <Mic size={20} className="text-white" />
            }
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
};

export default VoiceAssistantPage;