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
import SkeletonLoader from './ui/SkeletonLoader'

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
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const lastSelectedSong = sessionStorage.getItem('lastSelectedSong')
    const lastRecommendations = sessionStorage.getItem('lastRecommendations')
    
    if (lastSelectedSong && lastRecommendations) {
      setSelectedSong(JSON.parse(lastSelectedSong))
      setRecommendations(JSON.parse(lastRecommendations))
    }
    
    setPopularSongs(defaultPopularSongs)
    setIsInitialLoading(false)
  }, [])

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center space-x-4 py-6">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-grow max-w-xs opacity-50" />
      <h2 className="text-3xl font-bold text-slate-300 animate-fade-in">
        {children}
      </h2>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-grow max-w-xs opacity-50" />
    </div>
  );

  const handleSongSelect = async (songName: string, artistName: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      router.push(`/recommendations?song=${encodeURIComponent(songName)}&artist=${encodeURIComponent(artistName)}`)
      
      const detailsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/song_details/?song_name=${encodeURIComponent(songName)}&artist_name=${encodeURIComponent(artistName)}`
      )
      
      if (!detailsResponse.ok) {
        throw new Error('Failed to fetch song details')
      }
      
      const songDetails = await detailsResponse.json()
      
      if (!songDetails?.preview_info?.name) {
        throw new Error('Invalid song details received')
      }
      
      setSelectedSong(songDetails)
      
      const recommendationsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations/?song_name=${encodeURIComponent(songName)}&artist_name=${encodeURIComponent(artistName)}`
      )
      
      if (!recommendationsResponse.ok) {
        throw new Error('Failed to fetch recommendations')
      }
      
      const recommendationsData = await recommendationsResponse.json()
      
      const validRecommendations = recommendationsData.filter(
        (rec: any) => rec?.preview_info?.name && rec?.preview_info?.artist
      )
      
      setRecommendations(validRecommendations)
      
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
    <div className="space-y-8 pt-20 bg-[#040404] min-h-screen">
      <div className="animate-fade-in">
        <SearchBar onSongSelect={handleSongSelect} />
      </div>

      {error && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && <Preloader />}

      {isInitialLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="space-y-12">
          {selectedSong && !isLoading && (
            <section className="space-y-4 animate-slide-up">
              <SectionHeading>Selected Song</SectionHeading>
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <SongCard
                  name={selectedSong.preview_info.name}
                  artist={selectedSong.preview_info.artist}
                  albumImage={selectedSong.preview_info.album_image}
                  genre={selectedSong.preview_info.genre}
                  previewUrl={selectedSong.preview_info.preview_url}
                  fullTrackUrl={selectedSong.preview_info.full_track_url}
                  isExpanded={true}
                />
              </div>
            </section>
          )}

          {recommendations.length > 0 && !isLoading && (
            <section className="space-y-4 animate-slide-up">
              <SectionHeading>Recommendations</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={`${rec.preview_info.name}-${index}`}
                    className="transform hover:scale-[1.02] transition-transform duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <SongCard
                      name={rec.preview_info.name}
                      artist={rec.preview_info.artist}
                      albumImage={rec.preview_info.album_image}
                      genre={rec.preview_info.genre}
                      previewUrl={rec.preview_info.preview_url}
                      fullTrackUrl={rec.preview_info.full_track_url}
                      hasMissingInfo={!rec.preview_info?.name || !rec.preview_info?.artist || !rec.preview_info?.genre}
                      onClick={() => handleSongSelect(rec.name, rec.artists[0])}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-4 animate-slide-up">
            <SectionHeading>Popular & Trending</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularSongs.map((song, index) => (
                <div
                  key={`${song.preview_info.name}-${index}`}
                  className="transform hover:scale-[1.02] transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SongCard
                    name={song.preview_info.name}
                    artist={song.preview_info.artist}
                    albumImage={song.preview_info.album_image}
                    genre={song.preview_info.genre}
                    previewUrl={song.preview_info.preview_url}
                    fullTrackUrl={song.preview_info.full_track_url}
                    onClick={() => handleSongSelect(song.name, song.artists[0])}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}