// src/pages/dashboard.jsx
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import TodayForecast from "../components/TodayForecast";
import AirConditions from "../components/AirConditions";
import SevenDayForecast from "../components/SevenDayForecast";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {   
      //  getting coordinates for the city using Open-Meteo's geocoding API
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1`
      );
      const geocodingData = await geocodingResponse.json();

      if (!geocodingData.results || geocodingData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geocodingData.results[0];

      // Fetching weather data from Open-Meteo API
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto&forecast_days=7`
      );

      const weatherApiData = await weatherResponse.json();

      if (weatherApiData.error) {
        throw new Error(
          weatherApiData.reason || "Failed to fetch weather data"
        );
      }

     
      const processedData = processWeatherData(weatherApiData, name, country);
      setWeatherData(processedData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  const processWeatherData = (apiData, city, country) => {
    const { current, hourly, daily } = apiData;

    // Getting current time index for hourly forecasts
    const now = new Date();
    const currentHour = now.getHours();

    // Creating today's forecast (next 24 hours)
    const todayForecast = [];
    for (let i = 0; i < 24; i += 3) {
      const hourIndex = currentHour + i;
      if (hourIndex < hourly.time.length) {
        todayForecast.push({
          time: formatTime(hourly.time[hourIndex]),
          temp: Math.round(hourly.temperature_2m[hourIndex]),
          condition: getWeatherCondition(hourly.weather_code[hourIndex]),
        });
      }
    }

    // Creating 7-day forecast
    const weeklyForecast = [];
    for (let i = 0; i < 7; i++) {
      weeklyForecast.push({
        day: i === 0 ? "Today" : formatDay(daily.time[i]),
        condition: getWeatherCondition(daily.weather_code[i]),
        temp: `${Math.round(daily.temperature_2m_max[i])}/${Math.round(
          daily.temperature_2m_min[i]
        )}`,
        icon: getWeatherIcon(daily.weather_code[i]),
      });
    }

    return {
      city: `${city}, ${country}`,
      temperature: Math.round(current.temperature_2m),
      condition: getWeatherCondition(current.weather_code),
      realFeel: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      windDirection: getWindDirection(current.wind_direction_10m),
      rainChance: hourly.precipitation_probability[currentHour] || 0,
      forecast: todayForecast,
      weeklyForecast,
    };
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDay = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString([], { weekday: "short" });
  };

  const getWeatherCondition = (code) => {
    // Simplified mapping based on WMO codes
    if (code === 0) return "Clear sky";
    if (code >= 1 && code <= 3) return "Cloudy";
    if (code === 45 || code === 48) return "Fog";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 86) return "Showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Unknown";
  };

  const getWeatherIcon = (code) => {
    // Map weather codes to emojis
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 3) return "⛅";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 57) return "🌧️";
    if (code >= 61 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 86) return "🌦️";
    if (code >= 95 && code <= 99) return "⛈️";
    return "🌤️";
  };

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degrees / 45) % 8];
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900"
      } p-4 md:p-6`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Weather Now</h1>
          <ThemeToggle />
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>Error: {error}</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center h-64 mt-6">
            <div
              className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                isDarkMode ? "border-green-500" : "border-blue-500"
              }`}
            ></div>
          </div>
        )}

        {!loading && weatherData && (
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Left Column */}
            <div className="flex flex-col gap-6 w-full lg:w-2/3">
            {/* Weather card */}
              <WeatherCard
                city={weatherData.city}
                temperature={weatherData.temperature}
                condition={weatherData.condition}
                rainChance={weatherData.rainChance}
              />
              {/* Todays hourly Forecast */}
              <TodayForecast forecast={weatherData.forecast} />
              {/* Air Condition */}
              <AirConditions
                realFeel={weatherData.realFeel}
                wind={weatherData.windSpeed}
                windDirection={weatherData.windDirection}
                rainChance={weatherData.rainChance}
                humidity={weatherData.humidity}
               
              />
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/3">
              <SevenDayForecast weeklyForecast={weatherData.weeklyForecast} />
            </div>
          </div>
        )}

        {!loading && !weatherData && !error && (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="text-6xl mb-4">🌤️</div>
            <h2 className="text-2xl font-semibold mb-2">
              Welcome to Weather Dashboard
            </h2>
            <p
              className={`max-w-md ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Search for a city to view current weather conditions and forecasts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
