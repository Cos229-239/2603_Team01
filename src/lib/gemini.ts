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

export interface MessagePart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export interface ChatHistoryEntry {
  role: "user" | "model";
  parts: MessagePart[];
}

export const getDuckResponse = async (history: ChatHistoryEntry[]) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({
      history: history.slice(0, -1), // Everything except the last message
    });

    const lastMessage = history[history.length - 1];
    const result = await chat.sendMessage(lastMessage.parts);
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
