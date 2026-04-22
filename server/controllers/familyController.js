const { db } = require('../config/firebase');

const getFamilyView = async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database unavailable' });
  const { seniorId } = req.params;
  try {
    // Get senior profile
    const userSnap = await db.collection('users').doc(seniorId).get();
    if (!userSnap.exists) return res.status(404).json({ error: 'Senior not found' });
    const userData = userSnap.data();

    // Get progress
    const progressSnap = await db.collection('progress').where('userId', '==', seniorId).get();
    const progress = progressSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Compute days since last login
    const lastLogin = userData.lastLogin?.toDate ? userData.lastLogin.toDate() : null;
    const daysSinceLogin = lastLogin
      ? Math.floor((Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24))
      : null;

    res.json({
      name: userData.name,
      lastLogin: lastLogin ? lastLogin.toISOString() : null,
      daysSinceLogin,
      inactiveAlert: daysSinceLogin !== null && daysSinceLogin >= 5,
      modulesCompleted: progress.filter(p => p.quizPassed).length,
      progress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getFamilyView };
