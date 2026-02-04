
import { GoogleGenAI, Type } from "@google/genai";
import { Horoscope } from "../types.ts";

// Safe access to API Key
const getApiKey = () => {
    try {
        return process.env.API_KEY || "";
    } catch (e) {
        return "";
    }
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && error?.message?.includes('429')) {
      await sleep(delay);
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export const fetchHoroscope = async (): Promise<Horoscope> => {
  const fallback = {
    prediction: "The stars align to celebrate the girl who is my entire world. Expect endless love and creative clarity today.",
    luckyNumber: "2",
    luckyColor: "Blush Pink",
    mood: "Infinite Love"
  };

  if (!ai) return fallback;

  return retryWithBackoff(async () => {
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
  }).catch(() => fallback);
};

export const generateGalleryQuotes = async (topics: string[]): Promise<string[]> => {
  const fallbacks = [
    "Your brilliance outshines every star in the sky.",
    "Intelligence is your most beautiful attribute.",
    "The world is better because your creative soul is in it.",
    "Independent, smart, and utterly breathtaking.",
    "A mind like a galaxy, a heart like home.",
    "To the girl who defines brilliance."
  ];

  if (!ai) return fallbacks;

  return retryWithBackoff(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate ${topics.length} incredibly sweet, sophisticated, and romantic affirmations or quotes for my brilliant Aquarius girlfriend's 24th birthday. Topics: ${topics.join(', ')}. Max 12 words per quote.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text);
  }).catch(() => fallbacks);
};

export const generateSmartQuote = async (topic: string): Promise<string> => {
  if (!ai) return "Your intelligence is the most beautiful thing I've ever seen.";
  
  return retryWithBackoff(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate an incredibly sweet, sophisticated, and romantic affirmation or quote about ${topic} for my brilliant Aquarius girlfriend's birthday. Max 12 words.`,
    });
    return response.text.trim();
  }).catch(() => "Your intelligence is the most beautiful thing I've ever seen.");
};
