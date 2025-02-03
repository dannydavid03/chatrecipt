import express from 'express';
import signupOrLogin from '../controllers/userController.js';
const router = express.Router();

router.post('/', signupOrLogin);  // Use the same '/signup' route for both actions

export default router;
