const express = require('express');

const router = express.Router();

const {
  chatWithAI,
  getChats,
  getChatById,
  renameChat,
  deleteChat
} = require('../controllers/aiController');

router.post('/chat', chatWithAI);
router.get('/chats', getChats);
router.get('/chats/:chatId', getChatById);
router.put('/chats/:chatId/rename', renameChat);
router.delete('/chats/:chatId', deleteChat);

module.exports = router;