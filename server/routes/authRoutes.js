const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { requestOtp, verifyOtp, upsertUser, getUser } = require('../controllers/authController');

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.get('/profile', verifyToken, getUser);
router.post('/profile', verifyToken, upsertUser);

module.exports = router;
