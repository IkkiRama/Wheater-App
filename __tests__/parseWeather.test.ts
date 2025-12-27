import { parseWeather } from '../app/lib/parseWeather'

test('parseWeather works correctly', () => {
  const mock = {
    name: 'Jakarta',
    main: { temp: 30.6 },
    weather: [{ description: 'clear sky', icon: '01d' }]
  }

  expect(parseWeather(mock)).toEqual({
    city: 'Jakarta',
    temp: 31,
    description: 'clear sky',
    icon: '01d'
  })
})