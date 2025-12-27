import { render, screen } from '@testing-library/react'
import Home from '../app/page'

test('renders Weather App title', () => {
  render(<Home />)
  expect(screen.getByText('Weather App')).toBeInTheDocument()
})