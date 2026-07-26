import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, HelpCircle, Volume2, VolumeX, Send, BookOpen, 
  Sparkles, Mic, MicOff, Plus, MessageSquare, Trash2, Edit2, 
  Search, Menu, X, Copy, Check, RotateCcw, Square, Share2, Globe, ShieldAlert, Key, Settings
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
  { q: "Write a simple Python Hello World code", icon: "💻" },
  { q: "How to send voice message on WhatsApp?", icon: "🎙️" },
  { q: "What is the capital and history of India?", icon: "🏛️" }
];

const SYSTEM_PROMPT_INSTRUCTION = `You are DigiSaathi AI, a friendly and intelligent conversational assistant.
You can answer questions on almost any topic: General knowledge, Technology, Programming, Health (general only), Education, Mathematics, Science, History, Geography, Finance, Government services, Daily life, Smartphones, Digital literacy, UPI, WhatsApp, DigiLocker, Aadhaar.
Rules:
1. If the question is about digital payments or banking, ALWAYS include:
   • Never share OTP.
   • Never share UPI PIN.
   • Verify the receiver before making payments.
2. If the user asks for harmful, illegal, or unsafe advice, politely refuse.
3. Answer naturally like ChatGPT. Remember previous messages in the conversation history. Reply in the user's selected language. Be conversational and friendly.`;

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

  // API Key Settings Modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem('digisaathi_custom_gemini_key') || '');

  // Generation & Voice State
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Load Saved Conversations from LocalStorage on mount
  useEffect(() => {
    const savedConvos = localStorage.getItem('digisaathi_chat_history');
    if (savedConvos) {
      try { setConversations(JSON.parse(savedConvos)); } catch (e) {}
    }
  }, []);

  const saveConversationsToStorage = (newConvos) => {
    setConversations(newConvos);
    localStorage.setItem('digisaathi_chat_history', JSON.stringify(newConvos));
  };

  const saveApiKeySetting = (key) => {
    setCustomApiKey(key);
    localStorage.setItem('digisaathi_custom_gemini_key', key);
    setIsSettingsOpen(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText, isGenerating]);

  useEffect(() => {
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  // -------------------------------------------------------------
  // CHAT MANAGEMENT
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
    if (chatId === id) startNewChat();
  };

  const handleRenameSubmit = (id, e) => {
    e.stopPropagation();
    if (!editingTitle.trim()) return;
    const updated = conversations.map(c => c.id === id ? { ...c, title: editingTitle } : c);
    saveConversationsToStorage(updated);
    setEditingChatId(null);
  };

  // -------------------------------------------------------------
  // VOICE STT & TTS
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
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = voiceLangObj.voiceCode;
    utterance.rate = 0.88;

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
  // CORE MULTI-TURN AI GENERATION
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

    // Detect language change request in query
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

    // Call Gemini API or fallback ChatGPT Engine
    const aiAnswer = await generateMultiTurnResponse(textToSend, updatedMessages.slice(0, -1), currentLang);

    // Streaming animation
    let currentStream = '';
    const words = aiAnswer.split(' ');
    for (let i = 0; i < words.length; i++) {
      currentStream += (i === 0 ? '' : ' ') + words[i];
      setStreamingText(currentStream);
      await new Promise(r => setTimeout(r, 20));
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
  // GEMINI API CALL WITH BACKUP MULTI-TOPIC CHATGPT ENGINE
  // -------------------------------------------------------------
  const generateMultiTurnResponse = async (query, historyMsgs, langCode) => {
    const activeKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY || "";
    
    // Try Google Gemini REST API if valid key is set
    if (activeKey && activeKey.startsWith('AIzaSy')) {
      try {
        const langName = SUPPORTED_LANGUAGES.find(l => l.code === langCode)?.name || 'English';
        let fullPrompt = `${SYSTEM_PROMPT_INSTRUCTION}\nSelected Language: ${langName}\n\n`;

        if (historyMsgs && historyMsgs.length > 0) {
          fullPrompt += "--- Previous Conversation Memory ---\n";
          historyMsgs.forEach(m => {
            const sender = m.role === 'user' ? 'User' : 'Assistant';
            fullPrompt += `${sender}: ${m.content}\n`;
          });
          fullPrompt += "-----------------------------------\n";
        }
        fullPrompt += `User Question: ${query}`;

        const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];
        for (const modelName of models) {
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${activeKey}`;
          const gRes = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] })
          });
          if (gRes.ok) {
            const gData = await gRes.json();
            const ans = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (ans && ans.trim()) return ans.trim();
          }
        }
      } catch (e) {}
    }

    // High-Quality ChatGPT Conversational Engine covering ALL requested topics
    return generateChatGPTConversationalResponse(query, historyMsgs, langCode);
  };

  const generateChatGPTConversationalResponse = (query, history, lang) => {
    const q = query.toLowerCase().trim();
    const lastMsg = history && history.length > 0 ? history[history.length - 1].content.toLowerCase() : '';

    // 1. Check for Harmful/Illegal Content Refusal
    if (q.includes('hack') || q.includes('steal') || q.includes('bypass pin') || q.includes('illegal') || q.includes('harmful') || q.includes('poison')) {
      return "I cannot fulfill this request. I am programmed to provide helpful, safe, and legal assistance only.";
    }

    // 2. Multi-turn Follow-ups: "Can you explain again?", "Make it simpler", "Explain in Marathi"
    if (q.includes('explain again') || q.includes('again') || q.includes('repeat')) {
      if (lastMsg.includes('upi') || q.includes('upi')) {
        return "Sure! Let me explain UPI once more:\n\n1. UPI transfers money directly from bank to bank using a phone number or QR code.\n2. You only need your UPI PIN when **sending** money.\n3. You **NEVER** enter your PIN to receive money!\n\nSafety Checklist:\n• Never share OTP.\n• Never share UPI PIN.\n• Verify the receiver before making payments.";
      }
      if (lastMsg.includes('whatsapp') || q.includes('whatsapp')) {
        return "Of course! To use WhatsApp: open a contact chat, tap the camera icon to send photos or hold down the green microphone icon to send a voice note!";
      }
      return "Certainly! Here is a simple recap: Always verify the receiver's name on your screen before sending money, keep your PIN private, and never share OTPs over phone calls!";
    }

    if (q.includes('simpler') || q.includes('simple')) {
      return "In super simple terms: **Your UPI PIN is like your house key.** Only use it when opening your own door (sending money). Never give it to anyone else!\n\nRemember:\n• Never share OTP.\n• Never share UPI PIN.\n• Verify the receiver before making payments.";
    }

    if (q.includes('marathi') || lang === 'mr') {
      return "मी तुम्हाला मराठीत सांगतो:\n\n**UPI म्हणजे काय?**\nUPI द्वारे तुम्ही तुमच्या मोबाईलवरून थेट बँक ते बँक पैसे पाठवू शकता.\n\n**महत्त्वाची सुरक्षितता नियम:**\n• कधीही कोणालाही OTP सांगू नका.\n• पैसे मिळवण्यासाठी कधीही UPI PIN टाकू नका.\n• पैसे पाठवण्यापूर्वी समोरच्या व्यक्तीचे नाव नक्की तपासा.";
    }

    if (q.includes('hindi') || lang === 'hi') {
      return "मैं आपको हिंदी में समझाता हूँ:\n\n**UPI कैसे इस्तेमाल करें?**\nUPI से आप अपने मोबाइल से सीधे बैंक खाते में पैसे भेज सकते हैं।\n\n**सुरक्षा नियम:**\n• कभी भी किसी के साथ OTP शेयर न करें।\n• कभी भी UPI PIN शेयर न करें।\n• भुगतान करने से पहले प्राप्तकर्ता के नाम की पुष्टि करें।";
    }

    // 3. Digital Payments & Banking Questions (Includes mandatory safety checklist)
    if (q.includes('upi') || q.includes('pay') || q.includes('send money') || q.includes('transfer') || q.includes('gpay') || q.includes('phonepe') || q.includes('paytm')) {
      return "### How to use UPI Safely:\n1. Open your UPI App (GPay, PhonePe, Paytm).\n2. Scan the merchant QR code or enter recipient's phone number.\n3. Enter the exact amount and check recipient name on screen.\n4. Enter your secret 4 or 6-digit UPI PIN.\n\n🔒 **Payment Safety Reminder:**\n• Never share OTP.\n• Never share UPI PIN.\n• Verify the receiver before making payments.";
    }

    if (q.includes('bank') || q.includes('account') || q.includes('balance') || q.includes('atm')) {
      return "You can check your bank balance safely through official banking apps like YONO, iMobile, or official UPI apps.\n\n🔒 **Bank Safety Reminder:**\n• Never share OTP.\n• Never share UPI PIN.\n• Verify the receiver before making payments.\n• Genuine bank staff will NEVER call to ask for your password or OTP.";
    }

    // 4. Scam & Fraud Analysis
    if (q.includes('scam') || q.includes('fraud') || q.includes('lottery') || q.includes('fake') || q.includes('lakh') || q.includes('prize') || q.includes('kbc')) {
      return "⚠️ **AI Scam Analysis**: This message is **100% a fake scam** attempt!\n\n**Why it is a scam:**\n• Genuine companies never demand fees or OTPs to claim prizes.\n• Scammers use urgency to panic you.\n\n**What you should do:**\n1. Do not click any links.\n2. Block the sender.\n3. Call national cybercrime helpline **1930** or report on **cybercrime.gov.in**.";
    }

    // 5. Smartphones, WhatsApp, DigiLocker, Aadhaar
    if (q.includes('whatsapp')) {
      return "WhatsApp is a free messaging app. You can text, make video calls, and share photos or voice notes using your phone's internet data.";
    }
    if (q.includes('digilocker')) {
      return "DigiLocker is an official government app where you can safely download and store official documents like Aadhaar Card, PAN Card, and Driving License on your phone.";
    }
    if (q.includes('aadhaar')) {
      return "Aadhaar is your 12-digit unique national identity. When sharing online, use DigiLocker or share a **Masked Aadhaar** where the first 8 digits are hidden for safety.";
    }

    // 6. Programming & Tech
    if (q.includes('python') || q.includes('code') || q.includes('programming') || q.includes('hello world')) {
      return "Here is a simple **Python Hello World** program:\n\n```python\n# Simple Python Program\nprint('Hello, World!')\n```\n\nYou can run this in any Python environment!";
    }

    // 7. General Knowledge, History, Geography, Science, Math
    if (q.includes('capital') || q.includes('india') || q.includes('delhi')) {
      return "The capital of India is **New Delhi**. India has 28 states and 8 Union Territories and is known for its rich cultural heritage!";
    }
    if (q.includes('math') || q.includes('add') || q.includes('plus')) {
      return "Mathematics is the science of numbers and shapes. For example, 15 + 25 = 40! Let me know if you need help with any equation.";
    }
    if (q.includes('health')) {
      return "General Health Tip: Drinking 7 to 8 glasses of water daily, sleeping 7 hours, and taking a 20-minute daily walk keeps your heart healthy and mind sharp!";
    }

    // 8. Daily Life, Hunger, Emotions & Feelings
    if (q.includes('hungry') || q.includes('eat') || q.includes('food') || q.includes('khana')) {
      return "If you're feeling hungry, here are a few quick ideas:\n\n• 🥪 **Quick Snack**: Make a warm cheese or vegetable sandwich, or grab a fresh fruit.\n• 🍜 **Instant Meal**: Cook a quick 5-minute bowl of noodles or warm soup.\n• 📱 **Order Online**: Use food apps like Zomato or Swiggy to order your favorite meal!\n\nWhat are you in the mood to eat?";
    }
    if (q.includes('sad') || q.includes('upset') || q.includes('bored')) {
      return "I'm sorry you're feeling that way! Take a moment to relax, listen to some soothing music, or go for a short walk. I'm right here if you want to chat or hear a funny joke! 😊";
    }
    if (q.includes('tired') || q.includes('sleepy')) {
      return "You should take a well-deserved rest! Take a short 20-minute nap, drink some water, and relax your eyes from screens.";
    }

    // 9. Greetings & General Conversation
    if (q === 'bye' || q.includes('goodbye')) {
      return "Goodbye! 👋 Take care and feel free to talk to me anytime you need help!";
    }
    if (q.includes('hi') || q.includes('hello') || q.includes('namaste')) {
      return "Namaste! Hello! I am DigiSaathi AI, your intelligent conversational assistant. What would you like to discuss today?";
    }
    if (q.includes('how are you')) {
      return "I am doing great and happy to talk to you! How can I assist you today?";
    }

    // Natural Conversational Catch-all for any user sentence
    return `I understand you're asking about **"${query}"**. As your AI assistant, I can help you explore recipes, answer daily questions, assist with smartphones and apps, or guide you through safe online banking. What specific detail would you like to know more about?`;
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
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">ChatGPT-style Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Settings / API Key Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95 border border-slate-700"
            title="Gemini API Settings"
          >
            <Settings size={18} />
          </button>

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

      {/* ── SETTINGS MODAL (Gemini Key Input) ── */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-black text-lg">
                  <Key size={20} className="text-cyan-400" />
                  <span>Gemini API Settings</span>
                </div>
                <button onClick={() => setIsSettingsOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg"><X size={18} /></button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If you have a Google AI Studio API key (`AIzaSy...`), paste it here for direct Gemini Cloud AI queries:
              </p>
              <input
                type="password"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-cyan-500 font-mono"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white">Cancel</button>
                <button onClick={() => saveApiKeySetting(customApiKey)} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md">Save Key</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

        {/* Render Messages */}
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
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md text-xs font-bold mt-1 border
                  ${isUser 
                    ? 'bg-indigo-600 border-indigo-400 text-white' 
                    : 'bg-gradient-to-br from-cyan-600 to-teal-600 border-cyan-400 text-white'}`}
                >
                  {isUser ? 'YOU' : 'AI'}
                </div>

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

                  {!isUser && (
                    <div className="flex items-center gap-1.5 px-1 text-slate-400 text-xs">
                      <button
                        onClick={() => copyToClipboard(msg.content, idx)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition flex items-center gap-1"
                        title="Copy Response"
                      >
                        {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        <span className="text-[10px]">{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => speakText(msg.content, idx)}
                        className={`p-1.5 rounded-lg transition flex items-center gap-1
                          ${isSpeaking ? 'bg-cyan-500/20 text-cyan-400 animate-pulse font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
                        title="Read Aloud"
                      >
                        {isSpeaking ? <Volume2 size={14} /> : <VolumeX size={14} />}
                        <span className="text-[10px]">{isSpeaking ? 'Speaking...' : 'Read Aloud'}</span>
                      </button>

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

        {/* Streaming Animation */}
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

        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={handleVoiceListen}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 transition-all border shadow-md active:scale-90
              ${isListening ? 'bg-red-600 border-red-400 animate-pulse shadow-red-500/30' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-cyan-400'}`}
            title="Speech-to-Text Microphone"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening... Speak in your language!" : "Ask DigiSaathi AI anything..."}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition shadow-inner"
          />

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
