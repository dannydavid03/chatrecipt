// backend/api/signup.js

import { connectdb } from '../utils/db.js'; // Database connection utility
import User from '../model/userModel.js';   // User model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signupOrLogin = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (name) {
      // Signup logic
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        token,
      });
    } else {
      // Login logic
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ success: false, message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Handle OPTIONS request for CORS preflight
export default async (req, res) => {
  await connectdb();  // Ensure DB is connected before handling the request

  // Handle CORS preflight (OPTIONS request)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.danieldavid.me');  // Allow your frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();  // End the preflight request successfully
  }

  if (req.method === 'POST') {
    signupOrLogin(req, res);  // Handle POST request for signup/login
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};
