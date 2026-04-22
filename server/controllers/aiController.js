const { getAIResponse } = require('../services/aiService');

const chatWithAI = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await getAIResponse(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

module.exports = { chatWithAI };