const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export async function getCurrentWeather(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
  if (!res.ok) throw new Error('City not found')
  return res.json()
}

export async function getForecast(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  )
  if (!res.ok) throw new Error('Forecast error')
  return res.json()
}