const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getFamilyView } = require('../controllers/familyController');

router.get('/:seniorId', verifyToken, getFamilyView);

module.exports = router;
