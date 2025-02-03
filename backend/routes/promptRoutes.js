import express from 'express';
import generateAIResponse from '../controllers/promptController.js';
const router = express.Router();

router.post("/", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
  
    try {
      const aiResponse = await generateAIResponse(prompt);
      return res.json({ response: aiResponse });
    } catch (error) {
      console.error("Error generating AI response:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
export default router;