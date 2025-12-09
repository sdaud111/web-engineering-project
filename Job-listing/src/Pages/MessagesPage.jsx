import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../Components/UserList.jsx";
import ChatWindow from "../Components/ChatWindow.jsx";

const MessagesPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  

  const user = JSON.parse(localStorage.getItem("user"));
const userId = user.user._id; // use id from localStorage
console.log(userId);

  // Fetch all applicants excluding current user
  useEffect(() => {
    const fetchUsers = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/users/applicants/${userId}`);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [userId]);

  // Fetch messages whenever selectedUser changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${userId}/${selectedUser._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  return (
    <div className="flex h-screen">
      <UserList users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <ChatWindow
        user={user}
        selectedUser={selectedUser}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
};

export default MessagesPage;
