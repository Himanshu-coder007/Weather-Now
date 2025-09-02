// src/components/TodayForecast.jsx
import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TodayForecast = ({ forecast }) => {
  const { isDarkMode } = useTheme();
  
  const getIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-300" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-400" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-400" />;
    }
  };

  return (
    <div className={`p-4 rounded-xl shadow-lg w-full max-w-4xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`text-sm mb-4 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>TODAY'S FORECAST</h3>
      <div className="flex justify-between gap-4 overflow-x-auto">
        {forecast.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 min-w-[80px]">
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>{item.time}</span>
            {getIcon(item.condition)}
            <span className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{item.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayForecast;