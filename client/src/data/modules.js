const enModules = [
  {
    id: "upi",
    title: "UPI Payments",
    icon: "💳",
    color: "from-purple-500 to-indigo-600",
    description: "Send & receive money safely",
    totalSteps: 4,
    completed: true,
    steps: [
      { id: 1, title: "Intro to UPI", content: "UPI (Unified Payments Interface) lets you instantly send money to anyone for free using just their phone number or a QR code.", tip: "UPI is extremely safe and used by over 300 million Indians daily.", image: "/assets/upi/intro.png" },
      { id: 2, title: "Linking Bank Account", content: "First, you need to securely link your bank account to your UPI app. This allows the money to be sent directly from your bank without needing an ATM card.", tip: "You only need to do this once during setup.", image: "/assets/upi/link.png" },
      { id: 3, title: "Sending Money", content: "Tap 'Pay', scan a QR code at a shop or enter a phone number, type the amount, and enter your secure 4 or 6-digit PIN to send money.", tip: "Never share your PIN with anyone.", image: "/assets/upi/send.png" },
      { id: 4, title: "Receiving Money", content: "To receive money, you just need to share your phone number or show your QR code. The money will securely deposit directly into your bank.", tip: "You NEVER need to enter a PIN to receive money.", image: "/assets/upi/receive.png" }
    ],
    quiz: [
      { q: "What do you need to RECEIVE money on UPI?", options: ["Your UPI PIN", "Your UPI ID or phone number", "Your bank password", "Your Aadhaar number"], correct: 1 },
      { q: "If someone asks for your UPI PIN to send you money, what should you do?", options: ["Share it immediately", "Share only the first 2 digits", "Refuse — it is a scam", "Call your bank first"], correct: 2 },
      { q: "Which of these is a government-made UPI app?", options: ["PhonePe", "GPay", "BHIM", "Paytm"], correct: 2 }
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp Basics",
    icon: "💬",
    color: "from-green-500 to-teal-600",
    description: "Chat, call & video with family",
    totalSteps: 4,
    completed: false,
    steps: [
      {
        id: 1,
        title: "Intro to Wapp",
        content: "Open WhatsApp and tap the small 'Message' bubble icon at the bottom. Select the name of the person you want to talk to.",
        tip: "You can find your family members by scrolling through the list of Alphabetical names.",
        image: "/assets/wapp/intro.png"
      },
      {
        id: 2,
        title: "The chat feature",
        content: "Tap where it says 'Type a message'. A keyboard will pop up. Type your message and tap the green circle button with the white arrow to send.",
        tip: "If you make a mistake, you can use the backspace key to delete letters.",
        image: "/assets/wapp/chat.png"
      },
      {
        id: 3,
        title: "The voice call",
        content: "If typing is hard, just hold down the green 'Microphone' icon and speak. Release it when you are done to send your voice.",
        tip: "Voice notes are great for wishing someone 'Happy Birthday' or sending long updates!",
        image: "/assets/wapp/voice.png"
      },
      {
        id: 4,
        title: "Video call",
        content: "Tap the 'Camera' icon at the top right of a chat to see your loved ones face-to-face while you talk!",
        tip: "Make sure you are in a brightly lit room so they can see your smile clearly.",
        image: "/assets/wapp/video.png"
      }
    ],
    quiz: [
      { q: "What do two blue ticks mean on WhatsApp?", options: ["Message was sent", "Message was delivered", "Message was read", "Message was deleted"], correct: 2 },
      { q: "What is the best way to send a message on WhatsApp if typing is difficult?", options: ["Send a letter", "Send a voice message (holding the microphone)", "Make an audio call", "Type slowly with one finger"], correct: 1 },
      { q: "Which icon do you tap to start a video call inside a chat?", options: ["Telephone icon", "Camera icon", "Microphone icon", "Plus icon"], correct: 1 }
    ]
  },
  {
    id: "aadhaar",
    title: "Aadhaar & DigiLocker",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "Access your documents digitally",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "Intro to DigiLocker", content: "DigiLocker is a secure digital vault by the Government of India where you can store official documents safely on your phone.", tip: "Documents in DigiLocker are legally valid just like physical copies.", image: "/assets/digi/intro.png" },
      { id: 2, title: "Signing Up", content: "Sign up using your Aadhaar-linked mobile number. Enter the OTP to verify your identity securely.", tip: "This ensures only YOU can access your documents.", image: "/assets/digi/signup.png" },
      { id: 3, title: "Downloading Aadhaar", content: "Once signed in, you can download your digital Aadhaar card directly to your phone. It has a QR code for easy verification.", tip: "You can show this digital Aadhaar instead of carrying the physical card.", image: "/assets/digi/aadhaar.png" },
      { id: 4, title: "Sharing Documents", content: "You can securely share your digital documents directly from the app when requested by official organizations or for KYC.", tip: "This is much safer than giving out photocopies.", image: "/assets/digi/share.png" }
    ],
    quiz: [
      { q: "How many digits does an Aadhaar number have?", options: ["8 digits", "10 digits", "12 digits", "16 digits"], correct: 2 },
      { q: "Are documents in DigiLocker legally valid?", options: ["No, only physical copies are valid", "Only for some purposes", "Yes, they are legally valid everywhere", "Only in Maharashtra"], correct: 2 },
      { q: "Who made the DigiLocker app?", options: ["Google", "Reliance Jio", "Government of India", "State Bank of India"], correct: 2 }
    ]
  },
  {
    id: "fraud",
    title: "Fraud Protection",
    icon: "🛡️",
    color: "from-red-500 to-rose-600",
    description: "Stay safe from online scams",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "The golden rule", content: "NEVER share your OTP, UPI PIN, ATM PIN, or bank password with anyone — not even someone claiming to be from your bank, government, or telecom company.", tip: "Legitimate organizations will NEVER ask for your PIN or OTP." },
      { id: 2, title: "Fake KYC calls", content: "Scammers call pretending to be from your bank saying 'Your KYC is pending, your account will be blocked'. They ask for your Aadhaar number and OTP. NEVER share these.", tip: "Hang up immediately. Call your bank's official number to verify." },
      { id: 3, title: "UPI payment requests", content: "A UPI COLLECT REQUEST is asking YOU to pay someone. Scammers send these saying 'Accept this to receive your prize money'. Accepting and entering PIN sends YOUR money away.", tip: "You never need to enter your PIN to RECEIVE money. Ever." },
      { id: 4, title: "Lottery and prize scams", content: "Messages saying 'You have won Rs 50 lakh in KBC' or 'Your number was selected for a prize' are always fake. They will ask for a 'processing fee'. Do not pay.", tip: "If you did not enter a lottery, you cannot win one." },
      { id: 5, title: "What to do if scammed", content: "Immediately call your bank's helpline to freeze your account. Report the fraud on the national helpline 1930 (cybercrime). File a complaint at cybercrime.gov.in.", tip: "Act fast — most banks can reverse transactions reported within 24 hours." }
    ],
    quiz: [
      { q: "A caller says he is from your bank and needs your OTP to update KYC. What do you do?", options: ["Share the OTP quickly", "Share only half the OTP", "Hang up and call your bank directly", "Share OTP but not your PIN"], correct: 2 },
      { q: "You receive a UPI collect request of Rs 1 from someone promising to send you Rs 5000. What is this?", options: ["A genuine offer", "A government scheme", "A scam — do not accept", "A bank verification"], correct: 2 },
      { q: "What is the national cybercrime helpline number?", options: ["100", "112", "1930", "1800"], correct: 2 }
    ]
  }
];

const hiModules = [
  {
    id: "upi",
    title: "UPI भुगतान",
    icon: "💳",
    color: "from-purple-500 to-indigo-600",
    description: "सुरक्षित रूप से पैसे भेजें और प्राप्त करें",
    totalSteps: 4,
    completed: true,
    steps: [
      { id: 1, title: "UPI का परिचय", content: "UPI आपको केवल एक फोन नंबर या क्यूआर कोड का उपयोग करके किसी को भी तुरंत और मुफ्त में पैसे भेजने देता है।", tip: "UPI बहुत सुरक्षित है और 30 करोड़ से अधिक भारतीयों द्वारा उपयोग किया जाता है।", image: "/assets/upi/intro.png" },
      { id: 2, title: "बैंक खाता जोड़ना", content: "सबसे पहले, आपको अपने बैंक खाते को अपने UPI ऐप से सुरक्षित रूप से लिंक करना होगा। इससे पैसे सीधे आपके बैंक से भेजे जा सकते हैं।", tip: "आपको यह केवल एक बार सेट अप के दौरान करना होगा।", image: "/assets/upi/link.png" },
      { id: 3, title: "पैसे भेजना", content: "'पे' पर टैप करें, एक क्यूआर कोड स्कैन करें, राशि टाइप करें और पैसे भेजने के लिए अपना सुरक्षित 4 या 6 अंकों का पिन दर्ज करें।", tip: "अपना पिन कभी किसी के साथ साझा न करें।", image: "/assets/upi/send.png" },
      { id: 4, title: "पैसे प्राप्त करना", content: "पैसे प्राप्त करने के लिए, बस अपना फोन नंबर साझा करें। पैसे सुरक्षित रूप से सीधे आपके बैंक में जमा हो जाएंगे।", tip: "पैसे प्राप्त करने के लिए आपको कभी भी पिन दर्ज करने की आवश्यकता नहीं है।", image: "/assets/upi/receive.png" }
    ],
    quiz: [
      { q: "UPI पर पैसे प्राप्त करने के लिए आपको क्या चाहिए?", options: ["आपका UPI पिन", "आपकी UPI आईडी या फोन नंबर", "आपका बैंक पासवर्ड", "आपका आधार नंबर"], correct: 1 },
      { q: "अगर कोई आपको पैसे भेजने के लिए आपका UPI पिन मांगता है, तो आपको क्या करना चाहिए?", options: ["इसे तुरंत साझा करें", "केवल पहले 2 अंक साझा करें", "मना करें - यह एक घोटाला है", "पहले अपने बैंक को कॉल करें"], correct: 2 },
      { q: "इनमें से कौन सा सरकार द्वारा बनाया गया UPI ऐप है?", options: ["PhonePe", "GPay", "BHIM", "Paytm"], correct: 2 }
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp मूल बातें",
    icon: "💬",
    color: "from-green-500 to-teal-600",
    description: "परिवार के साथ चैट, कॉल और वीडियो",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "Intro to Wapp", content: "WhatsApp दुनिया में कहीं भी परिवार और दोस्तों को संदेश, चित्र, वॉयस नोट्स भेजने और वीडियो कॉल करने के लिए एक मुफ्त ऐप है।", tip: "WhatsApp कॉल इंटरनेट का उपयोग करते हैं - कोई कॉल शुल्क लागू नहीं होता है!", image: "/assets/wapp/intro.png" },
      { id: 2, title: "The chat feature", content: "WhatsApp खोलें, किसी संपर्क के नाम पर टैप करें, नीचे दिए गए बॉक्स में अपना संदेश टाइप करें, और हरे रंग का सेंड बटन टैप करें।", tip: "दो नीले टिक का मतलब है कि आपका संदेश दूसरे व्यक्ति द्वारा पढ़ा गया था।", image: "/assets/wapp/chat.png" },
      { id: 3, title: "The voice call", content: "वॉयस मैसेज भेजने के लिए, माइक्रोफ़ोन आइकन को दबाए रखें। बोलने के बाद इसे छोड़ दें।", tip: "यह टाइप करने से ज्यादा आसान है!", image: "/assets/wapp/voice.png" },
      { id: 4, title: "Video call", content: "चैट के ऊपर कैमरा आइकन पर टैप करें और अपने प्रियजनों से आमने-सामने बात करें।", tip: "वीडियो कॉल में चेहरे पर अच्छी रोशनी होनी चाहिए।", image: "/assets/wapp/video.png" }
    ],
    quiz: [
      { q: "WhatsApp पर दो नीले टिक का क्या मतलब है?", options: ["संदेश भेजा गया", "संदेश डिलीवर हुआ", "संदेश पढ़ा गया", "संदेश हटा दिया गया"], correct: 2 },
      { q: "यदि टाइप करना कठिन हो, तो व्हाट्सएप पर संदेश भेजने का सबसे अच्छा तरीका क्या है?", options: ["एक पत्र भेजें", "वॉयस संदेश भेजें (माइक्रोफ़ोन दबाकर रखें)", "एक ऑडियो कॉल करें", "एक उंगली से धीरे-धीरे टाइप करें"], correct: 1 },
      { q: "चैट के भीतर वीडियो कॉल शुरू करने के लिए आप किस आइकन पर टैप करते हैं?", options: ["टेलीफोन आइकन", "कैमरा आइकन", "माइक्रोफ़ोन आइकन", "प्लस आइकन"], correct: 1 }
    ]
  },
  {
    id: "aadhaar",
    title: "आधार और डिजीलॉकर",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "दस्तावेजों तक डिजिटल रूप से पहुंचें",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "डिजीलॉकर का परिचय", content: "डिजीलॉकर भारत सरकार द्वारा एक सुरक्षित डिजिटल तिजोरी है जहाँ आप अपने फोन पर आधिकारिक दस्तावेजों को सुरक्षित रूप से सहेज सकते हैं।", tip: "डिजीलॉकर में दस्तावेज़ भौतिक प्रतियों की तरह ही कानूनी रूप से मान्य हैं।", image: "/assets/digi/intro.png" },
      { id: 2, title: "साइन अप करना", content: "अपने आधार से जुड़े मोबाइल नंबर का उपयोग करके साइन अप करें। अपनी पहचान सुरक्षित रूप से सत्यापित करने के लिए ओटीपी दर्ज करें।", tip: "यह सुनिश्चित करता है कि केवल आप अपने दस्तावेज तक पहुँच सकते हैं।", image: "/assets/digi/signup.png" },
      { id: 3, title: "आधार डाउनलोड करना", content: "साइन इन करने के बाद, आप अपना डिजिटल आधार कार्ड सीधे अपने फोन पर डाउनलोड कर सकते हैं।", tip: "आप भौतिक कार्ड ले जाने के बजाय इस डिजिटल आधार को दिखा सकते हैं।", image: "/assets/digi/aadhaar.png" },
      { id: 4, title: "दस्तावेज़ साझा करना", content: "आप आधिकारिक संगठनों द्वारा या केवाईसी के लिए अनुरोध किए जाने पर ऐप से सीधे अपने डिजिटल दस्तावेजों को सुरक्षित रूप से साझा कर सकते हैं।", tip: "यह फोटोकॉपी देने की तुलना में बहुत सुरक्षित है।", image: "/assets/digi/share.png" }
    ],
    quiz: [
      { q: "आधार नंबर में कितने अंक होते हैं?", options: ["8 अंक", "10 अंक", "12 अंक", "16 अंक"], correct: 2 },
      { q: "क्या डिजीलॉकर में दस्तावेज कानूनी रूप से मान्य हैं?", options: ["नहीं, केवल भौतिक प्रतियां मान्य हैं", "केवल कुछ उद्देश्यों के लिए", "हाँ, वे हर जगह कानूनी रूप से मान्य हैं", "केवल महाराष्ट्र में"], correct: 2 },
      { q: "डिजीलॉकर ऐप किसने बनाया?", options: ["Google", "Reliance Jio", "भारत सरकार", "भारतीय स्टेट बैंक"], correct: 2 }
    ]
  },
  {
    id: "fraud",
    title: "धोखाधड़ी से सुरक्षा",
    icon: "🛡️",
    color: "from-red-500 to-rose-600",
    description: "ऑनलाइन घोटालों से सुरक्षित रहें",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "सुनहरा नियम", content: "अपना ओटीपी, यूपीआई पिन, एटीएम पिन या बैंक पासवर्ड कभी भी किसी के साथ साझा न करें - यहां तक कि अपने बैंक, सरकार या दूरसंचार कंपनी से होने का दावा करने वाले व्यक्ति के साथ भी नहीं।", tip: "वैध संगठन कभी भी आपका पिन या ओटीपी नहीं मांगेंगे।" },
      { id: 2, title: "नकली केवाईसी कॉल", content: "स्कैमर आपके बैंक से होने का नाटक करते हुए कॉल करते हैं और कहते हैं 'आपका केवाईसी लंबित है, आपका खाता ब्लॉक कर दिया जाएगा'। वे आपका आधार नंबर और ओटीपी मांगते हैं। इन्हें कभी साझा न करें।", tip: "तुरंत कॉल काट दें। सत्यापित करने के लिए अपने बैंक के आधिकारिक नंबर पर कॉल करें।" },
      { id: 3, title: "यूपीआई भुगतान अनुरोध", content: "यूपीआई कलेक्ट रिक्वेस्ट आपको किसी को भुगतान करने के लिए कह रहा है। स्कैमर यह कहते हुए इन्हें भेजते हैं 'अपनी पुरस्कार राशि प्राप्त करने के लिए इसे स्वीकार करें'। स्वीकार करना और पिन दर्ज करना आपका पैसा ले जाता है।", tip: "आपको पैसे प्राप्त करने के लिए कभी भी अपना पिन दर्ज करने की आवश्यकता नहीं है।" },
      { id: 4, title: "लॉटरी और पुरस्कार घोटाले", content: "संदेश जो कहते हैं 'आपने केबीसी में 50 लाख रुपये जीते हैं' या 'आपका नंबर पुरस्कार के लिए चुना गया था' हमेशा नकली होते हैं। वे 'प्रोसेसिंग शुल्क' के लिए पूछेंगे। भुगतान न करें।", tip: "यदि आपने कभी लॉटरी में भाग नहीं लिया, तो आप इसे जीत नहीं सकते।" },
      { id: 5, title: "अगर घोटाला हो जाए तो क्या करें", content: "अपने खाते को फ्रीज करने के लिए तुरंत अपने बैंक की हेल्पलाइन पर कॉल करें। राष्ट्रीय हेल्पलाइन 1930 (साइबर अपराध) पर धोखाधड़ी की रिपोर्ट करें। cybercrime.gov.in पर शिकायत दर्ज करें।", tip: "तेजी से कार्य करें - अधिकांश बैंक 24 घंटे के भीतर रिपोर्ट किए गए लेनदेन को उलट सकते हैं।" }
    ],
    quiz: [
      { q: "कॉल करने वाला कहता है कि वह आपके बैंक से है और उसे केवाईसी अपडेट करने के लिए आपके ओटीपी की आवश्यकता है। तुम क्या करते हो?", options: ["ओटीपी जल्दी साझा करें", "केवल आधा ओटीपी साझा करें", "कॉल काट दें और सीधे अपने बैंक को कॉल करें", "ओटीपी साझा करें लेकिन अपना पिन नहीं"], correct: 2 },
      { q: "आपको 5000 रुपये भेजने का वादा करने वाले व्यक्ति से 1 रुपये का यूपीआई कलेक्ट अनुरोध प्राप्त होता है। यह क्या है?", options: ["एक वास्तविक प्रस्ताव", "एक सरकारी योजना", "एक घोटाला - स्वीकार न करें", "एक बैंक सत्यापन"], correct: 2 },
      { q: "राष्ट्रीय साइबर अपराध हेल्पलाइन नंबर क्या है?", options: ["100", "112", "1930", "1800"], correct: 2 }
    ]
  }
];

const mrModules = [
  {
    id: "upi",
    title: "UPI पेमेंट्स",
    icon: "💳",
    color: "from-purple-500 to-indigo-600",
    description: "सुरक्षितपणे पैसे पाठवा आणि मिळवा",
    totalSteps: 4,
    completed: true,
    steps: [
      { id: 1, title: "UPI चा परिचय", content: "UPI तुम्हाला फक्त फोन नंबर किंवा क्यूआर कोड वापरून कोणालाही त्वरित आणि विनामूल्य पैसे पाठवू देते.", tip: "UPI अत्यंत सुरक्षित आहे आणि दररोज 30 कोटींहून अधिक भारतीय वापरतात.", image: "/assets/upi/intro.png" },
      { id: 2, title: "बँक खाते लिंक करणे", content: "प्रथम, तुम्हाला registre तुमचे बँक खाते UPI ॲपशी सुरक्षितपणे लिंक करणे आवश्यक आहे. हे तुम्हाला एटीएम कार्डशिवाय थेट बँकेतून पैसे पाठवण्यास मदत करते.", tip: "हे तुम्हाला फक्त एकदाच करावे लागेल.", image: "/assets/upi/link.png" },
      { id: 3, title: "पैसे पाठवणे", content: "क्यूआर कोड स्कॅन करा, फोन नंबर टाका, रक्कम लिहा आणि पैसे पाठवण्यासाठी तुमचा सुरक्षित 4 किंवा 6 अंकी पिन टाका.", tip: "तुमचा पिन कधीही कोणाशीही शेअर करू नका.", image: "/assets/upi/send.png" },
      { id: 4, title: "पैसे प्राप्त करणे", content: "पैसे मिळवण्यासाठी फक्त तुमचा phone नंबर शेअर करा किंवा क्यूआर कोड दाखवा. पैसे थेट तुमच्या बँकेत सुरक्षितपणे जमा होतील.", tip: "पैसे मिळवण्यासाठी तुम्हाला कधीही पिन टाकण्याची गरज नाही.", image: "/assets/upi/receive.png" }
    ],
    quiz: [
      { q: 'UPI वर पैसे मिळवण्यासाठी तुम्हाला काय आवश्यक आहे?', options: ['UPI पिन', 'UPI ID किंवा फोन नंबर', 'बँक पासवर्ड', 'आधार क्रमांक'], correct: 1 },
      { q: 'जर कोणी तुम्हाला पैसे पाठवण्यासाठी तुमचा UPI पिन मागितला तर तुम्ही काय कराल?', options: ['लगेच शेअर करा', 'फक्त २ अंक सांगा', 'नकार द्या - तो एक स्कॅम आहे', 'बँकेला फोन करा'], correct: 2 },
      { q: 'यापैकी कोणते ॲप भारत सरकारने बनवलेले आहे?', options: ['PhonePe', 'GPay', 'BHIM', 'Paytm'], correct: 2 }
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp माहिती",
    icon: "💬",
    color: "from-green-500 to-teal-600",
    description: "कुटुंबाशी चॅट, कॉल आणि व्हिडिओ",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: 'Intro to Wapp', content: 'WhatsApp हे संदेश आणि कॉल पाठवण्यासाठी मोफत ॲप आहे. खाली दिलेल्या मेसेज आयकॉनवर टॅप करून तुम्ही कोणाशीही बोलू शकता.', tip: 'WhatsApp कॉल्सवर शुल्क लागत नाही!', image: "/assets/wapp/intro.png" },
      { id: 2, title: 'The chat feature', content: 'WhatsApp उघडा, नावावर टॅप करा आणि मेसेज टाईप करून सेंड बटणावर टॅप करा.', tip: 'दोन निळ्या टिकचा अर्थ मेसेज वाचला आहे.', image: "/assets/wapp/chat.png" },
      { id: 3, title: 'The voice call', content: 'व्हॉइस मेसेज पाठवण्यासाठी, मायक्रोफोन आयकॉन दाबा आणि बोला. बोलून झाल्यावर तो सोडून द्या.', tip: 'टाईप करण्यापेक्षा हे सोपे आहे!', image: "/assets/wapp/voice.png" },
      { id: 4, title: 'Video call', content: 'चॅटमध्ये वरच्या बाजूला असलेल्या कॅमेरा आयकॉनवर टॅप करा आणि व्हिडिओ कॉल करा.', tip: 'व्हिडिओ कॉल करताना चेहऱ्यावर प्रकाश असावा.', image: "/assets/wapp/video.png" }
    ],
    quiz: [
      { q: 'दोन निळ्या टिक्सचा अर्थ काय?', options: ['पाठवला', 'पोहोचला', 'वाचला गेला', 'डिलीट झाला'], correct: 2 },
      { q: "टाईप करणे कठीण असल्यास, व्हॉट्सॲपवर संदेश पाठवण्याचा सर्वोत्तम मार्ग कोणता?", options: ["पत्र पाठवणे", "व्हॉईस मेसेज पाठवणे (मायक्रोफोन दाबून धरून)", "ऑडिओ कॉल करणे", "एका बोटाने हळूहळू टाईप करणे"], correct: 1 },
      { q: "चॅटमध्ये व्हिडिओ कॉल सुरू करण्यासाठी तुम्ही कोणत्या चिन्हावर टॅप कराल?", options: ["टेलीफोन चिन्ह", "कॅमेरा चिन्ह", "मायक्रोफोन चिन्ह", "प्लस चिन्ह"], correct: 1 }
    ]
  },
  {
    id: "aadhaar",
    title: "Aadhaar आणि DigiLocker",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "कागदपत्रांचा डिजिटल वापर करा",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "DigiLocker चा परिचय", content: "डिजीलॉकर हे भारत सरकारचे एक सुरक्षित डिजिटल व्हॉल्ट आहे जिथे तुम्ही तुमचे अधिकृत दस्तऐवज सुरक्षितपणे सेव्ह करू शकता.", tip: "येथील कागदपत्रे कायदेशीररित्या वैध आहेत.", image: "/assets/digi/intro.png" },
      { id: 2, title: "साइन अप करणे", content: "आधार लिंक केलेल्या मोबाइल नंबरने साइन अप करा आणि ओळख पडताळण्यासाठी OTP टाका.", tip: "हे फक्त तुम्हालाच कागदपत्रे पाहण्यास अनुमती देते.", image: "/assets/digi/signup.png" },
      { id: 3, title: "आधार डाउनलोड करणे", content: "साइन इन केल्यानंतर, तुम्ही तुमचे डिजिटल आधार कार्ड थेट फोनवर डाउनलोड करू शकता.", tip: "मूळ आधार कार्ड सोबत ठेवण्याची गरज नाही.", image: "/assets/digi/aadhaar.png" },
      { id: 4, title: "कागदपत्रे शेअर करणे", content: "केवायसीसाठी तुम्ही तुमचे कागदपत्रे थेट ॲपवरून सुरक्षितपणे शेअर करू शकता.", tip: "झेरॉक्स देण्यापेक्षा हे खूप सुरक्षित आहे.", image: "/assets/digi/share.png" }
    ],
    quiz: [
      { q: "आधार क्रमांकामध्ये किती अंक असतात?", options: ["८ अंक", "१० अंक", "१२ अंक", "१६ अंक"], correct: 2 },
      { q: "डिजीलॉकरमधील कागदपत्रे कायदेशीररित्या वैध आहेत का?", options: ["नाही, फक्त मूळ कागदपत्रे वैध असतात", "फक्त काही कामांसाठी वैध असतात", "होय, ती सर्वत्र कायदेशीररित्या वैध आहेत", "फक्त महाराष्ट्रात वैध आहेत"], correct: 2 },
      { q: "डिजीलॉकर ॲप कोणी तयार केले आहे?", options: ["गुगल (Google)", "रिलायन्स जिओ (Reliance Jio)", "भारत सरकार (Government of India)", "स्टेट बँक ऑफ इंडिया (SBI)"], correct: 2 }
    ]
  },
  {
    id: "fraud",
    title: "फसवणुकीपासून संरक्षण",
    icon: "🛡️",
    color: "from-red-500 to-rose-600",
    description: "ऑनलाइन स्कॅमपासून सुरक्षित राहा",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "सुवर्ण नियम", content: "तुमचा OTP, UPI पिन, ATM पिन किंवा बँक पासवर्ड कधीही कोणाशीही शेअर करू नका - अगदी बँक अधिकारी, सरकारी प्रतिनिधी किंवा टेलिकॉम कंपनीचे कर्मचारी असल्याचे सांगणाऱ्या व्यक्तीसोबतही नाही.", tip: "कोणतीही खरी बँक किंवा संस्था तुमचा पिन किंवा OTP कधीही मागणार नाही." },
      { id: 2, title: "खोटे केवायसी कॉल", content: "तुमचा केवायसी प्रलंबित आहे आणि खाते ब्लॉक केले जाईल असे सांगून फसवणूक करणारे कॉल करतात. ते तुमचा आधार क्रमांक आणि OTP मागतात. हे कधीही शेअर करू नका.", tip: "कॉल ताबडतोब कट करा. खात्री करण्यासाठी तुमच्या बँकेच्या अधिकृत क्रमांकावर कॉल करा." },
      { id: 3, title: "UPI पेमेंट विनंती", content: "UPI COLLECT REQUEST म्हणजे तुमच्याकडे पैशांची मागणी करणे. 'बक्षीस मिळवण्यासाठी विनंती स्वीकार करा' असे खोटे सांगून फसवणूक करणारे ही विनंती पाठवतात. पिन टाकल्यास तुमचे पैसे त्यांच्या खात्यात जातील.", tip: "पैसे मिळवण्यासाठी कधीही पिन टाकण्याची गरज नसते. हे नेहमी लक्षात ठेवा." },
      { id: 4, title: "लॉटरी आणि बक्षीस फसवणूक", content: "'तुम्ही ५० लाख रुपयांची लॉटरी जिंकली आहे' अशा प्रकारचे मेसेज नेहमी खोटे असतात. ते 'प्रोसेसिंग फी' म्हणून आधी पैसे मागतात, त्यांना कधीही पैसे देऊ नका.", tip: "जर तुम्ही कोणत्याही लॉटरीत भाग घेतला नसेल, तर तुम्ही ती जिंकू शकत नाही." },
      { id: 5, title: "फसवणूक झाल्यास काय करावे?", content: "पैसे चोरीला गेल्यास त्वरित तुमच्या बँकेला कॉल करून खाते फ्रीज करा. राष्ट्रीय सायबर क्राईम हेल्पलाइन १९३० (1930) वर संपर्क साधा किंवा cybercrime.gov.in वर तक्रार नोंदवा.", tip: "त्वरीत कृती करा - २४ तासांच्या आत तक्रार केल्यास बँक व्यवहार रद्द करू शकते." }
    ],
    quiz: [
      { q: "एक कॉलर बँकेतून बोलत असल्याचा दावा करतो आणि केवायसीसाठी ओटीपी मागतो. तुम्ही काय कराल?", options: ["लगेच ओटीपी शेअर करेन", "फक्त अर्धा ओटीपी सांगेन", "कॉल कट करून थेट बँकेशी संपर्क साधेन", "ओटीपी सांगेन पण पिन नाही"], correct: 2 },
      { q: "५००0 रुपये पाठवण्याचे आश्वासन देऊन एका व्यक्तीकडून १ रुपयाची UPI कलेक्ट रिक्वेस्ट आली आहे. हे काय आहे?", options: ["एक खरी ऑफर", "शासकीय योजना", "फसवणूक - स्वीकार करू नका", "बँक पडताळणी"], correct: 2 },
      { q: "राष्ट्रीय सायबर क्राईम हेल्पलाइन क्रमांक कोणता आहे?", options: ["१०० (100)", "११२ (112)", "१९३० (1930)", "१८०० (1800)"], correct: 2 }
    ]
  }
];

const guModules = [
  {
    id: "upi",
    title: "UPI ચુકવણી",
    icon: "💳",
    color: "from-purple-500 to-indigo-600",
    description: "સુરક્ષિત રીતે પૈસા મોકલો અને મેળવો",
    totalSteps: 4,
    completed: true,
    steps: [
      { id: 1, title: "UPI નો પરિચય", content: "UPI (યુનિફાઇડ પેમેન્ટ્સ ઇન્ટરફેસ) તમને ફક્ત ફોન નંબર અથવા QR કોડનો ઉપયોગ કરીને કોઈપણ વ્યક્તિને તરત જ અને મફતમાં પૈસા મોકલવા દે છે.", tip: "UPI અત્યંત સુરક્ષિત છે અને રોજ ૩૦ કરોડથી વધુ ભારતીયો દ્વારા ઉપયોગમાં લેવાય છે.", image: "/assets/upi/intro.png" },
      { id: 2, title: "બેંક ખાતું લિંક કરવું", content: "સૌ પ્રથમ, તમારે તમારા બેંક ખાતાને તમારી UPI એપ્લિકેશન સાથે સુરક્ષિત રીતે લિંક કરવું પડશે. આનાથી પૈસા સીધા તમારી બેંકમાંથી મોકલી શકાય છે.", tip: "તમારે સેટઅપ દરમિયાન ફક્ત એક જ વાર આ કરવું પડશે.", image: "/assets/upi/link.png" },
      { id: 3, title: "પૈસા મોકલવા", content: "'Pay' પર ટેપ કરો, QR કોડ સ્કેન કરો અથવા ફોન નંબર દાખલ કરો, રકમ લખો અને પૈસા મોકલવા માટે તમારો સુરક્ષિત 4 કે 6 અંકનો PIN દાખલ કરો.", tip: "તમારો PIN ક્યારેય કોઈની સાથે શેર કરશો નહીં.", image: "/assets/upi/send.png" },
      { id: 4, title: "પૈસા મેળવવા", content: "પૈસા મેળવવા માટે, તમારે ફક્ત તમારો ફોન નંબર શેર કરવો પડશે અથવા QR કોડ બતાવવો પડશે. પૈસા સુરક્ષિત રીતે સીધા તમારી બેંકમાં જમા થઈ જશે.", tip: "પૈસા મેળવવા માટે તમારે ક્યારેય PIN દાખલ કરવાની જરૂર નથી.", image: "/assets/upi/receive.png" }
    ],
    quiz: [
      { q: "UPI પર પૈસા મેળવવા માટે તમારે શું જોઈએ?", options: ["તમારો UPI PIN", "તમારો UPI ID અથવા ફોન નંબર", "તમારો બેંક પાસવર્ડ", "તમારો આધાર નંબર"], correct: 1 },
      { q: "જો કોઈ તમને પૈસા મોકલવા માટે તમારો UPI PIN માંગે, તો તમારે શું કરવું જોઈએ?", options: ["તરત જ શેર કરો", "માત્ર પ્રથમ ૨ અંક શેર કરો", "ના પાડો — આ એક કૌભાંડ છે", "પહેલા તમારી બેંકને ફોન કરો"], correct: 2 },
      { q: "આમાંથી કઈ સરકારી UPI એપ છે?", options: ["PhonePe", "GPay", "BHIM", "Paytm"], correct: 2 }
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp મૂળભૂત બાબતો",
    icon: "💬",
    color: "from-green-500 to-teal-600",
    description: "પરિવાર સાથે ચેટ, કોલ અને વિડિયો",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "WhatsApp નો પરિચય", content: "WhatsApp ખોલો અને નીચે આપેલા નાના 'મેસેજ' બબલ આઇકોન પર ટેપ કરો. તમે જે વ્યક્તિ સાથે વાત કરવા માંગો છો તેનું નામ પસંદ કરો.", tip: "તમે મૂળાક્ષરોના ક્રમમાં નામોની યાદીમાંથી તમારા પરિવારના સભ્યોને શોધી શકો છો.", image: "/assets/wapp/intro.png" },
      { id: 2, title: "ચેટ સુવિધા", content: "'Type a message' લખેલું છે ત્યાં ટેપ કરો. એક કીબોર્ડ દેખાશે. તમારો મેસેજ ટાઇપ કરો અને મોકલવા માટે સફેદ તીરવાળા લીલા ગોળ બટન પર ટેપ કરો.", tip: "જો ભૂલ થાય, તો અક્ષરો કાઢી નાખવા માટે બેકસ્પેસ કીનો ઉપયોગ કરી શકો છો.", image: "/assets/wapp/chat.png" },
      { id: 3, title: "વોઇસ કોલ", content: "જો ટાઇપ કરવું અઘરું હોય, તો લીલા 'માઇક્રોફોન' આઇકોનને દબાવી રાખો અને બોલો. બોલાઈ જાય એટલે વોઇસ મેસેજ મોકલવા માટે તેને છોડી દો.", tip: "લાંબી વાતો મોકલવા અથવા જન્મદિવસની શુભેચ્છા પાઠવવા વોઇસ મેસેજ ઉત્તમ છે!", image: "/assets/wapp/voice.png" },
      { id: 4, title: "વિડિયો કોલ", content: "વાત કરતી વખતે તમારા પ્રિયજનોને રૂબરૂ જોવા માટે ચેટની ઉપર જમણી બાજુએ આપેલા 'કેમેરા' આઇકોન પર ટેપ કરો!", tip: "રૂમમાં સારો પ્રકાશ હોય તેની ખાતરી કરો જેથી તેઓ તમારો હસતો ચહેરો સ્પષ્ટ જોઈ શકે.", image: "/assets/wapp/video.png" }
    ],
    quiz: [
      { q: "WhatsApp પર બે વાદળી ટિક (blue ticks) નો અર્થ શું થાય છે?", options: ["મેસેજ મોકલાઈ ગયો", "મેસેજ પહોંચી ગયો", "મેસેજ વાંચી લેવાયો", "મેસેજ ડીલીટ થઈ ગયો"], correct: 2 },
      { q: "જો ટાઈપ કરવું અઘરું હોય, તો વોટ્સએપ પર મેસેજ મોકલવાનો શ્રેષ્ઠ રસ્તો કયો છે?", options: ["પત્ર મોકલો", "વોઇસ મેસેજ મોકલો (માઇક્રોફોન દબાવી રાખીને)", "ઓડિયો કોલ કરો", "એક આંગળીથી ધીમેથી ટાઈપ કરો"], correct: 1 },
      { q: "ચેટની અંદર વિડિયો કોલ શરૂ કરવા માટે તમે કયા આઇકોન પર ટેપ કરો છો?", options: ["ટેલિફોન આઇકોન", "કેમેરા આઇકોન", "માઇક્રોફોન આઇકોન", "પ્લસ આઇકોન"], correct: 1 }
    ]
  },
  {
    id: "aadhaar",
    title: "આધાર અને DigiLocker",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "દસ્તાવેજો ડિજિટલ રીતે મેળવો",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "DigiLocker નો પરિચય", content: "DigiLocker એ ભારત સરકાર દ્વારા પૂરી પાડવામાં આવેલ એક સુરક્ષિત ડિજિટલ તિજોરી છે જ્યાં તમે તમારા સત્તાવાર દસ્તાવેજો તમારા ફોનમાં સુરક્ષિત રાખી શકો છો.", tip: "DigiLocker માં રહેલા દસ્તાવેજો અસલ દસ્તાવેજો જેટલા જ કાનૂની રીતે માન્ય છે.", image: "/assets/digi/intro.png" },
      { id: 2, title: "સાઇન અપ કરવું", content: "તમારા આધાર સાથે લિંક કરેલા મોબાઇલ નંબરનો ઉપયોગ કરીને સાઇન અપ કરો. તમારી ઓળખ સુરક્ષિત રીતે ચકાસવા માટે OTP દાખલ કરો.", tip: "આ સુનિશ્ચિત કરે છે કે ફક્ત તમે જ તમારા દસ્તાવેજો મેળવી શકો છો.", image: "/assets/digi/signup.png" },
      { id: 3, title: "આધાર ડાઉનલોડ કરવું", content: "એકવાર સાઇન ઇન થયા પછી, તમે તમારું ડિજિટલ આધાર કાર્ડ સીધા તમારા ફોનમાં ડાઉનલોડ કરી શકો છો. તેમાં સરળ ચકાસણી માટે QR કોડ હોય છે.", tip: "અસલ કાર્ડ સાથે રાખવાને બદલે તમે આ ડિજિટલ આધાર બતાવી શકો છો.", image: "/assets/digi/aadhaar.png" },
      { id: 4, title: "દસ્તાવેજો શેર કરવા", content: "સત્તાવાર સંસ્થાઓ દ્વારા અથવા KYC માટે વિનંતી કરવામાં આવે ત્યારે તમે તમારા ડિજિટલ દસ્તાવેજો સીધા જ એપમાંથી સુરક્ષિત રીતે શેર કરી શકો છો.", tip: "ઝેરોક્ષ નકલો આપવા કરતાં આ ઘણું વધારે સુરક્ષિત છે.", image: "/assets/digi/share.png" }
    ],
    quiz: [
      { q: "આધાર નંબરમાં કેટલા અંકો હોય છે?", options: ["૮ અંક", "૧૦ અંક", "૧૨ અંક", "૧૬ અંક"], correct: 2 },
      { q: "શું DigiLocker ના દસ્તાવેજો કાયદેસર રીતે માન્ય છે?", options: ["ના, ફક્ત અસલ નકલો જ માન્ય છે", "માત્ર અમુક હેતુઓ માટે", "હા, તેઓ બધી જગ્યાએ કાયદેસર રીતે માન્ય છે", "માત્ર મહારાષ્ટ્રમાં"], correct: 2 },
      { q: "DigiLocker એપ કોણે બનાવી છે?", options: ["Google", "Reliance Jio", "ભારત સરકાર", "State Bank of India"], correct: 2 }
    ]
  },
  {
    id: "fraud",
    title: "છેતરપિંડીથી રક્ષણ",
    icon: "🛡️",
    color: "from-red-500 to-rose-600",
    description: "ઓનલાઇન કૌભાંડોથી સુરક્ષિત રહો",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "સુવર્ણ નિયમ", content: "તમારો OTP, UPI PIN, ATM PIN અથવા બેંક પાસવર્ડ ક્યારેય કોઈની સાથે શેર કરશો નહીં — ભલે તે વ્યક્તિ તમારી બેંક, સરકાર કે ટેલિકોમ કંપનીમાંથી હોવાનો દાવો કરે.", tip: "કોઈપણ કાયદેસર સંસ્થા ક્યારેય તમારો PIN અથવા OTP માંગશે નહીં." },
      { id: 2, title: "નકલી KYC કોલ", content: "કૌભાંડીઓ તમારી બેંકમાંથી ફોન કરતા હોવાનો ડોળ કરે છે અને કહે છે કે 'તમારું KYC બાકી છે, તમારું ખાતું બ્લોક થઈ જશે'. તેઓ તમારો આધાર નંબર અને OTP માંગે છે. ક્યારેય શેર કરશો નહીં.", tip: "તરત જ ફોન કાપી નાખો. ખાતરી કરવા માટે તમારી બેંકના સત્તાવાર નંબર પર કૉલ કરો." },
      { id: 3, title: "UPI ચુકવણીની વિનંતીઓ", content: "UPI COLLECT REQUEST એટલે તમારી પાસે પૈસા માંગવામાં આવી રહ્યા છે. કૌભાંડીઓ 'તમારું ઇનામ મેળવવા માટે આ સ્વીકારો' કહીને આ મોકલે છે. સ્વીકારીને PIN નાખશો તો તમારા પૈસા જતા રહેશે.", tip: "પૈસા મેળવવા માટે તમારે ક્યારેય PIN દાખલ કરવાની જરૂર નથી. ક્યારેય નહીં." },
      { id: 4, title: "લોટરી અને ઇનામ કૌભાંડ", content: "'તમે KBC માં રૂ. ૫૦ લાખ જીત્યા છો' અથવા 'ઇનામ માટે તમારો નંબર પસંદ કરાયો છે' તેવા મેસેજ હંમેશા નકલી હોય છે. તેઓ 'પ્રોસેસિંગ ફી' માંગશે. ચૂકવશો નહીં.", tip: "જો તમે લોટરીની ટિકિટ ખરીદી જ નથી, તો તમે જીતી શકો નહીં." },
      { id: 5, title: "જો છેતરપિંડી થાય તો શું કરવું", content: "તમારું ખાતું ફ્રીઝ કરવા માટે તરત જ તમારી બેંકની હેલ્પલાઇન પર ફોન કરો. રાષ્ટ્રીય હેલ્પલાઇન નંબર ૧૯૩૦ (1930) (સાયબર ક્રાઇમ) પર છેતરપિંડીની જાણ કરો. cybercrime.gov.in પર ફરિયાદ નોંધાવો.", tip: "ઝડપી કાર્ય કરો — મોટાભાગની બેંકો ૨૪ કલાકની અંદર જાણ કરાયેલા વ્યવહારોને રોકી કે પાછા લાવી શકે છે." }
    ],
    quiz: [
      { q: "એક કોલર કહે છે કે તે તમારી બેંકમાંથી છે અને KYC અપડેટ કરવા માટે તમારો OTP જોઈએ છે. તમે શું કરશો?", options: ["ઝડપથી OTP શેર કરીશ", "માત્ર અડધો OTP શેર કરીશ", "ફોન કાપીને બેંકનો સીધો સંપર્ક કરીશ", "OTP આપીશ પણ PIN નહીં"], correct: 2 },
      { q: "તમને ૫૦૦૦ રૂપિયા મોકલવાનું વચન આપીને કોઈ વ્યક્તિ તરફથી રૂ. ૧ ની UPI કલેક્ટ રિકવેસ્ટ આવે છે. આ શું છે?", options: ["એક સાચી ઓફર", "સરકારી યોજના", "એક કૌભાંડ — સ્વીકારશો નહીં", "બેંક વેરિફિકેશન"], correct: 2 },
      { q: "રાષ્ટ્રીય સાયબર ક્રાઇમ હેલ્પલાઇન નંબર કયો છે?", options: ["૧૦૦", "૧૧૨", "૧૯૩૦", "૧૮૦૦"], correct: 2 }
    ]
  }
];

const taModules = [
  {
    id: "upi",
    title: "UPI பேமெண்ட்స్",
    icon: "💳",
    color: "from-purple-500 to-indigo-600",
    description: "பணத்தை பாதுகாப்பாக அனுப்பவும் பெறவும்",
    totalSteps: 4,
    completed: true,
    steps: [
      { id: 1, title: "UPI அறிமுகம்", content: "UPI (யுனிஃபைட் பேமெண்ட்ஸ் இன்டர்ஃபேஸ்) என்பது ஒரு தொலைபேசி எண் அல்லது QR குறியீட்டைப் பயன்படுத்தி எவருக்கும் உடனடியாகவும் இலவசமாகவும் பணத்தை அனுப்ப உதவுகிறது.", tip: "UPI மிகவும் பாதுகாப்பானது மற்றும் தினசரி 30 கோடிக்கும் அதிகமான இந்தியர்களால் பயன்படுத்தப்படுகிறது.", image: "/assets/upi/intro.png" },
      { id: 2, title: "வங்கி கணக்கை இணைத்தல்", content: "முதலில், உங்கள் வங்கி கணக்கை உங்கள் UPI செயலியுடன் பாதுகாப்பாக இணைக்க வேண்டும். இது ஏடிஎம் கார்டு இல்லாமலேயே உங்கள் வங்கியிலிருந்து நேரடியாக பணம் அனுப்ப உதவுகிறது.", tip: "அமைப்பின் போது இதை ஒரு முறை மட்டுமே செய்ய வேண்டும்.", image: "/assets/upi/link.png" },
      { id: 3, title: "பணம் அனுப்புதல்", content: "'Pay' என்பதைத் தட்டி, கடையில் உள்ள QR குறியீட்டை ஸ்கேன் செய்யவும் அல்லது தொலைபேசி எண்னை உள்ளிட்டு, தொகையைத் தட்டச்சு செய்து, உங்கள் 4 அல்லது 6 இலக்க PIN ஐ உள்ளிட்டு பணத்தை அனுப்பவும்.", tip: "உங்கள் PIN ஐ யாருடனும் பகிர்ந்து கொள்ள வேண்டாம்.", image: "/assets/upi/send.png" },
      { id: 4, title: "பணம் பெறுதல்", content: "பணத்தைப் பெற, உங்கள் தொலைபேசி எண்ணைப் பகிர வேண்டும் அல்லது உங்கள் QR குறியீட்டைக் காட்ட வேண்டும். பணம் உங்கள் வங்கியில் நேரடியாக டெபாசிட் செய்யப்படும்.", tip: "பணத்தைப் பெற நீங்கள் ஒருபோதும் PIN ஐ உள்ளிட வேண்டியதில்லை.", image: "/assets/upi/receive.png" }
    ],
    quiz: [
      { q: "UPI இல் பணத்தைப் பெற உங்களுக்கு என்ன தேவை?", options: ["உங்கள் UPI PIN", "உங்கள் UPI ID அல்லது தொலைபேசி எண்", "உங்கள் வங்கி கடவுச்சொல்", "உங்கள் ஆதார் எண்"], correct: 1 },
      { q: "உங்களுக்கு பணம் அனுப்ப யாராவது உங்கள் UPI PIN ஐக் கேட்டால், நீங்கள் என்ன செய்ய வேண்டும்?", options: ["உடனே பகிரவும்", "முதல் 2 இலக்கங்களை மட்டும் பகிரவும்", "மறுக்கவும் — இது ஒரு மோசடி", "முதலில் உங்கள் வங்கியை அழைக்கவும்"], correct: 2 },
      { q: "இவற்றில் எது அரசாங்கத்தால் உருவாக்கப்பட்ட UPI செயலி?", options: ["PhonePe", "GPay", "BHIM", "Paytm"], correct: 2 }
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp அடிப்படைகள்",
    icon: "💬",
    color: "from-green-500 to-teal-600",
    description: "குடும்பத்தினருடன் அரட்டை, அழைப்பு மற்றும் வீடியோ",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "WhatsApp அறிமுகம்", content: "WhatsApp ஐத் திறந்து, கீழே உள்ள சிறிய 'Message' குமிழி ஐகானைத் தட்டவும். நீங்கள் பேச விரும்பும் நபரின் பெயரைத் தேர்ந்தெடுக்கவும்.", tip: "அகரவரிசைப் பெயர்களின் பட்டியலை உருட்டுவதன் மூலம் உங்கள் குடும்ப உறுப்பினர்களைக் கண்டறியலாம்.", image: "/assets/wapp/intro.png" },
      { id: 2, title: "அரட்டை அம்சம்", content: "'Type a message' என்று இருக்கும் இடத்தில் தட்டவும். ஒரு விசைப்பலகை தோன்றும். உங்கள் செய்தியைத் தட்டச்சு செய்து, அனுப்ப பச்சை வட்டத்தில் உள்ள வெள்ளை அம்புக்குறி பொத்தானைத் தட்டவும்.", tip: "ஏதேனும் தவறு நேர்ந்தால், எழுத்துக்களை அழிக்க பேக்ஸ்பேஸ் விசையைப் பயன்படுத்தலாம்.", image: "/assets/wapp/chat.png" },
      { id: 3, title: "குரல் அழைப்பு", content: "தட்டச்சு செய்வது கடினமாக இருந்தால், பச்சை நிற 'Microphone' ஐகானை அழுத்திப் பிடித்துப் பேசவும். பேசி முடித்ததும் குரல் செய்தியை அனுப்ப அதை விடுவிக்கவும்.", tip: "பிறந்தநாள் வாழ்த்துக்கள் தெரிவிக்க அல்லது நீண்ட தகவல்களை அனுப்ப குரல் செய்திகள் சிறந்தவை!", image: "/assets/wapp/voice.png" },
      { id: 4, title: "வீடியோ அழைப்பு", content: "பேசும்போது உங்கள் அன்புக்குரியவர்களை நேருக்கு நேர் பார்க்க அரட்டையின் மேல் வலதுபுறத்தில் உள்ள 'கேமரா' ஐகானைத் தட்டவும்!", tip: "அவர்கள் உங்கள் புன்னகையைத் தெளிவாகப் பார்க்க ஏதுவாக அறை வெளிச்சமாக இருப்பதை உறுதிசெய்க.", image: "/assets/wapp/video.png" }
    ],
    quiz: [
      { q: "WhatsApp இல் இரண்டு நீல நிற டிக்குகளின் (blue ticks) அர்த்தம் என்ன?", options: ["செய்தி அனுப்பப்பட்டது", "செய்தி வழங்கப்பட்டது", "செய்தி படிக்கப்பட்டது", "செய்தி நீக்கப்பட்டது"], correct: 2 },
      { q: "தட்டச்சு செய்வது கடினமாக இருந்தால், வாட்ஸ்அப்பில் செய்தி அனுப்ப சிறந்த வழி எது?", options: ["கடிதம் அனுப்புதல்", "குரல் செய்தி அனுப்புதல் (மைக்ரோஃபோனை அழுத்திப் பிடித்து)", "ஆடியோ அழைப்பு செய்தல்", "ஒரு விரலால் மெதுவாக தட்டச்சு செய்தல்"], correct: 1 },
      { q: "அரட்டைக்குள் வீடியோ அழைப்பைத் தொடங்க எந்த ஐகானைத் தட்டுவீர்கள்?", options: ["தொலைபேசி ஐகான்", "கேமரா ஐகான்", "மைக்ரோஃபோன் ஐகான்", "பிளஸ் ஐகான்"], correct: 1 }
    ]
  },
  {
    id: "aadhaar",
    title: "ஆதார் & DigiLocker",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "உங்கள் ஆவணங்களை டிஜிட்டல் முறையில் பெறுங்கள்",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "DigiLocker அறிமுகம்", content: "DigiLocker என்பது இந்திய அரசாங்கத்தின் பாதுகாப்பான டிஜிட்டல் பெட்டகமாகும், இதில் நீங்கள் அதிகாரப்பூர்வ ஆவணங்களை உங்கள் தொலைபேசியில் பாதுகாப்பாக சேமிக்க முடியும்.", tip: "DigiLocker இல் உள்ள ஆவணங்கள் அசல் நகல்களைப் போலவே சட்டப்பூர்வமாக செல்லுபடியாகும்.", image: "/assets/digi/intro.png" },
      { id: 2, title: "பதிவு செய்தல்", content: "உங்கள் ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்ணைப் பயன்படுத்தி பதிவு செய்யவும். உங்கள் அடையாளத்தைப் பாதுகாப்பாக சரிபார்க்க OTP ஐ உள்ளிடவும்.", tip: "இது நீங்கள் மட்டுமே உங்கள் ஆவணங்களை அணுக முடியும் என்பதை உறுதி செய்கிறது.", image: "/assets/digi/signup.png" },
      { id: 3, title: "ஆதாரை பதிவிறக்குதல்", content: "உள்நுழைந்ததும், உங்கள் டிஜிட்டல் ஆதார் அட்டையை உங்கள் தொலைபேசியில் நேரடியாக பதிவிறக்கம் செய்யலாம். இதில் சரிபார்ப்பிற்கான QR குறியீடு உள்ளது.", tip: "அசல் கார்டை எடுத்துச் செல்வதற்குப் பதிலாக இந்த டிஜிட்டல் ஆதாரைக் காட்டலாம்.", image: "/assets/digi/aadhaar.png" },
      { id: 4, title: "ஆவணங்களைப் பகிர்தல்", content: "அதிகாரப்பூர்வ அமைப்புகள் கேட்கும் போது அல்லது KYC சரிபார்ப்பிற்கு உங்கள் டிஜிட்டல் ஆவணங்களை நேரடியாக செயலியிலிருந்து பாதுகாப்பாகப் பகிரலாம்.", tip: "புகைப்பட நகல்களை (photocopy) கொடுப்பதை விட இது மிகவும் பாதுகாப்பானது.", image: "/assets/digi/share.png" }
    ],
    quiz: [
      { q: "ஆதார் எண் எத்தனை இலக்கங்களைக் கொண்டது?", options: ["8 இலக்கங்கள்", "10 இலக்கங்கள்", "12 இலக்கங்கள்", "16 இலக்கங்கள்"], correct: 2 },
      { q: "DigiLocker இல் உள்ள ஆவணங்கள் சட்டப்பூர்வமாக செல்லுபடியாகுமா?", options: ["இல்லை, அசல் நகல்கள் மட்டுமே செல்லும்", "சில தேவைகளுக்கு மட்டுமே", "ஆம், அவை எல்லா இடங்களிலும் சட்டப்பூர்வமாக செல்லுபடியாகும்", "மகாராஷ்டிராவில் மட்டும்"], correct: 2 },
      { q: "DigiLocker செயலியை உருவாக்கியது யார்?", options: ["Google", "Reliance Jio", "இந்திய அரசாங்கம்", "State Bank of India"], correct: 2 }
    ]
  },
  {
    id: "fraud",
    title: "மோசடி பாதுகாப்பு",
    icon: "🛡️",
    color: "from-red-500 to-rose-600",
    description: "ஆன்லைன் மோசடிகளில் இருந்து பாதுகாப்பாக இருங்கள்",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "பொன்னான விதி", content: "உங்கள் OTP, UPI PIN, ATM PIN அல்லது வங்கி கடவுச்சொல்லை யாруடனும் பகிர்ந்து கொள்ளாதீர்கள் — உங்கள் வங்கி, அரசாங்கம் அல்லது தொலைத்தொடர்பு நிறுவனத்தைச் சேர்ந்தவர் என்று கூறினாலும் சரி.", tip: "முறையான அமைப்புகள் உங்கள் PIN அல்லது OTP ஐ ஒருபோதும் கேட்காது." },
      { id: 2, title: "போலி KYC அழைப்புகள்", content: "மோசடி செய்பவர்கள் உங்கள் வங்கியிலிருந்து அழைப்பது போல் நடித்து 'உங்கள் KYC நிலுவையில் உள்ளது, கணக்கு முடக்கப்படும்' என்பார்கள். அவர்கள் ஆதார் மற்றும் OTP கேட்பார்கள். ஒருபோதும் பகிர வேண்டாம்.", tip: "உடனே அழைப்பைத் துண்டிக்கவும். சரிபார்க்க உங்கள் வங்கியின் அதிகாரப்பூர்வ எண்ணை அழைக்கவும்." },
      { id: 3, title: "UPI பணக் கோரிக்கைகள்", content: "UPI COLLECT REQUEST என்பது உங்களுக்கு பணம் செலுத்தக் கோருவதாகும். 'பரிசுத் தொகையைப் பெற இதை ஏற்கவும்' என்று கூறி மோசடி செய்பவர்கள் இதை அனுப்புகிறார்கள். இதை ஏற்று PIN ஐ உள்ளிட்டால் உங்கள் பணம் போய்விடும்.", tip: "பணத்தைப் பெற நீங்கள் ஒருபோதும் PIN ஐ உள்ளிட வேண்டியதில்லை." },
      { id: 4, title: "லாட்டரி மற்றும் பரிசு மோசடிகள்", content: "'நீங்கள் KBC இல் ரூ. 50 லட்சம் வென்றுள்ளீர்கள்' அல்லது 'பரிசுக்காக உங்கள் எண் தேர்வு செய்யப்பட்டுள்ளது' என்ற செய்திகள் எப்போதும் போலியானவை. அவர்கள் 'செயலாக்கக் கட்டணம்' (processing fee) கேட்பார்கள். செலுத்த வேண்டாம்.", tip: "நீங்கள் லாட்டரியில் பங்கேற்கவில்லை என்றால், நீங்கள் வெற்றி பெற முடியாது." },
      { id: 5, title: "மோசடி செய்யப்பட்டால் என்ன செய்வது", content: "உங்கள் கணக்கை முடக்க உடனடியாக உங்கள் வங்கியின் உதவி எண்ணை அழைக்கவும். தேசிய உதவி எண் 1930 (சைபர் கிரைம்) இல் மோசடியைப் புகாரளிக்கவும். cybercrime.gov.in இல் புகார் அளிக்கவும்.", tip: "வேகமாகச் செயல்படுங்கள் — 24 மணி நேரத்திற்குள் புகாரளிக்கப்பட்டால் வங்கிகள் பணை திரும்பப் பெற வாய்ப்புள்ளது." }
    ],
    quiz: [
      { q: "அழைப்பவர் உங்கள் வங்கியிலிருந்து பேசுவதாகக் கூறி, KYC ஐப் புதுப்பிக்க உங்கள் OTP ஐக் கேட்கிறார். நீங்கள் என்ன செய்வீர்கள்?", options: ["OTP ஐ வேகமாகப் பகிர்வேன்", "பாதி OTP ஐ மட்டும் பகிர்வேன்", "அழைப்பைத் துண்டித்துவிட்டு நேரடியாக வங்கியை அழைப்பேன்", "OTP ஐப் பகிர்வேன் ஆனால் PIN ஐ அல்ல"], correct: 2 },
      { q: "ரூ. 5000 அனுப்புவதாக உறுதியளித்து ஒருவரிடமிருந்து ரூ. 1 க்கான UPI கலக்ட் கோரிக்கை உங்களுக்கு வருகிறது. இது என்ன?", options: ["ஒரு உண்மையான சலுகை", "அரசாங்கத் திட்டம்", "ஒரு மோசடி — ஏற்க வேண்டாம்", "வங்கி சரிபார்ப்பு"], correct: 2 },
      { q: "தேசிய சைபர் கிரைம் உதவி எண் என்ன?", options: ["100", "112", "1930", "1800"], correct: 2 }
    ]
  }
];

const bnModules = [
  {
    id: "upi",
    title: "UPI পেমেন্ট",
    icon: "💳",
    color: "from-purple-500 to-indigo-600",
    description: "নিরাপদে টাকা পাঠান ও গ্রহণ করুন",
    totalSteps: 4,
    completed: true,
    steps: [
      { id: 1, title: "UPI এর পরিচিতি", content: "UPI (ইউনিফাইড পেমেন্টস ইন্টারফেস) আপনাকে শুধুমাত্র একটি ফোন নম্বর বা QR কোড ব্যবহার করে যে কাউকে তাত্ক্ষণিকভাবে এবং বিনামূল্যে টাকা পাঠাতে দেয়।", tip: "UPI অত্যন্ত নিরাপদ এবং প্রতিদিন ৩০ কোটিরও বেশি ভারতীয় এটি ব্যবহার করেন।", image: "/assets/upi/intro.png" },
      { id: 2, title: "ব্যাংক অ্যাকাউন্ট লিঙ্ক করা", content: "প্রথমে, আপনাকে আপনার ব্যাংক অ্যাকাউন্টটি আপনার UPI অ্যাপের সাথে নিরাপদে লিঙ্ক করতে হবে। এটি এটিএম কার্ড ছাড়াই সরাসরি আপনার ব্যাংক থেকে টাকা পাঠানোর সুবিধা দেয়।", tip: "সেটআপের সময় আপনাকে এটি কেবল একবারই করতে হবে।", image: "/assets/upi/link.png" },
      { id: 3, title: "টাকা পাঠানো", content: "'Pay'-তে ট্যাপ করুন, একটি QR কোড স্ক্যান করুন বা ফোন নম্বর লিখুন, পরিমাণ টাইপ করুন এবং টাকা পাঠানোর জন্য আপনার ৪ বা ৬ সংখ্যার গোপন PIN লিখুন।", tip: "আপনার PIN কখনই কারও সাথে শেয়ার করবেন না।", image: "/assets/upi/send.png" },
      { id: 4, title: "টাকা গ্রহণ করা", content: "টাকা পাওয়ার জন্য, আপনাকে শুধু আপনার ফোন নম্বর শেয়ার করতে হবে বা QR কোড দেখাতে হবে। টাকা সরাসরি আপনার ব্যাংকে নিরাপদে জমা হয়ে যাবে।", tip: "টাকা পাওয়ার জন্য আপনাকে কখনই PIN দিতে হবে না।", image: "/assets/upi/receive.png" }
    ],
    quiz: [
      { q: "UPI-তে টাকা পাওয়ার জন্য আপনার কী প্রয়োজন?", options: ["আপনার UPI PIN", "আপনার UPI ID বা ফোন নম্বর", "আপনার ব্যাংকের পাসওয়ার্ড", "আপনার আধার নম্বর"], correct: 1 },
      { q: "কেউ যদি আপনাকে টাকা পাঠানোর জন্য আপনার UPI PIN চায়, তবে আপনার কী করা উচিত?", options: ["এটি অবিলম্বে শেয়ার করুন", "কেবল প্রথম ২টি সংখ্যা বলুন", "প্রত্যাখ্যান করুন — এটি একটি প্রতারণা", "প্রথমে আপনার ব্যাংকে কল করুন"], correct: 2 },
      { q: "এর মধ্যে কোনটি সরকারি UPI অ্যাপ?", options: ["PhonePe", "GPay", "BHIM", "Paytm"], correct: 2 }
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp এর প্রাথমিক ধারণা",
    icon: "💬",
    color: "from-green-500 to-teal-600",
    description: "পরিবারের সাথে চ্যাট, কল এবং ভিডিও",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "WhatsApp এর পরিচিতি", content: "WhatsApp খুলুন এবং নিচে থাকা ছোট 'Message' বুদবুদ আইকনটিতে ট্যাপ করুন। আপনি যার সাথে কথা বলতে চান তার নামটি নির্বাচন করুন।", tip: "আপনি বর্ণানুক্রমিক নামের তালিকা স্ক্রোল করে আপনার পরিবারের সদস্যদের খুঁজে পেতে পারেন।", image: "/assets/wapp/intro.png" },
      { id: 2, title: "চ্যাট ফিচার", content: "যেখানে 'Type a message' লেখা আছে সেখানে ট্যাপ করুন। একটি কীবোর্ড আসবে। আপনার বার্তা লিখুন এবং পাঠানোর জন্য সবুজ বৃত্তাকার তীরের বোতামটিতে ট্যাপ করুন।", tip: "যদি কোনো ভুল হয়, তবে অক্ষর মুছে ফেলার জন্য ব্যাকস্পেস কী ব্যবহার করতে পারেন।", image: "/assets/wapp/chat.png" },
      { id: 3, title: "ভয়েস কল", content: "টাইপ করতে সমস্যা হলে, শুধু সবুজ 'Microphone' আইকনটি চেপে ধরে কথা বলুন। আপনার ভয়েস মেসেজ পাঠাতে বলা শেষ হলে এটি ছেড়ে দিন।", tip: "জন্মদিনের শুভেচ্ছা জানাতে বা দীর্ঘ কথা পাঠাতে ভয়েস মেসেজ দারুণ কাজ করে!", image: "/assets/wapp/voice.png" },
      { id: 4, title: "ভিডিও কল", content: "কথা বলার সময় প্রিয়জনদের মুখোমুখি দেখতে চ্যাটের ডানদিকের উপরে থাকা 'ক্যামেরা' আইকনটিতে ট্যাপ করুন!", tip: "নিশ্চিত করুন যে আপনার ঘরে পর্যাপ্ত আলো আছে যাতে তারা আপনার হাসিমুখ পরিষ্কার দেখতে পায়।", image: "/assets/wapp/video.png" }
    ],
    quiz: [
      { q: "WhatsApp-এ দুটি নীল টিকের (blue ticks) মানে কী?", options: ["বার্তা পাঠানো হয়েছে", "বার্তা পৌঁছেছে", "বার্তা পড়া হয়েছে", "বার্তা মুছে ফেলা হয়েছে"], correct: 2 },
      { q: "টাইপ করা কঠিন হলে, হোয়াটসঅ্যাপে বার্তা পাঠানোর সেরা উপায় কী?", options: ["চিঠি পাঠানো", "ভয়েস মেসেজ পাঠানো (মাইক্রোফোন চেপে ধরে)", "অডিও কল করা", "এক আঙুল দিয়ে ধীরে ধীরে টাইপ করা"], correct: 1 },
      { q: "চ্যাটের ভিতরে ভিডিও কল শুরু করতে আপনি কোন আইকনে ট্যাপ করবেন?", options: ["টেলিফোন আইকন", "ক্যামেরা আইকন", "মাইক্রোফোন আইকন", "প্লাস আইকন"], correct: 1 }
    ]
  },
  {
    id: "aadhaar",
    title: "আধার এবং DigiLocker",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "ডিজিটালভাবে আপনার নথিপত্র পান",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "DigiLocker এর পরিচিতি", content: "DigiLocker হলো ভারত সরকারের একটি নিরাপদ ডিজিটাল ভল্ট যেখানে আপনি আপনার ফোনে নিরাপদে অফিশিয়াল নথিপত্র সংরক্ষণ করতে পারেন।", tip: "DigiLocker-এ থাকা নথিপত্র আসল কাগজের মতোই আইনগতভাবে বৈধ।", image: "/assets/digi/intro.png" },
      { id: 2, title: "সাইন আপ করা", content: "আপনার আধারের সাথে লিঙ্ক করা মোবাইল নম্বর ব্যবহার করে সাইন আপ করুন। আপনার পরিচয় নিরাপদে যাচাই করতে OTP লিখুন।", tip: "এটি নিশ্চিত করে कि কেবল আপনিই আপনার নথিপত্র দেখতে পাবেন।", image: "/assets/digi/signup.png" },
      { id: 3, title: "আধার ডাউনলোড করা", content: "একবার সাইন ইন করার পর, আপনি আপনার ডিজিটাল আধার কার্ড সরাসরি আপনার ফোনে ডাউনলোড করতে পারেন। এতে যাচাইকরণের জন্য একটি QR কোড থাকে।", tip: "আসল কার্ড সাথে রাখার বদলে আপনি এই ডিজিটাল আধার দেখাতে পারেন।", image: "/assets/digi/aadhaar.png" },
      { id: 4, title: "নথিপত্র শেয়ার করা", content: "অফিশিয়াল কোনো প্রয়োজনে বা KYC যাচাইকরণের জন্য আপনি অ্যাপ থেকে সরাসরি আপনার ডিজিটাল নথিপত্র নিরাপদে শেয়ার করতে পারেন।", tip: "ফটোকপি দেওয়ার চেয়ে এটি অনেক বেশি নিরাপদ।", image: "/assets/digi/share.png" }
    ],
    quiz: [
      { q: "আধার নম্বরে কতগুলি সংখ্যা থাকে?", options: ["৮টি সংখ্যা", "১০টি সংখ্যা", "১২টি সংখ্যা", "১৬টি সংখ্যা"], correct: 2 },
      { q: "DigiLocker-এর নথিপত্র কি আইনগতভাবে বৈধ?", options: ["না, শুধুমাত্র আসল কাগজ বৈধ", "কেবল কিছু নির্দিষ্ট উদ্দেশ্যে", "হ্যাঁ, সেগুলি সর্বত্র আইনগতভাবে বৈধ", "শুধুমাত্র মহারাষ্ট্রে"], correct: 2 },
      { q: "DigiLocker অ্যাপটি কে তৈরি করেছে?", options: ["Google", "Reliance Jio", "ভারত সরকার", "State Bank of India"], correct: 2 }
    ]
  },
  {
    id: "fraud",
    title: "প্রতারণা থেকে সুরক্ষা",
    icon: "🛡️",
    color: "from-red-500 to-rose-600",
    description: "অনলাইন স্ক্যাম থেকে নিরাপদ থাকুন",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "সোনালী নিয়ম", content: "আপনার OTP, UPI PIN, ATM PIN বা ব্যাংকের পাসওয়ার্ড কখনই কারও সাথে শেয়ার করবেন না — এমনকি কেউ যদি আপনার ব্যাংক, সরকার বা টেলিকম কোম্পানি থেকে কল করার দাবিও করে।", tip: "কোনো বৈধ প্রতিষ্ঠান কখনই আপনার PIN বা OTP চাইবে না।" },
      { id: 2, title: "ভুয়ো KYC কল", content: "প্রতারকরা আপনার ব্যাংক থেকে কল করার ভান করে বলে যে 'আপনার KYC बाकी আছে, আপনার অ্যাকাউন্ট বন্ধ হয়ে যাবে'। তারা আধার এবং OTP চায়। কখনই শেয়ার করবেন না।", tip: "তাত্ক্ষণিকভাবে কল কেটে দিন। যাচাই করতে আপনার ব্যাংকের অফিশিয়াল নম্বরে কল করুন।" },
      { id: 3, title: "UPI পেমেন্টের অনুরোধ", content: "UPI COLLECT REQUEST মানে হলো আপনার কাছে টাকা চাওয়া হচ্ছে। প্রতারকরা 'পুরস্কারের টাকা পেতে এটি গ্রহণ করুন' বলে এটি পাঠায়। এটি গ্রহণ করে PIN দিলে আপনার টাকা চলে যাবে।", tip: "টাকা পাওয়ার জন্য আপনাকে কখনই PIN দিতে হয় না।" },
      { id: 4, title: "লটারী এবং পুরস্কারের স্ক্যাম", content: "'আপনি KBC-তে ৫০ লক্ষ টাকা জিতেছেন' বা 'পুরস্কারের জন্য আপনার নম্বর নির্বাচিত হয়েছে' এই ধরনের বার্তাগুলি সর্বদা ভুয়ো হয়। তারা 'প্রসেসিং ফি' চাইবে। দেবেন না।", tip: "আপনি যদি লটারিতে অংশ না নিয়ে থাকেন, তবে আপনি জিততে পারেন না।" },
      { id: 5, title: "প্রতারিত হলে কী করবেন", content: "আপনার অ্যাকাউন্ট ফ্রিজ করতে অবিলম্বে আপনার ব্যাংকের হেল্পলাইনে কল করুন। জাতীয় হেল্পলাইন ১৯৩০ (1930) (সাইবার ক্রাইম)-এ প্রতারণার কথা জানান। cybercrime.gov.in-এ অভিযোগ করুন।", tip: "দ্রুত পদক্ষেপ নিন — ২৪ ঘণ্টার মধ্যে জানানো হলে বেশিরভাগ ব্যাংক লেনদেন বাতিল করতে পারে।" }
    ],
    quiz: [
      { q: "একজন কলার দাবি করছে যে সে আপনার ব্যাংক থেকে বলছে এবং KYC আপডেট করতে আপনার OTP চাইছে। আপনি কী করবেন?", options: ["তাড়াতাড়ি OTP শেয়ার করব", "কেবল অর্ধেক OTP শেয়ার করব", "কল কেটে ব্যাংককে সরাসরি কল করব", "OTP শেয়ার করব কিন্তু PIN নয়"], correct: 2 },
      { q: "৫০০০ টাকা পাঠানোর প্রতিশ্রুতি দিয়ে কেউ আপনাকে ১ টাকার UPI কালেক্ট অনুরোধ পাঠিয়েছে। এটি কী?", options: ["একটি বাস্তব অফার", "একটি সরকারি প্রকল্প", "একটি স্ক্যাম — গ্রহণ করবেন না", "ব্যাংক যাচাইকরণ"], correct: 2 },
      { q: "জাতীয় সাইবার ক্রাইম হেল্পলাইন নম্বর কোনটি?", options: ["১০০", "১১২", "১৯৩০", "১৮০০"], correct: 2 }
    ]
  }
];

const teModules = [
  {
    id: "upi",
    title: "UPI చెల్లింపులు",
    icon: "💳",
    color: "from-purple-500 to-indigo-600",
    description: "సురక్షితంగా డబ్బు పంపండి & పొందండి",
    totalSteps: 4,
    completed: true,
    steps: [
      { id: 1, title: "UPI పరిచయం", content: "UPI (యూనిఫైడ్ పేమెంట్స్ ఇంటర్‌ఫేస్) అనేది కేవలం ఫోన్ నంబర్ లేదా QR కోడ్‌ని ఉపయోగించి ఎవరికైనా తక్షణమే మరియు ఉచితంగా డబ్బు పంపడానికి సహాయపడుతుంది.", tip: "UPI చాలా సురక్షితమైనది మరియు ప్రతిరోజూ 30 కోట్ల మందికి పైగా భారతీయులు ఉపయోగిస్తున్నారు.", image: "/assets/upi/intro.png" },
      { id: 2, title: "బ్యాంక్ ఖాతాను లింక్ చేయడం", content: "మొదట, మీరు మీ బ్యాంక్ ఖాతాను మీ UPI యాప్‌కి సురక్షితంగా లింక్ చేయాలి. దీనివల్ల ఏటీఎం కార్డు అవసరం లేకుండా మీ బ్యాంక్ నుండి నేరుగా డబ్బు పంపవచ్చు.", tip: "సెటప్ సమయంలో మీరు దీనిని ఒకసారి మాత్రమే చేయాలి.", image: "/assets/upi/link.png" },
      { id: 3, title: "డబ్బు పంపడం", content: "'Pay' పై నొక్కి, QR కోడ్‌ని స్కాన్ చేయండి లేదా ఫోన్ నంబర్ నమోదు చేసి, మొత్తాన్ని టైప్ చేసి, మీ 4 లేదా 6 అంకెల PINని నమోదు చేసి డబ్బు పంపండి.", tip: "మీ PINని ఎవరితోనూ పంచుకోకండి.", image: "/assets/upi/send.png" },
      { id: 4, title: "డబ్బు పొందడం", content: "డబ్బు పొందడానికి, మీరు మీ ఫోన్ నంబర్‌ను పంచుకోవాలి లేదా మీ QR కోడ్‌ని చూపించాలి. డబ్బు నేరుగా మీ బ్యాంక్ ఖాతాలో సురక్షితంగా జమ అవుతుంది.", tip: "డబ్బు పొందడానికి మీరు ఎప్పుడూ PINని నమోదు చేయవలసిన అవసరం లేదు.", image: "/assets/upi/receive.png" }
    ],
    quiz: [
      { q: "UPI లో డబ్బు పొందడానికి మీకు ఏమి అవసరం?", options: ["మీ UPI PIN", "మీ UPI ID లేదా ఫోన్ నంబర్", "మీ బ్యాంక్ పాస్‌వర్డ్", "మీ ఆధార్ నంబర్"], correct: 1 },
      { q: "ఆధార్ నంబర్ ఎందుకు అడుగుతారు?", options: ["గుర్తింపును నిరూపించడానికి", "ప్రకటనల కోసం", "డబ్బు దొంగిలించడానికి", "యాప్స్ అమ్మడానికి"], correct: 0 },
      { q: "వీటిలో ప్రభుత్వం తయారు చేసిన UPI యాప్ ఏది?", options: ["PhonePe", "GPay", "BHIM", "Paytm"], correct: 2 }
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp ప్రాథమికాలు",
    icon: "💬",
    color: "from-green-500 to-teal-600",
    description: "కుటుంబంతో చాట్, కాల్ & వీడియో",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "WhatsApp పరిచయం", content: "WhatsAppని తెరిచి, దిగువన ఉన్న చిన్న 'Message' బబుల్ చిహ్నాన్ని నొక్కండి. మీరు మాట్లాడాలనుకుంటున్న వ్యక్తి పేరును ఎంచుకోండి.", tip: "అక్షర క్రమంలో ఉన్న పేర్ల జాబితాను స్క్రోల్ చేయడం ద్వారా మీ కుటుంబ సభ్యులను కనుగొనవచ్చు.", image: "/assets/wapp/intro.png" },
      { id: 2, title: "చాట్ ఫీచర్", content: "'Type a message' అని ఉన్న చోట నొక్కండి. ఒక కీబోర్డ్ కనిపిస్తుంది. మీ సందేశాన్ని టైప్ చేసి, పంపడానికి ఆకుపచ్చ వృత్తంలోని తెల్లటి బాణం బటన్‌ను నొక్కండి.", tip: "ఏదైనా తప్పు జరిగితే, అక్షరాలను తొలగించడానికి బ్యాక్‌స్పేస్ కీని ఉపయోగించవచ్చు.", image: "/assets/wapp/chat.png" },
      { id: 3, title: "వాయిస్ కాల్", content: "టైప్ చేయడం కష్టంగా ఉంటే, ఆకుపచ్చ 'Microphone' చిహ్నాన్ని నొక్కి పట్టుకుని మాట్లాడండి. మాట్లాడటం పూర్తయిన తర్వాత వాయిస్ మెసేజ్ పంపడానికి దాన్ని వదిలేయండి.", tip: "పుట్టినరోజు శుభాకాంక్షలు తెలియజేయడానికి లేదా లేదా పెద్ద విషయాలను పంపడానికి వాయిస్ మెసేజ్‌లు చాలా బాగుంటాయి!", image: "/assets/wapp/voice.png" },
      { id: 4, title: "వీడియో కాల్", content: "మాట్లాడేటప్పుడు మీ ప్రియమైన వారిని ముఖాముఖి చూడటానికి చాట్ పైన కుడి వైపున ఉన్న 'కెమెరా' చిహ్నాన్ని నొక్కండి!", tip: "వారు మీ చిరునవ్వును స్పష్టంగా చూడటానికి గదిలో మంచి వెలుతురు ఉండేలా చూసుకోండి.", image: "/assets/wapp/video.png" }
    ],
    quiz: [
      { q: "WhatsApp లో రెండు నీలి రంగు టిక్‌ల (blue ticks) అర్థం ఏమిటి?", options: ["సందేశం పంపబడింది", "సందేశం చేరింది", "సందేశం చదవబడింది", "సందేశం తొలగించబడింది"], correct: 2 },
      { q: "టైప్ చేయడం కష్టంగా ఉంటే, వాట్సాప్‌లో సందేశం పంపడానికి ఉత్తమమైన మార్గం ఏది?", options: ["లేఖ పంపడం", "వాయిస్ మెసేజ్ పంపడం (మైక్రోఫోన్ నొక్కి పట్టుకుని)", "ఆడియో కాల్ చేయడం", "ఒక వేలితో నెమ్మదిగా టైప్ చేయడం"], correct: 1 },
      { q: "చాట్ లోపల వీడియో కాల్ ప్రారంభించడానికి మీరు ఏ చిహ్నాన్ని నొక్కుతారు?", options: ["టెలిఫోన్ చిహ్నం", "కెమెరా చిహ్నం", "మైక్రోఫోన్ చిహ్నం", "ప్లస్ చిహ్నం"], correct: 1 }
    ]
  },
  {
    id: "aadhaar",
    title: "ఆధార్ & DigiLocker",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "మీ పత్రాలను డిజిటల్‌గా పొందండి",
    totalSteps: 4,
    completed: false,
    steps: [
      { id: 1, title: "DigiLocker పరిచయం", content: "DigiLocker అనేది భారత ప్రభుత్వం అందించే సురక్షితమైన డిజిటల్ లాకర్, ఇక్కడ మీరు మీ అధికారిక పత్రాలను మీ ఫోన్‌లో సురక్షితంగా దాచుకోవచ్చు.", tip: "DigiLocker లోని పత్రాలు అసలు పత్రాల వలె చట్టబద్ధంగా చెల్లుబాటు అవుతాయి.", image: "/assets/digi/intro.png" },
      { id: 2, title: "సైన్ అప్ చేయడం", content: "మీ ఆధార్‌తో లింక్ చేయబడిన మొబైల్ నంబర్‌ని ఉపయోగించి సైన్ అప్ చేయండి. మీ గుర్తింపును సురక్షితంగా ధృవీకరించడానికి OTPని నమోదు చేయండి.", tip: "ఇది మీరు మాత్రమే మీ పత్రాలను చూసేలా చేస్తుంది.", image: "/assets/digi/signup.png" },
      { id: 3, title: "ఆధార్ డౌన్‌లోడ్ చేయడం", content: "లాగిన్ అయిన తర్వాత, మీరు మీ డిజిటల్ ఆధార్ కార్డ్‌ను నేరుగా మీ ఫోన్‌లోకి డౌన్‌లోడ్ చేసుకోవచ్చు. ఇందులో ధృవీకరణ కోసం QR కోడ్ ఉంటుంది.", tip: "అసలు కార్డ్‌ని తీసుకెళ్లే బదులు మీరు ఈ డిజిటల్ ఆధార్‌ని చూపించవచ్చు.", image: "/assets/digi/aadhaar.png" },
      { id: 4, title: "పత్రాలను పంచుకోవడం", content: "అధికారిక సంస్థలు అడిగినప్పుడు లేదా KYC ధృవీకరణ కోసం యాప్ నుండి నేరుగా మీ డిజిటల్ పత్రాలను సురక్షితంగా పంచుకోవచ్చు.", tip: "ఫోటోకాపీలు (జెరాక్స్) ఇవ్వడం కంటే ఇది చాలా సురక్షితం.", image: "/assets/digi/share.png" }
    ],
    quiz: [
      { q: "ఆధార్ నంబర్‌లో ఎన్ని అంకెలు ఉంటాయి?", options: ["8 అంకెలు", "10 అంకెలు", "12 అంకెలు", "16 అంకెలు"], correct: 2 },
      { q: "DigiLocker లోని పత్రాలు చట్టబద్ధంగా చెల్లుతాయా?", options: ["లేదు, అసలు పత్రాలు మాత్రమే చెల్లుతాయి", "కొన్ని అవసరాలకు మాత్రమే", "అవును, అవి అన్ని చోట్లా చట్టబద్ధంగా చెల్లుబాటు అవుతాయి", "మహారాష్ట్రలో మాత్రమే"], correct: 2 },
      { q: "DigiLocker యాప్‌ను తయారు చేసింది ఎవరు?", options: ["Google", "Reliance Jio", "భారత ప్రభుత్వం", "State Bank of India"], correct: 2 }
    ]
  },
  {
    id: "fraud",
    title: "మోసాల నుండి రక్షణ",
    icon: "🛡️",
    color: "from-red-500 to-rose-600",
    description: "ఆన్‌లైన్ మోసాల నుండి సురక్షితంగా ఉండండి",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "బంగారు నియమం", content: "మీ OTP, UPI PIN, ATM PIN లేదా బ్యాంక్ పాస్వర్డ్ ఎవరితోనూ పంచుకోకండి — వారు మీ బ్యాంక్, ప్రభుత్వం లేదా టెలికాం కంపెనీ నుండి కాల్ చేస్తున్నట్లు చెప్పినా సరే.", tip: "ఏ అధికారిక సంస్థ కూడా మీ PIN లేదా OTPని ఎప్పుడూ అడగదు." },
      { id: 2, title: "నకిలీ KYC కాల్స్", content: "మోసగాళ్లు మీ బ్యాంక్ నుండి కాల్ చేస్తున్నట్లు నటిస్తూ 'మీ KYC పెండింగ్‌లో ఉంది, మీ ఖాతా బ్లాక్ చేయబడుతుంది' అంటారు. వారు ఆధార్ మరియు OTP అడుగుతారు. ఎప్పుడూ పంచుకోవద్దు.", tip: "వెంటనే కాల్ కట్ చేయండి. నిర్ధారించుకోవడానికి మీ బ్యాంక్ అధికారిక నంబర్‌కు కాల్ చేయండి." },
      { id: 3, title: "UPI డబ్బు అభ్యర్థనలు", content: "UPI COLLECT REQUEST అంటే మీకు డబ్బు చెల్లించమని అడగడం. 'మీ బహుమతి డబ్బును పొందడానికి దీనిని అంగీకరించండి' అని చెప్పి మోసగాళ్లు దీనిని పంపుతారు. దీనిని అంగీకరించి PIN నమోదు చేస్తే మీ డబ్బు పోతుంది.", tip: "డబ్బు పొందడానికి మీరు ఎప్పుడూ PIN నమోదు చేయవలసిన అవసరం లేదు." },
      { id: 4, title: "లాటరీ మరియు బహుమతి మోసాలు", content: "'మీరు KBC లో రూ. 50 లక్షలు గెలుచుకున్నారు' లేదా 'బహుమతి కోసం మీ నంబర్ ఎంపిక చేయబడింది' అనే సందేశాలు ఎల్లప్పుడూ నకిలీవి. వారు 'ప్రాసెసింగ్ ఫీజు' అడుగుతారు. చెల్లించకండి.", tip: "మీరు లాటరీలో పాల్గొనకపోతే, మీ గెలవలేరు." },
      { id: 5, title: "మోసపోతే ఏమి చేయాలి", content: "మీ ఖాతాను ఫ్రీజ్ చేయడానికి వెంటనే మీ బ్యాంక్ సహాయక నంబర్‌కు కాల్ చేయండి. జాతీయ సహాయక సంఖ్య 1930 (సైబర్ క్రైమ్) లో మోసం గురించి నివేదించండి. cybercrime.gov.in లో ఫిర్యాదు చేయండి.", tip: "వేగంగా స్పందించండి — 24 గంటలలోపు నివేదిస్తే బ్యాంకులు డబ్బును తిరిగి పొందే అవకాశం ఉంది." }
    ],
    quiz: [
      { q: "కాల్ చేసిన వ్యక్తి మీ బ్యాంక్ నుండి మాట్లాడుతున్నానని మరియు KYCని అప్‌డేట్ చేయడానికి మీ OTP కావాలని అడిగారు. మీరు ఏమి చేస్తారు?", options: ["OTPని త్వరగా పంచుకుంటాను", "సగం OTP మాత్రమే పంచుకుంటాను", "కాల్ కట్ చేసి నేరుగా బ్యాంకుకు కాల్ చేస్తాను", "OTP పంచుకుంటాను కానీ PIN కాదు"], correct: 2 },
      { q: "రూ. 5000 పంపుతామని హామీ ఇస్తూ ఒకరి నుండి రూ. 1 కోసం UPI కలెక్ట్ అభ్యర్థన మీకు వచ్చింది. ఇది ఏమిటి?", options: ["ఒక నిజమైన ఆఫర్", "ప్రభుత్వ పథకం", "ఒక మోసం — అంగీకరించవద్దు", "బ్యాంక్ ధృవీకరణ"], correct: 2 },
      { q: "జాతీయ సైబర్ క్రైమ్ హెల్ప్ లైన్ నంబర్ ఏది?", options: ["100", "112", "1930", "1800"], correct: 2 }
    ]
  }
];

export const modules = {
  en: enModules,
  hi: hiModules,
  mr: mrModules,
  gu: guModules,
  ta: taModules,
  bn: bnModules,
  te: teModules
};

// Also export quizzes separately for ModulePage logic (safely mapping)
export const quizzes = {
  en: { upi: enModules[0].quiz, whatsapp: enModules[1].quiz, aadhaar: enModules[2].quiz, fraud: enModules[3].quiz },
  hi: { upi: hiModules[0].quiz, whatsapp: hiModules[1].quiz, aadhaar: hiModules[2].quiz, fraud: hiModules[3].quiz },
  mr: { upi: mrModules[0].quiz, whatsapp: mrModules[1].quiz, aadhaar: mrModules[2].quiz, fraud: mrModules[3].quiz },
  gu: { upi: guModules[0].quiz, whatsapp: guModules[1].quiz, aadhaar: guModules[2].quiz, fraud: guModules[3].quiz },
  ta: { upi: taModules[0].quiz, whatsapp: taModules[1].quiz, aadhaar: taModules[2].quiz, fraud: taModules[3].quiz },
  bn: { upi: bnModules[0].quiz, whatsapp: bnModules[1].quiz, aadhaar: bnModules[2].quiz, fraud: bnModules[3].quiz },
  te: { upi: teModules[0].quiz, whatsapp: teModules[1].quiz, aadhaar: teModules[2].quiz, fraud: teModules[3].quiz }
};
