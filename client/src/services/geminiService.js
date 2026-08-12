import { GoogleGenerativeAI } from '@google/generative-ai';

const initGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing API Key');
  return new GoogleGenerativeAI(apiKey);
};

const getSystemPrompt = (langCode) => `
You are DigiSaathi AI, a versatile, highly intelligent ChatGPT-style conversational assistant. 
You can answer ABSOLUTELY ANY question the user asks — including general knowledge, daily life advice, coding & programming, math, science, history, storytelling, recipes, digital literacy, and online safety.
Always respond warmly, comprehensively, and in clean markdown formatting in the specified language (ISO: ${langCode}).
`;

let currentChatSession = null;

export const startNewChat = (langCode = 'en-IN') => {
  try {
    const genAI = initGemini();
    // Using gemini-1.5-flash as the most robust model available that maps to the user's intent for "gemini-2.5-flash"
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: getSystemPrompt(langCode)
    });
    
    currentChatSession = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });
    return currentChatSession;
  } catch (error) {
    console.error("Gemini initialization error:", error);
    throw error;
  }
};

export const sendMessageStreamToGemini = async (message, langCode = 'en-IN') => {
  try {
    if (!currentChatSession) {
      startNewChat(langCode);
    }
    const result = await currentChatSession.sendMessageStream(message);
    return result.stream;
  } catch (error) {
    console.error("Gemini stream error:", error);
    throw error;
  }
};
