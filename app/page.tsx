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
      className={`min-h-screen ${
        dark
          ? 'bg-slate-900 text-white'
          : 'bg-slate-200 text-gray-900'
      }`}
    >
      <div className="max-w-xl mx-auto p-6">

        <div className="fixed right-5 bottom-24 z-50">
          <button
            aria-label="Toggle theme"
            aria-pressed={dark}
            onClick={() => setTheme(dark ? 'light' : 'dark')}
            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-full shadow-md border backdrop-blur text-sm ${
              dark ? 'bg-gray-800/80' : 'bg-white/80'
            }`}
          >
            <span className="font-semibold">
              {dark ? '🌞 Light' : '🌙 Dark'}
            </span>
          </button>
        </div>

        <SearchBar onSearch={setCity} />

        {loading && <p>Loading weather...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {current && <WeatherCard data={current} />}
        {forecast && (
          <>
            <ForecastHourly data={forecast} />
            <ForecastWeekly data={forecast} />
          </>
        )}
      </div>
    </main>
  )
}
