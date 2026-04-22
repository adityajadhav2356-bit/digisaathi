const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getAllModules, getModuleById, saveProgress, getUserProgress } = require('../controllers/moduleController');

router.get('/', getAllModules);
router.get('/progress', verifyToken, getUserProgress);
router.get('/:id', getModuleById);
router.post('/progress', verifyToken, saveProgress);

module.exports = router;
