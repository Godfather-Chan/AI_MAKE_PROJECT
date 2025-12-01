"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/results/movies")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-app-primary via-app-accent to-app-primary flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-white/30" />
            <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-pulse">
          당신의 취향을 분석하고 있습니다...
        </h2>

        <div className="space-y-2 text-white/80">
          <p className="animate-in fade-in duration-700 delay-300">감정 패턴 분석 중</p>
          <p className="animate-in fade-in duration-700 delay-700">맞춤 추천 생성 중</p>
          <p className="animate-in fade-in duration-700 delay-1000">결과 준비 중</p>
        </div>
      </div>
    </div>
  )
}
