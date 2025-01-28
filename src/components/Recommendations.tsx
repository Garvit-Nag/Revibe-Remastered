/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import { defaultPopularSongs } from '@/data/popularSongs'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import SongCard from '@/components/SongCard'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Preloader from '@/components/Preloader'

interface SongDetails {
  name: string;
  artists: string[];
  year: number;
  popularity: number;
  preview_info: {
    name: string;
    artist: string;
    preview_url: string;
    album_image: string;
    genre: string;
    full_track_url?: string;
  }
}

interface Recommendation extends SongDetails {}

export default function RecommendationsPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [selectedSong, setSelectedSong] = useState<SongDetails | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [popularSongs, setPopularSongs] = useState<SongDetails[]>([])
  const [isLoading, setIsLoading] = useState(false)
  

  useEffect(() => {
    const lastSelectedSong = sessionStorage.getItem('lastSelectedSong')
    const lastRecommendations = sessionStorage.getItem('lastRecommendations')
    
    if (lastSelectedSong && lastRecommendations) {
      setSelectedSong(JSON.parse(lastSelectedSong))
      setRecommendations(JSON.parse(lastRecommendations))
    }
    
    // Now using the renamed import
    setPopularSongs(defaultPopularSongs)
  }, [])

  const handleSongSelect = async (songName: string, artistName: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Update URL without refreshing
      router.push(`/recommendations?song=${encodeURIComponent(songName)}&artist=${encodeURIComponent(artistName)}`)
      
      const detailsResponse = await fetch(
        `http://localhost:8000/song_details/?song_name=${encodeURIComponent(songName)}&artist_name=${encodeURIComponent(artistName)}`
      )
      
      if (!detailsResponse.ok) {
        throw new Error('Failed to fetch song details')
      }
      
      const songDetails = await detailsResponse.json()
      
      // Validate response data
      if (!songDetails?.preview_info?.name) {
        throw new Error('Invalid song details received')
      }
      
      setSelectedSong(songDetails)
      
      const recommendationsResponse = await fetch(
        `http://localhost:8000/recommendations/?song_name=${encodeURIComponent(songName)}&artist_name=${encodeURIComponent(artistName)}`
      )
      
      if (!recommendationsResponse.ok) {
        throw new Error('Failed to fetch recommendations')
      }
      
      const recommendationsData = await recommendationsResponse.json()
      
      // Filter out recommendations without preview_info
      const validRecommendations = recommendationsData.filter(
        (rec: any) => rec?.preview_info?.name && rec?.preview_info?.artist
      )
      
      setRecommendations(validRecommendations)
      
      // Save to session storage
      sessionStorage.setItem('lastSelectedSong', JSON.stringify(songDetails))
      sessionStorage.setItem('lastRecommendations', JSON.stringify(validRecommendations))
      
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 pt-20">
      <SearchBar onSongSelect={handleSongSelect} />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

{isLoading && <Preloader />}

      {selectedSong && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Selected Song</h2>
          <SongCard
            name={selectedSong.preview_info.name}
            artist={selectedSong.preview_info.artist}
            albumImage={selectedSong.preview_info.album_image}
            genre={selectedSong.preview_info.genre}
            previewUrl={selectedSong.preview_info.preview_url}
            fullTrackUrl={selectedSong.preview_info.full_track_url}
            isExpanded={true}
          
          />
        </section>
      )}

      {recommendations.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         
          {recommendations.map((rec, index) => (
  <SongCard
    key={`${rec.preview_info.name}-${index}`}
    name={rec.preview_info.name}
    artist={rec.preview_info.artist}
    albumImage={rec.preview_info.album_image}
    genre={rec.preview_info.genre}
    previewUrl={rec.preview_info.preview_url}
    fullTrackUrl={rec.preview_info.full_track_url}
    hasMissingInfo={!rec.preview_info?.name || !rec.preview_info?.artist || !rec.preview_info?.genre}
    onClick={() => handleSongSelect(rec.name, rec.artists[0])}  // Using top-level name and artists
  />
))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Popular & Trending</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularSongs.map((song, index) => (
  <SongCard
    key={`${song.preview_info.name}-${index}`}
    name={song.preview_info.name}
    artist={song.preview_info.artist}
    albumImage={song.preview_info.album_image}
    genre={song.preview_info.genre}
    previewUrl={song.preview_info.preview_url}
    fullTrackUrl={song.preview_info.full_track_url}
    onClick={() => handleSongSelect(song.name, song.artists[0])}  // Using top-level name and artists
  />
))}
        </div>
      </section>
    </div>
  )
}