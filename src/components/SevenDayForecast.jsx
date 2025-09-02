// src/components/SevenDayForecast.jsx
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const SevenDayForecast = ({ weeklyForecast }) => {
  const { isDarkMode } = useTheme();
  
  const getBackgroundColor = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('clear') || cond.includes('sun')) return isDarkMode ? 'from-yellow-600 to-orange-500' : 'from-yellow-400 to-orange-300';
    if (cond.includes('cloud')) return isDarkMode ? 'from-gray-600 to-gray-500' : 'from-gray-400 to-gray-300';
    if (cond.includes('rain') || cond.includes('shower')) return isDarkMode ? 'from-blue-600 to-blue-500' : 'from-blue-400 to-blue-300';
    if (cond.includes('thunder')) return isDarkMode ? 'from-purple-700 to-purple-600' : 'from-purple-400 to-purple-300';
    if (cond.includes('snow')) return isDarkMode ? 'from-blue-300 to-blue-200' : 'from-blue-200 to-blue-100';
    if (cond.includes('fog')) return isDarkMode ? 'from-gray-500 to-gray-400' : 'from-gray-300 to-gray-200';
    return isDarkMode ? 'from-gray-700 to-gray-600' : 'from-gray-300 to-gray-200';
  };

  if (!weeklyForecast || weeklyForecast.length === 0) {
    return (
      <div className={`p-6 rounded-2xl shadow-xl h-full ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>7-Day Forecast</h2>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>No weekly forecast data available</p>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl shadow-xl h-full ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-xl font-bold mb-6 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-800'
      }`}>7-Day Forecast</h2>
      <div className="space-y-4">
        {weeklyForecast.map((day, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl bg-gradient-to-r ${getBackgroundColor(day.condition)}`}
          >
            <div className="flex justify-between items-center">
              {/* Day */}
              <span className="text-white text-lg font-medium w-20">{day.day}</span>

              {/* Icon + Condition */}
              <div className="flex items-center space-x-3 w-32">
                <span className="text-2xl">{day.icon}</span>
                <span className="text-white text-sm">{day.condition}</span>
              </div>

              {/* Temp */}
              <span className="text-white text-lg font-medium">{day.temp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SevenDayForecast;