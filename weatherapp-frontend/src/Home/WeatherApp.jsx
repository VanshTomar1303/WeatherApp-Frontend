import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function WeatherApp() {

    const cleanImageUrl = (url) => {
        return url.replace(/^"|"$/g, ''); // Removes leading and trailing quotes
      }
      
        const [weatherData, setWeatherData] = useState({});
        const [city, setCity] = useState("Baraut");
    
      
        const loadWeatherData = async (city) => {
          try {
            const response = await axios.get(`http://localhost:8080/getWeather/${city}`);
            console.log(response.data);
            setWeatherData(response.data); // Update state with search results
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        }
      
        const handleSearch = async (e) => {
          e.preventDefault(); // Prevent the form from reloading the page
          console.log(city);
          loadWeatherData(city);
        }
      
        const cleanedImageUrl = weatherData.imageLink ? cleanImageUrl(weatherData.imageLink) : '';
      
        useEffect(()=>{
            loadWeatherData(city)
        },[])
    return (
        <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* Search Form */}
        <form className="flex items-center" onSubmit={handleSearch}>
          <label htmlFor="input" className="sr-only">Search</label>
          <div className="relative w-full">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="search"
              id="input"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter City/Town/Country..."
              required
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Weather Card */}
      {weatherData && (
        <div className="mt-8 max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center p-6">
            <img src={cleanedImageUrl} alt="Weather Icon" className="w-16 h-16" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">{weatherData.dateTimestamp}</p>
              <p className="text-3xl font-bold text-gray-800">{weatherData.temp}°C</p>
              <p className="text-lg text-gray-700">{weatherData.weatherCondition}</p>
            </div>
          </div>
          <div className="px-6 pb-6">
            <p className="text-gray-600"><span className="font-medium">Humidity:</span> {weatherData.humidity}%</p>
            <p className="text-gray-600"><span className="font-medium">Wind Speed:</span> {weatherData.windSpeed} km/h</p>
          </div>
        </div>
      )}
    </div>
    )
}
