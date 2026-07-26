import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, ChevronLeft, Smartphone, CheckCircle, AlertTriangle, ChevronDown, Volume2, VolumeX, RotateCcw, HelpCircle, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fraudAlerts } from '../data/alerts';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

const getSimulatorData = (lang) => {
  const data = {
    en: {
      fraudSimulator: "Interactive Fraud Simulator 🛡️",
      safeOrScam: "Test your skills: Is this SMS Safe or a Scam?",
      scam: "Scam 🛑",
      safe: "Safe ✅",
      correct: "Correct! 🎉",
      danger: "Careful! 🛑",
      nextQuestion: "Next Question ➡️",
      playAgain: "Restart Quiz 🔄",
      quizComplete: "Quiz Completed! 🌟",
      scoreInfo: "You identified {score} out of {total} threats correctly!",
      statusText: "Scenario {current} of {total}",
      scenarios: [
        {
          title: "KBC LOTTERY APP",
          msg: "You Won ₹25 Lakh! Pay ₹500 Processing Fee to release your cash winnings immediately.",
          action: "Pay ₹500 Processing Fee",
          subtext: "ENTER PIN TO RECEIVE PRIZE",
          ans: "scam",
          feedback: "Great job! This is a classic lottery scam. You never need to pay processing fees or enter your PIN to receive prize money."
        },
        {
          title: "STATE POWER DEPT",
          msg: "Urgent: Your electricity connection will be cut tonight at 9:30 PM due to pending bills. Call officer at 9876543210.",
          action: "Call personal mobile",
          subtext: "UPDATE BILL KYC NOW",
          ans: "scam",
          feedback: "Perfect! Government power departments never use personal phone numbers or threaten immediate utility disconnections. This is a KYC scam."
        },
        {
          title: "STATE BANK OF INDIA",
          msg: "Your OTP is 456789. SBI will NEVER call you to ask for this OTP. Never share this security code with anyone.",
          action: "Keep OTP Secret",
          subtext: "NEVER SHARE YOUR OTP",
          ans: "safe",
          feedback: "Correct! This is a legitimate secure bank warning alert telling you to keep your OTP private. It is safe to receive, but highly dangerous to share!"
        }
      ]
    },
    hi: {
      fraudSimulator: "इंटरैक्टिव धोखाधड़ी सिम्युलेटर 🛡️",
      safeOrScam: "अपने कौशल का परीक्षण करें: क्या यह संदेश सुरक्षित है या घोटाला?",
      scam: "घोटाला 🛑",
      safe: "सुरक्षित ✅",
      correct: "सही! 🎉",
      danger: "सावधान! 🛑",
      nextQuestion: "अगला प्रश्न ➡️",
      playAgain: "प्रश्नोत्तरी फिर से शुरू करें 🔄",
      quizComplete: "प्रश्नोत्तरी पूरी हुई! 🌟",
      scoreInfo: "आपने {total} में से {score} खतरों की सही पहचान की!",
      statusText: "परिदृश्य {current} / {total}",
      scenarios: [
        {
          title: "KBC लॉटरी ऐप",
          msg: "आपने ₹25 लाख जीते हैं! अपनी नकद जीत तुरंत पाने के लिए ₹500 प्रसंस्करण शुल्क का भुगतान करें।",
          action: "₹500 शुल्क का भुगतान करें",
          subtext: "इनाम पाने के लिए पिन दर्ज करें",
          ans: "scam",
          feedback: "सही! आपको पुरस्कार राशि प्राप्त करने के लिए कभी भी प्रसंस्करण शुल्क देने या पिन दर्ज करने की आवश्यकता नहीं होती है। यह एक आम घोटाला है।"
        },
        {
          title: "राज्य बिजली विभाग",
          msg: "तत्काल: लंबित बिलों के कारण आज रात 9:30 बजे आपका बिजली कनेक्शन काट दिया जाएगा। अधिकारी को 9876543210 पर कॉल करें।",
          action: "व्यक्तिगत मोबाइल पर कॉल करें",
          subtext: "अभी बिल केवाईसी अपडेट करें",
          ans: "scam",
          feedback: "सही! सरकारी बिजली विभाग कभी भी व्यक्तिगत फोन नंबरों का उपयोग नहीं करते हैं या तुरंत बिजली काटने की धमकी नहीं देते हैं। यह एक केवाईसी घोटाला है।"
        },
        {
          title: "भारतीय स्टेट बैंक",
          msg: "बैंक लॉगिन के लिए आपका ओटीपी 456789 है। एसबीआई आपको इस ओटीपी के लिए कभी कॉल नहीं करेगा। इसे गुप्त रखें।",
          action: "ओटीपी गुप्त रखें",
          subtext: "अपना ओटीपी कभी साझा न करें",
          ans: "safe",
          feedback: "सही! यह बैंक की ओर से एक वैध सुरक्षित चेतावनी है जो आपको अपना ओटीपी निजी रखने के लिए कह रही है। प्राप्त करना सुरक्षित है, लेकिन साझा करना खतरनाक!"
        }
      ]
    },
    mr: {
      fraudSimulator: "फसवणूक सिम्युलेटर 🛡️",
      safeOrScam: "तुमचे कौशल्य तपासा: हा मेसेज सुरक्षित आहे की स्कॅम?",
      scam: "स्कॅम 🛑",
      safe: "सुरक्षित ✅",
      correct: "बरोबर! 🎉",
      danger: "सावधान! 🛑",
      nextQuestion: "पुढील प्रश्न ➡️",
      playAgain: "पुन्हा सुरू करा 🔄",
      quizComplete: "प्रश्नोत्तरी पूर्ण! 🌟",
      scoreInfo: "तुम्ही {total} पैकी {score} धोके अचूक ओळखले!",
      statusText: "परिस्थिती {current} पैकी {total}",
      scenarios: [
        {
          title: "KBC लॉटरी",
          msg: "तुम्ही २५ लाख रुपयांचे बक्षीस जिंकले आहे! बक्षीस मिळवण्यासाठी ₹५०० प्रोसेसिंग फी भरा.",
          action: "₹५०० फी भरा",
          subtext: "बक्षीस मिळवण्यासाठी पिन टाका",
          ans: "scam",
          feedback: "बरोबर! बक्षीस मिळवण्यासाठी कधीही पैसे भरावे लागत नाहीत किंवा पिन टाकावा लागत नाही. हा सरळ फसवणुकीचा प्रकार आहे."
        },
        {
          title: "राज्य वीज विभाग",
          msg: "तात्काळ: बिल प्रलंबित असल्याने आज रात्री ९:३० वाजता तुमची वीज कापली जाईल. त्वरित ९८७६५४३२१० वर कॉल करा.",
          action: "मोबाईलवर कॉल करा",
          subtext: "KYC अपडेट करा",
          ans: "scam",
          feedback: "बरोबर! सरकारी वीज विभाग वैयक्तिक नंबर वापरत नाही किंवा वीज कापण्याची त्वरित धमकी देत नाही. हा केवायसी स्कॅम आहे."
        },
        {
          title: "स्टेट बँक ऑफ इंडिया",
          msg: "बँक लॉगिनसाठी तुमचा OTP ४५६७८९ आहे. SBI कधीही कॉल करून OTP मागत नाही. तो कोणालाही सांगू नका.",
          action: "OTP गुप्त ठेवा",
          subtext: "OTP कधीही शेअर करू नका",
          ans: "safe",
          feedback: "बरोबर! ही बँकेकडून आलेली खरी सुरक्षिततेची सूचना आहे. OTP वाचणे सुरक्षित आहे, पण तो कोणालाही सांगणे अत्यंत धोकादायक आहे!"
        }
      ]
    },
    gu: {
      fraudSimulator: "ઇન્ટરેક્ટિવ ફ્રોડ સિમ્યુલેટર 🛡️",
      safeOrScam: "કૌશલ્ય ચકાસો: આ મેસેજ સુરક્ષિત છે કે કૌભાંડ?",
      scam: "કૌભાંડ 🛑",
      safe: "સુરક્ષિત ✅",
      correct: "સાચું! 🎉",
      danger: "સાવધાન! 🛑",
      nextQuestion: "આગળનો પ્રશ્ન ➡️",
      playAgain: "ફરી શરૂ કરો 🔄",
      quizComplete: "ક્વિઝ પૂર્ણ! 🌟",
      scoreInfo: "તમે {total} માંથી {score} જોખમો સાચા ઓળખી કાઢ્યા!",
      statusText: "પરિસ્થિતિ {current} માંથી {total}",
      scenarios: [
        {
          title: "KBC લોટરી એપ",
          msg: "તમે ₹25 લાખ જીત્યા છો! તમારું ઇનામ મેળવવા માટે તરત જ રૂ. 500 પ્રોસેસિંગ ફી ચૂકવો.",
          action: "રૂ. 500 ફી ચૂકવો",
          subtext: "ઇનામ મેળવવા PIN નાખો",
          ans: "scam",
          feedback: "સાચું! ઇનામ મેળવવા માટે ક્યારેય કોઈ ફી ચૂકવવી પડતી નથી કે PIN દાખલ કરવો પડતો નથી. આ એક સામાન્ય કૌભાંડ છે."
        },
        {
          title: "રાજ્ય વીજળી વિભાગ",
          msg: "તાત્કાલિક: બાકી બિલના કારણે આજે રાત્રે 9:30 વાગ્યે વીજ જોડાણ કાપી નાખવામાં આવશે. અધિકારીને 9876543210 પર કોલ કરો.",
          action: "મોબાઈલ પર કોલ કરો",
          subtext: "હમણાં બિલ KYC અપડેટ કરો",
          ans: "scam",
          feedback: "સાચું! સરકારી વીજળી વિભાગો ક્યારેય વ્યક્તિગત ફોન નંબરનો ઉપયોગ કરતા નથી કે લાઈટ કાપવાની ધમકી આપતા નથી. આ KYC કૌભાંડ છે."
        },
        {
          title: "સ્ટેટ બેંક ઓફ ઇન્ડિયા",
          msg: "બેંક લોગિન માટે તમારો સુરક્ષિત OTP 456789 છે. SBI ક્યારેય ઓટીપી માંગવા ફોન નહિ કરે. તેને ગુપ્ત રાખો.",
          action: "OTP ગુપ્ત રાખો",
          subtext: "ક્યારેય OTP શેર કરશો નહિ",
          ans: "safe",
          feedback: "સાચું! આ બેંક તરફથી મળેલી સાચી સુરક્ષા ચેતવણી છે. OTP વાંચવો સુરક્ષિત છે, પરંતુ શેર કરવો અત્યંત જોખમી છે!"
        }
      ]
    },
    ta: {
      fraudSimulator: "மோசடி வினாடி-வினா சிமுலேட்டர் 🛡️",
      safeOrScam: "உங்கள் திறமையை சோதிக்கவும்: இந்த செய்தி பாதுகாப்பானதா அல்லது மோசடியா?",
      scam: "மோசடி 🛑",
      safe: "பாதுகாப்பானது ✅",
      correct: "சரி! 🎉",
      danger: "கவனம்! 🛑",
      nextQuestion: "அடுத்த கேள்வி ➡️",
      playAgain: "மீண்டும் தொடங்கவும் 🔄",
      quizComplete: "வினாடி-வினா முடிந்தது! 🌟",
      scoreInfo: "{total} ஆபத்துகளில் {score} ஆபத்துகளை சரியாக அடையாளம் கண்டுள்ளீர்கள்!",
      statusText: "கேள்வி {current} / {total}",
      scenarios: [
        {
          title: "KBC லாட்டரி செயலி",
          msg: "நீங்கள் ரூ.25 லட்சம் வென்றுள்ளீர்கள்! உங்கள் பரிசுப் பணத்தைப் பெற உடனடியாக ரூ.500 செயலாக்கக் கட்டணம் செலுத்தவும்.",
          action: "ரூ.500 கட்டணம் செலுத்தவும்",
          subtext: "பரிசைப் பெற PIN ஐ உள்ளிடவும்",
          ans: "scam",
          feedback: "சரி! பரிசுத் தொகையைப் பெற நீங்கள் ஒருபோதும் செயலாக்கக் கட்டணம் செலுத்தவோ அல்லது PIN ஐ உள்ளிடவோ தேவையில்லை. இது ஒரு பொதுவான மோசடி."
        },
        {
          title: "மின்சார வாரியம்",
          msg: "அவசரம்: கட்டணம் செலுத்தாததால் இன்று இரவு 9:30 மணிக்கு உங்கள் மின் இணைப்பு துண்டிக்கப்படும். உடனே 9876543210 ஐ அழைக்கவும்.",
          action: "அதிகாரியை அழைக்கவும்",
          subtext: "KYC ஐ உடனே புதுப்பிக்கவும்",
          ans: "scam",
          feedback: "சரி! அரசு மின்சார வாரியங்கள் ஒருபோதும் தனிப்பட்ட எண்களைப் பயன்படுத்துவதில்லை அல்லது மின் இணைப்பைத் துண்டிப்பதாக அச்சுறுத்துவதில்லை. இது ஒரு KYC மோசடி."
        },
        {
          title: "பாரத ஸ்டேட் வங்கி",
          msg: "உங்கள் வங்கி உள்நுழைவுக்கான OTP 456789 ஆகும். வங்கி ஒருபோதும் OTP கேட்காது. இதை ரகசியமாக வைக்கவும்.",
          action: "OTP ஐ ரகசியமாக வைக்கவும்",
          subtext: "OTP ஐ யாருடனும் பகிர வேண்டாம்",
          ans: "safe",
          feedback: "சரி! இது வங்கியிடமிருந்து வந்த உண்மையான பாதுகாப்பு விழிப்பூட்டல் செய்தி. OTP ஐப் பகிராத வரை இதைப் படிப்பது பாதுகாப்பானது!"
        }
      ]
    },
    bn: {
      fraudSimulator: "প্রতারণা কুইজ সিমুলেটর 🛡️",
      safeOrScam: "দক্ষতা যাচাই করুন: এই মেসেজটি নিরাপদ নাকি প্রতারণা?",
      scam: "প্রতারণা 🛑",
      safe: "নিরাপদ ✅",
      correct: "সঠিক! 🎉",
      danger: "সাবধান! 🛑",
      nextQuestion: "পরবর্তী প্রশ্ন ➡️",
      playAgain: "পুনরায় শুরু করুন 🔄",
      quizComplete: "কুইজ সম্পূর্ণ! 🌟",
      scoreInfo: "আপনি {total} টির মধ্যে {score} টি হুমকি সঠিকভাবে শনাক্ত করেছেন!",
      statusText: "পরিস্থিতি {current} / {total}",
      scenarios: [
        {
          title: "KBC লটারি অ্যাপ",
          msg: "আপনি ₹২৫ লাখ জিতেছেন! আপনার পুরস্কারের টাকা পেতে অবিলম্বে ₹৫০০ প্রসেসিং ফি জমা দিন।",
          action: "₹৫০০ ফি জমা দিন",
          subtext: "পুরস্কার পেতে PIN দিন",
          ans: "scam",
          feedback: "সঠিক! পুরস্কারের টাকা পাওয়ার জন্য আপনাকে কখনই কোনো ফি দিতে হয় না বা PIN দিতে হয় না। এটি একটি প্রচলিত প্রতারণা।"
        },
        {
          title: "বিদ্যুৎ বিভাগ",
          msg: "জরুরী: বিল বাকি থাকায় আজ রাত ৯:৩০ টায় বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা হবে। কর্মকর্তা ৯৮৭৬৫৪৩২১০ নম্বরে কল করুন।",
          action: "ব্যক্তিগত নম্বরে কল করুন",
          subtext: "বিদ্যুৎ KYC আপডেট করুন",
          ans: "scam",
          feedback: "সঠিক! সরকারি বিদ্যুৎ বিভাগ কখনো ব্যক্তিগত নম্বর থেকে হুমকি দেয় না বা সংযোগ বিচ্ছিন্ন করার কথা বলে না। এটি কেওয়াইসি প্রতারণা।"
        },
        {
          title: "স্টেট ব্যাংক অফ ইন্ডিয়া",
          msg: "ব্যাংক লগইন করার জন্য আপনার OTP হল 456789। SBI কখনো ওটিপি জানার জন্য কল করে না। ওটিপি গোপন রাখুন।",
          action: "OTP গোপন রাখুন",
          subtext: "ওটিপি কখনো শেয়ার করবেন না",
          ans: "safe",
          feedback: "সঠিক! এটি ব্যাংক থেকে পাঠানো আসল সতর্কবার্তা যা আপনাকে ওটিপি গোপন রাখতে মনে করিয়ে দিচ্ছে। এটি পড়া নিরাপদ, শেয়ার করা বিপজ্জনক!"
        }
      ]
    },
    te: {
      fraudSimulator: "మోసాల క్విజ్ సిమ్యులేటర్ 🛡️",
      safeOrScam: "మీ నైపుణ్యాన్ని పరీక్షించుకోండి: ఈ మెసేజ్ సురక్షితమా లేదా మోసమా?",
      scam: "మోసం 🛑",
      safe: "సురక్షితం ✅",
      correct: "సరైనది! 🎉",
      danger: "జాగ్రత్త! 🛑",
      nextQuestion: "తదుపరి ప్రశ్న ➡️",
      playAgain: "మళ్ళీ ప్రారంభించు 🔄",
      quizComplete: "క్విజ్ పూర్తయింది! 🌟",
      scoreInfo: "మీరు {total} మోసాలలో {score} మోసాలను విజయవంతంగా గుర్తించారు!",
      statusText: "పరిస్థితి {current} / {total}",
      scenarios: [
        {
          title: "KBC లాటరీ యాప్",
          msg: "మీరు ₹25 లక్షలు గెలుచుకున్నారు! బహుమతి డబ్బు కోసం వెంటనే ₹500 ఫీజు చెల్లించండి.",
          action: "₹500 ఫీజు చెల్లించండి",
          subtext: "బహుమతి పొందడానికి PIN టైప్ చేయండి",
          ans: "scam",
          feedback: "సరైనది! బహుమతి పొందడానికి మీరు ఎప్పుడూ రుసుము చెల్లించాల్సిన లేదా PIN టైప్ చేయాల్సిన అవసరం లేదు. ఇది మోసం."
        },
        {
          title: "రాష్ట్ర విద్యుత్ శాఖ",
          msg: "అత్యవసరం: బిల్లు కట్టనందున ఈ రాత్రి 9:30 గంటలకు కరెంట్ కట్ చేయబడుతుంది. వెంటనే 9876543210 నంబర్‌కు కాల్ చేయండి.",
          action: "వ్యక్తిగత నంబర్‌కు కాల్ చేయండి",
          subtext: "కరెంట్ KYC అప్‌డేట్ చేయండి",
          ans: "scam",
          feedback: "సరైనది! ప్రభుత్వ కరెంట్ శాఖ వారు ఎప్పుడూ వ్యక్తిగత నంబర్ల నుండి కాల్ చేయరు లేదా వెంటనే కరెంట్ కట్ చేస్తామని భయపెట్టరు."
        },
        {
          title: "స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా",
          msg: "బ్యాంక్ లాగిన్ కోసం మీ OTP 456789. SBI ఎప్పుడూ OTP కోసం కాల్ చేయదు. దీనిని రహస్యంగా ఉంచండి.",
          action: "OTP రహస్యంగా ఉంచండి",
          subtext: "OTP ఎవరితోనూ పంచుకోకండి",
          ans: "safe",
          feedback: "సరైనది! ఇది బ్యాంక్ నుండి వచ్చిన నిజమైన రక్షణ సందేశం. ఈ సందేశాన్ని చదవడం సురక్షితమే, కానీ OTP ని పంచుకోవడం మోసం!"
        }
      ]
    }
  };
  return data[lang] || data['en'];
};

const AlertsPage = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);
  const [isSpeakingId, setIsSpeakingId] = useState(null);

  const synthRef = useRef(window.speechSynthesis);

  // Stop speech on unmount
  useEffect(() => {
    return () => synthRef.current?.cancel();
  }, []);

  const speak = useCallback((text, id) => {
    if (!text) return;
    synthRef.current?.cancel();

    if (isSpeakingId === id) {
      setIsSpeakingId(null);
      return;
    }

    const targetVoiceCode = {
      'en': 'en-IN', 'hi': 'hi-IN', 'mr': 'mr-IN',
      'gu': 'gu-IN', 'ta': 'ta-IN', 'bn': 'bn-IN', 'te': 'te-IN'
    }[lang] || 'en-IN';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetVoiceCode;
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeakingId(id);
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    synthRef.current?.speak(utterance);
  }, [lang, isSpeakingId]);

  return (
    <PageTransition className="min-h-screen bg-wa-chatBg pb-28">
      {/* Header */}
      <header className="wa-header">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full bg-wa-dark/10 hover:bg-wa-dark/20 transition"
          >
            <ChevronLeft size={22} className="text-wa-dark" />
          </button>
          <div>
            <h1 className="wa-header-title flex items-center gap-2">
              <ShieldAlert size={20} className="text-wa-teal animate-pulse" /> {t('staySafe') || 'Stay Safe'}
            </h1>
            <p className="text-wa-subtext text-xs">{t('learnToIdentify') || 'Learn to identify scams'}</p>
          </div>
        </div>
        {/* Alert count badge */}
        <div className="wa-dot">{fraudAlerts.length}</div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm"
        >
          <span className="text-xl shrink-0 mt-0.5">⚠️</span>
          <p className="text-amber-800 text-sm font-semibold leading-relaxed">
            {t('alertInfoBanner') || 'Tap any alert to learn what to do. Speak guides are available inside.'}
          </p>
        </motion.div>

        {/* Alerts list */}
        <div className="wa-panel overflow-hidden divide-y divide-wa-border">
          {fraudAlerts.map((a, idx) => {
            const isHigh = a.severity === 'high';
            const isExpanded = expandedId === a.id;
            const localizedAlert = a.translations?.[lang] || a;
            const activeId = `alert-${a.id}`;

            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className={`cursor-pointer transition-colors ${isExpanded ? 'bg-wa-chatBg/50' : 'hover:bg-wa-chatBg/30'}`}
                onClick={() => setExpandedId(isExpanded ? null : a.id)}
              >
                <div className="flex items-center gap-4 px-4 py-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm
                    ${isHigh ? 'bg-red-100' : 'bg-orange-100'}`}>
                    {a.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`wa-badge text-[9px] font-black uppercase tracking-wider
                        ${isHigh ? 'wa-badge-red' : 'wa-badge-orange'}`}>
                        {a.severity === 'high' ? t('highSeverity') || 'High Alert' : t('mediumSeverity') || 'Medium Alert'}
                      </span>
                    </div>
                    <h3 className="font-bold text-wa-text text-base leading-snug">{localizedAlert.title}</h3>
                    <p className={`text-wa-subtext text-xs md:text-sm mt-0.5 ${isExpanded ? '' : 'line-clamp-1'}`}>
                      {localizedAlert.description}
                    </p>
                  </div>

                  {/* Expand arrow */}
                  <div className={`shrink-0 text-wa-subtext transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-1 border-t border-wa-border/50 bg-wa-chatBg/20">
                        <div className="bg-white rounded-2xl p-4 border border-wa-border relative shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Lock size={15} className="text-wa-teal animate-pulse" />
                              <span className="text-wa-teal text-xs font-black uppercase tracking-widest">
                                {t('whatToDo') || 'What To Do'}
                              </span>
                            </div>
                            
                            {/* Voice Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const textToRead = `${localizedAlert.title}. ${localizedAlert.description}. ${localizedAlert.whatToDo}`;
                                speak(textToRead, activeId);
                              }}
                              className={`p-2 rounded-full transition active:scale-90 shadow-sm
                                ${isSpeakingId === activeId ? 'bg-wa-teal text-white animate-pulse' : 'bg-wa-dark/10 text-wa-dark'}`}
                            >
                              {isSpeakingId === activeId ? <Volume2 size={16} /> : <VolumeX size={16} />}
                            </button>
                          </div>
                          <p className="text-wa-text text-sm font-semibold leading-relaxed pr-8">
                            {localizedAlert.whatToDo}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Interactive Simulator */}
        <Simulator speak={speak} isSpeakingId={isSpeakingId} setIsSpeakingId={setIsSpeakingId} />
      </div>
    </PageTransition>
  );
};

const Simulator = ({ speak, isSpeakingId, setIsSpeakingId }) => {
  const { lang } = useLanguage();
  const sim = getSimulatorData(lang);

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const scenario = sim.scenarios[scenarioIndex];

  // Auto-speak simulation outcomes
  useEffect(() => {
    if (result && !isComplete) {
      const isCorrect = result === scenario.ans;
      const outcomeText = isCorrect ? `${sim.correct}` : `${sim.danger}`;
      speak(`${outcomeText}. ${scenario.feedback}`, 'sim-outcome');
    }
  }, [result, scenario, isComplete, sim.correct, sim.danger, speak]);

  // Auto-speak final score on simulation complete
  useEffect(() => {
    if (isComplete) {
      const scoreStr = sim.scoreInfo.replace('{score}', score).replace('{total}', sim.scenarios.length);
      speak(`${sim.quizComplete}. ${scoreStr}`, 'sim-complete');
    }
  }, [isComplete, score, sim.quizComplete, sim.scoreInfo, sim.scenarios.length, speak]);

  const handleAnswer = (ans) => {
    if (result !== null) return;
    setResult(ans);
    if (ans === scenario.ans) {
      setScore(p => p + 1);
    }
  };

  const handleNext = () => {
    setResult(null);
    window.speechSynthesis.cancel();
    setIsSpeakingId(null);
    if (scenarioIndex < sim.scenarios.length - 1) {
      setScenarioIndex(p => p + 1);
    } else {
      setIsComplete(true);
    }
  };

  const restartQuiz = () => {
    setScenarioIndex(0);
    setResult(null);
    setScore(0);
    setIsComplete(false);
    window.speechSynthesis.cancel();
    setIsSpeakingId(null);
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="wa-panel p-6 text-center space-y-5"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wa-green to-wa-teal flex items-center justify-center mx-auto shadow-md">
          <Award size={40} className="text-white" />
        </div>
        <h3 className="text-wa-text text-2xl font-black">{sim.quizComplete}</h3>
        <p className="text-wa-subtext text-base font-bold">
          {sim.scoreInfo.replace('{score}', score).replace('{total}', sim.scenarios.length)}
        </p>
        <div className="wa-progress-track max-w-xs mx-auto">
          <div className="wa-progress-fill animate-pulse" style={{ width: `${(score / sim.scenarios.length) * 100}%` }} />
        </div>
        <button
          onClick={restartQuiz}
          className="btn-wa-primary w-full max-w-xs mx-auto h-12 rounded-2xl text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} /> {sim.playAgain}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="wa-panel overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-wa-teal to-wa-dark px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Smartphone size={20} className="text-white" />
          <div>
            <h2 className="text-white font-black text-sm md:text-base">{sim.fraudSimulator}</h2>
            <p className="text-white/80 text-[10px] md:text-xs">{sim.safeOrScam}</p>
          </div>
        </div>
        <span className="bg-white/20 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
          {sim.statusText.replace('{current}', scenarioIndex + 1).replace('{total}', sim.scenarios.length)}
        </span>
      </div>

      <div className="p-5">
        {/* Mock Phone Screen */}
        <div className="max-w-xs mx-auto border-4 border-slate-700/20 rounded-[24px] overflow-hidden shadow-wa-md mb-5 bg-white">
          <div className="bg-gray-800 text-white text-[9px] font-bold px-4 py-1.5 flex justify-between tracking-wider select-none">
            <span>9:41 AM</span>
            <span className="uppercase tracking-widest">{scenario.title}</span>
            <span>📶 🔋</span>
          </div>
          
          <div className="p-5 text-center">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-3 ring-4 ring-red-50">
              <ShieldAlert size={24} className="text-red-500" />
            </div>
            
            <p className="text-slate-800 text-xs md:text-sm font-extrabold mb-3 leading-relaxed">
              {scenario.msg}
            </p>
            
            <div className="space-y-2 px-1">
              <div className="py-2.5 bg-gradient-to-r from-wa-teal to-wa-dark text-white rounded-xl text-xs font-black shadow select-none">
                {scenario.action}
              </div>
              <p className="text-red-500 font-black text-[9px] uppercase tracking-wider animate-pulse select-none">
                {scenario.subtext}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons / Answers */}
        {!result ? (
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer('safe')}
              className="btn-wa-secondary h-12 rounded-2xl font-bold border-2 border-wa-green text-wa-teal text-sm flex items-center justify-center gap-1.5"
            >
              <CheckCircle size={16} /> {sim.safe}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer('scam')}
              className="h-12 rounded-2xl font-bold bg-red-500 hover:bg-red-600 text-white text-sm transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <AlertTriangle size={16} /> {sim.scam}
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl p-4 border-2 text-center max-w-md mx-auto relative
              ${result === scenario.ans ? 'bg-green-50 border-wa-green' : 'bg-red-50 border-red-300'}`}
          >
            {/* Speakers toggle for simulator response */}
            <button
              onClick={() => speak(`${result === scenario.ans ? sim.correct : sim.danger}. ${scenario.feedback}`, 'sim-outcome')}
              className={`absolute right-3 top-3 p-1.5 rounded-full transition shadow-inner active:scale-90
                ${isSpeakingId === 'sim-outcome' ? 'bg-wa-teal text-white animate-pulse' : 'bg-wa-dark/10 text-wa-dark'}`}
            >
              {isSpeakingId === 'sim-outcome' ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            <p className={`text-xl font-black mb-1 flex items-center justify-center gap-1.5
              ${result === scenario.ans ? 'text-wa-teal' : 'text-red-500'}`}>
              {result === scenario.ans ? sim.correct : sim.danger}
            </p>
            
            <p className="text-wa-text text-xs md:text-sm font-semibold leading-relaxed mb-4 px-2">
              {scenario.feedback}
            </p>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleNext}
              className="btn-wa-primary px-5 py-2.5 h-11 text-xs rounded-xl mx-auto flex items-center justify-center gap-1.5"
            >
              <span>{sim.nextQuestion}</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AlertsPage;
