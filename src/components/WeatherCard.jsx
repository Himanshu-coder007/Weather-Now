// src/components/WeatherCard.jsx
import React from 'react';
import { Sun, Cloud, CloudRain, CloudDrizzle, Snowflake, CloudFog } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const WeatherCard = ({ city, temperature, condition, rainChance }) => {
  const { isDarkMode } = useTheme();
  
  // Choose an icon based on condition
  const getIcon = () => {
    const cond = condition.toLowerCase();
    if (cond.includes('clear')) return <Sun className="w-24 h-24 text-yellow-400" />;
    if (cond.includes('cloud')) return <Cloud className="w-24 h-24 text-gray-300" />;
    if (cond.includes('rain') || cond.includes('shower')) return <CloudRain className="w-24 h-24 text-blue-400" />;
    if (cond.includes('drizzle')) return <CloudDrizzle className="w-24 h-24 text-blue-300" />;
    if (cond.includes('snow')) return <Snowflake className="w-24 h-24 text-blue-100" />;
    if (cond.includes('fog')) return <CloudFog className="w-24 h-24 text-gray-400" />;
    if (cond.includes('thunder')) return <CloudRain className="w-24 h-24 text-purple-500" />;
    return <Sun className="w-24 h-24 text-yellow-400" />;
  };

  return (
    <div className={`p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center w-full ${
      isDarkMode 
        ? 'bg-gradient-to-r from-blue-900 to-purple-900' 
        : 'bg-gradient-to-r from-blue-500 to-purple-500'
    }`}>
      {/* Left Side: City & Temp */}
      <div className="flex flex-col mb-6 md:mb-0">
        <h2 className="text-3xl font-bold text-white">{city}</h2>
        <p className="text-blue-100 text-lg mt-1">Chance of rain: {rainChance ?? 0}%</p>
        <p className="text-6xl font-bold mt-4 text-white">{temperature}°</p>
        <p className="text-xl capitalize mt-2 text-blue-100">{condition}</p>
      </div>

      {/* Right Side: Icon */}
      <div className={`p-4 rounded-full ${
        isDarkMode ? 'bg-gray-800 bg-opacity-40' : 'bg-white bg-opacity-20'
      }`}>
        {getIcon()}
      </div>
    </div>
  );
};

export default WeatherCard;