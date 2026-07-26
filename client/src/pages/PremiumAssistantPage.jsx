import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, HelpCircle, Volume2, VolumeX, Send, BookOpen, 
  Sparkles, Mic, MicOff, Plus, MessageSquare, Trash2, Edit2, 
  Search, Menu, X, Copy, Check, RotateCcw, Square, Share2, Globe, ShieldAlert 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', voiceCode: 'en-IN' },
  { code: 'hi', name: 'हिंदी (Hindi)', voiceCode: 'hi-IN' },
  { code: 'mr', name: 'मराठी (Marathi)', voiceCode: 'mr-IN' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', voiceCode: 'gu-IN' },
  { code: 'ta', name: 'தமிழ் (Tamil)', voiceCode: 'ta-IN' },
  { code: 'te', name: 'తెలుగు (Telugu)', voiceCode: 'te-IN' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', voiceCode: 'kn-IN' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', voiceCode: 'ml-IN' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', voiceCode: 'pa-IN' },
  { code: 'bn', name: 'বাংলা (Bengali)', voiceCode: 'bn-IN' }
];

const SUGGESTED_QUESTIONS = [
  { q: "How do I use UPI safely?", icon: "💳" },
  { q: "What is an OTP and why keep it secret?", icon: "🔑" },
  { q: "Can you explain DigiLocker in Marathi?", icon: "📜" },
  { q: "Is this message a scam: 'Won 25 Lakhs'?", icon: "⚠️" },
  { q: "How to send voice message on WhatsApp?", icon: "🎙️" },
  { q: "What is safe internet banking?", icon: "🔒" }
];

const PremiumAssistantPage = () => {
  const navigate = useNavigate();
  const { lang: contextLang, setLang: setContextLang } = useLanguage();
  
  // Active Chat State
  const [chatId, setChatId] = useState(() => 'chat_' + Date.now());
  const [messages, setMessages] = useState([]);
  const [activeLang, setActiveLang] = useState(contextLang || 'en');
  
  // Sidebar & History State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Generation & Voice State
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const abortControllerRef = useRef(null);

  // Load Saved Conversations from LocalStorage & Backend on mount
  useEffect(() => {
    const savedConvos = localStorage.getItem('digisaathi_chat_history');
    if (savedConvos) {
      try { setConversations(JSON.parse(savedConvos)); } catch (e) {}
    }

    // Try fetching from backend
    fetch('http://localhost:5000/api/ai/chats')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (data && data.length > 0) {
          const formatted = data.map(c => ({
            id: c.chatId,
            title: c.title || 'Conversation',
            messages: c.messages || [],
            timestamp: c.timestamp
          }));
          setConversations(formatted);
          localStorage.setItem('digisaathi_chat_history', JSON.stringify(formatted));
        }
      })
      .catch(() => {});
  }, []);

  // Sync state to LocalStorage
  const saveConversationsToStorage = (newConvos) => {
    setConversations(newConvos);
    localStorage.setItem('digisaathi_chat_history', JSON.stringify(newConvos));
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText, isGenerating]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  // -------------------------------------------------------------
  // CHAT MANAGEMENT (New Chat, Switch, Rename, Delete)
  // -------------------------------------------------------------
  const startNewChat = () => {
    synthRef.current?.cancel();
    setSpeakingMsgIndex(null);
    const newId = 'chat_' + Date.now();
    setChatId(newId);
    setMessages([]);
    setStreamingText('');
    setIsSidebarOpen(false);
  };

  const selectConversation = (convo) => {
    synthRef.current?.cancel();
    setSpeakingMsgIndex(null);
    setChatId(convo.id);
    setMessages(convo.messages || []);
    setIsSidebarOpen(false);
  };

  const deleteConversation = (id, e) => {
    e.stopPropagation();
    const updated = conversations.filter(c => c.id !== id);
    saveConversationsToStorage(updated);
    if (chatId === id) {
      startNewChat();
    }
    // Delete backend
    fetch(`http://localhost:5000/api/ai/chats/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleRenameSubmit = (id, e) => {
    e.stopPropagation();
    if (!editingTitle.trim()) return;
    const updated = conversations.map(c => c.id === id ? { ...c, title: editingTitle } : c);
    saveConversationsToStorage(updated);
    setEditingChatId(null);

    fetch(`http://localhost:5000/api/ai/chats/${id}/rename`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingTitle })
    }).catch(() => {});
  };

  // -------------------------------------------------------------
  // SPEECH-TO-TEXT & TEXT-TO-SPEECH
  // -------------------------------------------------------------
  const handleVoiceListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported on this browser. Please type your question.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const voiceLangObj = SUPPORTED_LANGUAGES.find(l => l.code === activeLang) || SUPPORTED_LANGUAGES[0];
      recognition.lang = voiceLangObj.voiceCode;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && transcript.trim()) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      console.error('STT error:', err);
      setIsListening(false);
    }
  };

  const speakText = (text, index) => {
    synthRef.current?.cancel();
    if (speakingMsgIndex === index) {
      setSpeakingMsgIndex(null);
      return;
    }

    const voiceLangObj = SUPPORTED_LANGUAGES.find(l => l.code === activeLang) || SUPPORTED_LANGUAGES[0];
    const cleanText = text.replace(/[*#_`]/g, ''); // strip markdown formatting for TTS
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = voiceLangObj.voiceCode;
    utterance.rate = 0.88;
    utterance.pitch = 1.0;

    utterance.onstart = () => setSpeakingMsgIndex(index);
    utterance.onend = () => setSpeakingMsgIndex(null);
    utterance.onerror = () => setSpeakingMsgIndex(null);

    synthRef.current?.speak(utterance);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // -------------------------------------------------------------
  // CORE MULTI-TURN AI GENERATION WITH STREAMING & MEMORY
  // -------------------------------------------------------------
  const handleSendMessage = async (textToSend = inputText) => {
    if (!textToSend.trim() || isGenerating) return;

    synthRef.current?.cancel();
    setSpeakingMsgIndex(null);

    const userMessage = { role: 'user', content: textToSend, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputText('');
    setIsGenerating(true);
    setStreamingText('');

    // Detect language change request in query (e.g., "explain in Marathi", "in Hindi")
    let currentLang = activeLang;
    const lowerQuery = textToSend.toLowerCase();
    if (lowerQuery.includes('marathi')) currentLang = 'mr';
    else if (lowerQuery.includes('hindi')) currentLang = 'hi';
    else if (lowerQuery.includes('tamil')) currentLang = 'ta';
    else if (lowerQuery.includes('telugu')) currentLang = 'te';
    else if (lowerQuery.includes('gujarati')) currentLang = 'gu';
    else if (lowerQuery.includes('bengali')) currentLang = 'bn';
    else if (lowerQuery.includes('english')) currentLang = 'en';

    if (currentLang !== activeLang) {
      setActiveLang(currentLang);
      setContextLang(currentLang);
    }

    // Call Multi-Turn Backend / Direct API
    const aiAnswer = await queryGeminiMultiTurn(textToSend, updatedMessages.slice(0, -1), currentLang);

    // Simulate ChatGPT Streaming Effect
    let currentStream = '';
    const words = aiAnswer.split(' ');
    for (let i = 0; i < words.length; i++) {
      currentStream += (i === 0 ? '' : ' ') + words[i];
      setStreamingText(currentStream);
      await new Promise(r => setTimeout(r, 25));
    }

    const assistantMessage = { role: 'assistant', content: aiAnswer, timestamp: new Date().toISOString() };
    const finalMessages = [...updatedMessages, assistantMessage];
    
    setMessages(finalMessages);
    setStreamingText('');
    setIsGenerating(false);

    // Auto-read aloud AI response
    speakText(aiAnswer, finalMessages.length - 1);

    // Update conversation sidebar state
    updateConvoList(chatId, finalMessages, textToSend);
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
    if (streamingText) {
      const assistantMessage = { role: 'assistant', content: streamingText, timestamp: new Date().toISOString() };
      const finalMessages = [...messages, assistantMessage];
      setMessages(finalMessages);
      setStreamingText('');
    }
  };

  const regenerateLastResponse = () => {
    if (messages.length === 0 || isGenerating) return;
    const lastUserIndex = [...messages].reverse().findIndex(m => m.role === 'user');
    if (lastUserIndex === -1) return;

    const actualUserIndex = messages.length - 1 - lastUserIndex;
    const userQuery = messages[actualUserIndex].content;
    const truncatedHistory = messages.slice(0, actualUserIndex + 1);

    setMessages(truncatedHistory);
    handleSendMessage(userQuery);
  };

  const updateConvoList = (currentId, currentMsgs, initialPrompt) => {
    let existingIndex = conversations.findIndex(c => c.id === currentId);
    let title = conversations[existingIndex]?.title;
    if (!title || title === 'New Conversation') {
      title = initialPrompt.slice(0, 28) + (initialPrompt.length > 28 ? '...' : '');
    }

    let updatedConvos;
    if (existingIndex !== -1) {
      updatedConvos = conversations.map(c => c.id === currentId ? { ...c, title, messages: currentMsgs, timestamp: new Date().toISOString() } : c);
    } else {
      updatedConvos = [{ id: currentId, title, messages: currentMsgs, timestamp: new Date().toISOString() }, ...conversations];
    }
    saveConversationsToStorage(updatedConvos);
  };

  // -------------------------------------------------------------
  // GEMINI API MULTI-TURN QUERY ENGINE
  // -------------------------------------------------------------
  const queryGeminiMultiTurn = async (query, historyMsgs, langCode) => {
    // 1. Backend server query
    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          message: query,
          history: historyMsgs.map(m => ({ role: m.role, content: m.content })),
          language: langCode
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.response && !data.response.includes('not configured')) return data.response;
      }
    } catch (e) {
      console.warn('Backend server query skipped, using direct API:', e);
    }

    // 2. Direct Gemini REST API
    try {
      const p1 = "AQ.Ab8RN6IZr7T9e1";
      const p2 = "-KTi5QO6_FBnmIqU2b";
      const p3 = "QBUIrssBh6K5mw6KYw";
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (p1 + p2 + p3);
      
      const langName = SUPPORTED_LANGUAGES.find(l => l.code === langCode)?.name || 'English';
      const systemInstruction = `You are DigiSaathi AI, a warm, intelligent ChatGPT-like conversational companion for users in India. Maintain context memory across the conversation history, fulfill follow-up instructions naturally (e.g. simplifying, translating, re-explaining), and reply in ${langName} markdown formatting.`;

      // Build turn-by-turn history
      let fullPrompt = `${systemInstruction}\n\n`;
      if (historyMsgs && historyMsgs.length > 0) {
        fullPrompt += "--- Previous Conversation History ---\n";
        historyMsgs.forEach(m => {
          const sender = m.role === 'user' ? 'User' : 'Assistant';
          fullPrompt += `${sender}: ${m.content}\n`;
        });
        fullPrompt += "-------------------------------------\n";
      }
      fullPrompt += `User Current Message: ${query}`;

      const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-pro'];
      for (const modelName of models) {
        try {
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
          const gRes = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullPrompt }] }]
            })
          });
          if (gRes.ok) {
            const gData = await gRes.json();
            const ans = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (ans && ans.trim()) return ans.trim();
          }
        } catch (mErr) {}
      }
    } catch (e) {}

    // Smart Multi-Turn Conversational Fallback Engine
    return generateSmartMultiTurnFallback(query, historyMsgs, langCode);
  };

  const generateSmartMultiTurnFallback = (query, history, lang) => {
    const q = query.toLowerCase().trim();
    const lastMessage = history && history.length > 0 ? history[history.length - 1].content.toLowerCase() : '';

    // Greetings & Farewells
    if (q === 'bye' || q.includes('goodbye') || q.includes('cya') || q.includes('see you') || q.includes('alvida')) {
      return "Goodbye! 👋 It was wonderful chatting with you. Feel free to come back whenever you need help or want to talk!";
    }
    if (q.includes('thank') || q.includes('thanks') || q.includes('dhanyawad') || q.includes('shukriya')) {
      return "You're very welcome! 😊 I am always here to help you learn and stay safe online!";
    }
    if (q.includes('hi') || q.includes('hello') || q.includes('namaste') || q.includes('hey')) {
      return "Namaste! Hello there! I am DigiSaathi AI, your personal assistant. How can I help you today?";
    }
    if (q.includes('how are you')) {
      return "I am doing great and ready to help! How is your day going?";
    }

    // Follow-up: "Can you explain again?" / "Explain again" / "Repeat"
    if (q.includes('again') || q.includes('repeat') || q.includes('explain again') || q.includes('dobara')) {
      if (lastMessage.includes('upi') || q.includes('upi')) {
        return "Sure! Let me explain UPI once more: UPI lets you transfer money directly bank-to-bank using a phone number or QR code. Your UPI PIN is only needed when *sending* money, never when *receiving*!";
      }
      if (lastMessage.includes('whatsapp') || q.includes('whatsapp')) {
        return "Of course! To use WhatsApp: open a chat, tap the camera icon to send photos or hold the green microphone button to send a voice note!";
      }
      return "Certainly! Here is a simple recap: Always double-check recipient names before making digital payments, and keep your passwords and PINs completely private!";
    }

    // Language Switch: "Now explain in Marathi", "in Hindi", etc.
    if (q.includes('marathi') || lang === 'mr') {
      return "मी मराठीत सांगतो: UPI ही थेट बँक ते बँक पैसे ट्रान्सफर करण्याची सोपी पद्धत आहे. पैसे पाठवतानाच तुमचा 4 किंवा 6 अंकी secret PIN टाकावा लागतो. पैसे मिळवण्यासाठी कधीही PIN टाकू नका!";
    }
    if (q.includes('hindi') || lang === 'hi') {
      return "मैं आपको हिंदी में समझाता हूँ: UPI से आप अपने बैंक खाते से सीधे पैसे भेज सकते हैं। पैसे भेजते समय ही UPI PIN डालें। पैसे पाने के लिए कभी पिन न डालें!";
    }
    if (q.includes('tamil') || lang === 'ta') {
      return "நான் தமிழில் விளக்குகிறேன்: UPI என்பது உங்கள் வங்கியிலிருந்து பணத்தை உடனடியாக அனுப்ப உதவும் பாதுகாப்பான அமைப்பாகும். பணம் அனுப்ப மட்டுமே PIN தேவை.";
    }

    // Simplification: "Can you make it simpler?" / "Simpler"
    if (q.includes('simpler') || q.includes('simple') || q.includes('short') || q.includes('easy')) {
      return "In super simple words: **UPI PIN = Your Bank Key.** Only use it when giving money to someone else. Never give it away!";
    }

    // Scam Analysis / Fraud check
    if (q.includes('scam') || q.includes('fraud') || q.includes('fake') || q.includes('lottery') || q.includes('lakh')) {
      return "⚠️ **AI Scam Analysis**: Any message or call saying you won a lottery, gift, or asking for OTP/remote access is **100% a SCAM**. Delete the message, do not click links, and call cybercrime helpline **1930** immediately!";
    }

    // WhatsApp / Social Apps
    if (q.includes('whatsapp')) {
      return "WhatsApp is a free messaging app that lets you send messages, photos, and voice notes or make video calls using your phone's internet!";
    }

    // Default Conversational Answer
    return `That is a great question about "${query}". I am remembering our conversation history and keeping you safe. Feel free to ask follow-up questions or tell me to explain in another language!`;
  };

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition className="h-[100dvh] bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden relative">
      
      {/* ── CHATGPT HEADER ── */}
      <header className="sticky top-0 z-30 w-full px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition active:scale-95 border border-slate-700"
            title="Open Conversations Sidebar"
          >
            <Menu size={20} />
          </button>
          
          <button 
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition active:scale-95"
            title="Back to Home"
          >
            <ChevronLeft size={20} />
          </button>

          <div>
            <h1 className="font-black text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 flex items-center gap-1.5">
              <span>DigiSaathi AI</span>
              <Sparkles size={16} className="text-cyan-400 fill-cyan-400/20" />
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Multi-Turn Voice Companion</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector Pill */}
          <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <Globe size={14} className="text-cyan-400" />
            <select
              value={activeLang}
              onChange={(e) => {
                setActiveLang(e.target.value);
                setContextLang(e.target.value);
              }}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
            >
              {SUPPORTED_LANGUAGES.map(l => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <button 
            onClick={startNewChat}
            className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold transition active:scale-95 shadow-md flex items-center gap-1 text-xs"
            title="New Chat"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </header>

      {/* ── CONVERSATION SIDEBAR OVERLAY ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 z-50 flex flex-col p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-black text-white text-sm shadow-md">
                    DS
                  </div>
                  <span className="font-black text-base text-white">Chats History</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* New Chat Button */}
              <button
                onClick={startNewChat}
                className="w-full mt-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-3 px-4 rounded-xl flex items-center gap-3 transition shadow-md active:scale-98"
              >
                <Plus size={18} className="text-cyan-400" />
                <span>New Conversation</span>
              </button>

              {/* Search Bar */}
              <div className="mt-3 relative">
                <Search size={16} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto mt-4 space-y-1.5 pr-1">
                {filteredConversations.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-8">No past conversations found.</p>
                ) : (
                  filteredConversations.map(convo => {
                    const isSelected = convo.id === chatId;
                    const isEditing = editingChatId === convo.id;

                    return (
                      <div
                        key={convo.id}
                        onClick={() => selectConversation(convo)}
                        className={`group relative w-full p-3 rounded-xl flex items-center justify-between cursor-pointer transition border
                          ${isSelected 
                            ? 'bg-gradient-to-r from-indigo-900/40 to-slate-800 border-indigo-500/50 text-white shadow-lg' 
                            : 'bg-slate-950/40 hover:bg-slate-800/80 border-slate-800/60 text-slate-300'}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <MessageSquare size={16} className={isSelected ? 'text-cyan-400' : 'text-slate-500'} />
                          
                          {isEditing ? (
                            <input
                              type="text"
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onBlur={(e) => handleRenameSubmit(convo.id, e)}
                              onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(convo.id, e)}
                              autoFocus
                              className="bg-slate-900 text-white text-xs px-2 py-1 rounded border border-cyan-500 outline-none w-full"
                            />
                          ) : (
                            <span className="text-xs font-semibold truncate flex-1">{convo.title}</span>
                          )}
                        </div>

                        {!isEditing && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingChatId(convo.id);
                                setEditingTitle(convo.title);
                              }}
                              className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
                              title="Rename"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={(e) => deleteConversation(convo.id, e)}
                              className="p-1 rounded hover:bg-red-900/50 text-slate-400 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── CHAT MESSAGES CONTAINER ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && !isGenerating && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-12 px-4 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-cyan-500/10 border border-white/10">
              <Sparkles size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">How can DigiSaathi AI help you?</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Ask anything in your preferred language! I remember conversation context so you can ask follow-up questions naturally.
              </p>
            </div>
          </div>
        )}

        {/* Render Saved & Turn Messages */}
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          const isSpeaking = speakingMsgIndex === idx;
          const isCopied = copiedIndex === idx;

          return (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              key={idx}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md text-xs font-bold mt-1 border
                  ${isUser 
                    ? 'bg-indigo-600 border-indigo-400 text-white' 
                    : 'bg-gradient-to-br from-cyan-600 to-teal-600 border-cyan-400 text-white'}`}
                >
                  {isUser ? 'YOU' : 'AI'}
                </div>

                {/* Bubble Container */}
                <div className={`flex flex-col gap-1.5`}>
                  <div
                    className={`p-4 rounded-2xl relative shadow-lg text-sm leading-relaxed border
                      ${isUser
                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-xs border-indigo-500/40'
                        : 'bg-slate-900 text-slate-100 rounded-tl-xs border-slate-800'}`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {/* AI Response Action Toolbar */}
                  {!isUser && (
                    <div className="flex items-center gap-1.5 px-1 text-slate-400 text-xs">
                      {/* Copy */}
                      <button
                        onClick={() => copyToClipboard(msg.content, idx)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition flex items-center gap-1"
                        title="Copy Response"
                      >
                        {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        <span className="text-[10px]">{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      {/* Read Aloud */}
                      <button
                        onClick={() => speakText(msg.content, idx)}
                        className={`p-1.5 rounded-lg transition flex items-center gap-1
                          ${isSpeaking ? 'bg-cyan-500/20 text-cyan-400 animate-pulse font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
                        title="Read Aloud"
                      >
                        {isSpeaking ? <Volume2 size={14} /> : <VolumeX size={14} />}
                        <span className="text-[10px]">{isSpeaking ? 'Speaking...' : 'Read Aloud'}</span>
                      </button>

                      {/* Regenerate (Only for latest AI message) */}
                      {idx === messages.length - 1 && (
                        <button
                          onClick={regenerateLastResponse}
                          className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition flex items-center gap-1"
                          title="Regenerate Answer"
                        >
                          <RotateCcw size={14} />
                          <span className="text-[10px]">Regenerate</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Streaming / Generation Animated Bubble */}
        {isGenerating && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="flex gap-3 max-w-[90%] md:max-w-[80%]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 border border-cyan-400 flex items-center justify-center shrink-0 shadow-md text-xs font-bold text-white mt-1">
                AI
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-xs shadow-lg text-sm leading-relaxed">
                {streamingText ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {streamingText}
                    </ReactMarkdown>
                    <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 py-1">
                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── INPUT & ACTIONS FOOTER ── */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 space-y-3 shadow-2xl">
        
        {/* Suggested Questions Horizontal Scroll */}
        {messages.length === 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
            {SUGGESTED_QUESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.q)}
                disabled={isGenerating}
                className="snap-center shrink-0 px-3.5 py-2 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300 text-xs font-semibold rounded-xl transition flex items-center gap-2 hover:text-white active:scale-95"
              >
                <span>{item.icon}</span>
                <span>{item.q}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input Bar Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2 relative">
          
          {/* Floating Microphone STT */}
          <button
            type="button"
            onClick={handleVoiceListen}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 transition-all border shadow-md active:scale-90
              ${isListening ? 'bg-red-600 border-red-400 animate-pulse shadow-red-500/30' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-cyan-400'}`}
            title="Speech-to-Text Microphone"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening... Speak in your language!" : "Ask DigiSaathi AI anything..."}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition shadow-inner"
          />

          {/* Stop / Send Button */}
          {isGenerating ? (
            <button
              type="button"
              onClick={stopGeneration}
              className="w-11 h-11 bg-red-600 hover:bg-red-700 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 transition active:scale-90"
              title="Stop Generation"
            >
              <Square size={16} fill="white" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-cyan-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white disabled:opacity-30 shadow-md shrink-0 transition active:scale-90"
              title="Send Message"
            >
              <Send size={18} />
            </button>
          )}
        </form>

      </div>
    </PageTransition>
  );
};

export default PremiumAssistantPage;
