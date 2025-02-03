import generateAIResponse from '../controllers/promptController.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body;
        
        // Check if prompt is provided
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        try {
            // Generate AI response using the provided prompt
            const aiResponse = await generateAIResponse(prompt);
            return res.status(200).json({ response: aiResponse });
        } catch (error) {
            console.error("Error generating AI response:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        // Method Not Allowed if it's not a POST request
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
