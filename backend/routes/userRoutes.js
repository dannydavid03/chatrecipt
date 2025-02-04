import express from 'express';
import signupOrLogin from '../api/user.js';
const router = express.Router();

router.post('/', signupOrLogin);  // Handles POST request for signup or login

export default router;
