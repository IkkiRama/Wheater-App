import { useTheme } from 'next-themes'
import { useState, ChangeEvent } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState<string>('')
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="flex gap-2 mb-4">
      <input
        className={`border px-3 py-2 flex-1 font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 rounded-md ${dark ? 'text-gray-200 border-gray-800' : 'text-gray-700 border-gray-400'}`}
        placeholder="Search city"
        value={value}
        onChange={handleChange}
      />
      <button
        onClick={() => onSearch(value)}
        className="bg-blue-600 text-white px-4 cursor-pointer"
      >
        Search
      </button>
    </div>
  )
}
