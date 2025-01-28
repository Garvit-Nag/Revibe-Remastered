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
        const response = await fetch(`http://localhost:8000/search/?q=${encodeURIComponent(query)}`)
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
        <Search className="absolute left-4 top-3 text-text-secondary" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          placeholder="Search for songs..."
          className="search-input pl-12"
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-surface rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.name}-${index}`}
              className="p-4 hover:bg-hover-bg cursor-pointer"
              onClick={() => {
                onSongSelect(suggestion.name, suggestion.artists[0])
                setShowSuggestions(false)
                setQuery('')
              }}
            >
              <div className="font-medium">{suggestion.name}</div>
              <div className="text-text-secondary text-sm">
                {suggestion.artists.join(', ')} • {suggestion.year}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}