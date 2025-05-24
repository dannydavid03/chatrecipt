import { GoogleGenerativeAI } from "@google/generative-ai";

// Your API key should be securely stored
const genAI = new GoogleGenerativeAI(process.env.YOUR_API_KEY);

// Function to generate an AI response based on the prompt
async function generateAIResponse(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});
    const fullPrompt = `Give a recipe with ingredients: ${prompt}`;

    try {
        const result = await model.generateContent({
            contents: [
              {
                role: "user",
                parts: [{ text: fullPrompt }],
              },
            ],
          });
        const response = await result.response;

        // Format the response to make it more readable        
        return response.text();
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw new Error("Failed to generate AI response");
    }
}

// Function to format the recipe response to make it more readable


export default generateAIResponse;
