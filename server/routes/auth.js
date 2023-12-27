const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", isOk: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!", isOk: false });
    }

    const saltRounds = 10;
    
    // Ensure that the password variable is not undefined or null
    if (!password) {
      return res.status(400).json({ message: "Password is required", isOk: false });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful", isOk: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isOk: false });
  }
});

authRouter.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist!", isOk: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials", isOk: false });
    }

    const secretKey = 'abcdegg'; // Replace with your actual secret key
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "3d",
    });

    res.status(200).json({ token, isOk: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isOk: false });
  }
});

authRouter.get("/verify", async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, abcdegg);
    const user = await User.findOne({ _id: decoded.userId });

    if (!token || !decoded) {
      return res
        .status(401)
        .json({ message: "Not Verified", Is_verified: false, isOk: false });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not Verified", Is_verified: false, isOk: false });
        
    }
    return res.status(200).json({message:"Verified",Is_verified: true, isOk: true })
  } catch (error) {
    res
      .status(401)
      .json({
        message: "Authentication failed",
        Is_verified: false,
        isOk: false,
      });
  }
});

module.exports = authRouter;