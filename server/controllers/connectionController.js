const Connection = require("../models/Connection");
const User = require("../models/User");

// Helper: ensure users exist
async function ensureUsersExist(requesterId, recipientId) {
  const [requester, recipient] = await Promise.all([
    User.findById(requesterId),
    User.findById(recipientId),
  ]);
  if (!requester || !recipient) {
    const missing = !requester ? "Requester" : "Recipient";
    const error = new Error(`${missing} not found`);
    error.status = 404;
    throw error;
  }
}

// Send a connection request
exports.sendRequest = async (req, res) => {
  try {
    const { requesterId, recipientId } = req.body;
    if (!requesterId || !recipientId) {
      return res.status(400).json({ message: "requesterId and recipientId are required" });
    }
    if (requesterId === recipientId) {
      return res.status(400).json({ message: "You cannot connect with yourself" });
    }

    await ensureUsersExist(requesterId, recipientId);

    // Check existing connection either direction
    const existing = await Connection.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId },
      ],
    });

    if (existing) {
      return res.status(400).json({
        message: `Connection already ${existing.status}`,
        status: existing.status,
        connectionId: existing._id,
      });
    }

    const connection = await Connection.create({ requester: requesterId, recipient: recipientId });
    res.status(201).json(connection);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  }
};

// Accept a connection
exports.acceptRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await Connection.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );
    if (!connection) return res.status(404).json({ message: "Connection not found" });
    res.json(connection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject a connection
exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await Connection.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );
    if (!connection) return res.status(404).json({ message: "Connection not found" });
    res.json(connection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List accepted connections for a user
exports.getAcceptedConnections = async (req, res) => {
  try {
    const { userId } = req.params;
    const connections = await Connection.find({
      status: "accepted",
      $or: [{ requester: userId }, { recipient: userId }],
    })
      .populate("requester", "name email profilePhoto userType")
      .populate("recipient", "name email profilePhoto userType")
      .sort({ updatedAt: -1 });

    res.json(connections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List pending requests involving a user
exports.getPendingConnections = async (req, res) => {
  try {
    const { userId } = req.params;
    const connections = await Connection.find({
      status: "pending",
      $or: [{ requester: userId }, { recipient: userId }],
    })
      .populate("requester", "name email profilePhoto userType")
      .populate("recipient", "name email profilePhoto userType")
      .sort({ createdAt: -1 });

    res.json(connections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get status between two users
exports.getConnectionStatus = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const connection = await Connection.findOne({
      $or: [
        { requester: userId1, recipient: userId2 },
        { requester: userId2, recipient: userId1 },
      ],
    });
    if (!connection) return res.json({ status: "none" });
    res.json({ status: connection.status, connectionId: connection._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Utility for messageController to verify accepted connection
exports.ensureConnected = async (userId1, userId2) => {
  const connection = await Connection.findOne({
    status: "accepted",
    $or: [
      { requester: userId1, recipient: userId2 },
      { requester: userId2, recipient: userId1 },
    ],
  });
  return Boolean(connection);
};
