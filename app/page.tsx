'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useWeather } from './hooks/useWeather'
import WeatherCard from './components/WeatherCard'
import ForecastHourly from './components/ForecastHourly'
import ForecastWeekly from './components/ForecastWeekly'
import SearchBar from './components/SearchBar'

export default function Home() {
  const [city, setCity] = useState('Jakarta')
  const { current, forecast, loading, error } = useWeather(city)
  const { resolvedTheme, setTheme } = useTheme()

  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        dark
          ? 'bg-slate-900 text-white'
          : 'bg-slate-100 text-gray-900'
      }`}
    >
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-md sm:max-w-2xl lg:max-w-4xl">

        {/* Theme Toggle */}
        <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50">
          <button
            aria-label="Toggle theme"
            aria-pressed={dark}
            onClick={() => setTheme(dark ? 'light' : 'dark')}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border backdrop-blur text-sm sm:text-base ${
              dark ? 'bg-gray-800/80' : 'bg-white/80'
            }`}
          >
            <span className="font-medium">
              {dark ? '🌞 Light' : '🌙 Dark'}
            </span>
          </button>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={setCity} />
        </div>

        {/* Status */}
        {loading && (
          <p className="text-center text-sm sm:text-base opacity-80">
            Loading weather...
          </p>
        )}

        {error && (
          <p className="text-center text-sm sm:text-base text-red-500">
            {error}
          </p>
        )}

        {current && (
          <div className="mb-6">
            <WeatherCard data={current} />
          </div>
        )}

        {forecast && (
          <div className="space-y-8">
            <ForecastHourly data={forecast} />
            <ForecastWeekly data={forecast} />
          </div>
        )}
      </div>
    </main>
  )
}
