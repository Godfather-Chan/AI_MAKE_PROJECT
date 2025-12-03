"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { analyzeAnswers } from "@/lib/api"
import MovieCard from "@/components/MovieCard"
import MusicCard from "@/components/MusicCard"
import type { AnalysisResult } from "@/types"

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function loadResult() {
      try {
        const sessionId = sessionStorage.getItem("sessionId")
        const answersStr = sessionStorage.getItem("answers")

        if (!sessionId || !answersStr) {
          setError("테스트 데이터가 없습니다.")
          setLoading(false)
          return
        }

        const answers = JSON.parse(answersStr)
        const data = await analyzeAnswers(sessionId, answers)
        setResult(data)
        setLoading(false)
      } catch (err) {
        console.error("Failed to load result:", err)
        setError("결과를 불러올 수 없습니다.")
        setLoading(false)
      }
    }

    loadResult()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-xl glow-text">분석 중...</div>
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </main>
    )
  }

  if (error || !result) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-xl text-red-400 mb-6">{error}</div>
          <button onClick={() => router.push("/")} className="neon-button">
            홈으로 돌아가기
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="fade-in mb-12">
          <div className="cinematic-card p-8 mb-8 border-2 border-primary">
            <h1 className="text-4xl font-bold mb-4 glow-text">{result.preference.name}</h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">{result.preference.description}</p>
            <div className="text-sm text-gray-400">영화 타입: {result.preference.type}</div>
          </div>
        </div>

        {result.movies && result.movies.length > 0 && (
          <div className="fade-in mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-primary"></span>
              추천 영화
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.movies.map((movie, idx) => (
                <MovieCard key={idx} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {result.tracks && result.tracks.length > 0 && (
          <div className="fade-in mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-secondary"></span>
              추천 음악
            </h2>
            <div className="space-y-4">
              {result.tracks.map((track, idx) => (
                <MusicCard key={idx} track={track} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              sessionStorage.removeItem("sessionId")
              sessionStorage.removeItem("answers")
              router.push("/")
            }}
            className="neon-button-alt"
          >
            다시 테스트 하기
          </button>
        </div>
      </div>
    </main>
  )
}
