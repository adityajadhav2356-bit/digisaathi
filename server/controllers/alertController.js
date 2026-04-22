const { db } = require('../config/firebase');

const getAlerts = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const snap = await db.collection('fraudAlerts').orderBy('createdAt', 'desc').get();
    const alerts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuizByModule = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  try {
    const doc = await db.collection('modules').doc(req.params.moduleId).get();
    if (!doc.exists) return res.status(404).json({ error: 'Module not found' });
    res.json(doc.data().quizQuestions || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAlerts, getQuizByModule };
