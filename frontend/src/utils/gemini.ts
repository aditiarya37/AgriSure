import { GoogleGenerativeAI } from '@google/generative-ai';

export async function analyzeCropImage(imageBase64: string) {
  // 1. API Key Validation
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('API key not configured - check your .env file');
  }

  // 2. Image Validation
  if (!imageBase64.startsWith('data:image')) {
    throw new Error('Invalid image format: Only JPG/PNG supported');
  }

  // 3. Initialize Model with Timeout
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel(
    { model: 'gemini-1.5-flash' },
    { timeout: 10000 } // 10-second timeout
  );

  // 4. Process Image
  try {
    const imagePart = {
      inlineData: {
        data: imageBase64.split(',')[1],
        mimeType: 'image/jpeg',
      },
    };

    // 5. Simplified Prompt
    const prompt = `
      Analyze this crop image and return STRICT JSON only:
      {
        "disease": "string (or 'Healthy')",
        "confidence": "Low/Medium/High",
        "treatment": "string"
        "Home Remedy": "string"
      }
    `;

    // 6. Debugging
    console.log('[DEBUG] Sending to Gemini...');
    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const text = response.text().trim();

    // 7. Handle Malformed Responses
    try {
      const json = JSON.parse(text.replace(/```json|```/g, ''));
      console.log('[DEBUG] Received:', json);
      return json;
    } catch {
      throw new Error('API returned invalid format');
    }
  } catch (err) {
    console.error('[ERROR] Gemini failed:', err);
    throw new Error(
      (err instanceof Error && err.message.includes('timeout')) 
        ? 'Server timeout - try again later' 
        : 'Analysis failed - check console for details'
    );
  }
}