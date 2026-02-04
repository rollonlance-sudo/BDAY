
import { GoogleGenAI, Type } from "@google/genai";
import { Horoscope } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const fetchHoroscope = async (): Promise<Horoscope> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a deeply romantic, inspiring, and beautiful birthday week horoscope for a brilliant Aquarius woman from her boyfriend's perspective. Include a lucky number, lucky color, and current mood.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prediction: { type: Type.STRING },
            luckyNumber: { type: Type.STRING },
            luckyColor: { type: Type.STRING },
            mood: { type: Type.STRING }
          },
          required: ["prediction", "luckyNumber", "luckyColor", "mood"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return {
      prediction: "The stars align to celebrate the girl who is my entire world. Expect endless love and creative clarity today.",
      luckyNumber: "2",
      luckyColor: "Blush Pink",
      mood: "Infinite Love"
    };
  }
};

export const generateSmartQuote = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate an incredibly sweet, sophisticated, and romantic affirmation or quote about ${topic} for my brilliant Aquarius girlfriend's birthday. Max 12 words.`,
    });
    return response.text.trim();
  } catch (error) {
    return "Your intelligence is the most beautiful thing I've ever seen.";
  }
};
