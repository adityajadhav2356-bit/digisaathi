const { db, admin } = require('../config/firebase');

const listVolunteers = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const snap = await db.collection('users').where('role', '==', 'volunteer').get();
    const volunteers = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requestSession = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  const { uid } = req.user;
  const { volunteerId, scheduledAt, language } = req.body;
  try {
    const sessionRef = await db.collection('volunteerSessions').add({
      seniorId: uid,
      volunteerId: volunteerId || null,
      scheduledAt: scheduledAt || null,
      language: language || 'en',
      status: 'requested',
      notes: '',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ success: true, sessionId: sessionRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeSession = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  const { sessionId } = req.params;
  const { notes } = req.body;
  try {
    await db.collection('volunteerSessions').doc(sessionId).update({
      status: 'completed',
      notes: notes || '',
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyPairedSeniors = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  const { uid } = req.user;
  try {
    const snap = await db.collection('volunteerSessions').where('volunteerId', '==', uid).get();
    const sessions = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const snap = await db.collection('volunteerSessions').where('status', '==', 'completed').get();
    const counts = {};
    snap.docs.forEach(d => {
      const vid = d.data().volunteerId;
      if (vid) counts[vid] = (counts[vid] || 0) + 1;
    });
    const leaderboard = Object.entries(counts)
      .map(([volunteerId, sessions]) => ({ volunteerId, sessions }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listVolunteers, requestSession, completeSession, getMyPairedSeniors, getLeaderboard };
