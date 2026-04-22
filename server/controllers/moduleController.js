const { db, admin } = require('../config/firebase');

const getAllModules = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const snap = await db.collection('modules').get();
    const modules = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModuleById = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const doc = await db.collection('modules').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Module not found' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveProgress = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  const { uid } = req.user;
  const { moduleId, stepsCompleted, quizPassed } = req.body;
  try {
    const progressId = `${uid}_${moduleId}`;
    const progressRef = db.collection('progress').doc(progressId);
    const data = {
      userId: uid,
      moduleId,
      stepsCompleted: stepsCompleted || 0,
      quizPassed: quizPassed || false,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    if (quizPassed) data.completedAt = admin.firestore.FieldValue.serverTimestamp();
    await progressRef.set(data, { merge: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserProgress = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  const { uid } = req.user;
  try {
    const snap = await db.collection('progress').where('userId', '==', uid).get();
    const progress = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllModules, getModuleById, saveProgress, getUserProgress };
