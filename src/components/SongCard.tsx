/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react'
import { Play, Music2, ExternalLink, Music, Pause } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface SongCardProps {
  name: string
  artist: string
  albumImage: string
  genre: string
  previewUrl: string
  fullTrackUrl?: string
  year?: number
  popularity?: number
  album?: string
  onClick?: () => void
  isExpanded?: boolean
  hasMissingInfo?: boolean
  danceability?: number
  energy?: number
  valence?: number
}

let currentlyPlaying: {
  audio: HTMLAudioElement | null;
  id: string | null;
} = { audio: null, id: null };

export default function SongCard({
  name,
  artist,
  albumImage,
  genre,
  previewUrl,
  fullTrackUrl,
  onClick,
  isExpanded = false,
  hasMissingInfo
}: SongCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const cardId = useRef(`song-${Math.random()}`).current

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 770)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()

    // Create audio element if it doesn't exist
    if (!audioRef.current && previewUrl) {
      audioRef.current = new Audio(previewUrl)
      audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    }

    if (!audioRef.current) return

    // If currently playing, pause
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    // Stop previously playing audio
    if (currentlyPlaying.audio) {
      // Ensure the current audio is not the same as the one we're about to play
      if (currentlyPlaying.audio !== audioRef.current) {
        currentlyPlaying.audio.pause()
        
        // Dispatch event to update the state of the previously playing song
        const event = new CustomEvent('audioStateChange', {
          detail: { id: currentlyPlaying.id, isPlaying: false }
        })
        window.dispatchEvent(event)
      }
    }

    // Play new audio
    audioRef.current.play()
      .then(() => {
        currentlyPlaying = { audio: audioRef.current, id: cardId }
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
      })
  }

  useEffect(() => {
    const handleAudioStateChange = (e: CustomEvent<{ id: string, isPlaying: boolean }>) => {
      if (e.detail.id !== cardId && e.detail.isPlaying === false) {
        setIsPlaying(false)
      }
    }

    window.addEventListener('audioStateChange' as any, handleAudioStateChange as any)
    return () => {
      window.removeEventListener('audioStateChange' as any, handleAudioStateChange as any)
    }
  }, [cardId])

  const openFullTrack = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (fullTrackUrl) {
      window.open(fullTrackUrl, '_blank')
    }
  }

  if (isExpanded && !isSmallScreen) {
    return (
      <Card className="col-span-full bg-zinc-800/50 backdrop-blur-lg border-none shadow-xl animate-slide-up p-8">
        <div className="flex items-start space-x-8">
          {/* Left Section - Album Image (30%) */}
          <div className="w-1/3 flex justify-center items-center">
            <div className="relative group/image w-48 h-48">
              <div className="rounded-lg overflow-hidden bg-zinc-700 shadow-2xl">
                <img
                  src={albumImage || "/default.jpg"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
  
          {/* Right Section - Song Details (70%) */}
          <div className="w-2/3 space-y-6 pr-10">
            {/* Song Name and Artist */}
            <div>
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold truncate">{name}</h2>
              {genre && (
      <span className="text-xl px-4 py-0.5 rounded-full bg-primary/10 text-primary mr-2">
        {genre}
      </span>
    )}
    </div>
              <div className="text-xl text-zinc-400 truncate">{artist}</div>
              
            </div>
  
            {/* Buttons - Linear Form */}
            <div className="flex space-x-4 pt-12">
              {previewUrl && (
                <button
                  onClick={togglePlay}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-black font-medium rounded-full
                    transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span className="flex-grow text-center">Pause Preview</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span className="flex-grow text-center">Play Preview</span>
                    </>
                  )}
                </button>
              )}
  
              {fullTrackUrl && (
                <button
                  onClick={openFullTrack}
                  className="flex-1 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-full
                    transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="flex-grow text-center">Open Full Track</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (isExpanded && isSmallScreen) {
    return (
      <Card
        className="col-span-full bg-zinc-800/50 backdrop-blur-lg border-none shadow-xl animate-slide-up"
        onClick={onClick}
      >
        <CardContent className="p-5">
          <div className="flex items-center space-x-4">
            {/* Existing compact card layout from previous non-expanded state */}
            <div className="relative group/image shrink-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-800">
                <img
                  src={albumImage || "/default.jpg"}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                />
              </div>
            </div>

            <div className="flex-grow min-w-0 py-1">
              <div className="text-base font-medium whitespace-nowrap overflow-hidden text-ellipsis mb-1.5">
                {name}
              </div>
              <div className="flex items-center space-x-1.5 text-zinc-400">
                <Music2 size={14} className="shrink-0" />
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {artist}
                </span>
              </div>
              {genre && (
                <div className="mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                    {genre}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 shrink-0">
            {previewUrl && (
  <button
    className="p-2 rounded-full bg-primary hover:bg-primary/90 text-black transition-all duration-200
      transform hover:scale-105 active:scale-95"
    onClick={togglePlay}
  >
    {isPlaying ? (
      <Pause className="w-4 h-4" />
    ) : (
      <Play className="w-4 h-4" />
    )}
  </button>
)}

{fullTrackUrl && (
  <button
    className="p-2 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white transition-all duration-200
      transform hover:scale-105 active:scale-95"
    onClick={openFullTrack}
  >
    <ExternalLink className="w-4 h-4" />
  </button>
)}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`relative group overflow-hidden transition-all duration-300 
        ${!hasMissingInfo && 'hover:scale-[1.01]'}
        ${isHovered && !hasMissingInfo ? 'ring-1 ring-primary/50' : ''}
        ${hasMissingInfo ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}
        hover:shadow-xl hover:shadow-primary/10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={hasMissingInfo ? undefined : onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-center space-x-4">
          <div className="relative group/image shrink-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-800">
              <img
                src={albumImage || "/default.jpg"}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {isPlaying ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                    <Music className="text-primary animate-spin" />
                  </div>
                ) : (
                  <Play className="text-white" />
                )}
              </div>
            </div>
          </div>

          <div className="flex-grow min-w-0 py-1">
            <div className="text-base font-medium whitespace-nowrap overflow-hidden text-ellipsis mb-1.5">
              {name}
            </div>
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <Music2 size={14} className="shrink-0" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {artist}
              </span>
            </div>
            {genre && (
              <div className="mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                  {genre}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {previewUrl && (
              <button
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-200
                  transform hover:scale-105 active:scale-95"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-primary" />
                ) : (
                  <Play className="w-4 h-4 text-primary" />
                )}
              </button>
            )}

            {fullTrackUrl && (
              <button
                className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-all duration-200
                  transform hover:scale-105 active:scale-95"
                onClick={openFullTrack}
              >
                <ExternalLink className="w-4 h-4 text-secondary" />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}