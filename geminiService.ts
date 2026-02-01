
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateRomanticMessage(context: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, funny, and very romantic Valentine's Day greeting for a girl named Tyra. 
                Context: ${context}. Keep it under 20 words. Include a heart emoji.`,
    });
    return response.text || "Tyra, you're the one and only for me!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "If I had to choose again I would still choose you!";
  }
}
