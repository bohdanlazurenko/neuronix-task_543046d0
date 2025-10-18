import axios from 'axios';
import { WeatherData, ForecastData, LocationData } from '../types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(location: LocationData): Promise<WeatherData> {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat: location.latitude,
      lon: location.longitude,
      appid: API_KEY,
      units: 'metric'
    }
  });

  return {
    temperature: response.data.main.temp,
    feelsLike: response.data.main.feels_like,
    humidity: response.data.main.humidity,
    windSpeed: response.data.wind.speed,
    condition: response.data.weather[0].main,
    sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString()
  };
}

export async function getForecast(location: LocationData): Promise<ForecastData> {
  // Similar implementation for forecast data
  // Would call OneCall API or similar
  return {
    hourly: [],
    daily: []
  };
}