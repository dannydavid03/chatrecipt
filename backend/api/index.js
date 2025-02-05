import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectdb } from '../utils/db.js';
import userRoutes from '../routes/userRoutes.js'; // If you still want to use userRoutes
import promptRoutes from '../routes/promptRoutes.js';

dotenv.config();

const app = express();

// Define allowed origins (local dev and production)
const allowedOrigins = [
  'http://localhost:5173',
  'https://dannydavid03.github.io',
  'https://chatercipt.vercel.app',
  'https://www.danieldavid.me', // Add your production frontend URL here
];

// Middleware setup
app.use(express.json());

// CORS configuration to handle preflight requests correctly
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the request
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Ensure OPTIONS is included
  credentials: true,
}));

// Handle OPTIONS requests explicitly (preflight)
app.options('*', cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the request
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

// Routes (Define the routes here or use a separate router file)
app.use('/api/signup', userRoutes);
app.use('/api/home', promptRoutes);

// Connect to DB only once (assuming the database connection function works correctly)
connectdb();

// Export the Express app to be handled by Vercel's serverless functions
export default app;
