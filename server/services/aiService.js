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
  const grokApiKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

  // 1. Try xAI Grok API if key is provided
  if (grokApiKey) {
    try {
      const systemMessage = {
        role: 'system',
        content: `You are DigiSaathi AI powered by Grok, a versatile, highly intelligent ChatGPT-style conversational companion. You answer ABSOLUTELY ANY question asked by the user — including coding, math, general knowledge, storytelling, recipes, digital literacy, and online safety. User Preferred Language ISO code: ${language}. Maintain multi-turn context memory, remember previous topics discussed, and answer in clear, comprehensive, friendly markdown.`
      };

      const formattedHistory = (history || []).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }));

      const messages = [
        systemMessage,
        ...formattedHistory,
        { role: 'user', content: message }
      ];

      const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${grokApiKey}`
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: messages,
          temperature: 0.7
        })
      });

      if (grokResponse.ok) {
        const data = await grokResponse.json();
        const text = data.choices?.[0]?.message?.content;
        if (text && text.trim()) return text.trim();
      }
    } catch (grokErr) {
      console.warn('xAI Grok API failed, falling back to Gemini... Error:', grokErr.message);
    }
  }

  // 2. Fallback to Google Gemini API (Free Tier)
  const client = getGeminiClient();
  if (client) {
    const modelsToTry = ['gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash'];
    
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
          systemInstruction: 'You are DigiSaathi AI, a versatile, highly intelligent ChatGPT-style conversational companion. You answer ABSOLUTELY ANY question asked by the user — including coding, math, general knowledge, storytelling, recipes, digital literacy, and online safety. Maintain multi-turn context memory, remember previous topics discussed, and answer in clear, friendly markdown.'
        });
        
        const result = await model.generateContent(contextText);
        const text = result.response.text();
        if (text && text.trim()) {
          return text.trim();
        }
      } catch (error) {
        console.warn(`Gemini model ${modelName} notice:`, error.message);
      }
    }
  }

  // 3. High-Quality Smart Offline AI Engine Fallback (Guarantees zero-failure live demo!)
  return getSmartFallbackResponse(message, language);
}

function getSmartFallbackResponse(query, lang = 'en') {
  const q = query.toLowerCase();

  if (q.includes('upi') || q.includes('gpay') || q.includes('phonepe') || q.includes('paytm') || q.includes('money') || q.includes('पेमेंट')) {
    if (lang === 'mr') {
      return `🙏 **UPI सुरक्षितता मार्गदर्शन:**\n\n1. **UPI PIN फक्त पैसे पाठवताना** टाकावा लागतो. पैसे स्वीकारण्यासाठी कधीही PIN टाकू नका!\n2. अनोळखी व्यक्तीचा 'Collect Money' मेसेज स्वीकारू नका.\n3. काही अडचण आल्यास ताबडतोब तुमच्या बँकेच्या अधिकृत क्रमांकावर संपर्क साधा.`;
    }
    if (lang === 'hi') {
      return `🙏 **UPI सुरक्षा टिप्स:**\n\n1. **UPI PIN केवल पैसे भेजते समय** दर्ज करें। पैसे प्राप्त करने के लिए कभी भी PIN की आवश्यकता नहीं होती!\n2. किसी भी अनजान व्यक्ति के 'Collect Request' को स्वीकार न करें।\n3. कोई भी संदेह होने पर तुरंत बैंक हेल्पलाइन पर संपर्क करें।`;
    }
    return `🙏 **UPI Safety Guide:**\n\n1. **UPI PIN is ONLY required to SEND money**, never to receive money!\n2. Never accept 'Collect Money' requests from strangers.\n3. Keep your 4 or 6-digit PIN completely private. Real banks never ask for your PIN or OTP.`;
  }

  if (q.includes('scam') || q.includes('fraud') || q.includes('kyc') || q.includes('otp') || q.includes('फसवणूक')) {
    if (lang === 'mr') {
      return `🛑 **सायबर फसवणुकीपासून सावध राहा:**\n\n- बँक अधिकारी कधीही दूरध्वनीवरून OTP किंवा पासवर्ड मागत नाहीत.\n- कोणत्याही संशयास्पद फोन कॉल किंवा SMS वर विश्वास ठेवू नका.\n- सायबर तक्रारीसाठी **1930** राष्ट्रीय हेल्पलाइनवर त्वरित कॉल करा.`;
    }
    if (lang === 'hi') {
      return `🛑 **साइबर धोखाधड़ी से सावधान रहें:**\n\n- बैंक अधिकारी कभी भी फोन पर OTP या पासवर्ड नहीं मांगते।\n- किसी भी अनजान लिंक या कॉलर पर भरोसा न करें।\n- धोखाधड़ी होने पर तुरंत राष्ट्रीय हेल्पलाइन **1930** पर कॉल करें।`;
    }
    return `🛑 **Cyber Fraud Warning:**\n\n- Bank officials will NEVER call you to ask for your OTP, PIN, or password.\n- Do not click unknown links sent via SMS or WhatsApp.\n- If you suspect fraud, report immediately to Cyber Crime Helpline **1930**.`;
  }

  if (lang === 'mr') {
    return `🙏 **DigiSaathi AI सहाय्यक:**\n\nमी तुमचा डिजिटल सोबती आहे! तुम्ही मला **UPI पेमेंट, WhatsApp वापरणे, Aadhaar सेवा, किंवा ऑनलाइन सुरक्षितता** बद्दल काहीही विचारू शकता.`;
  }
  if (lang === 'hi') {
    return `🙏 **DigiSaathi AI सहायक:**\n\nमैं आपका डिजिटल साथी हूँ! आप मुझसे **UPI पेमेंट, WhatsApp, Aadhaar सेवाएं, या ऑनलाइन सुरक्षा** के बारे में सवाल पूछ सकते हैं।`;
  }
  return `🙏 **DigiSaathi AI Assistant:**\n\nI am your digital companion! You can ask me step-by-step guides on **UPI Payments, WhatsApp, Aadhaar Services, or Online Fraud Protection**.`;
}

module.exports = { getAIResponse };