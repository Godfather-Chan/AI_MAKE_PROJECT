"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { questionsApi } from "@/lib/api/questions"
import { analysisApi } from "@/lib/api/analysis"
import type { Question } from "@/lib/types"

export default function QuizPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    try {
      const data = await questionsApi.getQuestions()
      setQuestions(data.questions)
      setSessionId(data.session_id)
    } catch (error) {
      console.error("[v0] Failed to load questions:", error)
      router.push("/error")
    } finally {
      setLoading(false)
    }
  }

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleOptionClick = (option: string) => {
    const questionId = currentQuestion.id
    const currentAnswers = answers[questionId] || []

    if (currentQuestion.type === "single") {
      setAnswers({ ...answers, [questionId]: [option] })
    } else {
      // Multi-select with max 3
      if (currentAnswers.includes(option)) {
        setAnswers({ ...answers, [questionId]: currentAnswers.filter((a) => a !== option) })
      } else if (currentAnswers.length < 3) {
        setAnswers({ ...answers, [questionId]: [...currentAnswers, option] })
      }
    }
  }

  const isOptionSelected = (option: string) => {
    return answers[currentQuestion?.id]?.includes(option) || false
  }

  const canProceed = () => {
    return answers[currentQuestion?.id]?.length > 0
  }

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      await submitAnswers()
    }
  }

  const submitAnswers = async () => {
    setSubmitting(true)
    try {
      // Convert answers to scores format expected by backend
      const scores = {
        adventure: 0,
        romance: 0,
        comedy: 0,
        dark: 0,
        fantasy: 0,
        animation: 0,
        documentary: 0,
      }

      // Simple mapping logic
      Object.values(answers)
        .flat()
        .forEach((answer) => {
          const lower = answer.toLowerCase()
          if (lower.includes("액션") || lower.includes("빠른") || lower.includes("긴장")) scores.adventure += 1
          if (lower.includes("로맨스") || lower.includes("감동")) scores.romance += 1
          if (lower.includes("코미디") || lower.includes("유쾌")) scores.comedy += 1
          if (lower.includes("스릴러") || lower.includes("공포") || lower.includes("어둡")) scores.dark += 1
          if (lower.includes("sf") || lower.includes("판타지")) scores.fantasy += 1
          if (lower.includes("애니메이션")) scores.animation += 1
          if (lower.includes("다큐멘터리") || lower.includes("실화")) scores.documentary += 1
        })

      await analysisApi.analyzeUser({ session_id: sessionId, scores })

      // Store session ID for later use
      localStorage.setItem("session_id", sessionId)

      router.push("/loading")
    } catch (error) {
      console.error("[v0] Failed to submit answers:", error)
      router.push("/error")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-app-background flex items-center justify-center">
        <Spinner className="w-8 h-8 text-app-primary" />
      </div>
    )
  }

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-app-background">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-app-text/60">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-app-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-6 md:p-8 bg-white shadow-lg rounded-[24px] mb-6 border-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl md:text-2xl font-bold text-app-text mb-6 text-balance">{currentQuestion.question}</h2>

          {currentQuestion.type === "multi" && <p className="text-sm text-app-text/60 mb-4">최대 3개까지 선택 가능</p>}

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className={`w-full px-6 py-4 rounded-[18px] text-left font-medium transition-all duration-300 ${
                  isOptionSelected(option)
                    ? "bg-app-primary text-white shadow-md scale-105"
                    : "bg-app-background hover:bg-app-primary/10 text-app-text hover:scale-105"
                } active:scale-95`}
              >
                {option}
              </button>
            ))}
          </div>
        </Card>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          disabled={!canProceed() || submitting}
          size="lg"
          className="w-full bg-app-primary hover:bg-app-primary/90 text-white py-6 text-lg rounded-[18px] shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? <Spinner className="w-5 h-5" /> : currentIndex < questions.length - 1 ? "다음" : "분석 시작"}
        </Button>
      </div>
    </div>
  )
}
