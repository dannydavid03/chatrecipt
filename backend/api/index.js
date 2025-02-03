import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectdb } from '../utils/db.js'; // Ensure correct path to connectdb
import userRoutes from "../routes/userRoutes.js";
import promptRoutes from "../routes/promptRoutes.js"

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json()); // Only need this once
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Routes (define your routes here)
app.use("/signup",userRoutes);
app.use("/home",promptRoutes)

// Server setup
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    connectdb(); // Make sure this function connects to your DB
    console.log(`Server is running on port ${PORT}`);
});
