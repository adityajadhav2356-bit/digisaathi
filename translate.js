import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

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
      { q: "Is it safe to share your UPI PIN?", options: ["Yes, to friends", "Never, it is secret", "Only to bank officials", "Yes, to customer care"], correct: 1 }
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp Basics",
    icon: "💬",
    color: "from-emerald-500 to-teal-600",
    description: "Chat and call your family",
    totalSteps: 4,
    completed: true,
    steps: [
      { id: 1, title: "Intro to WhatsApp", content: "WhatsApp is a free messaging app used by billions to stay in touch. You can send messages, photos, and make free calls using just your internet connection.", tip: "WhatsApp messages are end-to-end encrypted, meaning only you and the person you're messaging can read them.", image: "/assets/wapp/intro.png" },
      { id: 2, title: "The Chat Feature", content: "To send a message, tap on a contact's name, type in the text box at the bottom, and hit the send arrow. You can also send voice notes by holding the microphone icon.", tip: "A double blue tick means your message was read.", image: "/assets/wapp/chat.png" },
      { id: 3, title: "Voice Calls", content: "Tap the phone icon at the top of any chat to start a free voice call. It works just like a regular phone call but uses internet data instead of your phone balance.", tip: "Make sure you are connected to Wi-Fi for clearer calls.", image: "/assets/wapp/voice.png" },
      { id: 4, title: "Video Calls", content: "Tap the video camera icon next to the phone icon to start a video call. You will be able to see and hear your family members face-to-face from anywhere in the world.", tip: "Prop your phone up against a book for hands-free video chatting.", image: "/assets/wapp/video.png" }
    ],
    quiz: [
      { q: "What does a double blue tick mean?", options: ["Message sent", "Message delivered", "Message read", "Message deleted"], correct: 2 },
      { q: "Do WhatsApp voice calls cost phone balance?", options: ["Yes", "No, they use internet data", "Only on weekends", "Only for international calls"], correct: 1 }
    ]
  },
  {
    id: "aadhaar",
    title: "DigiLocker & Aadhaar",
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
      { q: "Are DigiLocker documents legally valid?", options: ["No", "Only for travel", "Yes, everywhere", "Only in banks"], correct: 2 }
    ]
  },
  {
    id: "fraud",
    title: "Fraud Protection",
    icon: "🛡️",
    color: "from-red-500 to-rose-600",
    description: "Stay safe from digital scams",
    totalSteps: 3,
    completed: false,
    steps: [
      { id: 1, title: "Never Share OTP", content: "An OTP (One Time Password) is a secret code sent to your phone. Never share it with anyone, even if they say they are from the bank or police.", tip: "Bank officials will NEVER ask for your OTP." },
      { id: 2, title: "Beware of Unknown Links", content: "If you get an SMS or WhatsApp message offering a prize, lottery, or free gift with a blue link, DO NOT tap on it. It could steal your personal information.", tip: "If it sounds too good to be true, it is a scam." },
      { id: 3, title: "Reporting Fraud", content: "If you lose money to a scam, immediately call the National Cyber Crime Helpline at 1930 or complain at cybercrime.gov.in.", tip: "Reporting quickly increases the chance of recovering your money." }
    ],
    quiz: [
      { q: "What should you do if someone asks for your OTP?", options: ["Give it to them", "Only give it to bank officials", "Never share it with anyone", "Ask for their ID first"], correct: 2 },
      { q: "What is the Cyber Crime Helpline number?", options: ["100", "1930", "108", "199"], correct: 1 }
    ]
  }
];

const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function translate() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const langs = ['Gujarati', 'Tamil', 'Bengali', 'Telugu'];
  
  for (const lang of langs) {
    const prompt = `Translate the following JSON array of educational modules into ${lang}. Ensure ALL keys remain in English (id, title, icon, color, description, totalSteps, completed, steps, q, options, correct, etc) but translate the values of 'title', 'description', 'content', 'tip', 'q', and 'options' into ${lang}. Keep image paths exactly the same. Output ONLY valid JSON, without any markdown formatting or backticks.\n\n` + JSON.stringify(enModules, null, 2);
    
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    
    fs.writeFileSync(`client/src/data/${lang.toLowerCase()}.json`, text);
    console.log(`Saved ${lang.toLowerCase()}.json`);
  }
}

translate();
