import { useState, useEffect } from 'react';

// Use a broadcast channel or storage events to simulate realtime WebSockets for hackathon presentations.
// In production, this would be replaced by Socket.io or Firebase realtime listeners.

const STORAGE_KEY = 'digisaathi_bookings_db';

const getInitialDB = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

let db = getInitialDB();
let listeners = [];

const notifyListeners = () => {
  listeners.forEach(fn => fn(db));
};

export const subscribeToBookings = (listener) => {
  listeners.push(listener);
  listener(db);
  return () => {
    listeners = listeners.filter(fn => fn !== listener);
  };
};

// Global Sync (Cross-Tab for Hackathons)
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    db = getInitialDB();
    notifyListeners();
  }
});

// APIs
export const createBooking = (seniorDetails, topic, timeSlot, isSOS = false) => {
  const newBooking = {
    id: `req_${Date.now()}`,
    seniorName: seniorDetails.name || 'Anonymous Senior',
    seniorPhone: seniorDetails.phone || '9999999999',
    seniorAvatar: seniorDetails.avatar || null,
    topic: isSOS ? 'EMERGENCY ASSISTANCE NEEDED!' : topic,
    timeSlot,
    status: isSOS ? 'sos_pending' : 'pending', // pending | accepted | in_progress | completed | cancelled | sos_pending
    isSOS,
    createdAt: new Date().toISOString(),
    
    // Advanced Ecosystem Features
    messages: [], // { sender: 'senior'|'volunteer', text: '', timestamp: '' }
    tasks: [],    // { id: '', text: '', completed: false }
    volunteerNotes: '',
    rating: null  // { score: 5, comment: '' }
  };
  
  db = [newBooking, ...db];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  notifyListeners();
  
  // Custom event for same-tab updates
  window.dispatchEvent(new Event('ds_bookings_updated'));
  return newBooking.id;
};

export const updateBookingStatus = (id, newStatus) => {
  db = db.map(b => b.id === id ? { ...b, status: newStatus } : b);
  _saveAndNotify();
};

export const addMessage = (bookingId, sender, text) => {
  db = db.map(b => {
    if (b.id !== bookingId) return b;
    return { ...b, messages: [...(b.messages || []), { sender, text, timestamp: new Date().toISOString() }] };
  });
  _saveAndNotify();
};

export const assignTask = (bookingId, text) => {
  db = db.map(b => {
    if (b.id !== bookingId) return b;
    return { ...b, tasks: [...(b.tasks || []), { id: `task_${Date.now()}`, text, completed: false }] };
  });
  _saveAndNotify();
};

export const completeTask = (bookingId, taskId) => {
  db = db.map(b => {
    if (b.id !== bookingId) return b;
    const newTasks = b.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t);
    return { ...b, tasks: newTasks };
  });
  _saveAndNotify();
};

export const saveVolunteerNotes = (bookingId, notes) => {
  db = db.map(b => b.id === bookingId ? { ...b, volunteerNotes: notes } : b);
  _saveAndNotify();
};

export const submitSeniorReview = (bookingId, score, comment) => {
  db = db.map(b => b.id === bookingId ? { ...b, rating: { score, comment } } : b);
  _saveAndNotify();
};

const _saveAndNotify = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  notifyListeners();
  window.dispatchEvent(new Event('ds_bookings_updated'));
};

export const getBookingsByStatus = (statusArray) => {
  return db.filter(b => statusArray.includes(b.status));
};

// Listen internally if triggered by same tab
window.addEventListener('ds_bookings_updated', () => {
  db = getInitialDB();
  notifyListeners();
});
