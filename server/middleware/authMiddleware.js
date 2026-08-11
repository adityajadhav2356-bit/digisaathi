const { auth } = require('../firebaseAdmin');

/**
 * Express Middleware to verify Firebase ID Tokens
 */
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token format' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    if (!auth) {
      // In dev mode without admin credentials, pass through
      req.user = { uid: 'guest_uid', email: 'guest@digisaathi.com', role: 'Senior Citizen' };
      return next();
    }
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase token verification error:', error.message);
    res.status(403).json({ error: 'Forbidden: Invalid or expired Firebase token' });
  }
};

module.exports = { verifyFirebaseToken };
