"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-app-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-app-text mb-4 text-balance">미루어보자</h1>
            <div className="h-1 w-24 bg-app-primary mx-auto rounded-full" />
          </div>

          {/* Hero Card */}
          <Card className="p-8 md:p-12 bg-white shadow-xl rounded-[24px] mb-8 border-0">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-app-primary to-app-accent rounded-[20px] mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-app-text mb-4 text-balance">
                영화 취향을 감정 패턴으로 분석합니다
              </h2>
              <p className="text-base md:text-lg text-app-text/70 leading-relaxed text-pretty">
                당신의 영화 취향을 분석하고, 맞춤형 영화와 음악을 추천해드립니다. 간단한 질문에 답하고 새로운 콘텐츠를
                발견하세요.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <div className="px-4 py-2 bg-app-primary/10 text-app-primary rounded-full text-sm font-medium">
                AI 감정 분석
              </div>
              <div className="px-4 py-2 bg-app-accent/10 text-app-accent rounded-full text-sm font-medium">
                영화 추천
              </div>
              <div className="px-4 py-2 bg-app-secondary/10 text-app-secondary rounded-full text-sm font-medium">
                음악 큐레이션
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => router.push("/quiz")}
              size="lg"
              className="bg-app-primary hover:bg-app-primary/90 text-white px-12 py-6 text-lg rounded-[18px] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              시작하기
            </Button>
          </Card>

          {/* Mood Board */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { emoji: "🎬", label: "영화" },
              { emoji: "🎵", label: "음악" },
              { emoji: "✨", label: "감성" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-6 bg-white rounded-[20px] shadow-md transition-all duration-500 delay-${idx * 100} ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <div className="text-sm font-medium text-app-text/60">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
