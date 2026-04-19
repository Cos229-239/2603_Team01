import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@env";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const systemPrompt = `
You are a helpful 'Rubber Duck' debugging assistant for software developers.
Your goal is to help devs talk through their problems.

Be supportive, slightly whimsical (use duck metaphors occasionally), but technically sharp.
You are helping with a debug or a problem the dev is facing.

ALWAYS respond in the following JSON format:
{
  "message": "your conversational response to the developer",
  "suggestion": "a specific technical tip or question to help them debug"
}
`;

export const getDuckResponse = async (userInput: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `${systemPrompt}\n\nDeveloper says: ${userInput}`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return {
      message: "Quack! I had a brain freeze. Can you say that again?",
      suggestion: "Check your internet connection or API key."
    };
  }
};
