const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;

function getGeminiClient() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      return null;
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

/**
 * Generate multi-turn conversational response with context memory
 * @param {string} message - Current user query
 * @param {Array} history - Array of previous messages [{ role: 'user'|'assistant', content: string }]
 * @param {string} language - User language preference (en, hi, mr, ta, te, gu, kn, ml, pa, bn)
 */
async function getAIResponse(message, history = [], language = 'en') {
  const client = getGeminiClient();
  if (!client) {
    return 'AI service is not configured. Please set the GEMINI_API_KEY environment variable.';
  }

  const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-pro'];
  
  // Format past history into text context if multi-turn
  let contextText = `User Preferred Language: ${language}.\n`;
  if (history && history.length > 0) {
    contextText += "Previous Conversation Context:\n";
    history.forEach(m => {
      const sender = m.role === 'user' ? 'User' : 'Assistant';
      contextText += `${sender}: ${m.content}\n`;
    });
  }
  contextText += `User Current Question: ${message}`;

  for (const modelName of modelsToTry) {
    try {
      const model = client.getGenerativeModel({ 
        model: modelName,
        systemInstruction: 'You are DigiSaathi AI, a warm, intelligent, ChatGPT-like conversational companion for users in India. Maintain multi-turn context memory, remember previous topics discussed, fulfill follow-up requests naturally (e.g. simplifying, translating to Marathi/Hindi, re-explaining), and answer in clear, friendly markdown.'
      });
      
      const result = await model.generateContent(contextText);
      const text = result.response.text();
      if (text && text.trim()) {
        return text.trim();
      }
    } catch (error) {
      console.warn(`Gemini model ${modelName} failed, trying next model... Error:`, error.message);
    }
  }

  return 'Sorry, I am unable to connect to AI right now. Please try asking again later.';
}

module.exports = { getAIResponse };