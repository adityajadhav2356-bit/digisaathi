import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Loader, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const VoiceAssistantPage = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  
  const [isListening, setIsListening] = useState(false);
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
        handleUserSpeech(text);
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

  const handleUserSpeech = async (userText) => {
    setLoading(true);
    setHistory(h => [...h, { role: 'user', text: userText }]);
    
    try {
      // Offline fallback keyword logic matching the multilingual update structure
      const botResponse = await processQuery(userText, lang);
      setResponse(botResponse);
      setHistory(h => [...h, { role: 'ai', text: botResponse }]);
      speakResponse(botResponse, lang);
    } catch {
      const err = getErrorMessage(lang);
      setResponse(err);
      setHistory(h => [...h, { role: 'ai', text: err }]);
      speakResponse(err, lang);
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

  const processQuery = async (query, currentLang) => {
    const responses = {
      en: {
        whatsapp: "To use WhatsApp, first open the app. Then tap the chat icon to start a new message. You can send text, voice messages, or make video calls.",
        upi: "UPI payments are safe and easy. Open your payment app like PhonePe or Google Pay. Tap on Send Money, enter the amount, and confirm with your PIN.",
        help: "I'm here to help you with WhatsApp, UPI payments, online shopping, and government services. What would you like to learn about?",
        default: "I'm your digital assistant. I can help you with mobile apps, payments, and government services. Please ask me anything!"
      },
      hi: {
        whatsapp: "व्हाट्सएप का उपयोग करने के लिए, पहले ऐप खोलें। फिर नया संदेश शुरू करने के लिए चैट आइकन पर टैप करें। आप टेक्स्ट, वॉयस संदेश भेज सकते हैं या वीडियो कॉल कर सकते हैं।",
        upi: "UPI भुगतान सुरक्षित और आसान है। PhonePe या Google Pay जैसे अपने पेमेंट ऐप को खोलें। Send Money पर टैप करें, राशि दर्ज करें, और अपने PIN से पुष्टि करें।",
        help: "मैं व्हाट्सएप, UPI भुगतान, ऑनलाइन शॉपिंग और सरकारी सेवाओं में आपकी मदद के लिए यहां हूं। आप क्या सीखना चाहेंगे?",
        default: "मैं आपका डिजिटल सहायक हूं। मैं मोबाइल ऐप्स, भुगतान और सरकारी सेवाओं में आपकी मदद कर सकता हूं। कृपया मुझसे कुछ भी पूछें!"
      },
      mr: {
        whatsapp: "व्हाट्सअॅप वापरण्यासाठी, प्रथम अॅप उघडा. नंतर नवीन संदेश सुरू करण्यासाठी चॅट आयकॉनवर टॅप करा. तुम्ही मजकूर, व्हॉइस संदेश पाठवू शकता किंवा व्हिडिओ कॉल करू शकता.",
        upi: "UPI पेमेंट सुरक्षित आणि सोपे आहे. PhonePe किंवा Google Pay सारखे तुमचे पेमेंट अॅप उघडा. Send Money वर टॅप करा, रक्कम टाका आणि तुमच्या PIN ने पुष्टी करा.",
        help: "मी व्हाट्सअॅप, UPI पेमेंट, ऑनलाइन खरेदी आणि सरकारी सेवांमध्ये तुम्हाला मदत करण्यासाठी येथे आहे. तुम्हाला काय शिकायचे आहे?",
        default: "मी तुमचा डिजिटल सहाय्यक आहे. मी मोबाइल अॅप्स, पेमेंट आणि सरकारी सेवांमध्ये तुम्हाला मदत करू शकतो. कृपया मला काहीही विचारा!"
      },
      gu: {
        whatsapp: "WhatsApp વાપરવા માટે, પહેલા એપ્લિકેશન ખોલો. પછી નવો સંદેશ શરૂ કરવા ચેટ આયકોન પર ટેપ કરો. તમે ટેક્સ્ટ, વૉઇસ સંદેશા મોકલી શકો છો અથવા વિડિઓ કૉલ કરી શકો છો.",
        upi: "UPI પેમેન્ટ સુરક્ષિત અને સરળ છે. PhonePe અથવા Google Pay જેવી તમારી પેમેન્ટ એપ ખોલો. Send Money પર ટેપ કરો, રકમ દાખલ કરો અને તમારા PIN થી પુષ્ટિ કરો.",
        help: "હું WhatsApp, UPI પેમેન્ટ, ઑનલાઇન શોપિંગ અને સરકારી સેવાઓમાં તમારી મદદ કરવા માટે અહીં છું. તમે શું શીખવા માંગો છો?",
        default: "હું તમારો ડિજિટલ સહાયક છું. હું મોબાઇલ એપ્સ, પેમેન્ટ્સ અને સરકારી સેવાઓમાં તમને મદદ કરી શકું છું. કૃપા કરીને મને કંઈપણ પૂછો!"
      },
      bn: {
        whatsapp: "হোয়াটসঅ্যাপ ব্যবহার করতে, প্রথমে অ্যাপটি খুলুন। তারপর নতুন বার্তা শুরু করতে চ্যাট আইকনে ট্যাপ করুন। আপনি টেক্সট, ভয়েস বার্তা পাঠাতে পারেন বা ভিডিও কল করতে পারেন।",
        upi: "UPI পেমেন্ট নিরাপদ এবং সহজ। আপনার পেমেন্ট অ্যাপ যেমন PhonePe বা Google Pay খুলুন। Send Money-তে ট্যাপ করুন, পরিমাণ লিখুন এবং আপনার PIN দিয়ে নিশ্চিত করুন।",
        help: "আমি হোয়াটসঅ্যাপ, UPI পেমেন্ট, অনলাইন শপিং এবং সরকারি সেবায় আপনাকে সাহায্য করতে এখানে আছি। আপনি কী শিখতে চান?",
        default: "আমি আপনার ডিজিটাল সহায়ক। আমি মোবাইল অ্যাপ, পেমেন্ট এবং সরকারি সেবায় আপনাকে সাহায্য করতে পারি। দয়া করে আমাকে যেকোনো কিছু জিজ্ঞাসা করুন!"
      },
      ta: {
        whatsapp: "WhatsApp பயன்படுத்த, முதலில் ஆப்ஸை திறக்கவும். பின்னர் புதிய செய்தியைத் தொடங்க அரட்டை ஐகானைத் தட்டவும். நீங்கள் உரை, குரல் செய்திகளை அனுப்பலாம் அல்லது வீடியோ அழைப்புகளை செய்யலாம்.",
        upi: "UPI கட்டணங்கள் பாதுகாப்பானது மற்றும் எளிதானது. PhonePe அல்லது Google Pay போன்ற உங்கள் கட்டண ஆப்ஸைத் திறக்கவும். Send Money என்பதைத் தட்டவும், தொகையை உள்ளிடவும் மற்றும் உங்கள் PIN மூலம் உறுதிப்படுத்தவும்.",
        help: "நான் WhatsApp, UPI கட்டணங்கள், ஆன்லைன் ஷாப்பிங் மற்றும் அரசு சேவைகளில் உங்களுக்கு உதவ இங்கே இருக்கிறேன். நீங்கள் என்ன கற்றுக்கொள்ள விரும்புகிறீர்கள்?",
        default: "நான் உங்கள் டிஜிட்டல் உதவியாளர். மொபைல் ஆப்ஸ், கட்டணங்கள் மற்றும் அரசு சேவைகளில் நான் உங்களுக்கு உதவ முடியும். தயவுசெய்து என்னிடம் எதையும் கேளுங்கள்!"
      },
      te: {
        whatsapp: "WhatsApp ఉపయోగించడానికి, మొదట యాప్ తెరవండి. తర్వాత కొత్త సందేశాన్ని ప్రారంభించడానికి చాట్ చిహ్నాన్ని నొక్కండి. మీరు టెక్స్ట్, వాయిస్ సందేశాలను పంపవచ్చు లేదా వీడియో కాల్స్ చేయవచ్చు.",
        upi: "UPI చెల్లింపులు సురక్షితం మరియు సులభం. PhonePe లేదా Google Pay వంటి మీ చెల్లింపు యాప్ తెరవండి. Send Money నొక్కండి, మొత్తాన్ని నమోదు చేయండి మరియు మీ PIN తో నిర్ధారించండి.",
        help: "నేను WhatsApp, UPI చెల్లింపులు, ఆన్‌లైన్ షాపింగ్ మరియు ప్రభుత్వ సేవలలో మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?",
        default: "నేను మీ డిజిటల్ సహాయకుడిని. మొబైల్ యాప్‌లు, చెల్లింపులు మరియు ప్రభుత్వ సేవలలో నేను మీకు సహాయం చేయగలను. దయచేసి నన్ను ఏదైనా అడగండి!"
      }
    };

    const langResponses = responses[currentLang] || responses.en;
    const lowerQuery = query.toLowerCase();
    
    // Simulate slight network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    if (lowerQuery.includes('whatsapp') || lowerQuery.includes('व्हाट्स')) {
      return langResponses.whatsapp;
    } else if (lowerQuery.includes('upi') || lowerQuery.includes('payment') || lowerQuery.includes('भुगतान') || lowerQuery.includes('पेमेंट')) {
      return langResponses.upi;
    } else if (lowerQuery.includes('help') || lowerQuery.includes('मदद') || lowerQuery.includes('सहायता')) {
      return langResponses.help;
    }
    
    return langResponses.default;
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
                👋 Namaste! I'm your DigiSaathi AI assistant. Ask me anything about digital literacy — UPI, WhatsApp, Aadhaar, or how to stay safe online!
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
                {[0,1,2].map(i => (
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
      <div className="bg-white border-t border-wa-border px-4 py-3 flex items-center justify-between gap-4">
        {/* Transcript preview */}
        <div className="flex-1 min-w-0 bg-wa-chatBg border border-wa-border rounded-2xl px-4 py-2.5">
          <p className={`text-sm font-medium truncate ${transcript ? 'text-wa-text' : 'text-wa-subtext'}`}>
            {isListening ? (t('listeningDotDotDot') || '🎙️ Listening...') : transcript || (t('tapMicToSpeak') || 'Tap mic to ask a question...')}
          </p>
        </div>
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
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-wa-lg transition-all relative shrink-0
            ${isListening ? 'bg-red-500' : loading ? 'bg-wa-border' : 'bg-gradient-to-br from-wa-green to-wa-teal'}`}
        >
          {isListening && <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-50" />}
          {loading
            ? <Loader size={24} className="text-white animate-spin" />
            : isListening
              ? <MicOff size={24} className="text-white" />
              : <Mic size={24} className="text-white" />
          }
        </motion.button>
      </div>
    </PageTransition>
  );
};

export default VoiceAssistantPage;