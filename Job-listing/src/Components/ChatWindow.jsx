import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

const ChatWindow = ({ user, selectedUser, messages, setMessages, onBack, isMobile, error }) => {
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const senderId = user?.user?._id;

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new message
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    setSending(true);

    try {
      const res = await axios.post("http://localhost:5000/api/messages", {
        senderId,
        receiverId: selectedUser._id,
        text: newMessage,
      });

      // Add the new message instantly to the UI
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-[#1a2f4e] text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && onBack && (
            <button onClick={onBack} className="text-xl hover:text-[#d4a574]">
              <FaArrowLeft />
            </button>
          )}
          {selectedUser?.profilePhoto ? (
            <img src={`http://localhost:5000/${selectedUser.profilePhoto}`} alt={selectedUser.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#d4a574] flex items-center justify-center font-bold text-sm">
              {selectedUser?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-bold">{selectedUser?.name}</p>
            <p className="text-sm text-[#d4a574]">{selectedUser?.userType}</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f5f7fa]">
        {error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">{error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isSender = msg.sender === senderId;
            return (
              <div
                key={index}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                    isSender
                      ? "bg-[#1a2f4e] text-white rounded-br-none"
                      : "bg-white text-[#1a2f4e] rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="text-sm md:text-base break-words">{msg.text}</p>
                  <p className={`text-xs mt-1 ${isSender ? "text-gray-300" : "text-gray-500"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          className="flex-1 border border-gray-300 p-3 rounded-lg outline-none focus:border-[#d4a574] transition-colors text-sm md:text-base"
          disabled={sending || Boolean(error)}
        />
        <button
          onClick={handleSend}
          disabled={sending || !newMessage.trim() || Boolean(error)}
          className="px-4 md:px-6 py-3 bg-[#1a2f4e] hover:bg-[#0f1e35] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 text-sm md:text-base"
        >
          <FaPaperPlane />
          <span className="hidden md:inline">Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
