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

async function getAIResponse(message) {
  const client = getGeminiClient();
  if (!client) {
    return 'AI service is not configured. Please set the GEMINI_API_KEY environment variable.';
  }

  const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-pro'];
  
  for (const modelName of modelsToTry) {
    try {
      const model = client.getGenerativeModel({ 
        model: modelName,
        systemInstruction: 'You are DigiSaathi AI, a warm, friendly, and informal AI companion for users and senior citizens in India. You can chat about ANYTHING — general knowledge, daily conversation, jokes, weather, recipes, health, life advice, as well as digital payments and internet safety. Keep responses warm, natural, simple, and concise (2-3 sentences max). Always respond in the language used by the user.'
      });
      
      const result = await model.generateContent(message);
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