const User = require("../models/user.model");
const bcyrptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = bcyrptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error._message });
    }
    return res.status(500).json({ message: error.message });
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(401).json({ message: "Email is required" });
    if (!password) {
      return res.status(401).json({ message: "Password is required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });
    const isMatch = bcyrptjs.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);
    const { password: hashedPassword, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { signIn, signUp };
