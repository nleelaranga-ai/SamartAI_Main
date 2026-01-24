const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors()); // Allows your Vercel frontend to talk to this
app.use(express.json());

const PORT = process.env.PORT || 3000;

// --- CONFIGURATION ---
// We use the environment variable from Render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- KNOWLEDGE BASE ---
const SCHOLARSHIP_CONTEXT = `
You are SamartAI, an expert scholarship assistant.
Knowledge Base:
1. Jagananna Vidya Deevena: Full fee reimbursement. Income < 2.5L.
2. Jagananna Vasathi Deevena: ₹20,000/year for hostel/food.
3. Ambedkar Overseas Vidya Nidhi: ₹15 Lakhs for study abroad (SC/ST).
4. Free Laptops Scheme: For Differently Abled professional students.
`;

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('SamartAI Brain is Active 🧠');
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log("📩 Received:", message);

    const prompt = `${SCHOLARSHIP_CONTEXT}\n\nUser: ${message}\nAI:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("🤖 Reply:", text);
    res.json({ reply: text });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ reply: "I'm having trouble connecting to the brain right now." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
