export interface CurrentWeather {
  city: string
  temp: number
  description: string
  icon: string
}

export interface ForecastItem {
  dt: number
  main: {
    temp: number
  }
  weather: {
    main: string
    description: string
    icon: string
  }[]
}

export interface HourlyForecastItem {
  dt: number
  main: {
    temp: number
  }
  weather: {
    icon: string
    description: string
  }[]
}
