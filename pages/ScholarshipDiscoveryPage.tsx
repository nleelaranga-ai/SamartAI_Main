import React, { useState, useEffect } from "react";
import { MicrophoneButton } from "../components/MicrophoneButton";
import { ChatWindow } from "../components/ChatWindow";
import { useAppContext } from "../context/AppContext";
import { sendMessageToAI } from "../services/geminiService";
import { scholarshipService } from "../services/scholarshipService";

// --- LOCAL FALLBACK DATABASE (ONLY if backend fails) ---
const SCHOLARSHIP_DB = [
  { name: "Jagananna Vidya Deevena", details: "Full fee reimbursement for ITI, B.Tech, MBA.", link: "https://jnanabhumi.ap.gov.in/" },
  { name: "Jagananna Vasathi Deevena", details: "₹20,000/year for hostel & food.", link: "https://jnanabhumi.ap.gov.in/" },
  { name: "Ambedkar Overseas Vidya Nidhi", details: "₹15 Lakhs for SC/ST students studying abroad.", link: "https://jnanabhumi.ap.gov.in/" },
  { name: "Bharati Scheme", details: "₹20,000 for Brahmin students.", link: "https://apadapter.ap.gov.in/" }
];

export const ScholarshipDiscoveryPage: React.FC = () => {
  const { messages, addMessage, isRecording, setIsRecording } = useAppContext();
  const [inputText, setInputText] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // ---- INITIAL WELCOME ----
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        type: "ai",
        text:
          "👋 **Namaste! I am SamartAI.**\n\n" +
          "I help students find **government scholarships**.\n\n" +
          "Try asking:\n" +
          "✨ *BTech fees*\n" +
          "✨ *SC student scholarships*\n" +
          "✨ *Free laptop scheme*\n" +
          "✨ *Study abroad*"
      });
    }
  }, []);

  // ---- MAIN CHAT LOGIC (GEMINI FIRST) ----
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userQuery = inputText;
    setInputText("");
    addMessage({ type: "user", text: userQuery });
    setIsLoadingAI(true);

    try {
      // ✅ PRIMARY: GEMINI BACKEND
      const aiReply = await sendMessageToAI(userQuery);
      addMessage({ type: "ai", text: aiReply });
    } catch (error) {
      // ⚠️ FALLBACK: LOCAL DB (ONLY if backend is DOWN)
      const results = scholarshipService.searchScholarships
        ? await scholarshipService.searchScholarships(userQuery)
        : [];

      if (results && results.length > 0) {
        const reply =
          `⚠️ AI is temporarily unavailable.\n\n` +
          `Here are some scholarships that may help:\n\n` +
          results
            .map(
              (s: any) =>
                `🎓 **${s.name}**\n${s.description}\n[Apply Here](${s.applicationLink})`
            )
            .join("\n\n");

        addMessage({ type: "ai", text: reply });
      } else {
        addMessage({
          type: "ai",
          text:
            "⚠️ AI is temporarily unavailable.\n\n" +
            "Please try again in a few seconds."
        });
      }
    } finally {
      setIsLoadingAI(false);
    }
  };

  // ---- VOICE INPUT ----
  const toggleRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input works best in Chrome.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
      };
      recognition.start();
    }
  };

  // ---- UI (UNCHANGED) ----
  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)] flex flex-col max-w-5xl">
      <div className="flex-grow overflow-hidden flex flex-col bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(79,70,229,0.15)] border border-white/10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          <ChatWindow messages={messages} isLoadingAIResponse={isLoadingAI} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-gray-900/40 border-t border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3 bg-black/40 rounded-full p-2 border border-white/10">
            <MicrophoneButton
              onToggleRecording={toggleRecording}
              isLoading={isRecording}
            />

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-grow bg-transparent text-white px-3 py-2 focus:outline-none placeholder-gray-500"
            />

            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoadingAI}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
            >
              {isLoadingAI ? "⏳" : "➤"}
            </button>
          </div>

          {/* Quick Chips */}
          <div className="flex gap-2 mt-3 overflow-x-auto justify-center">
            {["💻 Free Laptop", "💰 BTech Fees", "🌍 Study Abroad", "📜 Caste Cert"].map(
              (chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(chip)}
                  className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-xs text-teal-300"
                >
                  {chip}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
