export interface CurrentWeather {
  city: string
  temp: number
  description: string
  icon: string
}

export interface ForecastItem {
  dt: number
  pop:number,
  main: {
    temp: number,
    temp_min:number,
    temp_max:number,
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
    main:string
    icon: string
    description: string
  }[]
}
