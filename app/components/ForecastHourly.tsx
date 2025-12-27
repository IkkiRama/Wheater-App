import Image from 'next/image'
import { HourlyForecastItem } from '../types/weather'
import { useTheme } from 'next-themes'

interface ForecastHourlyProps {
  data: HourlyForecastItem[]
}

export default function ForecastHourly({ data }: ForecastHourlyProps) {
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'

  return (
    <div className="mt-6">
      <h3
        className={`font-semibold mb-2 ${
          dark ? 'text-gray-200' : 'text-gray-700'
        }`}
      >
        Hourly Forecast
      </h3>

      <div className="flex gap-5 overflow-x-auto">
        {data.slice(0, 6).map((item) => (
          <div key={item.dt} className="text-center text-sm min-w-15">
            <p className={dark ? 'text-gray-200' : 'text-gray-700'}>
              {new Date(item.dt * 1000).getHours()}:00
            </p>

            <div
              className={`flex items-center justify-center p-3 my-3 rounded-full ${
                dark ? 'bg-gray-400' : 'bg-gray-700'
              }`}
            >
              <Image
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                width={40}
                height={40}
              />
            </div>

            <p className={dark ? 'text-gray-200' : 'text-gray-700'}>
              {Math.round(item.main.temp)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
