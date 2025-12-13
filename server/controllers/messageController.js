const Message = require("../models/Message");
const { ensureConnected } = require("./connectionController");

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    const allowed = await ensureConnected(senderId, receiverId);
    if (!allowed) {
      return res.status(403).json({ message: "You can only message accepted connections" });
    }

    const message = await Message.create({ sender: senderId, receiver: receiverId, text });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get conversation between two users
exports.getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    const allowed = await ensureConnected(userId1, userId2);
    if (!allowed) {
      return res.status(403).json({ message: "You can only view messages with accepted connections" });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
