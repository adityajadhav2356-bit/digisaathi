import { GoogleGenerativeAI } from '@google/generative-ai';

const initGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing API Key');
  return new GoogleGenerativeAI(apiKey);
};

const getSystemPrompt = (langCode) => `
You are DigiSaathi, an elite AI assistant designed specifically to help elderly users in India stay safe online. 
Your tone must be highly empathetic, respectful, warm, and extremely patient. 
You must speak simply without technical jargon. 

Core directives:
1. Explain scams, frauds, fake OTPs, and phishing clearly and warn users gently.
2. Never provide direct financial or investment advice.
3. Detect panic or emergency situations (like "someone took money from my account") and immediately advise them to call their bank and the Cyber Crime Helpline (1930).
4. Use markdown formatting like bullet points and bold text where helpful for readability.
5. ALWAYS reply in the language specified by ISO code: ${langCode}.
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
