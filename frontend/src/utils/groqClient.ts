import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getGroqResponse = async (userMessage: string) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [{
        role: "system",
        content: `You are AgriBot, a friendly agricultural expert assistant. Provide accurate, practical advice about crops, livestock, weather impacts, soil management, and sustainable farming. Use metric units for measurements.

        Keep responses concise and to the point. Use appropriate emojis to make responses visually appealing and engaging.

        For simple greetings like "hi" or "hello", respond briefly with "Hello! 🌱 AgriBot here. How can I help with your farming questions today?"

        Format responses for readability with:
        - Bullet points for lists
        - Numbered lists for steps
        - Headings when organizing multiple topics
        - Bold or italic for emphasis

        Begin with a brief acknowledgment of the user's question, then provide focused information based on their specific needs. Keep explanations concise while maintaining accuracy. Ask a relevant follow-up question only when necessary for clarification.

        Maintain a helpful, conversational tone while prioritizing practical agricultural advice. Use emojis relevant to farming, plants, weather, and seasons to enhance visual appeal.`
      }, {
        role: "user",
        content: userMessage
      }],
      model: "llama3-70b-8192", // Best for cost/performance balance
      temperature: 0.7, // Increased for more natural, varied responses
      max_tokens: 800 // Increased to allow for more detailed responses
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error);
    return "I apologize, but I'm currently having trouble accessing my agricultural knowledge database. Could you please try asking your question again in a moment?";
  }
};