const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 10000;
const HF_API_KEY = process.env.HF_API_KEY;

// ---------------- HEALTH ----------------
app.get("/", (req, res) => {
  res.send("🧠 SamartAI Brain Online");
});

// ---------------- CHAT ----------------
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `
You are SamartAI, an assistant helping Indian students find government scholarships.
Be concise, friendly, and practical. Use emojis when helpful.

User: ${message}
Assistant:
`
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("❌ HF Error:", data);
      return res.json({
        reply: "⚠️ AI is warming up. Please try again in a few seconds."
      });
    }

    const reply =
      data[0]?.generated_text?.split("Assistant:").pop()?.trim() ||
      "⚠️ No response generated.";

    res.json({ reply });

  } catch (error) {
    console.error("❌ Backend Error:", error);
    res.json({
      reply: "⚠️ My brain is restarting. Please try again."
    });
  }
});

// ---------------- START ----------------
app.listen(PORT, () => {
  console.log(`🚀 SamartAI Backend running on port ${PORT}`);
});
