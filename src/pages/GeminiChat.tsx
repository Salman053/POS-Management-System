import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, X } from "lucide-react";

const API_KEY = "AIzaSyBhvqjKvVbJVUB_elFh6tnzTDVHUtN_PL8";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string; timestamp: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: { sender: "user" | "ai"; text: string; timestamp: string } = { sender: "user", text: input, timestamp: getTime() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
      });

      const data = await response.json();
      const aiMessage = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response from Gemini AI.";
      setMessages(prev => [...prev, { sender: "ai", text: aiMessage, timestamp: getTime() }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { sender: "ai", text: "Error getting AI response.", timestamp: getTime() }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && input.trim()) sendMessage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  const startListening = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Chat Icon */}
     {!isOpen && <motion.div
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
        whileTap={{ scale: 0.95 }}

        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={24} />
      </motion.div>}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="w-[400px] h-[550px] bg-white shadow-2xl rounded-xl mt-3 flex flex-col overflow-hidden border"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
              <h2 className="text-sm font-semibold">Gemini Chat</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-200 text-black self-start"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div className="text-[10px] opacity-70 mt-1 text-right">{msg.timestamp}</div>
                </div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-400 animate-pulse"
                >
                  Gemini is typing...
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2 items-center">
              <Input
                className="flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type something..."
                disabled={loading}
              />
              <Button variant="outline" size="icon" title="Speak" onClick={startListening}>
                🎤
              </Button>
              <Button size="icon" onClick={sendMessage} disabled={loading || !input.trim()}>
                <Send size={16} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeminiChat;
