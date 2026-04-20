import axios from "axios";

// Load API key from Vite env
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Use updated Gemini model (old gemini-pro is unreliable/deprecated)
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Core function to call Gemini API
async function callGemini(prompt) {
  console.log("Gemini API Key:", GEMINI_API_KEY);

  // Validate API key
  if (!GEMINI_API_KEY) {
    throw new Error(
      "AI API Key not found. Make sure VITE_GEMINI_API_KEY is set in .env"
    );
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Safe response parsing
    const result =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return result || "No response generated from AI.";

  } catch (error) {
    console.error("🔥 FULL GEMINI ERROR:", error);

    if (error.response) {
      console.error("📡 API RESPONSE:", error.response.data);
      throw new Error(
        error.response.data?.error?.message || "Gemini API Error"
      );
    } else if (error.request) {
      throw new Error("No response received from AI server");
    } else {
      throw new Error(error.message);
    }
  }
}

// AI service methods
const aiService = {
  generateSummary: async (content) => {
    const prompt = `
Summarize the following study notes into:
- Key bullet points
- Short conclusion

Content:
${content}
    `;
    return callGemini(prompt);
  },

  generateQuestions: async (content) => {
    const prompt = `
Generate 5 practice questions based on the following content.
Also provide answers at the end.

Content:
${content}
    `;
    return callGemini(prompt);
  },

  generateFlashcards: async (content) => {
    const prompt = `
Generate 5 flashcards in this format:
Q: ...
A: ...

Content:
${content}
    `;
    return callGemini(prompt);
  }
};

export default aiService;