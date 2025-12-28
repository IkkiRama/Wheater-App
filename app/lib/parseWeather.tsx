import { CurrentWeather } from '../types/weather'

export function parseCurrentWeather(raw: any): CurrentWeather {
  return {
    city: raw.name,
    temp: Math.round(raw.main.temp),
    description: raw.weather[0].description,
    icon: raw.weather[0].icon,
  }
} 
