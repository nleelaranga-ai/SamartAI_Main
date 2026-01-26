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

// ---------------- GEMINI INIT ----------------
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ---------------- LOCAL SCHOLARSHIP DATA ----------------
const SCHOLARSHIPS = [
  {
    name: "Jagananna Vidya Deevena (RTF)",
    details: "Full tuition fee reimbursement for ITI, Polytechnic, Degree, BTech, MBA, MCA. For SC/ST/BC/EBC/Minorities."
  },
  {
    name: "Jagananna Vasathi Deevena (MTF)",
    details: "Financial support for hostel and food expenses for eligible students."
  },
  {
    name: "Ambedkar Overseas Vidya Nidhi",
    details: "Financial assistance for SC/ST students pursuing Masters or PhD abroad."
  },
  {
    name: "Bharati Scheme",
    details: "Financial aid for Brahmin students studying Degree or Professional courses."
  },
  {
    name: "Jagananna Vidya Kanuka",
    details: "Free laptops or tablets for eligible students."
  }
];

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

    const context = SCHOLARSHIPS.map(
      s => `• ${s.name}: ${s.details}`
    ).join("\n");

    const prompt = `
You are SamartAI, an AI assistant helping Indian students find government scholarships.

RULES:
- Use ONLY the scholarships listed below
- Do NOT invent new schemes
- If none match, explain clearly why
- Be friendly and simple
- Use emojis sparingly

SCHOLARSHIPS:
${context}

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
