"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { finalApi } from "@/lib/api/final"
import type { FinalResult } from "@/lib/types"

export default function FinalResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<FinalResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFinalResult()
  }, [])

  const loadFinalResult = async () => {
    try {
      const sessionId = localStorage.getItem("session_id")
      if (!sessionId) {
        router.push("/")
        return
      }

      const data = await finalApi.getFinalResult(sessionId)
      setResult(data)
    } catch (error) {
      console.error("[v0] Failed to load final result:", error)
      // Create dummy data for demo
      setResult({
        session_id: "",
        preference: { genres: ["드라마", "로맨스"], mood: "따뜻함" },
        movies: [],
        tracks: [],
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRetake = () => {
    localStorage.removeItem("session_id")
    router.push("/")
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "미루어보자 - 내 취향 분석 결과",
        text: "나의 영화·음악 취향 분석 결과를 확인해보세요!",
        url: window.location.href,
      })
    } catch (error) {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
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
          <div className="w-20 h-20 bg-gradient-to-br from-app-primary to-app-accent rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-app-text mb-2">분석 완료!</h1>
          <p className="text-app-text/60">당신의 취향 프로필</p>
        </div>

        {/* Summary Card */}
        <Card className="p-6 md:p-8 bg-white shadow-lg rounded-[24px] mb-6 border-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-app-text mb-4">선호하는 장르</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {result?.preference?.genres?.map((genre, idx) => (
              <div key={idx} className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-full font-medium">
                {genre}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-app-text mb-4">분위기</h2>
          <p className="text-lg text-app-text/70">
            {result?.preference?.mood || "따뜻하고 감성적인 분위기를 선호합니다"}
          </p>
        </Card>

        {/* Movie Summary */}
        <Card className="p-6 md:p-8 bg-white shadow-lg rounded-[24px] mb-6 border-0 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-app-primary/10 rounded-[12px] flex items-center justify-center">
              <svg className="w-6 h-6 text-app-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-app-text">추천 영화</h2>
          </div>
          <p className="text-app-text/70 mb-4">{result?.movies?.length || 0}개의 영화를 추천드립니다</p>
          <Button
            onClick={() => router.push("/results/movies")}
            variant="outline"
            className="w-full border-2 border-app-primary text-app-primary hover:bg-app-primary/10 rounded-[18px]"
          >
            영화 추천 보기
          </Button>
        </Card>

        {/* Music Summary */}
        <Card className="p-6 md:p-8 bg-white shadow-lg rounded-[24px] mb-8 border-0 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-[12px] flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-app-text">추천 음악</h2>
          </div>
          <p className="text-app-text/70 mb-4">Spotify 기반 플레이리스트를 확인하세요</p>
          <Button
            onClick={() => router.push("/results/music")}
            variant="outline"
            className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-[18px]"
          >
            음악 추천 보기
          </Button>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleRetake}
            variant="outline"
            className="flex-1 border-2 border-app-secondary text-app-secondary hover:bg-app-secondary/10 py-6 text-lg rounded-[18px] bg-transparent"
          >
            다시 테스트
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 bg-app-accent hover:bg-app-accent/90 text-white py-6 text-lg rounded-[18px] shadow-lg"
          >
            공유하기
          </Button>
        </div>
      </div>
    </div>
  )
}
