import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MicrophoneButton } from '../components/MicrophoneButton';
import { ChatWindow } from '../components/ChatWindow';
import { useAppContext } from '../context/AppContext';
import { scholarshipService } from '../services/scholarshipService'; // Import your local DB service
import { USER_MESSAGES } from '../constants';

export const ScholarshipDiscoveryPage: React.FC = () => {
  const { messages, addMessage, isRecording, setIsRecording, selectedLanguage } = useAppContext();
  const messagesText = USER_MESSAGES[selectedLanguage];
  const [inputText, setInputText] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- CONFIGURATION ---
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  // 1. Load your local scholarship data
  const [dbContext, setDbContext] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const allSchemes = await scholarshipService.getAllScholarships();
      // Convert the DB object to a readable string for the AI
      const contextString = allSchemes.map(s => 
        `- Scheme Name: "${s.name}"\n  Category: ${s.category}\n  Income Limit: ${s.amount}\n  Description: ${s.description}\n  Link: ${s.applicationLink}`
      ).join('\n\n');
      setDbContext(contextString);
    };
    loadData();
  }, []);

  // Initial Welcome
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        type: 'ai',
        text: `👋 **Namaste! I am SamartAI.**\n\nI am connected to the government database. Ask me anything like:\n\n✨ *"I need a laptop scheme"* \n✨ *"Scholarships for BTech students"*`
      });
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userQuery = inputText;
    setInputText('');
    addMessage({ type: 'user', text: userQuery });
    setIsLoadingAI(true);

    try {
      if (!API_KEY) throw new Error("API Key missing");

      // 2. Initialize Gemini
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // 3. Construct the "Super Prompt"
      const prompt = `
        SYSTEM ROLE: You are SamartAI, a futuristic and helpful scholarship assistant for students in India.
        
        YOUR KNOWLEDGE BASE (Use ONLY this data to recommend schemes):
        ${dbContext}

        INSTRUCTIONS:
        1. If the user greets you (hi, hello), reply warmly and ask how you can help.
        2. If the user asks for a scholarship, search YOUR KNOWLEDGE BASE above.
        3. If you find matches, list them with emojis (🎓, 💰, 🔗).
        4. If the user input is gibberish or unclear, politely ask them to clarify.
        5. Keep responses concise and friendly.
        
        USER QUERY: "${userQuery}"
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const replyText = response.text();

      addMessage({ type: 'ai', text: replyText });

    } catch (error) {
      console.error("AI Error:", error);
      // Fallback to local search if AI fails
      try {
        const localResults = await scholarshipService.searchScholarships(userQuery);
        if (localResults.length > 0) {
           const resultText = localResults.map(s => `🎓 **${s.name}**\n🔗 [Apply](${s.applicationLink})`).join('\n\n');
           addMessage({ type: 'ai', text: `(Offline Mode) Found these:\n\n${resultText}` });
        } else {
           addMessage({ type: 'ai', text: "I'm having trouble connecting to the cloud, and I couldn't find local matches." });
        }
      } catch (e) {
        addMessage({ type: 'ai', text: messagesText.errorOccurred });
      }
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Voice Logic
  const toggleRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Use Chrome for Voice."); return; }

    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage === 'en' ? 'en-US' : (selectedLanguage === 'te' ? 'te-IN' : 'hi-IN');
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
        // Optional: auto-send
        // handleSendMessage(); 
      };
      recognition.start();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)] flex flex-col max-w-5xl">
      
      {/* 🌟 GLASSMORPHISM CONTAINER */}
      <div className="flex-grow overflow-hidden flex flex-col bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(79,70,229,0.15)] border border-white/10 relative">
        
        {/* Neon Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf]"></div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar space-y-4">
          <ChatWindow messages={messages} isLoadingAIResponse={isLoadingAI} />
        </div>

        {/* 🚀 FUTURISTIC INPUT BAR */}
        <div className="p-4 bg-gray-900/40 border-t border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3 bg-black/40 rounded-full p-2 border border-white/10 shadow-inner">
            
            {/* The New Small Mic */}
            <MicrophoneButton onToggleRecording={toggleRecording} isLoading={false} />
            
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={messagesText.chatPlaceholder}
              className="flex-grow bg-transparent text-white px-3 py-2 focus:outline-none placeholder-gray-500 text-lg font-light tracking-wide"
            />
            
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoadingAI}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${(!inputText.trim() && !isLoadingAI) 
                  ? 'bg-gray-800 text-gray-600' 
                  : 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:scale-110'
                }
              `}
            >
              {isLoadingAI ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Quick Chips */}
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar justify-center">
            {["💻 Free Laptop", "💰 BTech Fees", "🌍 Study Abroad"].map((chip, idx) => (
              <button 
                key={idx}
                onClick={() => { setInputText(chip); handleSendMessage(); }} 
                className="whitespace-nowrap px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-teal-300 transition-all hover:scale-105 backdrop-blur-sm"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
