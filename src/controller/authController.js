// Signup + Login

const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    console.log("userExists", userExists);
    if (userExists) return res.status(400).json({ message: "Email already exists" });
    const user = await User.create({ name, email, password });
    console.log("user", user);
    res.status(201).json({
      message: "SignUp Successfull",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    const token = generateToken(user);

    res.json({
      message: "Login Successful",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login }; // Equivalent to the two-line method
