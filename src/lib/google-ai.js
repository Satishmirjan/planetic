import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;

export const initializeGoogleAI = () => {
  if (!genAI) {
    const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
    if (!apiKey) {
      throw new Error('Google AI API key is not configured');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

export const getModel = () => {
  const ai = initializeGoogleAI();
  return ai.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
};

export const getChatSession = () => {
  const model = getModel();
  return model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });
}; 