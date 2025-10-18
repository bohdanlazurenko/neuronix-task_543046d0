export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  sunrise: string;
  sunset: string;
}

export interface ForecastData {
  hourly: Array<{
    time: string;
    temperature: number;
    condition: string;
  }>;
  daily: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
  }>;
}

export interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}