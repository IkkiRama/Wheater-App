'use client'

import Image from 'next/image'
import type { CurrentWeather } from '../types/weather'
import { useTheme } from 'next-themes'

interface Props {
  data: CurrentWeather
  loading?: boolean
}

export default function WeatherCard({ data, loading = false }: Props) {
  const { resolvedTheme } = useTheme()
  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'

  // Helper: gradient background sesuai weather
  const getWeatherGradient = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'clear':
        return 'from-yellow-300 to-yellow-500'
      case 'clouds':
        return 'from-gray-400 to-gray-600'
      case 'rain':
      case 'drizzle':
        return 'from-blue-400 to-blue-600'
      case 'thunderstorm':
        return 'from-purple-500 to-purple-700'
      case 'snow':
        return 'from-white to-gray-200'
      default:
        return dark ? 'from-slate-700 to-slate-600' : 'from-gray-200 to-gray-400'
    }
  }

  // Highlight untuk temperatur yang extrime
  const tempColor =
    data.temp >= 30 ? 'text-red-500' : data.temp <= 18 ? 'text-blue-400' : dark ? 'text-gray-200' : 'text-gray-900'

  return (
    <div className="text-center mt-6">
      {loading ? (
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className={`h-6 w-32 rounded bg-gray-300 ${dark ? 'bg-slate-700' : 'bg-gray-300'}`} />
          <div className={`h-16 w-16 rounded bg-gray-300 ${dark ? 'bg-slate-700' : 'bg-gray-300'}`} />
          <div className={`h-4 w-24 rounded bg-gray-300 ${dark ? 'bg-slate-700' : 'bg-gray-300'}`} />
        </div>
      ) : (
        <div
          className={`p-6 rounded-2xl inline-block transition-all duration-300
            ${dark ? `bg-linear-to-b ${getWeatherGradient(data.description)}` : `bg-linear-to-b ${getWeatherGradient(data.description)} shadow`}
            hover:scale-105
          `}
        >
          <h2 className="text-xl font-bold">{data.city}</h2>
          <p className={`text-4xl font-semibold ${tempColor}`}>{data.temp}°C</p>
          <p className="capitalize">{data.description}</p>
          <div
            className={`flex items-center justify-center w-16 h-16 mt-3 rounded-full mx-auto
              ${dark ? 'bg-slate-600' : 'bg-gray-400'}  transition-all`}
          >
            <Image
              width={64}
              height={64}
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              alt={data.description}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  )
}
