const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// --- 1. MEMORY STORAGE (Simple In-Memory Session) ---
// In a real startup, you'd use a database like MongoDB.
// For this demo, we store chat history here.
const chatSessions = {}; 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- 2. THE MASTER DATABASE (17+ Schemes) ---
const SCHOLARSHIP_DB = [
  // General & SC/ST/BC
  { name: "Jagananna Vidya Deevena (RTF)", details: "Full fee reimbursement for ITI, B.Tech, MBA. Income < 2.5L." },
  { name: "Jagananna Vasathi Deevena (MTF)", details: "₹20,000/year for hostel/food. Income < 2.5L." },
  { name: "Ambedkar Overseas Vidya Nidhi", details: "₹15 Lakhs for SC/ST students studying abroad. Income < 6L." },
  { name: "NSP Post Matric", details: "Central scholarship for Minority students (Muslim/Christian/etc). Income < 2L." },
  
  // Brahmin Welfare
  { name: "Bharati Scheme (Education)", details: "₹20,000 for Brahmin students in B.Tech/Degree. Income < 3L." },
  { name: "Veda Vyasa Scheme", details: "₹5,000/year for Vedic students. Income < 3L." },
  { name: "Bharati Overseas", details: "Up to ₹20 Lakhs for Brahmin students studying abroad." },

  // Disabled & Workers
  { name: "Free Laptops Scheme", details: "Free laptop for Differently Abled professional students. Income < 3L." },
  { name: "Motorized Three Wheelers", details: "Free vehicle for Orthopedically challenged. Income < 3L." },
  { name: "BOC Workers Scholarship", details: "₹20,000 for children of construction workers." }
];

app.get('/', (req, res) => res.send('🧠 SamartAI Memory Core Online'));

app.post('/chat', async (req, res) => {
  try {
    const { message, userId = 'default_user' } = req.body;
    console.log(`📩 [${userId}] says:`, message);

    // Initialize history for new users
    if (!chatSessions[userId]) {
      chatSessions[userId] = [];
    }

    // Add User Message to History
    chatSessions[userId].push({ role: "user", content: message });

    // Keep history manageable (last 10 messages)
    if (chatSessions[userId].length > 10) chatSessions[userId].shift();

    // --- 3. THE "CONTEXT-AWARE" PROMPT ---
    const historyText = chatSessions[userId].map(msg => 
      `${msg.role === 'user' ? 'USER' : 'AI'}: ${msg.content}`
    ).join('\n');

    const prompt = `
      ROLE: You are SamartAI, an intelligent scholarship counselor.
      
      YOUR KNOWLEDGE BASE:
      ${JSON.stringify(SCHOLARSHIP_DB)}

      CURRENT CHAT HISTORY:
      ${historyText}

      INSTRUCTIONS:
      1. Use the CHAT HISTORY to remember the user's details (Caste, Income, Course).
      2. If the user said "I am SC" previously, ONLY show SC schemes now.
      3. If the user asks "Am I eligible?", check their details against the database.
      4. If details are missing (e.g., income), ask for them politely.
      5. Keep answers short, friendly, and use emojis.

      RESPOND TO THE LAST USER MESSAGE:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const replyText = response.text();

    // Add AI Reply to History
    chatSessions[userId].push({ role: "ai", content: replyText });

    console.log("🤖 Reply sent.");
    res.json({ reply: replyText });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ reply: "⚠️ Connection unstable. Please try again." });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
