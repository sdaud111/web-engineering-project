import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import ChatWindow from "../Components/ChatWindow.jsx";

const MessagesPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [connections, setConnections] = useState([]); // accepted connections
  const [pending, setPending] = useState([]); // pending requests
  const [fetchingMessagesError, setFetchingMessagesError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?._id;

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch all users (for browse/connect) and connection state
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const [usersRes, acceptedRes, pendingRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/all/${userId}`),
          axios.get(`http://localhost:5000/api/connections/accepted/${userId}`),
          axios.get(`http://localhost:5000/api/connections/pending/${userId}`),
        ]);
        setUsers(usersRes.data);
        setConnections(acceptedRes.data);
        setPending(pendingRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users/connections:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // Fetch messages whenever selectedUser changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        setFetchingMessagesError("");
        const res = await axios.get(`http://localhost:5000/api/messages/${userId}/${selectedUser._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setMessages([]);
        setFetchingMessagesError(err.response?.data?.message || "Unable to fetch messages");
      }
    };
    fetchMessages();
  }, [selectedUser, userId]);

  // Helpers: connection status
  const getConnectionStatus = (otherUserId) => {
    const accepted = connections.find((c) =>
      (c.requester?._id === userId && c.recipient?._id === otherUserId) ||
      (c.recipient?._id === userId && c.requester?._id === otherUserId)
    );
    if (accepted) return { status: "connected", connectionId: accepted._id };

    const pendingEntry = pending.find((c) =>
      (c.requester?._id === userId && c.recipient?._id === otherUserId) ||
      (c.recipient?._id === userId && c.requester?._id === otherUserId)
    );
    if (pendingEntry) {
      const direction = pendingEntry.requester?._id === userId ? "outgoing" : "incoming";
      return { status: "pending", direction, connectionId: pendingEntry._id };
    }
    return { status: "none" };
  };

  const refreshConnections = async () => {
    try {
      const [acceptedRes, pendingRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/connections/accepted/${userId}`),
        axios.get(`http://localhost:5000/api/connections/pending/${userId}`),
      ]);
      setConnections(acceptedRes.data);
      setPending(pendingRes.data);
    } catch (err) {
      console.error("Failed to refresh connections:", err);
    }
  };

  const handleSendRequest = async (recipientId) => {
    try {
      await axios.post("http://localhost:5000/api/connections/request", {
        requesterId: userId,
        recipientId,
      });
      await refreshConnections();
      alert("Connection request sent");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send request";
      alert(msg);
    }
  };

  const handleAccept = async (connectionId) => {
    try {
      await axios.put(`http://localhost:5000/api/connections/${connectionId}/accept`);
      await refreshConnections();
    } catch (err) {
      alert("Failed to accept request");
    }
  };

  const handleReject = async (connectionId) => {
    try {
      await axios.put(`http://localhost:5000/api/connections/${connectionId}/reject`);
      await refreshConnections();
    } catch (err) {
      alert("Failed to reject request");
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading conversations...</p>
      </div>
    );
  }

  return (
    <section className="bg-[#f5f7fa] min-h-screen">
      <div className="container mx-auto h-screen max-w-7xl px-0 md:px-4 py-0 md:py-4">
        {/* Desktop View */}
        {!isMobileView ? (
          <div className="flex gap-4 h-full">
            {/* User List - Left Panel */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="p-4 bg-[#1a2f4e] text-white">
                <h2 className="text-2xl font-bold mb-3">Messages</h2>
                <div className="flex items-center bg-white text-[#1a2f4e] px-3 py-2 rounded-lg">
                  <FaSearch className="mr-2" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredUsers.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No users found
                  </div>
                ) : (
                  filteredUsers.map((u) => {
                    const { status, direction, connectionId } = getConnectionStatus(u._id);
                    const isSelected = selectedUser?._id === u._id && status === "connected";
                    return (
                      <div
                        key={u._id}
                        className={`p-4 border-b transition-colors ${isSelected ? "bg-[#f5f7fa] border-l-4 border-[#d4a574]" : "hover:bg-[#f5f7fa]"}`}
                      >
                        <div className="flex items-center gap-3">
                          {u.profilePhoto ? (
                            <img src={`http://localhost:5000/${u.profilePhoto}`} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#1a2f4e] text-white flex items-center justify-center font-bold text-sm">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-[#1a2f4e] truncate">{u.name}</p>
                            <p className="text-sm text-gray-500 truncate">{u.userType}</p>
                          </div>
                          {status === "connected" && (
                            <button
                              className="text-sm text-[#1a2f4e] font-semibold"
                              onClick={() => setSelectedUser(u)}
                            >
                              Message
                            </button>
                          )}
                          {status === "pending" && direction === "outgoing" && (
                            <span className="text-xs text-gray-500">Request sent</span>
                          )}
                          {status === "pending" && direction === "incoming" && (
                            <div className="flex gap-2">
                              <button
                                className="text-xs px-2 py-1 bg-[#1a2f4e] text-white rounded"
                                onClick={() => handleAccept(connectionId)}
                              >
                                Accept
                              </button>
                              <button
                                className="text-xs px-2 py-1 bg-gray-200 text-[#1a2f4e] rounded"
                                onClick={() => handleReject(connectionId)}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {status === "none" && (
                            <button
                              className="text-xs px-3 py-1 bg-[#d4a574] text-[#1a2f4e] rounded"
                              onClick={() => handleSendRequest(u._id)}
                            >
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Window - Right Panel */}
            {selectedUser ? (
              <ChatWindow
                user={user}
                selectedUser={selectedUser}
                messages={messages}
                setMessages={setMessages}
                error={fetchingMessagesError}
              />
            ) : (
              <div className="flex-1 bg-white rounded-lg shadow-md flex items-center justify-center">
                <p className="text-gray-400 text-xl">Select a connected user to start messaging</p>
              </div>
            )}
          </div>
        ) : (
          // Mobile View
          <div className="h-full bg-white flex flex-col rounded-lg">
            {!selectedUser ? (
              <>
                <div className="p-4 bg-[#1a2f4e] text-white">
                  <h2 className="text-2xl font-bold mb-3">Messages</h2>
                  <div className="flex items-center bg-white text-[#1a2f4e] px-3 py-2 rounded-lg">
                    <FaSearch className="mr-2" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredUsers.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No users found</div>
                  ) : (
                    filteredUsers.map((u) => {
                      const { status, direction, connectionId } = getConnectionStatus(u._id);
                      return (
                        <div
                          key={u._id}
                          className="p-4 border-b hover:bg-[#f5f7fa] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {u.profilePhoto ? (
                              <img src={`http://localhost:5000/${u.profilePhoto}`} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#1a2f4e] text-white flex items-center justify-center font-bold text-sm">
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-[#1a2f4e] truncate">{u.name}</p>
                              <p className="text-sm text-gray-500 truncate">{u.userType}</p>
                            </div>
                            {status === "connected" && (
                              <button
                                className="text-xs px-3 py-1 bg-[#1a2f4e] text-white rounded"
                                onClick={() => setSelectedUser(u)}
                              >
                                Message
                              </button>
                            )}
                            {status === "pending" && direction === "outgoing" && (
                              <span className="text-xs text-gray-500">Request sent</span>
                            )}
                            {status === "pending" && direction === "incoming" && (
                              <div className="flex gap-2">
                                <button
                                  className="text-xs px-2 py-1 bg-[#1a2f4e] text-white rounded"
                                  onClick={() => handleAccept(connectionId)}
                                >
                                  Accept
                                </button>
                                <button
                                  className="text-xs px-2 py-1 bg-gray-200 text-[#1a2f4e] rounded"
                                  onClick={() => handleReject(connectionId)}
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                            {status === "none" && (
                              <button
                                className="text-xs px-3 py-1 bg-[#d4a574] text-[#1a2f4e] rounded"
                                onClick={() => handleSendRequest(u._id)}
                              >
                                Connect
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <ChatWindow
                user={user}
                selectedUser={selectedUser}
                messages={messages}
                setMessages={setMessages}
                onBack={() => setSelectedUser(null)}
                isMobile={true}
                error={fetchingMessagesError}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MessagesPage;
