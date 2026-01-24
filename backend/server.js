const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();

// 1. ALLOW ALL ORIGINS (Fixes CORS issues)
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

// 2. LOG EVERY REQUEST (To debug connection)
app.use((req, res, next) => {
  console.log(`📡 Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SCHOLARSHIP_DB = [
  { name: "Jagananna Vidya Deevena", details: "Full fee reimbursement for ITI, B.Tech, MBA. Income < 2.5L." },
  { name: "Jagananna Vasathi Deevena", details: "₹20,000/year for hostel/food. Income < 2.5L." },
  { name: "Ambedkar Overseas Vidya Nidhi", details: "₹15 Lakhs for SC/ST students studying abroad (Masters/PhD). Income < 6L." },
  { name: "Bharati Scheme", details: "₹20,000 for Brahmin students in B.Tech/Degree. Income < 3L." },
  { name: "Free Laptops Scheme", details: "Free laptop for Differently Abled professional students." },
  { name: "BOC Workers Scholarship", details: "₹20,000 for children of construction workers." }
];

app.get('/', (req, res) => {
  res.send('✅ SamartAI Brain is Online & Reachable!');
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log("📩 User Message:", message);

    const prompt = `
      SYSTEM: You are SamartAI.
      DATA: ${JSON.stringify(SCHOLARSHIP_DB)}
      USER: "${message}"
      INSTRUCTION: concise, friendly answer with emojis.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("🤖 Sending Reply");
    res.json({ reply: text });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ reply: "My brain is tired. Please try again." });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
