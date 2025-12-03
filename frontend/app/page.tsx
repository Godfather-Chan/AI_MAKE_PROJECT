"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center fade-in max-w-2xl">
        <div className="mb-12">
          <h1 className="text-7xl font-bold mb-4 glow-text">미루어보자</h1>
          <p className="text-xl text-gray-300 mb-8">당신의 영화 취향을 찾아보세요</p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="mb-12">
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            8가지 질문으로 당신의 영화 성향을 분석하고,
            <br />
            맞춤형 영화와 음악을 추천받아보세요.
          </p>
        </div>

        <Link href="/test">
          <button className="neon-button text-lg animate-pulse hover:animate-none">테스트 시작하기</button>
        </Link>

        <div className="mt-20 flex justify-center gap-8">
          <div className="w-1 h-32 bg-primary opacity-50"></div>
          <div className="w-1 h-24 bg-secondary opacity-50"></div>
          <div className="w-1 h-32 bg-accent opacity-50"></div>
        </div>
      </div>
    </main>
  )
}
