const { getAIResponse } = require('../services/aiService');
const Chat = require('../models/Chat');

// Chat with AI (supports multi-turn history & optional MongoDB saving)
const chatWithAI = async (req, res) => {
  const { message, history, language, chatId, userId } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await getAIResponse(message, history || [], language || 'en');

    // Optionally save/update in MongoDB if chatId is provided or database is connected
    if (chatId) {
      try {
        let chat = await Chat.findOne({ chatId });
        if (!chat) {
          const title = message.slice(0, 30) + (message.length > 30 ? '...' : '');
          chat = new Chat({
            chatId,
            userId: userId || 'default_user',
            title,
            language: language || 'en',
            messages: []
          });
        }
        chat.messages.push({ role: 'user', content: message });
        chat.messages.push({ role: 'assistant', content: response });
        chat.updatedAt = Date.now();
        await chat.save();
      } catch (dbErr) {
        console.warn('MongoDB save warning:', dbErr.message);
      }
    }

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

// GET all chats for a user
const getChats = async (req, res) => {
  const userId = req.query.userId || 'default_user';
  try {
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

// GET single chat details
const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({ chatId: req.params.chatId });
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
};

// RENAME chat
const renameChat = async (req, res) => {
  const { title } = req.body;
  try {
    const chat = await Chat.findOneAndUpdate(
      { chatId: req.params.chatId },
      { title, updatedAt: Date.now() },
      { new: true }
    );
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to rename chat' });
  }
};

// DELETE chat
const deleteChat = async (req, res) => {
  try {
    await Chat.deleteOne({ chatId: req.params.chatId });
    res.json({ message: 'Chat deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete chat' });
  }
};

module.exports = {
  chatWithAI,
  getChats,
  getChatById,
  renameChat,
  deleteChat
};