import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 10000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

/* ---------------- SCHOLARSHIP TRUTH (SOURCE OF FACT) ---------------- */

const SCHOLARSHIPS = [
  {
    name: "Jagananna Vidya Deevena",
    category: ["SC", "ST", "BC", "OC"],
    courses: ["BTech", "BCom", "Degree", "MBA", "MCA"],
    benefit: "Full tuition fee reimbursement",
    incomeLimit: 250000,
    link: "https://jnanabhumi.ap.gov.in/"
  },
  {
    name: "Jagananna Vasathi Deevena",
    category: ["SC", "ST", "BC", "OC"],
    courses: ["BTech", "BCom", "Degree"],
    benefit: "₹20,000 per year for hostel & food",
    incomeLimit: 250000,
    link: "https://jnanabhumi.ap.gov.in/"
  },
  {
    name: "Ambedkar Overseas Vidya Nidhi",
    category: ["SC", "ST"],
    courses: ["Masters", "PhD"],
    benefit: "Up to ₹15 Lakhs for overseas education",
    incomeLimit: 600000,
    link: "https://jnanabhumi.ap.gov.in/"
  }
];

/* ---------------- SIMPLE INTENT EXTRACTION ---------------- */

function extractProfile(text) {
  const q = text.toLowerCase();

  return {
    category:
      q.includes("sc") ? "SC" :
      q.includes("st") ? "ST" :
      q.includes("bc") ? "BC" :
      q.includes("oc") ? "OC" : null,

    course:
      q.includes("btech") ? "BTech" :
      q.includes("b.com") || q.includes("bcom") ? "BCom" :
      q.includes("degree") ? "Degree" :
      q.includes("mba") ? "MBA" :
      q.includes("mca") ? "MCA" :
      q.includes("masters") ? "Masters" :
      q.includes("phd") ? "PhD" : null,

    abroad: q.includes("abroad") || q.includes("overseas")
  };
}

/* ---------------- MATCH SCHOLARSHIPS (NO AI) ---------------- */

function matchScholarships(profile) {
  return SCHOLARSHIPS.filter(s =>
    (!profile.category || s.category.includes(profile.category)) &&
    (!profile.course || s.courses.includes(profile.course))
  );
}

/* ---------------- CHAT ENDPOINT ---------------- */

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.json({ reply: "Please ask a question." });

    const profile = extractProfile(message);
    const matches = matchScholarships(profile);

    /* --------- ASK FOLLOW-UP IF INFO MISSING --------- */

    if (!profile.course && profile.category) {
      return res.json({
        reply: "What course are you studying? (BTech, BCom, Degree, etc.)"
      });
    }

    if (matches.length === 0) {
      return res.json({
        reply: "I need more details. Are you asking about fees, hostel, or study abroad?"
      });
    }

    /* --------- BUILD SAFE PROMPT FOR GROQ --------- */

    const context = matches.map((s, i) =>
      `${i + 1}. ${s.name} – ${s.benefit} (Income below ₹${s.incomeLimit})`
    ).join("\n");

    const prompt = `
You are SamartAI, a government scholarship assistant.

IMPORTANT RULES:
- Use ONLY the scholarships listed below
- Do NOT invent schemes
- Explain eligibility clearly
- Ask follow-up questions if income is missing

SCHOLARSHIPS:
${context}

USER QUESTION:
"${message}"

ANSWER:
`;

    /* --------- CALL GROQ --------- */

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });

    const data = await groqResponse.json();

    if (!data.choices) {
      console.error("Groq error:", data);
      return res.json({ reply: "AI is temporarily unavailable." });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Server error. Please try again." });
  }
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`🚀 SamartAI Groq backend running on port ${PORT}`);
});
