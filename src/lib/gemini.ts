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
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing. Check your .env file and restart the bundler.");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: systemPrompt,
    });

    let validHistory = [...history];
    if (validHistory.length > 0 && validHistory[0].role === 'model') {
      validHistory.shift();
    }

    const result = await model.generateContent({
      contents: validHistory,
    });

    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error: any) {
    console.error("Gemini AI Error:", error);

    let errorMessage = "Quack! I had a brain freeze.";
    if (error.message?.includes("API_KEY_INVALID")) {
      errorMessage = "Quack! My API key seems invalid.";
    } else if (error.message?.includes("network")) {
      errorMessage = "Quack! I can't reach the pond (network error).";
    }

    return {
      message: errorMessage,
      suggestion: error.message || "Check your internet connection or API key."
    };
  }
};

/**
 * Summarizes the conversation into a Reflection entry format.
 */
export const summarizeConversation = async (history: ChatHistoryEntry[]) => {
  try {
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing.");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
      systemInstruction: `
               Analyze the provided chat history between a developer and a rubber duck assistant.
               Summarize the technical discussion into a structured "Reflection" entry.

               Summarize the session into a structured "Reflection" entry.

               The JSON output MUST follow this schema:
               {
                 "title": "A short, descriptive title for the issue",
                 "issue": "A clear description of the technical problem the developer was facing",
                 "solution": "A summary of the steps taken, the logic explored, or the final resolution reached"
               }
             `,

    });

    // Only include history entries that have text content
    const validHistory = history.filter(h => h.parts.some(p => p.text));

    if (validHistory.length === 0) {
      return {
        title: "Empty Session",
        issue: "No details provided",
        solution: "Session ended without discussion."
      };
    }

    const result = await model.generateContent({
      contents: validHistory,
    });

    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Summarization Error:", error);
    return {
      title: "Debugging Session with Wade",
      issue: "Technical discussion with Wade",
      solution: "Walked through logic and code details to explore a solution."
    };
  }
};
