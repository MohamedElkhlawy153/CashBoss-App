// Controller: AI Chat (message -> reply)
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getAIChatReply(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message required" });

    const prompt = `
    You are an AI chat assistant.
    Engage in a friendly and helpful conversation with the user.
    Provide clear, concise, and relevant responses to their messages.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(`${prompt}\nUser: ${message}\nAI:`);
    const response = await result.response;
    const aiReply = response.text();

    res.json({ aiReply });

  } catch (error) {
    console.error("Error generating AI chat reply:", error);
    res.status(500).json({ error: "Failed to generate AI chat reply." });
  }
}