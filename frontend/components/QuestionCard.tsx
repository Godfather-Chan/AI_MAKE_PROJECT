"use client"

import type { Question } from "@/types"

interface QuestionCardProps {
  question: Question
  answer: number
  onAnswer: (optionIndex: number) => void
}

export default function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  return (
    <div className="cinematic-card p-8">
      <h2 className="text-2xl font-bold mb-8 text-white">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <label
            key={idx}
            className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              checked={answer === idx}
              onChange={() => onAnswer(idx)}
              className="w-4 h-4 cursor-pointer accent-primary"
            />
            <span className="text-lg text-gray-200 hover:text-white">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
