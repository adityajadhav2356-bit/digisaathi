const { getAIResponse } = require('../services/aiService');
const { db } = require('../firebaseAdmin');

// Chat with AI (Multi-turn with Firestore chatHistory persistence)
const chatWithAI = async (req, res) => {
  const { message, history, language, chatId, userId } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await getAIResponse(message, history || [], language || 'en');

    // Save multi-turn conversation memory to Firestore chatHistory collection
    if (chatId && db) {
      try {
        const chatRef = db.collection('chatHistory').doc(chatId);
        const docSnap = await chatRef.get();

        const newMessages = [
          ...(docSnap.exists ? docSnap.data().messages || [] : (history || [])),
          { role: 'user', content: message, timestamp: new Date().toISOString() },
          { role: 'assistant', content: response, timestamp: new Date().toISOString() }
        ];

        const title = docSnap.exists && docSnap.data().title 
          ? docSnap.data().title 
          : message.slice(0, 30) + (message.length > 30 ? '...' : '');

        await chatRef.set({
          chatId,
          userId: userId || 'default_user',
          title,
          language: language || 'en',
          messages: newMessages,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (firestoreErr) {
        console.warn('Firestore chat saving warning:', firestoreErr.message);
      }
    }

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

// GET all chats for a user from Firestore
const getChats = async (req, res) => {
  const userId = req.query.userId || 'default_user';
  try {
    if (db) {
      const snapshot = await db.collection('chatHistory')
        .where('userId', '==', userId)
        .get();
      const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.json(chats);
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats from Firestore' });
  }
};

// GET single chat details from Firestore
const getChatById = async (req, res) => {
  try {
    if (db) {
      const docSnap = await db.collection('chatHistory').doc(req.params.chatId).get();
      if (!docSnap.exists) return res.status(404).json({ error: 'Chat not found' });
      return res.json({ id: docSnap.id, ...docSnap.data() });
    }
    res.status(404).json({ error: 'Chat not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
};

// RENAME chat in Firestore
const renameChat = async (req, res) => {
  const { title } = req.body;
  try {
    if (db) {
      const chatRef = db.collection('chatHistory').doc(req.params.chatId);
      await chatRef.update({ title, updatedAt: new Date().toISOString() });
      return res.json({ message: 'Chat renamed successfully' });
    }
    res.json({ message: 'Renamed locally' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to rename chat' });
  }
};

// DELETE chat from Firestore
const deleteChat = async (req, res) => {
  try {
    if (db) {
      await db.collection('chatHistory').doc(req.params.chatId).delete();
    }
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