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
      return res.status(400).json({
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
      const userDetails= {_id: newUser._id,
        email: newUser.email,
        username: newUser.username,
}
      res.status(201).json({
        message: "user created successfully",
        userDetails
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
exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const validateUser = await User.findById(userId);

    const { username, email, password } = req.body;

    // Check if at least one field is provided for update
    if (!username && !email && !password) {
      return res.status(400).json({
        message:
          "At least one field (username, email, password) must be provided for update",
      });
    }

    const updatedFields = {};

    if (username) {
      if (username.length < 4) {
        return res
          .status(400)
          .json({ message: "Username must be at least 5 characters long" });
      }
      updatedFields.username = username;
    }

    if (email) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      updatedFields.email = email;
    }

    if (password) {
      // Validate password format
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            "Password must be at least 6 characters long and contains at least 1 special character, 1 uppercase letter, and 1 numeric digit",
        });
      }
      updatedFields.password = await bcrypt.hash(password, 10);
    }
    if (
      validateUser.email === email ||
      validateUser.password === password ||
      validateUser.username === username
    ) {
      return res
        .status(400)
        .json({
          message: "New values must be different from the current ones"
        });
    }

    const updatedUserDetails = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User details are updated", updatedUserDetails });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
