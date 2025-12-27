import Image from 'next/image'
import { ForecastItem } from '../types/weather'
import { useTheme } from 'next-themes'

interface ForecastWeeklyProps {
  data: ForecastItem[]
}

export default function ForecastWeekly({ data }: ForecastWeeklyProps) {
  const dailyData = data.filter((_, index) => index % 8 === 0)
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'

  return (
    <div className="mt-6">
      <h3 className={`font-semibold mb-2 ${
          dark ? 'text-gray-200' : 'text-gray-700'
        }`}>Weekly Forecast</h3>

      {dailyData.map((item) => (
        <div
          key={item.dt}
          className="flex justify-between items-center text-sm py-1"
        >
          <span>
            {new Date(item.dt * 1000).toLocaleDateString()}
          </span>

          <div
              className={`flex items-center justify-center p-1 rounded-full ${
                dark ? 'bg-gray-400' : 'bg-gray-700'
              }`}
            >
                <Image
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    width={32}
                    height={32}
                />
            </div>

          <span>{Math.round(item.main.temp)}°C</span>
        </div>
      ))}
    </div>
  )
}
