// Controller: AI Advice (one-shot summary)
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sql } from "../config/db.js";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getAIAdvice(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const transactions = await sql`
      SELECT title, amount, category, created_at FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `;

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found for this user." });
    }

    // prepare compact text
    const sample = transactions.slice(0, 50).map(t => `${t.title}: ${t.amount} (${t.category})`).join("\n");

    // AI prompt for Gemini
    const prompt = `
    You are an AI financial advisor.
    Based on the user's recent transactions below, give personalized financial advice.
    Focus on budgeting tips, saving strategies, and spending habits.
    Keep your answer short, practical, and easy to understand.

    Transactions:
    ${sample}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiAdvice = response.text();

    res.json({ aiAdvice });

    } catch (error) {
    console.error("Error generating AI advice:", error);
    res.status(500).json({ error: "Failed to generate AI advice." });
  }
}