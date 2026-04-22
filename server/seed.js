/**
 * seed.js – Run once to populate Firestore with sample data.
 * Usage: FIREBASE_SERVICE_ACCOUNT='<json>' node seed.js
 */
require('dotenv').config();
const { db } = require('./config/firebase');

if (!db) {
  console.error('Firestore not initialized. Set FIREBASE_SERVICE_ACCOUNT in .env');
  process.exit(1);
}

const modules = [
  {
    id: 'upi-payments',
    title: 'UPI Payments',
    icon: '💳',
    description: 'Learn how to send and receive money safely with UPI',
    steps: [
      { stepNumber: 1, title: 'What is UPI?', body: 'UPI stands for Unified Payments Interface – a simple and safe way to send money to anyone using their phone number or UPI ID.', illustration: 'https://img.icons8.com/color/200/bank-card-back-side.png' },
      { stepNumber: 2, title: 'Setting up your UPI PIN', body: 'Open your bank app or BHIM/PhonePe/GPay. Go to Profile → Set UPI PIN. Enter your debit card details and OTP to create your 4 or 6 digit PIN.', illustration: 'https://img.icons8.com/color/200/password.png' },
      { stepNumber: 3, title: 'Sending Money', body: 'Tap "Send Money", enter the recipient\'s UPI ID or phone number, enter the amount, and confirm with your PIN. Done!', illustration: 'https://img.icons8.com/color/200/money-transfer.png' },
      { stepNumber: 4, title: 'Receiving Money', body: 'Share your UPI ID or QR code with the sender. Money will arrive instantly in your bank account. No need to share any PIN or OTP!', illustration: 'https://img.icons8.com/color/200/qr-code.png' },
      { stepNumber: 5, title: 'Safety Tips', body: 'NEVER share your UPI PIN or OTP with anyone – not even bank staff. Scammers pretend to be from the bank. Real banks never ask for your PIN.', illustration: 'https://img.icons8.com/color/200/privacy-policy.png' }
    ],
    quizQuestions: [
      { question: 'What does UPI stand for?', options: ['Unified Payments Interface', 'Universal Pay Index', 'United Phone Interchange', 'User Payment ID'], answer: 0 },
      { question: 'Should you share your UPI PIN with someone claiming to be from the bank?', options: ['Yes, they need it to help you', 'Never! Real banks never ask for it', 'Only if they call from official number', 'Yes, if they send an email'], answer: 1 },
      { question: 'How do you receive money via UPI?', options: ['Send your bank account password', 'Share your UPI ID or QR code', 'Give your debit card number', 'Enter OTP on their website'], answer: 1 }
    ]
  },
  {
    id: 'whatsapp-basics',
    title: 'WhatsApp Basics',
    icon: '💬',
    description: 'Stay connected with family using WhatsApp',
    steps: [
      { stepNumber: 1, title: 'What is WhatsApp?', body: 'WhatsApp is a free app to send messages, photos, and make voice/video calls over the internet. No extra charge beyond your data plan.', illustration: 'https://img.icons8.com/color/200/whatsapp.png' },
      { stepNumber: 2, title: 'Sending a Text Message', body: 'Open WhatsApp → Tap on a contact → Type your message in the box at the bottom → Tap the green send button (arrow icon).', illustration: 'https://img.icons8.com/color/200/chat.png' },
      { stepNumber: 3, title: 'Making a Voice Call', body: 'Open a chat → Tap the phone icon at the top right → Your contact\'s phone will ring. Speak clearly and tap the red button to end the call.', illustration: 'https://img.icons8.com/color/200/phone.png' },
      { stepNumber: 4, title: 'Sending Photos', body: 'Open a chat → Tap the paperclip/attach icon → Choose "Gallery" → Select your photo → Tap Send. You can add a caption before sending!', illustration: 'https://img.icons8.com/color/200/image.png' },
      { stepNumber: 5, title: 'Status & Privacy', body: 'Status lets you share moments that disappear in 24 hours. Under Settings → Privacy, you can control who sees your status and last seen.', illustration: 'https://img.icons8.com/color/200/settings.png' }
    ],
    quizQuestions: [
      { question: 'Is WhatsApp calling free?', options: ['No, it costs ₹2 per minute', 'Yes, it uses internet data which may be free on WiFi', 'Only the first call is free', 'It depends on your contact'], answer: 1 },
      { question: 'Which icon do you tap to make a voice call in WhatsApp?', options: ['Camera icon', 'Phone icon', 'Message icon', 'Search icon'], answer: 1 },
      { question: 'A WhatsApp Status post disappears after how long?', options: ['1 hour', '7 days', '24 hours', 'It stays forever'], answer: 2 }
    ]
  },
  {
    id: 'aadhaar-services',
    title: 'Aadhaar Services',
    icon: '🪪',
    description: 'Use Aadhaar for government services safely',
    steps: [
      { stepNumber: 1, title: 'What is Aadhaar?', body: 'Aadhaar is your 12-digit unique ID issued by UIDAI. It is used for identity verification for government services, banks, and more.', illustration: 'https://img.icons8.com/color/200/identification-documents.png' },
      { stepNumber: 2, title: 'Download e-Aadhaar', body: 'Visit uidai.gov.in → Click "Download Aadhaar" → Enter your 12-digit Aadhaar or Enrollment ID → Enter OTP sent to your mobile → Download!', illustration: 'https://img.icons8.com/color/200/download.png' },
      { stepNumber: 3, title: 'Update Your Address', body: 'Visit uidai.gov.in → My Aadhaar → Update Address → Choose self-service or appointing an operator → Upload address proof → Submit for review.', illustration: 'https://img.icons8.com/color/200/home.png' },
      { stepNumber: 4, title: 'Lock/Unlock Biometrics', body: 'On UIDAI website or mAadhaar app, you can LOCK your biometrics to prevent misuse. Unlock only when needed at a center.', illustration: 'https://img.icons8.com/color/200/fingerprint.png' },
      { stepNumber: 5, title: 'Beware of Fake Aadhaar Calls', body: 'UIDAI never calls to ask for your Aadhaar OTP or bank details. If someone does, hang up and report to 1947 (UIDAI helpline).', illustration: 'https://img.icons8.com/color/200/spam.png' }
    ],
    quizQuestions: [
      { question: 'How many digits does an Aadhaar number have?', options: ['10', '16', '12', '8'], answer: 2 },
      { question: 'Where can you download your e-Aadhaar?', options: ['WhatsApp', 'uidai.gov.in', 'Google Search', 'Any app store'], answer: 1 },
      { question: 'What should you do if someone calls asking for your Aadhaar OTP?', options: ['Give them the OTP quickly', 'Hang up and report to 1947', 'Send them a photo of your card', 'Give them your date of birth'], answer: 1 }
    ]
  },
  {
    id: 'digilocker',
    title: 'DigiLocker',
    icon: '🗄️',
    description: 'Store and share your documents digitally with DigiLocker',
    steps: [
      { stepNumber: 1, title: 'What is DigiLocker?', body: 'DigiLocker is a government app to store digital versions of your documents – like driving licence, PAN card, and Aadhaar – safely in the cloud.', illustration: 'https://img.icons8.com/color/200/cloud-storage.png' },
      { stepNumber: 2, title: 'Create Your Account', body: 'Download the DigiLocker app → Tap Sign Up → Enter your mobile number linked to Aadhaar → Verify OTP → Set a 6-digit security PIN.', illustration: 'https://img.icons8.com/color/200/register.png' },
      { stepNumber: 3, title: 'Link Your Aadhaar', body: 'After login → Tap "Link Aadhaar" → Enter your 12-digit Aadhaar → Verify with OTP → Your Aadhaar documents appear automatically!', illustration: 'https://img.icons8.com/color/200/connect.png' },
      { stepNumber: 4, title: 'Find and Download Documents', body: 'Tap "Issued Documents" → Choose Ministry/Issuer → Search for your document (e.g., PAN, Driving Licence) → Download and view them anytime!', illustration: 'https://img.icons8.com/color/200/documents.png' },
      { stepNumber: 5, title: 'Share Documents Safely', body: 'Tap any document → Tap Share → Choose email or WhatsApp. Documents shared via DigiLocker are legally valid – no need for physical photocopies!', illustration: 'https://img.icons8.com/color/200/share.png' }
    ],
    quizQuestions: [
      { question: 'What is DigiLocker used for?', options: ['Sending money', 'Storing digital documents', 'Booking train tickets', 'Making video calls'], answer: 1 },
      { question: 'Are documents shared via DigiLocker legally valid?', options: ['No, only the original works', 'Yes, they are legally accepted', 'Only for private use', 'Only for students'], answer: 1 },
      { question: 'What do you need to link your Aadhaar to DigiLocker?', options: ['Your PAN card number', 'Your bank account', 'Your mobile number linked to Aadhaar', 'Your passport'], answer: 2 }
    ]
  }
];

const fraudAlerts = [
  {
    title: 'UPI Scam – Collect Request Fraud',
    type: 'UPI Fraud',
    description: 'Scammers send a "Collect Request" on UPI disguised as a refund or prize. Accepting it actually SENDS money from your account, not receives.',
    tips: ['Never accept collect requests from unknown numbers', 'Real refunds never need you to "approve" a collect request', 'Call your bank directly if you are unsure'],
    createdAt: new Date('2024-11-01')
  },
  {
    title: 'Fake KYC Call – Bank Impersonation',
    type: 'KYC Fraud',
    description: 'You receive a call claiming your bank account will be suspended unless you complete "KYC" by sharing Aadhaar / PAN / OTP. This is a scam.',
    tips: ['Real banks NEVER ask for OTP or card PIN on a call', 'Hang up and call your bank\'s official number to verify', 'Do not click any link they send via SMS'],
    createdAt: new Date('2024-10-15')
  },
  {
    title: 'OTP Theft – Remote Access Scam',
    type: 'OTP Fraud',
    description: 'Scammer pretends to be tech support and asks you to install a screen-sharing app (AnyDesk/TeamViewer). They watch you enter your OTP and steal it.',
    tips: ['Never share your screen with strangers', 'No bank or government body asks you to install remote-access apps', 'Delete the app immediately if installed and change all passwords'],
    createdAt: new Date('2024-10-01')
  },
  {
    title: 'Lottery & Prize Fraud',
    type: 'Lottery Fraud',
    description: 'You get an SMS or WhatsApp message saying you won ₹25 lakh in a lottery. They ask for a "processing fee" or your bank details. There is no prize.',
    tips: ['You cannot win a lottery you never entered', 'Never pay any money to "claim" a prize', 'Report such messages to cybercrime.gov.in'],
    createdAt: new Date('2024-09-20')
  },
  {
    title: 'Fake Government App Fraud',
    type: 'Fake App',
    description: 'Fraudsters share links to fake UIDAI, EPFO, or Income Tax apps via WhatsApp. These apps steal your data and send OTPs to the scammer.',
    tips: ['Only download apps from official app stores (Play Store/App Store)', 'Check that the app developer is "Government of India" or official ministry', 'Never install APK files sent via WhatsApp or SMS'],
    createdAt: new Date('2024-09-05')
  }
];

async function seed() {
  console.log('🌱 Seeding modules...');
  for (const mod of modules) {
    const { id, ...data } = mod;
    await db.collection('modules').doc(id).set(data);
    console.log(`  ✅ Module: ${mod.title}`);
  }

  console.log('\n🌱 Seeding fraud alerts...');
  for (const alert of fraudAlerts) {
    const ref = await db.collection('fraudAlerts').add(alert);
    console.log(`  ✅ Alert [${ref.id}]: ${alert.title}`);
  }

  console.log('\n✅ Done! Firestore seeded successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
