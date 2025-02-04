import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectdb } from '../utils/db.js';  // Ensure correct path to connectdb
import userRoutes from "../routes/userRoutes.js";
import promptRoutes from "../routes/promptRoutes.js";

dotenv.config();

const app = express();

// Define allowed origins (local dev and production)
const allowedOrigins = [
  'http://localhost:5173',
  'https://dannydavid03.github.io',
  'https://chatercipt.vercel.app',  // Add your production frontend URL here
];

// Middleware setup
app.use(express.json()); // Only need this once
app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins list
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the request
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Routes (define your routes here)
app.use("/signup", userRoutes);
app.use("/home", promptRoutes);

// Connect to DB only once (assuming the database connection function works correctly)
connectdb();

// Export the app for Vercel serverless functions
export default app;
