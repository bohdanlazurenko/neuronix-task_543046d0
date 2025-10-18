'use client';

import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../lib/weatherService';
import { WeatherData, LocationData } from '../types/weather';

export default function Home() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const locationData: LocationData = {
          city: 'Current Location',
          country: '',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        setLocation(locationData);
        
        const weatherData = await getCurrentWeather(locationData);
        setWeather(weatherData);
      } catch (err) {
        setError('Unable to fetch location or weather data');
      }
    }

    fetchLocation();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">WeatherNow</h1>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded">
          {error}
        </div>
      )}

      {weather && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{location?.city}</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-4xl font-bold">{weather.temperature}°C</p>
              <p>Feels like {weather.feelsLike}°C</p>
            </div>
            <div>
              <p>{weather.condition}</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind: {weather.windSpeed} m/s</p>
            </div>
          </div>
          <div className="mt-4">
            <p>Sunrise: {weather.sunrise}</p>
            <p>Sunset: {weather.sunset}</p>
          </div>
        </div>
      )}
    </main>
  );
}