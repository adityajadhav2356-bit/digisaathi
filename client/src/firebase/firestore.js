import { 
  db 
} from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Collection Constants
export const COLLECTIONS = {
  USERS: 'users',
  VOLUNTEERS: 'volunteers',
  NGOS: 'ngos',
  APPOINTMENTS: 'appointments',
  CHAT_HISTORY: 'chatHistory',
  PAYMENT_SAFETY: 'paymentSafety',
  NOTIFICATIONS: 'notifications',
  GOVT_SCHEMES: 'governmentSchemes',
  SCAM_REPORTS: 'scamReports',
  LEARNING_PROGRESS: 'learningProgress',
  VOICE_HISTORY: 'voiceHistory',
  SETTINGS: 'settings'
};

// Generic Document Setter
export const setDocument = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

// Generic Document Getter
export const getDocument = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// Generic Document Adder (Auto ID)
export const addDocument = async (collectionName, data) => {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return docRef.id;
};

// Generic Collection Fetcher
export const getCollectionDocs = async (collectionName, constraints = []) => {
  const colRef = collection(db, collectionName);
  const q = query(colRef, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Real-Time Collection Listener
export const subscribeToCollection = (collectionName, callback, constraints = []) => {
  const colRef = collection(db, collectionName);
  const q = query(colRef, ...constraints);
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

// -------------------------------------------------------------
// CHAT HISTORY SPECIFIC FUNCTIONS
// -------------------------------------------------------------
export const saveChatMessage = async (userId, chatId, title, messages) => {
  const chatRef = doc(db, COLLECTIONS.CHAT_HISTORY, chatId);
  await setDoc(chatRef, {
    userId,
    chatId,
    title: title || 'New Conversation',
    messages,
    updatedAt: new Date().toISOString()
  }, { merge: true });
};

export const getUserChatHistory = async (userId) => {
  const colRef = collection(db, COLLECTIONS.CHAT_HISTORY);
  const q = query(colRef, where('userId', '==', userId), orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToUserChats = (userId, callback) => {
  const colRef = collection(db, COLLECTIONS.CHAT_HISTORY);
  const q = query(colRef, where('userId', '==', userId));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const deleteChatHistory = async (chatId) => {
  const chatRef = doc(db, COLLECTIONS.CHAT_HISTORY, chatId);
  await deleteDoc(chatRef);
};
