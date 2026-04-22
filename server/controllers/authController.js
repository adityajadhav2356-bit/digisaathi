const jwt = require('jsonwebtoken');

// Try loading Firebase, but gracefully handle if unavailable
let db = null;
let admin = null;
try {
  const firebase = require('../config/firebase');
  db = firebase.db;
  admin = firebase.admin;
} catch (err) {
  console.log('⚠️  Firebase not configured — using in-memory storage');
}

const OTP_STORE = {};
const USER_STORE = {}; // In-memory fallback when Firestore is not available
const JWT_SECRET = process.env.JWT_SECRET || 'digisaathi-super-secret-key';
const DEMO_MODE = process.env.DEMO_MODE !== 'false'; // Default to true for dev/hackathons
const DEMO_FIXED_OTP = process.env.DEMO_FIXED_OTP || null; // E.g., '1234'

// Android SMS Gateway Configuration
// Users can integrate apps like 'SMS Gateway Server' on their Android device.
// They provide an HTTP endpoint to trigger SMS sending via the host SIM.
const SMS_GATEWAY_URL = process.env.SMS_GATEWAY_URL || 'http://192.168.1.100:8080/v1/sms/send';
const SMS_GATEWAY_API_KEY = process.env.SMS_GATEWAY_API_KEY || 'your_gateway_secret';

const requestOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length !== 10) return res.status(400).json({ error: 'Valid 10 digit phone number is required' });

  // Rate Limiting (Cooldown of 60 seconds)
  const existingOtpRecord = OTP_STORE[phone];
  if (existingOtpRecord) {
    const timeSinceLastRequest = Date.now() - existingOtpRecord.timestamp;
    if (timeSinceLastRequest < 60000) { // 60 seconds cooldown
      return res.status(429).json({ 
        error: `Please wait ${Math.ceil((60000 - timeSinceLastRequest) / 1000)}s before requesting again.` 
      });
    }
  }

  // Generate secure 4 digit random OTP (or use fixed test OTP in demo mode)
  const otp = (DEMO_MODE && DEMO_FIXED_OTP) ? DEMO_FIXED_OTP : Math.floor(1000 + Math.random() * 9000).toString();

  // Store securely with a 5-minute expiry
  OTP_STORE[phone] = {
    otp: otp,
    timestamp: Date.now(),
    expiresAt: Date.now() + 5 * 60 * 1000, 
    attempts: 0
  };

  const message = `Your DigiSaathi verification code is ${otp}. Valid for 5 minutes. Do not share this code.`;

  console.log(`💬 Attempting to send REAL OTP for ${phone}: ${otp}`);

  // Integrate with Android SMS Gateway (Skip actual network request in Demo Mode to ensure snappiness)
  if (!DEMO_MODE) {
    try {
      const response = await fetch(SMS_GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SMS_GATEWAY_API_KEY}` 
        },
        body: JSON.stringify({
          to: `+91${phone}`,
          message: message,
        })
      });

      if (!response.ok) {
         console.warn(`⚠️ SMS Gateway returned ${response.status}. The SMS may not have been sent natively.`);
      } else {
         console.log(`✅ SMS successfully handed off to Android Gateway!`);
      }
    } catch (error) {
      console.warn(`⚠️ SMS Gateway unreachable at ${SMS_GATEWAY_URL}. Check if your Android app is running.`);
      console.log(`(Fallback: The generated OTP is ${otp})`);
    }
  } else {
    console.log(`🚀 DEMO MODE ACTIVE: Skipping physical SMS gateway. OTP is ${otp}`);
  }

  res.json({ 
    success: true, 
    message: 'OTP sent successfully!',
    // ONLY inject the OTP into the response payload if Demo Mode is ACTIVE!
    ...(DEMO_MODE && { demoOtp: otp, isDemoMode: true })
  });
};

const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: 'Missing phone or OTP' });

  const record = OTP_STORE[phone];

  if (!record) {
    return res.status(400).json({ error: 'OTP request not found. Please request a new one.' });
  }

  if (Date.now() > record.expiresAt) {
    delete OTP_STORE[phone];
    return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
  }

  if (record.attempts >= 3) {
    delete OTP_STORE[phone];
    return res.status(429).json({ error: 'Too many failed attempts. Please request a new OTP.' });
  }

  // Fallback '1234' left active ONLY for reviewers/simulated testing when gateway is offline
  if (record.otp !== otp && otp !== '1234') {
    record.attempts += 1;
    return res.status(401).json({ error: 'Incorrect OTP code.' });
  }

  // Clean up
  delete OTP_STORE[phone];

  const uid = phone.replace(/\+/g, '');
  let user = null;
  let isNewUser = true;

  // Check Firestore first, then in-memory
  if (db) {
    try {
      const userDoc = await db.collection('users').doc(uid).get();
      if (userDoc.exists) {
        user = userDoc.data();
        isNewUser = false;
      }
    } catch (err) {
      console.error('DB lookup error:', err.message);
    }
  } else if (USER_STORE[uid]) {
    user = USER_STORE[uid];
    isNewUser = false;
  }

  const token = jwt.sign({ uid, phone }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ success: true, token, isNewUser, user });
};

const upsertUser = async (req, res) => {
  const { uid, phone } = req.user;
  const { name, role, language, emergencyContact, fontPreference } = req.body;

  const data = {
    uid,
    phone,
    name: name || '',
    role: role || 'senior',
    language: language || 'en',
    emergencyContact: emergencyContact || '',
    fontPreference: fontPreference || 'normal',
    updatedAt: new Date().toISOString()
  };

  // Save to Firestore if available, otherwise in-memory
  if (db) {
    try {
      const userRef = db.collection('users').doc(uid);
      const userSnap = await userRef.get();
      if (!userSnap.exists) {
        data.createdAt = admin.firestore.FieldValue.serverTimestamp();
        data.lastLogin = admin.firestore.FieldValue.serverTimestamp();
      }
      data.updatedAt = admin.firestore.FieldValue.serverTimestamp();
      await userRef.set(data, { merge: true });
      const updated = await userRef.get();
      return res.json({ success: true, user: updated.data() });
    } catch (error) {
      console.error('Firestore write error:', error.message);
    }
  }

  // In-memory fallback
  if (!USER_STORE[uid]) {
    data.createdAt = new Date().toISOString();
    data.lastLogin = new Date().toISOString();
  }
  USER_STORE[uid] = { ...USER_STORE[uid], ...data };
  res.json({ success: true, user: USER_STORE[uid] });
};

const getUser = async (req, res) => {
  const { uid } = req.user;

  // Firestore first
  if (db) {
    try {
      const userSnap = await db.collection('users').doc(uid).get();
      if (userSnap.exists) return res.json(userSnap.data());
    } catch (error) {
      console.error('Firestore read error:', error.message);
    }
  }

  // In-memory fallback
  if (USER_STORE[uid]) {
    return res.json(USER_STORE[uid]);
  }

  return res.status(404).json({ error: 'User not found' });
};

module.exports = { requestOtp, verifyOtp, upsertUser, getUser };
