"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { recommendApi } from "@/lib/api/recommend"
import type { Movie } from "@/lib/types"

export default function MovieResultsPage() {
  const router = useRouter()
  const [movies, setMovies] = useState<Movie[]>([])
  const [tasteType, setTasteType] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    try {
      const sessionId = localStorage.getItem("session_id")
      if (!sessionId) {
        router.push("/")
        return
      }

      const data = await recommendApi.getMovieRecommendations(sessionId)
      setMovies(data.recommended_movies || [])
      setTasteType(data.taste_type || "")
    } catch (error) {
      console.error("[v0] Failed to load movies:", error)
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
          <h1 className="text-3xl md:text-4xl font-bold text-app-text mb-4">당신의 영화 취향</h1>
          <div className="inline-block px-6 py-3 bg-app-primary/10 rounded-full">
            <span className="text-app-primary font-bold text-lg">{tasteType}</span>
          </div>
        </div>

        {/* Movie Cards */}
        <div className="space-y-4 mb-8">
          {movies.map((movie, idx) => (
            <Card
              key={idx}
              className="overflow-hidden bg-white shadow-lg rounded-[24px] border-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="md:flex">
                {/* Poster */}
                <div className="md:w-48 h-64 md:h-auto bg-gradient-to-br from-app-primary/20 to-app-accent/20 flex-shrink-0">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-app-primary/30" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-app-text mb-2">{movie.title}</h3>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-app-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-app-text">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                    <span className="text-app-text/60 text-sm">{movie.release_date?.split("-")[0]}</span>
                  </div>

                  <p className="text-app-text/70 leading-relaxed line-clamp-3">
                    {movie.overview || "영화 설명이 없습니다."}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/results/music")}
            className="flex-1 bg-app-primary hover:bg-app-primary/90 text-white py-6 text-lg rounded-[18px] shadow-lg"
          >
            음악 추천 보기
          </Button>
        </div>
      </div>
    </div>
  )
}
