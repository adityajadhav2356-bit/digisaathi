const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAIResponse(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant for digital literacy questions, especially for senior citizens. Keep responses simple, clear, and encouraging.' },
        { role: 'user', content: message },
      ],
      max_tokens: 150,
    });
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI error:', error);
    return 'Sorry, I am unable to respond right now. Please try again later.';
  }
}

module.exports = { getAIResponse };