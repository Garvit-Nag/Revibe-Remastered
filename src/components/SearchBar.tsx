"use client";
import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

interface SearchSuggestion {
  name: string
  artists: string[]
  year: number
  popularity: number
}

interface SearchBarProps {
  onSongSelect: (songName: string, artistName: string) => void
}

export default function SearchBar({ onSongSelect }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        return
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/search/?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setSuggestions(data)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    }

    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={suggestionRef}>
      <div className="relative">
        <Search className="absolute left-4 top-3 text-[#727272]" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          placeholder="Search for songs..."
          className="w-full bg-[#17171A] hover:bg-[#1b1b1f] focus:bg-[#2a2a2a] text-white rounded-full py-3 pl-12 pr-4 outline-none ring-1 ring-[#ffffff1a] focus:ring-[#ffffff1a] transition-all duration-200 placeholder:text-[#727272]"
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-[#282828]/80 backdrop-blur-md rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto ring-1 ring-[#ffffff1a]">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.name}-${index}`}
              className="p-4 hover:bg-[#ffffff1a] transition-colors duration-200 cursor-pointer border-b border-[#ffffff1a] last:border-none"
              onClick={() => {
                onSongSelect(suggestion.name, suggestion.artists[0])
                setShowSuggestions(false)
                setQuery('')
              }}
            >
              <div className="font-medium text-white">{suggestion.name}</div>
              <div className="text-[#b3b3b3] text-sm mt-1">
                {suggestion.artists.join(', ')} • {suggestion.year}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}