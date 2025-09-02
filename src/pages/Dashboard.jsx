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
  const { isDarkMode } = useTheme();

  const handleSearch = (city) => {
    setLoading(true);
    console.log("Searching for:", city);

    // Simulate API call delay
    setTimeout(() => {
      // Mock data (replace with API response later)
      setWeatherData({
        city,
        temperature: 28,
        condition: "sunny",
        forecast: [
          { time: "6:00 AM", temp: 25, condition: "cloudy" },
          { time: "9:00 AM", temp: 28, condition: "partly cloudy" },
          { time: "12:00 PM", temp: 33, condition: "sunny" },
          { time: "3:00 PM", temp: 34, condition: "sunny" },
          { time: "6:00 PM", temp: 32, condition: "sunny" },
          { time: "9:00 PM", temp: 30, condition: "cloudy" },
        ],
        weeklyForecast: [
          { day: "Today", condition: "Sunny", temp: "36/22", icon: "☀️" },
          { day: "Tue", condition: "Sunny", temp: "37/21", icon: "☀️" },
          { day: "Wed", condition: "Sunny", temp: "37/21", icon: "☀️" },
          { day: "Thu", condition: "Cloudy", temp: "37/21", icon: "☁️" },
          { day: "Fri", condition: "Cloudy", temp: "37/21", icon: "☁️" },
          { day: "Sat", condition: "Rainy", temp: "37/21", icon: "🌧️" },
          { day: "Sun", condition: "Storm", temp: "37/21", icon: "⚡" },
        ],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900'
    } p-4 md:p-6`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Weather Dashboard</h1>
          <ThemeToggle />
        </div>
        
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {loading && (
          <div className="flex justify-center items-center h-64 mt-6">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? 'border-green-500' : 'border-blue-500'
            }`}></div>
          </div>
        )}

        {!loading && weatherData && (
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Left Column */}
            <div className="flex flex-col gap-6 w-full lg:w-2/3">
              <WeatherCard
                city={weatherData.city}
                temperature={weatherData.temperature}
                condition={weatherData.condition}
                rainChance={10}
              />
              <TodayForecast forecast={weatherData.forecast} />
              <AirConditions
                realFeel={30}
                wind={0.2}
                rainChance={10}
                uvIndex={3}
              />
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/3">
              <SevenDayForecast weeklyForecast={weatherData.weeklyForecast} />
            </div>
          </div>
        )}

        {!loading && !weatherData && (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="text-6xl mb-4">🌤️</div>
            <h2 className="text-2xl font-semibold mb-2">Welcome to Weather Dashboard</h2>
            <p className={`max-w-md ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Search for a city to view current weather conditions and forecasts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;