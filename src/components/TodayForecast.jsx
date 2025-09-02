// src/components/TodayForecast.jsx
import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudFog } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TodayForecast = ({ forecast }) => {
  const { isDarkMode } = useTheme();
  
  const getIcon = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('clear')) return <Sun className="w-6 h-6 text-yellow-400" />;
    if (cond.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-300" />;
    if (cond.includes('rain') || cond.includes('shower')) return <CloudRain className="w-6 h-6 text-blue-400" />;
    if (cond.includes('snow')) return <CloudSnow className="w-6 h-6 text-blue-100" />;
    if (cond.includes('fog')) return <CloudFog className="w-6 h-6 text-gray-400" />;
    if (cond.includes('thunder')) return <CloudRain className="w-6 h-6 text-purple-500" />;
    return <Sun className="w-6 h-6 text-yellow-400" />;
  };

  if (!forecast || forecast.length === 0) {
    return (
      <div className={`p-4 rounded-xl shadow-lg w-full max-w-4xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-sm mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>TODAY'S FORECAST</h3>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>No forecast data available</p>
      </div>
    );
  }

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