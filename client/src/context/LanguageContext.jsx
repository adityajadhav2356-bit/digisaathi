import React, { createContext, useState, useContext } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('digisaathi_lang') || 'en';
  });

  const setLang = (newLang) => {
    localStorage.setItem('digisaathi_lang', newLang);
    setLangState(newLang);
  };

  const t = (key) => {
    return (translations[lang] && translations[lang][key]) || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const LANGUAGES = {
  en: { voice: 'en-IN', name: 'English', nativeName: 'English' },
  hi: { voice: 'hi-IN', name: 'Hindi', nativeName: 'हिंदी' },
  mr: { voice: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
  gu: { voice: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  bn: { voice: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা' },
  ta: { voice: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
  te: { voice: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' }
};

export const translations = {
  en: {
    // Splash
    taglines: ["Learn UPI", "Stay Safe Online", "Connect with Family", "Use DigiLocker"],
    trusted: "Trusted by 10,000+ seniors across India",
    seniorBtn: "I am a Senior Learner",
    volunteerBtn: "I am a Youth Volunteer",
    chooseLang: "Choose language",
    splashSubtitle: "Your trusted digital companion 🙏",
    feat1: "Learn UPI & Payments",
    feat2: "Stay safe from scams",
    feat3: "Get volunteer support",
    
    // Login
    welcomeBack: "Welcome Back! 👋",
    enterOtp: "Enter OTP",
    mobileLabel: "Mobile Number",
    resendOtp: "Didn't receive? Resend OTP",
    enterMobile: "Enter your mobile number to continue",
    sendOtp: "Send OTP",
    verifyContinue: "Verify & Continue",
    newHere: "New here? Register in 2 minutes",
    languageInfo: "Language",
    otpSent: "OTP sent to",
    otpSuccess: "OTP verified successfully ✓",

    // Details
    detailsStep1Title: "Tell us about yourself 😊",
    detailsStep1Sub: "Step 1 of 3: Personal Details",
    placeholderName: "Full Name",
    placeholderAge: "Age",
    nextStep: "Next Step",
    detailsStep2Title: "How would you like to learn?",
    detailsStep2Sub: "Step 2 of 3: Preferences",
    fontSize: "Font Size",
    prefLang: "Preferred Language",
    learnGoals: "Learning Goals",
    detailsStep3Title: "Emergency Contact",
    detailsStep3Sub: "Step 3 of 3: Safety Net",
    safetyTip: "Who should we notify if you need immediate assistance?",
    contactName: "Contact Name",
    relation: "Relation",
    mobileNum: "Mobile Number",
    allowFamily: "Allow family to view my learning progress securely",
    completeSetup: "Complete Setup 🎉",

    // Home
    greeting: "Namaste, {name} ji! 🙏",
    doingGreat: "You're doing great! Let's continue learning today.",
    overallProgress: "Overall Progress",
    completedOf: "{completed} of {total} completed",
    urgentAlert: "⚠️ Urgent Fraud Alert",
    fakeKyc: "Fake KYC scam active. Tap to learn more.",
    startLearning: "Start Learning",
    upcomingSession: "Upcoming Volunteer Session",
    joinCall: "Join Call",
    callVolunteer: "Call Volunteer",

    // Profile
    modulesDone: "Modules Done",
    sessionsDone: "Sessions Done",
    daysActive: "Days Active",
    appSettings: "App Settings",
    emergencyContact: "Emergency Contact",
    myVolunteer: "My Volunteer",
    yourBadges: "Your Badges",
    signOut: "Sign Out Securely",

    // Module & Alerts
    stepOf: "Step {step} of {total}",
    takeQuiz: "Take Quiz",
    back: "Back",
    next: "Next",
    tryAgain: "Try Again",
    backToHome: "Back to Home",
    moduleComplete: "Module Complete! 🎉",
    notQuiteThere: "Not Quite There",
    scoreInfo: "You scored {score} out of {total}",
    questionOf: "Question {current} of {total}",
    submitAnswers: "Submit Answers",
    staySafe: "Stay Safe Online",
    learnToIdentify: "Learn to identify and avoid scams",
    whatToDo: "What to do:",
    tapToExpand: "Tap to expand",
    fraudSimulator: "Fraud Simulator",
    safeOrScam: "Is this transaction safe or a scam?",
    safe: "Safe",
    scam: "Scam",
    correct: "CORRECT! 🎉",
    danger: "DANGER! 🛑",
    tryAnother: "Try Another Example",
    simTitle: "Secure Payment Example",
    reqMoney: "Requesting ₹50,000 for 'Lottery Prize Release'",
    fromKbc: "From: KBC Prize Dept",
    payNow: "PAY NOW",
    enterPinToReceive: "Enter PIN to receive money",

    // Bottom Nav
    navHome: "Home",
    navLearn: "Learn",
    navAlerts: "Alerts",
    navProfile: "Profile",

    badges: {
      firstModule: "First Module",
      fraudFighter: "Fraud Fighter",
      sevenDayStreak: "7-Day Streak"
    },
    askSomething: "Ask something...",
    listeningDotDotDot: "🎙️ Listening...",
    voiceAssistant: "AI Assistant"
  },
  hi: {
    // Splash
    taglines: ["UPI सीखें", "ऑनलाइन सुरक्षित रहें", "परिवार से जुड़ें", "डिजीलॉकर का उपयोग करें"],
    trusted: "भारत भर में 10,000+ वरिष्ठ नागरिकों द्वारा विश्वसनीय",
    seniorBtn: "मैं एक वरिष्ठ शिक्षार्थी हूँ",
    volunteerBtn: "मैं एक युवा स्वयंसेवक हूँ",
    chooseLang: "भाषा चुनें",
    splashSubtitle: "आपका विश्वसनीय डिजिटल साथी 🙏",
    feat1: "UPI और भुगतान सीखें",
    feat2: "घोटालों से सुरक्षित रहें",
    feat3: "स्वयंसेवक सहायता प्राप्त करें",
    
    // Login
    welcomeBack: "वापसी पर स्वागत है! 👋",
    enterOtp: "OTP दर्ज करें",
    mobileLabel: "मोबाइल नंबर",
    resendOtp: "नहीं मिला? OTP पुनः भेजें",
    enterMobile: "जारी रखने के लिए अपना मोबाइल नंबर दर्ज करें",
    sendOtp: "OTP भेजें",
    verifyContinue: "सत्यापित करें और आगे बढ़ें",
    newHere: "नए हैं? 2 मिनट में रजिस्टर करें",
    languageInfo: "भाषा (Language)",
    otpSent: "OTP इस नंबर पर भेजा गया:",
    otpSuccess: "OTP सफलतापूर्वक सत्यापित ✓",

    // Details
    detailsStep1Title: "अपने बारे में बताएं 😊",
    detailsStep1Sub: "चरण 1: व्यक्तिगत जानकारी",
    placeholderName: "पूरा नाम",
    placeholderAge: "उम्र",
    nextStep: "अगला चरण",
    detailsStep2Title: "आप कैसे सीखना चाहेंगे?",
    detailsStep2Sub: "चरण 2: प्राथमिकताएं",
    fontSize: "फ़ॉन्ट का आकार",
    prefLang: "पसंदीदा भाषा",
    learnGoals: "सीखने के लक्ष्य",
    detailsStep3Title: "आपातकालीन संपर्क",
    detailsStep3Sub: "चरण 3: सुरक्षा",
    safetyTip: "तत्काल सहायता की आवश्यकता होने पर हमें किसे सूचित करना चाहिए?",
    contactName: "संपर्क नाम",
    relation: "रिश्ता",
    mobileNum: "मोबाइल नंबर",
    allowFamily: "परिवार को मेरी प्रगति देखने की अनुमति दें",
    completeSetup: "सेटअप पूरा करें 🎉",

    // Home
    greeting: "नमस्ते, {name} जी! 🙏",
    doingGreat: "आप बहुत अच्छा कर रहे हैं! आइए आज सीखना जारी रखें।",
    overallProgress: "कुल प्रगति",
    completedOf: "{total} में से {completed} पूर्ण",
    urgentAlert: "⚠️ तत्काल धोखाधड़ी चेतावनी",
    fakeKyc: "फर्जी KYC घोटाला सक्रिय है। अधिक जानने के लिए टैप करें।",
    startLearning: "सीखना शुरू करें",
    upcomingSession: "आगामी स्वयंसेवक सत्र",
    joinCall: "कॉल में शामिल हों",
    callVolunteer: "स्वयंसेवक को कॉल करें",

    // Profile
    modulesDone: "मॉड्यूल पूर्ण",
    sessionsDone: "सत्र पूर्ण",
    daysActive: "सक्रिय दिन",
    appSettings: "ऐप सेटिंग्स",
    emergencyContact: "आपातकालीन संपर्क",
    myVolunteer: "मेरा स्वयंसेवक",
    yourBadges: "आपके बैज",
    signOut: "सुरक्षित रूप से साइन आउट करें",

    // Module & Alerts
    stepOf: "चरण {step} / {total}",
    takeQuiz: "प्रश्नोत्तरी लें",
    back: "पीछे",
    next: "आगे",
    tryAgain: "फिर से प्रयास करें",
    backToHome: "होम पर वापस जाएं",
    moduleComplete: "मॉड्यूल पूर्ण! 🎉",
    notQuiteThere: "थोड़ी और मेहनत",
    scoreInfo: "आपने {total} में से {score} अंक प्राप्त किए",
    questionOf: "प्रश्न {current} / {total}",
    submitAnswers: "उत्तर सबमिट करें",
    staySafe: "ऑनलाइन सुरक्षित रहें",
    learnToIdentify: "घोटालों को पहचानना और बचना सीखें",
    whatToDo: "क्या करें:",
    tapToExpand: "विस्तार करने के लिए टैप करें",
    fraudSimulator: "धोखाधड़ी सिम्युलेटर",
    safeOrScam: "क्या यह लेन-देन सुरक्षित है या घोटाला?",
    safe: "सुरक्षित",
    scam: "घोटाला",
    correct: "सही! 🎉",
    danger: "खतरा! 🛑",
    tryAnother: "एक और उदाहरण आज़माएं",
    simTitle: "सुरक्षित भुगतान उदाहरण",
    reqMoney: "लॉटरी पुरस्कार जारी करने के लिए ₹50,000 का अनुरोध",
    fromKbc: "द्वारा: KBC पुरस्कार विभाग",
    payNow: "अभी भुगतान करें",
    enterPinToReceive: "पैसे प्राप्त करने के लिए PIN दर्ज करें",

    // Bottom Nav
    navHome: "होम",
    navLearn: "सीखें",
    navAlerts: "अलर्ट",
    navProfile: "प्रोफ़ाइल",

    badges: {
      firstModule: "पहला मॉड्यूल",
      fraudFighter: "धोखाधड़ी सेनानी",
      sevenDayStreak: "7 दिन की स्ट्रीक"
    },
    askSomething: "कुछ पूछें...",
    listeningDotDotDot: "🎙️ सुन रहा हूँ...",
    voiceAssistant: "AI सहायक"
  },
  mr: {
    // Splash
    taglines: ["UPI शिका", "ऑनलाइन सुरक्षित राहा", "कुटुंबाशी कनेक्ट व्हा", "DigiLocker वापरा"],
    trusted: "भारतभरातील १०,०००+ ज्येष्ठ नागरिकांचा विश्वास",
    seniorBtn: "मी ज्येष्ठ नागरिक आहे",
    volunteerBtn: "मी युवा स्वयंसेवक आहे",
    chooseLang: "भाषा निवडा",
    splashSubtitle: "तुमचा विश्वासू डिजिटल सोबती 🙏",
    feat1: "UPI आणि पेमेंट शिका",
    feat2: "फसवणुकीपासून सुरक्षित राहा",
    feat3: "स्वयंसेवक मदत मिळवा",
    
    // Login
    welcomeBack: "पुन्हा स्वागत आहे! 👋",
    enterOtp: "OTP प्रविष्ट करा",
    mobileLabel: "मोबाईल नंबर",
    resendOtp: "मिळाला नाही? परत OTP पाठवा",
    enterMobile: "सुरू ठेवण्यासाठी तुमचा मोबाईल नंबर प्रविष्ट करा",
    sendOtp: "OTP पाठवा",
    verifyContinue: "पडताळणी करा आणि पुढे जा",
    newHere: "नवीन आहात? २ मिनिटांत नोंदणी करा",
    languageInfo: "भाषा (Language)",
    otpSent: "OTP या नंबरवर पाठवला:",
    otpSuccess: "OTP पडताळणी यशस्वी ✓",
    greeting: "नमस्कार, {name} जी! 🙏",
    doingGreat: "तुम्ही खूप छान करत आहात! चला आज शिकणे सुरू ठेवूया.",
    overallProgress: "एकूण प्रगती",
    completedOf: "{total} पैकी {completed} पूर्ण झाले",
    startLearning: "शिकणे सुरू करा",
    upcomingSession: "आगामी स्वयंसेवक सत्र",
    navHome: "होम",
    navLearn: "शिका",
    navAlerts: "सूचना",
    navProfile: "प्रोफाइल"
  },
  ta: {
    navHome: "முகப்பு",
    navLearn: "கற்க",
    navAlerts: "விழிப்பூட்டல்கள்",
    navProfile: "சுயவிவரம்",
    greeting: "வணக்கம், {name} ஜி! 🙏",
    chooseLang: "மொழியைத் தேர்ந்தெடுக்கவும்",
    seniorBtn: "நான் மூத்த குடிமகன்",
    volunteerBtn: "நான் இளைஞர் தொண்டர்",
    trusted: "இந்தியா முழுவதும் 10,000+ முதியவர்களின் நம்பிக்கை",
    welcomeBack: "மீண்டும் வருக! 👋",
    verifyContinue: "சரிபார்த்து தொடரவும்",
    splashSubtitle: "உங்கள் நம்பிக்கையான டிஜிட்டல் துணை 🙏",
    feat1: "UPI மற்றும் பணம் செலுத்தலை கற்கவும்",
    feat2: "மோசடிகளில் இருந்து பாதுகாப்பாக இருங்கள்",
    feat3: "தொண்டர்களின் ஆதரவை பெறுங்கள்",
    enterOtp: "OTP ஐ உள்ளிடவும்",
    mobileLabel: "கைபேசி எண்",
    resendOtp: "கிடைக்கவில்லையா? மீண்டும் OTP அனுப்பவும்"
  },
  bn: {
    navHome: "হোম",
    navLearn: "শিখুন",
    navAlerts: "সতর্কতা",
    navProfile: "প্রোফাইল",
    greeting: "নমস্কার, {name} জি! 🙏",
    chooseLang: "ভাষা নির্বাচন করুন",
    seniorBtn: "আমি একজন প্রবীণ শিক্ষাত্রী",
    volunteerBtn: "আমি একজন তরুণ স্বেচ্ছাসেবক",
    trusted: "ভারত জুড়ে ১০,০০০+ প্রবীণের বিশ্বাস",
    welcomeBack: "স্বাগত! 👋",
    verifyContinue: "যাচাই করুন এবং অবিরত করুন",
    splashSubtitle: "আপনার বিশ্বস্ত ডিজিটাল সঙ্গী 🙏",
    feat1: "UPI এবং পেমেন্ট শিখুন",
    feat2: "প্রতারণা থেকে সুরক্ষিত থাকুন",
    feat3: "স্বেচ্ছাসেবক সমর্থন পান",
    enterOtp: "OTP লিখুন",
    mobileLabel: "মোবাইল নম্বর",
    resendOtp: "পাননি? আবার OTP পাঠান"
  },
  gu: {
    taglines: ["UPI શીખો", "ઓનલાઇન સુરક્ષિત રહો", "પરિવાર સાથે જોડાઓ", "DigiLocker વાપરો"],
    trusted: "સમગ્ર ભારતના ૧૦,૦૦૦+ વરિષ્ઠ નાગરિકોનો વિશ્વાસ",
    seniorBtn: "હું એક વરિષ્ઠ શીખનાર છું",
    volunteerBtn: "હું એક યુવા સ્વયંસેવક છું",
    chooseLang: "ભાષા પસંદ કરો",
    splashSubtitle: "તમારો વિશ્વસનીય ડિજિટલ સાથી 🙏",
    feat1: "UPI અને પેમેન્ટ્સ શીખો",
    feat2: "કૌભાંડોથી સુરક્ષિત રહો",
    feat3: "સ્વયંસેવકનો ટેકો મેળવો",
    enterOtp: "OTP નોંધાવો",
    mobileLabel: "મોબાઈલ નંબર",
    resendOtp: "મળ્યો નથી? ફરીથી OTP મોકલો",
    welcomeBack: "પાછા ફરી સ્વાગત છે! 👋",
    enterMobile: "ચાલુ રાખવા માટે તમારો મોબાઈલ નંબર નાખો",
    sendOtp: "OTP મોકલો",
    verifyContinue: "ચકાસો અને આગળ વધો",
    newHere: "નવા છો? ૨ મિનિટમાં નોંધણી કરો",
    languageInfo: "ભાષા (Language)",
    otpSent: "આ નંબર પર OTP મોકલવામાં આવ્યો:",
    otpSuccess: "OTP સફળતાપૂર્વક ચકાસાયો ✓",
    greeting: "નમસ્તે, {name} જી! 🙏",
    doingGreat: "તમે ખૂબ સારું કરી રહ્યા છો! ચાલો આજે શીખવાનું ચાલુ રાખીએ.",
    overallProgress: "કુલ પ્રગતિ",
    completedOf: "{total} માંથી {completed} પૂર્ણ",
    startLearning: "શીખવાનું શરૂ કરો",
    upcomingSession: "આગળનું સ્વયંસેવક સત્ર",
    navHome: "હોમ",
    navLearn: "શીખો",
    navAlerts: "ચેતવણીઓ",
    navProfile: "પ્રોફાઈલ"
  },
  te: {
    taglines: ["UPI నేర్చుకోండి", "ఆన్‌లైన్‌లో సురక్షితంగా ఉండండి", "కుటుంబంతో కనెక్ట్ అవ్వండి", "DigiLocker వాడండి"],
    trusted: "భారతదేశం అంతటా 10,000+ సీనియర్ సిటిజన్ల నమ్మకం",
    seniorBtn: "నేను సీనియర్ అభ్యాసకుడిని",
    volunteerBtn: "నేను యువ వాలంటీర్‌ను",
    chooseLang: "భాషను ఎంచుకోండి",
    splashSubtitle: "మీకు నమ్మకమైన డిజిటల్ సహచరుడు 🙏",
    feat1: "UPI మరియు చెల్లింపులు నేర్చుకోండి",
    feat2: "స్కామ్‌ల నుండి సురక్షితంగా ఉండండి",
    feat3: "వాలంటీర్ మద్దతు పొందండి",
    enterOtp: "OTP ను నమోదు చేయండి",
    mobileLabel: "మొబైల్ నంబర్",
    resendOtp: "రాలేదా? మళ్ళీ OTP పంపండి",
    welcomeBack: "తిరిగి స్వాగతం! 👋",
    enterMobile: "కొనసాగించడానికి మీ మొబైల్ నంబర్ నమోదు చేయండి",
    sendOtp: "OTP పంపండి",
    verifyContinue: "నిర్ధారించి కొనసాగించండి",
    newHere: "కొత్త వారా? 2 నిమిషాల్లో నమోదు చేయండి",
    languageInfo: "భాష (Language)",
    otpSent: "OTP ఈ నంబర్‌కు పంపబడింది:",
    otpSuccess: "OTP విజయవంతంగా ధృవీకరించబడింది ✓",
    greeting: "నమస్తే, {name} జీ! 🙏",
    doingGreat: "మీరు అద్భుతంగా చేస్తున్నారు! నేడు నేర్చుకోవడం కొనసాగిద్దాం.",
    overallProgress: "మొత్తం పురోగతి",
    completedOf: "{total} లో {completed} పూర్తయింది",
    startLearning: "నేర్చుకోవడం ప్రారంభించండి",
    upcomingSession: "రాబోయే స్వచ్ఛంద సమావేశం",
    navHome: "హోమ్",
    navLearn: "నేర్చుకో",
    navAlerts: "హెచ్చరికలు",
    navProfile: "ప్రొఫైల్"
  }
};
