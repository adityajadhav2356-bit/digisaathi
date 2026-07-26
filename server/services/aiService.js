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
        systemInstruction: 'You are a helpful AI assistant for digital literacy questions, especially for senior citizens. Keep responses simple, clear, concise (2-3 sentences max), and encouraging.'
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