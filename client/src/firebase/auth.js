import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  signOut 
} from 'firebase/auth';
import { auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const googleProvider = new GoogleAuthProvider();

/**
 * Google Sign-In
 */
export const loginWithGoogle = async (role = 'Senior Citizen') => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user profile exists in Firestore
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || 'User',
        email: user.email,
        photoURL: user.photoURL || '',
        role: role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    return user;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

/**
 * Email & Password Registration
 */
export const registerWithEmail = async (email, password, displayName, role = 'Senior Citizen') => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      displayName: displayName,
      email: user.email,
      role: role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return user;
  } catch (error) {
    console.error('Email registration error:', error);
    throw error;
  }
};

/**
 * Email & Password Login
 */
export const loginWithEmail = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    console.error('Email login error:', error);
    throw error;
  }
};

/**
 * Setup Recaptcha for Phone Authentication
 */
export const setupRecaptcha = (containerId) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {}
    });
  }
  return window.recaptchaVerifier;
};

/**
 * Send Phone OTP
 */
export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Phone OTP send error:', error);
    throw error;
  }
};

/**
 * Logout User
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
