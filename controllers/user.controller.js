const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.Signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password format
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 6 characters long and contains at least 1 special character, 1 uppercase letter, and 1 numeric digit",
        });
    }
    const exisingUser = await User.findOne({ email });
    if (!exisingUser) {
      //hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ email, username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({
        message: "user created successfully",
        newUser,
      });
    } else {
      res.status(400).json({ message: "User already exists!!!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exisingUser = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, exisingUser.password);
    if (!exisingUser || !validPassword) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    generateToken(exisingUser._id, res);
    res.status(200).json({ message: "user login successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "LogOut succesfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
