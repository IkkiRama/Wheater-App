'use client'

import Image from 'next/image'
import { HourlyForecastItem } from '../types/weather'
import { useTheme } from 'next-themes'

interface ForecastHourlyProps {
  data: HourlyForecastItem[]
  loading?: boolean
}

export default function ForecastHourly({
  data,
  loading = false,
}: ForecastHourlyProps) {
  const { resolvedTheme } = useTheme()
  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'

  const currentHour = new Date().getHours()

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

  return (
    <section className="mt-8 relative">
      <h3
        className={`font-semibold mb-3 text-sm sm:text-base ${
          dark ? 'text-gray-200' : 'text-gray-700'
        }`}
      >
        Hourly Forecast
      </h3>

      {/* Skeleton */}
      {loading ? (
        <div className="flex gap-4 overflow-hidden animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`min-w-18 rounded-xl p-4 ${
                dark ? 'bg-slate-800' : 'bg-gray-300'
              }`}
            >
              <div
                className={`h-4 mb-3 rounded ${
                  dark ? 'bg-slate-600' : 'bg-gray-400'
                }`}
              />
              <div
                className={`h-10 w-10 mx-auto my-3 rounded-full ${
                  dark ? 'bg-slate-600' : 'bg-gray-400'
                }`}
              />
              <div
                className={`h-4 mt-3 rounded ${
                  dark ? 'bg-slate-600' : 'bg-gray-400'
                }`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          {/* Swipe indicator */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 h-10 w-6 flex items-center justify-center pointer-events-none ${
              dark ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            <span className="text-lg font-bold animate-pulse">→</span>
          </div>

          <div
            className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
          >
            {data.slice(0, 12).map((item) => {
              const hour = new Date(item.dt * 1000).getHours()
              const isCurrentHour = hour === currentHour
              const gradient = getWeatherGradient(item.weather[0]?.main)

              return (
                <div
                  key={item.dt}
                  className={`min-w-18 text-center text-sm rounded-xl p-3
                    transition-all duration-200 snap-start
                    hover:scale-105 active:scale-95
                    ${
                        `bg-linear-to-b ${gradient} text-gray-200`
                    }
                    ${isCurrentHour ? 'ring-2 ring-blue-500' : ''}
                  `}
                >
                  <p className="font-medium">{hour}:00</p>

                  <div
                    className="flex items-center justify-center my-3 rounded-full p-2"
                  >
                    <Image
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                  </div>

                  <p className="font-semibold">
                    {Math.round(item.main.temp)}°C
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
