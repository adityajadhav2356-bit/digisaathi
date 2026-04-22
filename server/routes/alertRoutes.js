const express = require('express');
const router = express.Router();
const { getAlerts, getQuizByModule } = require('../controllers/alertController');

router.get('/', getAlerts);
router.get('/quiz/:moduleId', getQuizByModule);

module.exports = router;
