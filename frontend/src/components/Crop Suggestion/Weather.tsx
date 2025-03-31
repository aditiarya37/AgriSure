import React from "react";
import { useState } from "react";
import axios from "axios";

interface WeatherProps {
  setWeatherData: (data: any) => void;
  setIsLoading?: (isLoading: boolean) => void;
}

const Weather = ({ setWeatherData, setIsLoading }: WeatherProps) => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = "fb3b109869be4934b25112930253003"; // Replace with your actual WeatherAPI key

  const fetchWeather = async () => {
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }

    setError(null);
    if (setIsLoading) setIsLoading(true);
    
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`
      );
      
      const data = response.data;
      setWeather(data);
      
      // Format weather data for parent component
      const formattedData = {
        location: `${data.location.name}, ${data.location.country}`,
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        windDirection: data.current.wind_dir,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        rainfall: data.current.precip_mm,
        pressure: data.current.pressure_mb,
        uv: data.current.uv,
        lastUpdated: data.current.last_updated,
        // Include air quality if available
        airQuality: data.current.air_quality ? {
          co: data.current.air_quality.co,
          no2: data.current.air_quality.no2,
          o3: data.current.air_quality.o3,
          so2: data.current.air_quality.so2,
          pm2_5: data.current.air_quality.pm2_5,
          pm10: data.current.air_quality.pm10,
          usEpaIndex: data.current.air_quality["us-epa-index"]
        } : null
      };
      
      setWeatherData(formattedData);
    } catch (error: any) {
      console.error("Error fetching weather data:", error);
      setError(error.response?.data?.error?.message || "Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      if (setIsLoading) setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="weather-component">
      <div className="weather-input-group">
        <input
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="weather-input"
        />
        <button 
          onClick={fetchWeather} 
          className="weather-button"
        >
          <span className="weather-icon">🔍</span> Get Weather
        </button>
      </div>

      {error && <div className="message error">{error}</div>}

      {weather && (
        <div className="current-weather">
          <div className="weather-header">
            <h3 className="location-name">
              {weather.location.name}, {weather.location.country}
            </h3>
            <p className="weather-time">Last updated: {weather.current.last_updated}</p>
          </div>
          
          <div className="weather-overview">
            <div className="weather-icon-large">
              <img src={weather.current.condition.icon} alt="Weather Icon" />
              <p>{weather.current.condition.text}</p>
            </div>
            
            <div className="weather-temp-main">
              <span className="temp-large">{weather.current.temp_c}°C</span>
              <span className="feels-like">Feels like: {weather.current.feelslike_c}°C</span>
            </div>
          </div>
          
          <div className="weather-details">
            <div className="weather-detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.current.humidity}%</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{weather.current.wind_kph} km/h {weather.current.wind_dir}</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">Rainfall</span>
              <span className="detail-value">{weather.current.precip_mm} mm</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.current.pressure_mb} mb</span>
            </div>
            <div className="weather-detail-item">
              <span className="detail-label">UV Index</span>
              <span className="detail-value">{weather.current.uv}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;