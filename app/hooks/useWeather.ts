'use client'
import { useEffect, useState } from 'react'
import { parseCurrentWeather } from '../lib/parseWeather'
import { CurrentWeather, ForecastItem } from '../types/weather'
import { getCurrentWeather, getForecast } from '../services/weatherService'

export function useWeather(city: string) {
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError('')

        const cacheKey = `weather-${city}`
        const cached = localStorage.getItem(cacheKey)

        if (cached) {
          const parsed = JSON.parse(cached)
          setCurrent(parsed.current)
          setForecast(parsed.forecast)
          return
        }

        const rawCurrent = await getCurrentWeather(city)
        const rawForecast = await getForecast(city)

        const currentParsed = parseCurrentWeather(rawCurrent)
        const forecastParsed: ForecastItem[] = rawForecast.list

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            current: currentParsed,
            forecast: forecastParsed,
          })
        )

        setCurrent(currentParsed)
        setForecast(forecastParsed)
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError('Unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [city])

  return { current, forecast, loading, error }
}
