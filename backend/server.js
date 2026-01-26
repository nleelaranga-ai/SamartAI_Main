import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 10000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ---------------- INIT GEMINI ----------------
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ---------------- LOCAL SCHOLARSHIP DATA ----------------
const SCHOLARSHIPS = `
1. Jagananna Vidya Deevena (RTF):
   Full tuition fee reimbursement for ITI, Polytechnic, Degree, BTech, MBA, MCA.
   Eligible: SC, ST, BC, EBC, Minority students.

2. Jagananna Vasathi Deevena (MTF):
   Financial support for hostel and food expenses.

3. Ambedkar Overseas Vidya Nidhi:
   Financial assistance for SC/ST students pursuing Masters or PhD abroad.

4. Bharati Scheme:
   Financial aid for Brahmin students studying Degree or Professional courses.

5. Jagananna Vidya Kanuka:
   Free laptops or tablets for eligible students.
`;

// ---------------- HEALTH ----------------
app.get("/", (req, res) => {
  res.send("🧠 SamartAI Gemini Backend Online");
});

// ---------------- CHAT ----------------
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "⚠️ Please ask a question." });
    }

    const prompt = `
You are SamartAI, an AI assistant helping Indian students find government scholarships.

STRICT RULES:
- Use ONLY the scholarships listed below
- Do NOT invent new schemes
- If no scholarship applies, explain clearly why
- Be friendly and conversational
- Use simple language and emojis sparingly

SCHOLARSHIPS:
${SCHOLARSHIPS}

USER QUESTION:
${message}

ANSWER:
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {
    console.error("❌ Gemini Error:", error);
    res.json({
      reply: "⚠️ AI is temporarily unavailable. Please try again."
    });
  }
});

// ---------------- START ----------------
app.listen(PORT, () => {
  console.log(`🚀 SamartAI Gemini backend running on port ${PORT}`);
});
