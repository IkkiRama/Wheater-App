'use client'

import Image from 'next/image'
import { ForecastItem } from '../types/weather'
import { useTheme } from 'next-themes'

interface ForecastWeeklyProps {
  data: ForecastItem[]
  loading?: boolean
}

export default function ForecastWeekly({
  data,
  loading = false,
}: ForecastWeeklyProps) {
  // Ambil data per hari
  const dailyData = data.filter((_, index) => index % 8 === 0)
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'

  const today = new Date().toDateString()

  // Helper: warna accent sesuai weather main
  const getWeatherColor = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'clear':
        return 'bg-yellow-400'
      case 'clouds':
        return 'bg-gray-400'
      case 'rain':
      case 'drizzle':
        return 'bg-blue-500'
      case 'thunderstorm':
        return 'bg-purple-600'
      case 'snow':
        return 'bg-white'
      case 'mist':
      case 'fog':
        return 'bg-gray-300'
      default:
        return dark ? 'bg-slate-700' : 'bg-gray-100'
    }
  }

  return (
    <section className="mt-8">
      <h3
        className={`font-semibold mb-4 text-sm sm:text-base ${
          dark ? 'text-gray-200' : 'text-gray-700'
        }`}
      >
        Weekly Forecast
      </h3>

      {/* Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-20 rounded-lg ${
                dark ? 'bg-slate-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dailyData.map((item) => {
            const dateStr = new Date(item.dt * 1000).toDateString()
            const isToday = dateStr === today
            const weatherMain = item.weather[0].main
            const accentColor = getWeatherColor(weatherMain)

            return (
              <div
                key={item.dt}
                className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm
                  transition-all duration-200
                  hover:scale-[1.02] active:scale-95
                  ${
                    dark
                      ? 'bg-slate-800 text-gray-200'
                      : 'bg-white text-gray-700 shadow'
                  }
                  ${isToday ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                {/* Date */}
                <span className="font-medium w-20">
                  {new Date(item.dt * 1000).toLocaleDateString(undefined, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>

                {/* Weather Icon */}
                <div
                  className={`flex items-center justify-center rounded-full p-2 ${accentColor}`}
                >
                  <Image
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    width={32}
                    height={32}
                  />
                </div>

                {/* Temp Info */}
                <div className="flex flex-col items-end text-right w-20">
                  <span>
                    {Math.round(item.main?.temp_min)}°C / {Math.round(item.main?.temp_max)}°C
                  </span>
                  <span className="text-xs text-blue-400">
                    ☔ {Math.round(item?.pop * 100)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
