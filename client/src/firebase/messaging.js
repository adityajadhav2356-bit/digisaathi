import { messaging } from './firebase';
import { getToken, onMessage } from 'firebase/messaging';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'BF_DummyVapidKeyForDigiSaathiBuild12345';

/**
 * Request Notification Permission and Get FCM Token
 */
export const requestFCMToken = async () => {
  if (!messaging) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      return currentToken;
    }
  } catch (error) {
    console.warn('FCM token request error:', error);
  }
  return null;
};

/**
 * Listen for Foreground FCM Push Notifications
 */
export const onForegroundMessage = (callback) => {
  if (!messaging) return () => {};
  return onMessage(messaging, (payload) => {
    console.log('Foreground FCM Message received:', payload);
    if (callback) callback(payload);
  });
};

/**
 * Notification Types Supported in DigiSaathi
 */
export const NOTIFICATION_TYPES = {
  MEDICINE_REMINDER: 'Medicine Reminder',
  APPOINTMENT_REMINDER: 'Appointment Reminder',
  VOLUNTEER_REQUEST: 'Volunteer Request',
  EMERGENCY_SOS: 'Emergency SOS',
  PAYMENT_WARNING: 'Payment Warning',
  SCAM_ALERT: 'Scam Alert'
};
