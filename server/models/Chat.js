const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant', 'model'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  userId: { type: String, default: 'default_user' },
  title: { type: String, default: 'New Conversation' },
  language: { type: String, default: 'en' },
  messages: [messageSchema],
  timestamp: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
