const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'digisaathi-super-secret-key';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains { uid, phone }
    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { verifyToken };
