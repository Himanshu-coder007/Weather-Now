// src/components/AirConditions.jsx
import React from 'react';
import { Droplets, Wind, Sun, Thermometer } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AirConditions = ({ realFeel, wind, windDirection, rainChance, humidity, uvIndex }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`p-6 rounded-2xl shadow-lg w-full ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg uppercase tracking-wide font-semibold ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Air Conditions
        </h3>
       
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Real Feel */}
        <div className={`flex items-center gap-4 p-4 rounded-xl ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
          }`}>
            <Thermometer className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Real Feel</p>
            <p className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{realFeel}°</p>
          </div>
        </div>

        {/* Wind */}
        <div className={`flex items-center gap-4 p-4 rounded-xl ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
          }`}>
            <Wind className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Wind</p>
            <p className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{wind} km/h {windDirection}</p>
          </div>
        </div>

        {/* Chance of Rain */}
        <div className={`flex items-center gap-4 p-4 rounded-xl ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
          }`}>
            <Droplets className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Chance of rain</p>
            <p className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{rainChance}%</p>
          </div>
        </div>

        {/* Humidity */}
        <div className={`flex items-center gap-4 p-4 rounded-xl ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
          }`}>
            <Droplets className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Humidity</p>
            <p className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirConditions;