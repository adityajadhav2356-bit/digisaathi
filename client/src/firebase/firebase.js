import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported as isMessagingSupported } from 'firebase/messaging';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDigiSaathiBuild123",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "digisaathinew.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "digisaathinew",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://digisaathinew-default-rtdb.firebaseio.com",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "digisaathinew.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "103082396282949165239",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:103082396282949165239:web:abcdef1234567890",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ABCDEF1234"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Safe Analytics Initialization
export let analytics = null;
if (typeof window !== 'undefined') {
  isAnalyticsSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  }).catch(() => {});
}

// Safe FCM Messaging Initialization
export let messaging = null;
if (typeof window !== 'undefined') {
  isMessagingSupported().then((supported) => {
    if (supported) messaging = getMessaging(app);
  }).catch(() => {});
}

export default app;
