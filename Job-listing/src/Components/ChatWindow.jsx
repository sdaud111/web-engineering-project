import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatWindow = ({ user, selectedUser, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const senderId = user?.user?._id;

  // Auto scroll to bottom with some padding
useEffect(() => {
  if (messagesEndRef.current) {
    const container = messagesEndRef.current.parentElement; // messages container
    container.scrollTo({
      top: container.scrollHeight, // scroll to full height
      behavior: "smooth",
    });
  }
}, [messages]);
  // Send a new message
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;
   console.log(messages);

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
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100 max-h-[80vh] rounded-lg shadow">
      {/* Header */}
      <div className="p-4 bg-white shadow text-lg font-bold border-b">
        {selectedUser ? selectedUser.name : "Select a user to chat"}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => {
  const isSender = msg.sender === senderId;

  return (
    <div
      key={index}
      className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl shadow 
          ${isSender 
            ? "bg-blue-600 text-white rounded-br-none" 
            : "bg-gray-300 text-black rounded-bl-none"
          }`}
      >
        {msg.text}
      </div>
    </div>
  );
})}


        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border p-3 rounded-lg outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()} // send on Enter
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Send
        </button>
        
      </div>
    </div>
  );
};

export default ChatWindow;
