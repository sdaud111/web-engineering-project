const User = require("../models/user");
const path = require("path");

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile (including education, experience, etc.)
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload profile photo
exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const profilePhotoPath = path.join("uploads/profiles", req.file.filename);
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profilePhoto: profilePhotoPath },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ profilePhoto: user.profilePhoto, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get all applicants except the logged-in user
exports.getAllApplicants = async (req, res) => {
  try {
    const { excludeId } = req.params;
    const users = await User.find({ userType: "applicant", _id: { $ne: excludeId } }).select("name email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users except the logged-in user (for messaging)
exports.getAllUsers = async (req, res) => {
  try {
    const { excludeId } = req.params;
    const users = await User.find({ _id: { $ne: excludeId } }).select("name email profilePhoto userType");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Upload resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const resumePath = path.join("uploads/resumes", req.file.filename);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { resume: resumePath },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
