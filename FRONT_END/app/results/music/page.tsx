"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { recommendApi } from "@/lib/api/recommend"
import type { Track } from "@/lib/types"

export default function MusicResultsPage() {
  const router = useRouter()
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMusic()
  }, [])

  const loadMusic = async () => {
    try {
      const sessionId = localStorage.getItem("session_id")
      if (!sessionId) {
        router.push("/")
        return
      }

      const data = await recommendApi.getMusicRecommendations(sessionId)
      setTracks(data.tracks || [])
    } catch (error) {
      console.error("[v0] Failed to load music:", error)
      // Set some dummy data for demo
      setTracks([
        { name: "Sample Track 1", artist: "Artist 1", album: "Album 1", spotify_url: "#" },
        { name: "Sample Track 2", artist: "Artist 2", album: "Album 2", spotify_url: "#" },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-app-background flex items-center justify-center">
        <Spinner className="w-8 h-8 text-app-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-app-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-app-text mb-2">당신을 위한 음악</h1>
          <p className="text-app-text/60">Spotify 기반 추천 플레이리스트</p>
        </div>

        {/* Track List */}
        <div className="space-y-3 mb-8">
          {tracks.map((track, idx) => (
            <Card
              key={idx}
              className="p-4 bg-white shadow-md rounded-[20px] border-0 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-left-4"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Album Art Placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-app-primary/20 to-app-accent/20 rounded-[12px] flex-shrink-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-app-primary/40" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-app-text truncate">{track.name}</h3>
                  <p className="text-sm text-app-text/60 truncate">{track.artist}</p>
                  {track.album && <p className="text-xs text-app-text/40 truncate">{track.album}</p>}
                </div>

                {/* Spotify Link */}
                {track.spotify_url && (
                  <a
                    href={track.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
                  >
                    듣기
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/results/movies")}
            variant="outline"
            className="flex-1 border-2 border-app-primary text-app-primary hover:bg-app-primary/10 py-6 text-lg rounded-[18px]"
          >
            영화 추천 보기
          </Button>
          <Button
            onClick={() => router.push("/results/final")}
            className="flex-1 bg-app-primary hover:bg-app-primary/90 text-white py-6 text-lg rounded-[18px] shadow-lg"
          >
            최종 결과
          </Button>
        </div>
      </div>
    </div>
  )
}
