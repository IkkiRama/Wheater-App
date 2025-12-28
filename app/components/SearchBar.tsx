'use client'

import { useTheme } from 'next-themes'
import { useState, ChangeEvent, KeyboardEvent } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('Jakarta')
  const [loading, setLoading] = useState(false)
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null
  const dark = resolvedTheme === 'dark'

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSearch = () => {
    if (!value.trim()) return
    setLoading(true)
    setTimeout(() => {
      onSearch(value)
      setLoading(false)
    }, 600)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      {loading ? (
        <div className="flex flex-1 h-11 rounded-md animate-pulse bg-gray-300 dark:bg-slate-700" />
      ) : (
        <>
          <input
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search city"
            className={`border px-3 py-2 flex-1 font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 rounded-md
              ${dark ? 'text-gray-200 border-gray-800' : 'text-gray-700 border-gray-400'}
            `}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition-all"
          >
            Search
          </button>
        </>
      )}
    </div>
  )
}
