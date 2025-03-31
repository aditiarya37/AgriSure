import React from "react";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface GeminiProps {
  weather: any;
}

const Gemini: React.FC<GeminiProps> = ({ weather }) => {
  const [cropRecommendation, setCropRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cachedResults, setCachedResults] = useState<{[key: string]: string}>({});
  
  // Replace with your actual API key
  const API_KEY = "AIzaSyCx-0V4_UtbnN-QQ0Ou1IIT6dOUlHoHxFM";
  
  // Initialize the API outside of the function to avoid recreation
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.4, // Lower temperature for more consistent, faster responses
      maxOutputTokens: 800, // Limit output size for faster generation
    }
  });

  // Clear recommendation when weather changes
  useEffect(() => {
    setCropRecommendation(null);
  }, [weather]);

  const createCacheKey = (weatherData: any) => {
    if (!weatherData) return "";
    // Create a unique key based on important weather parameters
    return `${Math.round(weatherData.temperature)}-${Math.round(weatherData.humidity)}-${Math.round(weatherData.rainfall || 0)}`;
  };

  const generateRecommendation = async () => {
    if (!weather) {
      setError("Please fetch weather data first.");
      return;
    }

    setLoading(true);
    setError(null);
    
    // Check cache first
    const cacheKey = createCacheKey(weather);
    if (cachedResults[cacheKey]) {
      setCropRecommendation(cachedResults[cacheKey]);
      setLoading(false);
      return;
    }

    // Structured prompt for better, faster results
    const prompt = `You are an agricultural expert assistant. Based on these weather conditions, provide a concise crop recommendation with specific actionable advice:

Temperature: ${weather.temperature}°C
Humidity: ${weather.humidity}%
Rainfall: ${weather.rainfall || 0} mm
Wind Speed: ${weather.windSpeed || 0} km/h

Format your response in HTML with these sections:
1. "Recommended Crops" - List 3-4 suitable crops with brief explanation
2. "Agricultural Activities" - 2-3 bullet points of timely activities
3. "Weather Alerts" - Any warnings based on current conditions

Keep your response under 400 words total and focus on practical advice.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const formattedResponse = response.text().trim();
      
      // Cache the result
      setCachedResults(prev => ({...prev, [cacheKey]: formattedResponse}));
      setCropRecommendation(formattedResponse);
    } catch (error: any) {
      console.error("Error generating recommendation:", error);
      setError("Failed to generate recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gemini-component">
      <div className="recommendation-controls">
        <button
          onClick={generateRecommendation}
          disabled={loading || !weather}
          className="recommendation-button"
        >
          {loading ? "Generating..." : "Get Crop Recommendation"}
        </button>
      </div>

      {error && <div className="message error">{error}</div>}
      
      {loading && (
        <div className="recommendation-loading">
          <div className="loading"></div>
          <p>Analyzing agricultural conditions...</p>
        </div>
      )}

      {cropRecommendation && !loading && (
        <div className="recommendation-result">
          <div 
            className="recommendation-content"
            dangerouslySetInnerHTML={{ __html: cropRecommendation }}
          />
        </div>
      )}
      
      {!weather && !loading && !cropRecommendation && (
        <div className="recommendation-placeholder">
          <p>Enter a location and fetch weather data to get crop recommendations</p>
        </div>
      )}
    </div>
  );
};

export default Gemini;