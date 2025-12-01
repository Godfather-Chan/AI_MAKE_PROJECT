"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ErrorPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-app-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 bg-white shadow-lg rounded-[24px] border-0 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-app-text mb-2">오류가 발생했습니다</h1>
        <p className="text-app-text/60 mb-6">일시적인 문제가 발생했습니다. 다시 시도해주세요.</p>

        <Button
          onClick={() => router.push("/")}
          className="w-full bg-app-primary hover:bg-app-primary/90 text-white py-6 text-lg rounded-[18px] shadow-lg"
        >
          홈으로 돌아가기
        </Button>
      </Card>
    </div>
  )
}
