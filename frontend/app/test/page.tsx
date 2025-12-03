"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getQuestions } from "@/lib/api"
import QuestionCard from "@/components/QuestionCard"
import ProgressBar from "@/components/ProgressBar"
import type { Question } from "@/types"

export default function TestPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await getQuestions()
        setQuestions(data.questions)
        setSessionId(data.session_id)
        setAnswers(new Array(data.questions.length).fill(-1))
        setLoading(false)
      } catch (error) {
        console.error("Failed to load questions:", error)
        setLoading(false)
      }
    }
    loadQuestions()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-xl glow-text">로딩 중...</div>
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </main>
    )
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-400">질문을 불러올 수 없습니다.</div>
      </main>
    )
  }

  const currentQuestion = questions[currentIndex]
  const isAnswered = answers[currentIndex] !== -1
  const isLastQuestion = currentIndex === questions.length - 1

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = async () => {
    if (!isAnswered) return

    if (isLastQuestion) {
      try {
        sessionStorage.setItem("sessionId", sessionId)
        sessionStorage.setItem("answers", JSON.stringify(answers))
        router.push("/result")
      } catch (error) {
        console.error("Failed to save data:", error)
      }
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <div className="fade-in mt-8">
          <QuestionCard question={currentQuestion} answer={answers[currentIndex]} onAnswer={handleAnswer} />
        </div>

        <div className="mt-8 flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-600 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-secondary hover:text-secondary"
          >
            이전
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed neon-button"
          >
            {isLastQuestion ? "결과 보기" : "다음"}
          </button>
        </div>
      </div>
    </main>
  )
}
