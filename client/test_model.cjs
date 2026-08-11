const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const genAI = new GoogleGenerativeAI('AIzaSyC9CZWM1w-ojRoHtMvs9ygfDgWcbATQz2w');
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage("hello!");
    console.log(`SUCCESS:`, await result.response.text());
  } catch (e) {
    console.error(`FAIL:`, e.message);
  }
}
test();
