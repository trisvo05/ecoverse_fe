"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false); // điều khiển trạng thái mở
  const [isChatVisible, setIsChatVisible] = useState(true); // điều khiển nút chat hiển thị lại sau animation
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào 👋! Tôi có thể giúp gì cho bạn?" },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const botReply =
        data.answer || "Xin lỗi, tôi chưa hiểu câu hỏi của bạn.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Lỗi kết nối đến server." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Nút mở chatbot */}
      <AnimatePresence>
        {!isOpen && isChatVisible && (
          <motion.button
            key="chat-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setIsOpen(true);
              setIsChatVisible(false);
            }}
            className="cursor-pointer fixed bottom-6 right-6 bg-green-600 hover:bg-green-900 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hộp chat */}
      <AnimatePresence
        onExitComplete={() => {
          // Chỉ hiển thị lại nút sau khi hiệu ứng đóng hộp chat hoàn tất
          setIsChatVisible(true);
        }}
      >
        {isOpen && (
          <motion.div
            key="chat-box"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-green-700 text-white">
              <h2 className="font-semibold">Trợ lý ảo EcoVerse</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Nội dung chat */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg w-fit ${
                    msg.sender === "user"
                      ? "bg-blue-200 ml-auto"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="bg-gray-100 p-3 rounded-2xl w-fit shadow-sm">
                  <div className="flex space-x-2">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Ô nhập tin nhắn */}
            <div className="p-3 border-t flex items-center gap-2 bg-white">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#003666]"
              />
              <button
                onClick={sendMessage}
                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-[#002244] transition"
              >
                Gửi
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
