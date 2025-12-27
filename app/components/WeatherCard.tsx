import Image from 'next/image'
import type { CurrentWeather } from '../types/weather'
import { useTheme } from 'next-themes'

interface Props {
  data: CurrentWeather
}

export default function WeatherCard({ data }: Props) {
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold">{data.city}</h2>
      <p className="text-4xl">{data.temp}°C</p>
      <p className="capitalize">{data.description}</p>
      <div
        className={`flex items-center justify-center w-15 h-15 mt-3 rounded-full mx-auto ${
          dark ? 'bg-gray-400' : 'bg-gray-700'
        }`}
      >
        <Image
          width={40}
          height={40}
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
        />
      </div>
    </div>
  )
}
