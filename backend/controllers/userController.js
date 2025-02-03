import User from '../model/userModel.js'  // Assuming your user model is in models/User.js
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
export default signupOrLogin;
  