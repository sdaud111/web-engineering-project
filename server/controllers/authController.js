const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password, userType });

    res.json({
      message: "Signup success",
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Incorrect password" });

    res.json({
      message: "Login success",
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
