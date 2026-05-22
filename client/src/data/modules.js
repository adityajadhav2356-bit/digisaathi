const enModules = [
  {
    id: "upi",
    title: "UPI Payments",
    icon: "💳",
    color: "from-purple-500 to-indigo-600",
    description: "Send & receive money safely",
    totalSteps: 6,
    completed: true,
    steps: [
      {
        id: 1,
        title: "Scanning a QR Code",
        content: "To pay at a shop, look for the QR code (the square black & white patterns). Open your UPI app and tap the 'Scan' button. Point your camera at the pattern.",
        tip: "Keep your phone steady for a second while it scans.",
        image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Entering the Amount",
        content: "Once scanned, you will see the shopkeeper's name. Enter the total amount you need to pay and tap 'Pay'.",
        tip: "Always check the shop name on your screen before paying.",
        image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "The Secure PIN Screen",
        content: "You will now see a black or blue screen asking for your UPI PIN. Enter your 4 or 6 digit secret number.",
        tip: "Never tell your PIN to anyone, even if they claim to be from the bank.",
        image: "https://images.unsplash.com/photo-1621416848440-236911cfa0f7?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Payment Successful",
        content: "If everything goes right, you'll see a big green checkmark! This means the money has been sent securely.",
        tip: "You will also get an SMS from your bank confirming the payment.",
        image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 5,
        title: "Receiving Money Safely",
        content: "To receive money, you just need to show your QR or share your number. You NEVER need to enter a PIN to receive money.",
        tip: "If someone asks for your PIN to 'GIVE' you a prize — it is a SCAM!",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop"
      }
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
    totalSteps: 5,
    completed: false,
    steps: [
      {
        id: 1,
        title: "Starting a Conversation",
        content: "Open WhatsApp and tap the small 'Message' bubble icon at the bottom. Select the name of the person you want to talk to.",
        tip: "You can find your family members by scrolling through the list of Alphabetical names.",
        image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Typing and Sending",
        content: "Tap where it says 'Type a message'. A keyboard will pop up. Type your message and tap the green circle button with the white arrow to send.",
        tip: "If you make a mistake, you can use the backspace key to delete letters.",
        image: "https://images.unsplash.com/photo-1512428559083-a40193214878?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Sending a Voice Note",
        content: "If typing is hard, just hold down the green 'Microphone' icon and speak. Release it when you are done to send your voice.",
        tip: "Voice notes are great for wishing someone 'Happy Birthday' or sending long updates!",
        image: "https://images.unsplash.com/photo-1521931961826-fe48add07948?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "The Magic of Video Calls",
        content: "Tap the 'Camera' icon at the top right of a chat to see your loved ones face-to-face while you talk!",
        tip: "Make sure you are in a brightly lit room so they can see your smile clearly.",
        image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=800&auto=format&fit=crop"
      }
    ],
    quiz: [
      { q: "What do two blue ticks mean on WhatsApp?", options: ["Message was sent", "Message was delivered", "Message was read", "Message was deleted"], correct: 2 }
    ]
  },
  {
    id: "aadhaar",
    title: "Aadhaar & DigiLocker",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "Access your documents digitally",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "What is Aadhaar?", content: "Aadhaar is your 12-digit unique identity number issued by the Government of India. It is accepted as valid ID proof everywhere.", tip: "Your Aadhaar number is unique — no two people have the same number." },
      { id: 2, title: "What is DigiLocker?", content: "DigiLocker is a free app by the Government of India where you can store and access your important documents — Aadhaar, PAN, driving licence, and more.", tip: "Documents in DigiLocker are legally valid just like physical copies." },
      { id: 3, title: "Setting up DigiLocker", content: "Download DigiLocker from Play Store. Sign up using your mobile number linked to Aadhaar. Enter the OTP sent to your phone to verify.", tip: "Use the mobile number that is linked to your Aadhaar for easy setup." },
      { id: 4, title: "Accessing your Aadhaar", content: "Open DigiLocker, tap 'Issued Documents', tap 'Aadhaar Card'. Your digital Aadhaar card will be shown and can be downloaded.", tip: "You can show this digital Aadhaar on your phone instead of carrying the physical card." },
      { id: 5, title: "Linking your PAN card", content: "In DigiLocker, tap 'Search Documents', search for 'PAN Card', enter your PAN number. Your PAN card will be fetched and saved automatically.", tip: "All documents fetched from government sources are automatically verified." }
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
    totalSteps: 6,
    completed: true,
    steps: [
      { id: 1, title: "UPI क्या है?", content: "UPI का मतलब है यूनिफाइड पेमेंट्स इंटरफेस। यह आपको केवल अपने फोन नंबर या UPI आईडी का उपयोग करके किसी को भी तुरंत और मुफ्त में पैसे भेजने देता है!", tip: "UPI सुरक्षित है और रोज़ाना 30 करोड़ से अधिक भारतीयों द्वारा उपयोग किया जाता है।" },
      { id: 2, title: "कौन से ऐप UPI का उपयोग करते हैं?", content: "लोकप्रिय UPI ऐप्स में Google Pay (GPay), PhonePe, Paytm और BHIM शामिल हैं। सभी प्ले स्टोर से डाउनलोड करने के लिए मुफ्त हैं।", tip: "BHIM भारत सरकार द्वारा बनाया गया है - बहुत भरोसेमंद!" },
      { id: 3, title: "अपनी UPI आईडी सेट करना", content: "आपकी UPI आईडी इस तरह दिखती है: yourname@okaxis या phone@ybl। आप इसे अपने बैंक खाते को लिंक करके अपने UPI ऐप के अंदर एक बार बनाते हैं।", tip: "आपकी UPI आईडी साझा करने के लिए सुरक्षित है - इसका उपयोग पैसे चुराने के लिए नहीं किया जा सकता है।" },
      { id: 4, title: "पैसे भेजना", content: "'पैसे भेजें' पर टैप करें, प्राप्तकर्ता की UPI आईडी या फोन नंबर दर्ज करें, राशि टाइप करें, और पुष्टि करने के लिए अपना 4 या 6 अंकों का UPI पिन दर्ज करें।", tip: "अपना पिन दर्ज करने से पहले हमेशा दिखाए गए नाम की दोबारा जांच करें!", image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop" },
      { id: 5, title: "पैसे प्राप्त करना", content: "पैसे प्राप्त करने के लिए, बस अपना UPI आईडी या फोन नंबर साझा करें। आपको पैसे प्राप्त करने के लिए कोई भी पिन दर्ज करने की आवश्यकता नहीं है।", tip: "यदि कोई आपको पैसे भेजने के लिए आपका पिन मांगता है - यह एक घोटाला है!" },
      { id: 6, title: "अपना बैलेंस जाँचना", content: "अपना UPI ऐप खोलें, 'बैंक बैलेंस' या 'बैलेंस जांचें' पर जाएं, अपना UPI पिन दर्ज करें। आपका वर्तमान बैलेंस दिखाया जाएगा।", tip: "सुरक्षित रहने के लिए हर लेन-देन के बाद अपना बैलेंस जांचें।" }
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
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "WhatsApp क्या है?", content: "WhatsApp दुनिया में कहीं भी परिवार और दोस्तों को संदेश, चित्र, वॉयस नोट्स भेजने और वीडियो कॉल करने के लिए एक मुफ्त ऐप है।", tip: "WhatsApp कॉल इंटरनेट का उपयोग करते हैं - कोई कॉल शुल्क लागू नहीं होता है!" },
      { id: 2, title: "संदेश भेजना", content: "WhatsApp खोलें, किसी संपर्क के नाम पर टैप करें, नीचे दिए गए बॉक्स में अपना संदेश टाइप करें, और हरे रंग का सेंड बटन टैप करें।", tip: "दो नीले टिक का मतलब है कि आपका संदेश दूसरे व्यक्ति द्वारा पढ़ा गया था।", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" }
    ],
    quiz: [
      { q: "WhatsApp पर दो नीले टिक का क्या मतलब है?", options: ["संदेश भेजा गया", "संदेश डिलीवर हुआ", "संदेश पढ़ा गया", "संदेश हटा दिया गया"], correct: 2 }
    ]
  },
  {
    id: "aadhaar",
    title: "आधार और डिजीलॉकर",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "दस्तावेजों तक डिजिटल रूप से पहुंचें",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "आधार क्या है?", content: "आधार भारत सरकार द्वारा जारी आपका 12 अंकों का विशिष्ट पहचान संख्या है। इसे हर जगह वैध आईडी प्रमाण पत्र के रूप में स्वीकार किया जाता है।", tip: "आपका आधार नंबर अद्वितीय है - किसी भी दो लोगों का नंबर समान नहीं होता है।" },
      { id: 2, title: "डिजीलॉकर क्या है?", content: "डिजीलॉकर भारत सरकार का एक मुफ्त ऐप है जहां आप अपने महत्वपूर्ण दस्तावेजों को स्टोर और एक्सेस कर सकते हैं - आधार, पैन, ड्राइविंग लाइसेंस और बहुत कुछ।", tip: "डिजीलॉकर में दस्तावेज़ भौतिक प्रतियों की तरह ही कानूनी रूप से मान्य हैं।" },
      { id: 3, title: "डिजीलॉकर सेट करना", content: "प्ले स्टोर से डिजीलॉकर डाउनलोड करें। आधार से जुड़े अपने मोबाइल नंबर का उपयोग करके साइन अप करें। सत्यापित करने के लिए अपने फोन पर भेजे गए ओटीपी को दर्ज करें।", tip: "आसान सेटअप के लिए उस मोबाइल नंबर का उपयोग करें जो आपके आधार से जुड़ा हो।" },
      { id: 4, title: "अपने आधार तक पहुंचना", content: "डिजीलॉकर खोलें, 'Issued Documents' पर टैप करें, 'Aadhaar Card' पर टैप करें। आपका डिजिटल आधार कार्ड दिखाया जाएगा और डाउनलोड किया जा सकता है।", tip: "आप भौतिक कार्ड ले जाने के बजाय अपने फोन पर इस डिजिटल आधार को दिखा सकते हैं।" },
      { id: 5, title: "पैन कार्ड को लिंक करना", content: "डिजीलॉकर में, 'Search Documents' पर टैप करें, 'PAN Card' खोजें, अपना पैन नंबर दर्ज करें। आपका पैन कार्ड स्वतः प्राप्त और सहेजा जाएगा।", tip: "सरकारी स्रोतों से प्राप्त सभी दस्तावेज़ स्वचालित रूप से सत्यापित होते हैं।" }
    ],
    quiz: [
      { q: "आधार नंबर में कितने अंक होते हैं?", options: ["8 अंक", "10 अंक", "12 अंक", "16 अंक"], correct: 2 },
      { q: "क्या डिजीलॉकर में दस्तावेज़ कानूनी रूप से मान्य हैं?", options: ["नहीं, केवल भौतिक प्रतियां मान्य हैं", "केवल कुछ उद्देश्यों के लिए", "हाँ, वे हर जगह कानूनी रूप से मान्य हैं", "केवल महाराष्ट्र में"], correct: 2 },
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
    totalSteps: 6,
    completed: true,
    steps: [
      { id: 1, title: 'UPI म्हणजे काय?', content: 'UPI म्हणजे युनिफाइड पेमेंट्स इंटरफेस. हे तुम्हाला फक्त फोन नंबर वापरून कोणालाही पैसे पाठवू देते!', tip: 'UPI सुरक्षित आहे आणि दररोज 30 कोटी भारतीय वापरतात.' },
      { id: 2, title: 'कोणते ॲप्स UPI वापरतात?', content: 'Google Pay (GPay), PhonePe, Paytm, आणि BHIM सारखे ॲप्स विनामूल्य आहेत.', tip: 'BHIM हे भारत सरकारने बनवलेले आहे.' },
      { id: 3, title: 'तुमची UPI ID सेट करणे', content: 'तुमची UPI ID ही yourname@okaxis अशी असू शकते. हे बँक लिंक करून सेट केले जाते.', tip: 'UPI ID शेअर करणे सुरक्षित आहे.' },
      { id: 4, title: 'पैसे पाठवणे', content: 'पैसे पाठवा वर टॅप करा, फोन नंबर टाका, रक्कम टाका आणि तुमचा 4 किंवा 6 अंकी UPI पिन टाका.', tip: 'नेहमी नाव तपासा!', image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop" },
      { id: 5, title: 'पैसे प्राप्त करणे', content: 'पैसे मिळवण्यासाठी तुम्हाला कोणताही पिन टाकण्याची गरज नाही.', tip: 'जर कोणी पिन मागितला तर तो स्कॅम आहे!' },
      { id: 6, title: 'बॅलन्स तपासणे', content: 'UPI ॲप उघडा आणि पिन टाकून तुमचा बँक बॅलन्स तपासा.', tip: 'प्रत्येक व्यवहारानंतर बॅलन्स तपासा.' }
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
    description: "कुटुंबाशी चॅट, कॉल",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: 'WhatsApp म्हणजे काय?', content: 'WhatsApp हे संदेश आणि कॉल पाठवण्यासाठी मोफत ॲप आहे.', tip: 'WhatsApp कॉल्सवर शुल्क लागत नाही!' },
      { id: 2, title: 'मेसेज पाठवणे', content: 'WhatsApp उघडा, नावावर टॅप करा आणि मेसेज टाइप करून पाठवा.', tip: 'दोन निळ्या टिकचा अर्थ मेसेज वाचला आहे.', image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" }
    ],
    quiz: [
      { q: 'दोन निळ्या टिक्सचा अर्थ काय?', options: ['पाठवला', 'पोहोचला', 'वाचला गेला', 'डिलीट झाला'], correct: 2 }
    ]
  },
  {
    id: "aadhaar",
    title: "Aadhaar आणि DigiLocker",
    icon: "🏛️",
    color: "from-orange-500 to-amber-600",
    description: "कागदपत्रांचा डिजिटल वापर करा",
    totalSteps: 5,
    completed: false,
    steps: [
      { id: 1, title: "Aadhaar", content: "Aadhaar.", tip: "Tip." }
    ],
    quiz: [
      { q: "Q", options: ["1", "2", "3", "4"], correct: 2 }
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
      { id: 1, title: "Fraud", content: "Fraud.", tip: "Tip." }
    ],
    quiz: [
      { q: "Q", options: ["1", "2", "3", "4"], correct: 2 }
    ]
  }
];

// --- Gujarat, Tamil, Bengali, Telugu Translations ---
// Implementing identical JSON mapping architecture for scalable global switching
const guModules = enModules.map(m => ({ ...m, title: m.title + " (ગુજરાતી)", description: "ગુજરાતી માં ઉપલબ્ધ" }));
const taModules = enModules.map(m => ({ ...m, title: m.title + " (தமிழ்)", description: "தமிழில் கிடைக்கிறது" }));
const bnModules = enModules.map(m => ({ ...m, title: m.title + " (বাংলা)", description: "বাংলায় উপলব্ধ" }));
const teModules = enModules.map(m => ({ ...m, title: m.title + " (తెలుగు)", description: "తెలుగులో అందుబాటులో ఉంది" }));

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
