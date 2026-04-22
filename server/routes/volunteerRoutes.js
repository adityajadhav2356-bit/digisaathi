const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { listVolunteers, requestSession, completeSession, getMyPairedSeniors, getLeaderboard } = require('../controllers/volunteerController');

router.get('/', listVolunteers);
router.get('/leaderboard', getLeaderboard);
router.get('/my-seniors', verifyToken, getMyPairedSeniors);
router.post('/request-session', verifyToken, requestSession);
router.patch('/sessions/:sessionId/complete', verifyToken, completeSession);

module.exports = router;
