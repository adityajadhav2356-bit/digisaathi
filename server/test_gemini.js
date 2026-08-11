const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const genAI = new GoogleGenerativeAI('AIzaSyAx-UESV_MBAC94YjZJFEwCUVdLWmOkXyc');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say 'hello'");
    console.log("Success:", await result.response.text());
  } catch (e) {
    console.error("Error:", e.message);
  }
}
test();
