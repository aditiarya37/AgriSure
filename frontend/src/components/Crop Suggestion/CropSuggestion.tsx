// src/components/CropSuggestion/CropSuggestion.jsx
import React, { useState, useEffect } from "react";
import Weather from "./Weather"; // Assuming Weather component is in the same folder
import Gemini from "./Gemini";   // Assuming Gemini component is in the same folder
import "./CropSuggestion.css";
// Import icons
import { FaTemperatureHigh, FaTint, FaCloudRain } from 'react-icons/fa';

// Type definition for weather data (optional but good practice if using TypeScript)
interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  // Add other properties if your Weather component provides them
}

const CropSuggestion: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);

  return (
    <div className="crop-container">
      <header className="crop-header">
        <h1>SmartCrop Adviser</h1>
        <p className="subtitle">AI-Powered Insights for Optimal Farming</p>
      </header>

      <main className="crop-content">
        {/* Weather Section */}
        <section className="crop-section weather-section">
          <h2 className="section-title">Local Weather Insights</h2>
          {/* Weather component fetches data and updates state */}
          <Weather setWeatherData={setWeatherData} setIsLoading={setIsLoadingWeather} />

          {/* Loading indicator */}
          {isLoadingWeather && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Fetching weather data...</p>
            </div>
          )}

          {/* Display fetched weather data */}
          {weatherData && !isLoadingWeather && (
            <div className="weather-data-display">
              <div className="weather-card">
                <FaTemperatureHigh className="weather-icon temp" />
                <div className="weather-info">
                  <h3>Temperature</h3>
                  <p>{weatherData.temperature}°C</p>
                </div>
              </div>
              <div className="weather-card">
                <FaTint className="weather-icon humidity" />
                <div className="weather-info">
                  <h3>Humidity</h3>
                  <p>{weatherData.humidity}%</p>
                </div>
              </div>
              <div className="weather-card">
                <FaCloudRain className="weather-icon rainfall" />
                 <div className="weather-info">
                   <h3>Rainfall</h3>
                   {/* Displaying rainfall might need clarification (e.g., 'last 24h') */}
                   <p>{weatherData.rainfall} mm</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Recommendation Section */}
        <section className="crop-section recommendation-section">
          <h2 className="section-title">AI Farming Recommendations</h2>
          {/* Gemini component generates recommendations based on weather */}
          <Gemini weather={weatherData} />
          {/* The Gemini component should handle its own loading state and render results directly */}
          {/* Removed the conditional rendering div here as Gemini should manage its output */}
        </section>
      </main>

    </div>
  );
};

export default CropSuggestion;