import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToCoach = async (history: ChatMessage[]): Promise<string> => {
  try {
    // Convert ChatMessage history to Gemini Content format
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: "You are a compassionate, knowledgeable, and stoic recovery coach. Your goal is to help the user overcome addiction (specifically pornography addiction) using science-based tools (neuroscience) and stoic philosophy. Be concise, encouraging, and direct. Do not be preachy. Focus on actionable advice.",
      }
    });

    return response.text || "I'm listening. Please continue.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a fallback message instead of throwing, to keep the UI stable
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
};

export const getLibraryContent = async (topicTitle: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a comprehensive, easy-to-understand guide about "${topicTitle}" in the context of dopamine addiction and recovery. 
      
      Structure the response with Markdown:
      - Use a clear H2 title.
      - Provide a "Summary" section.
      - Explain the "Mechanism" (how it works in the brain).
      - Provide "Actionable Steps" or strategies.
      
      Keep the tone scientific but accessible. Limit to roughly 300 words.`,
    });

    return response.text || "Content currently unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to load content. Please check your connection.";
  }
};