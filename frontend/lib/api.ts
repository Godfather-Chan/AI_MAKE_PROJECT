const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

export async function getQuestions() {
  const res = await fetch(`${BACKEND_URL}/questions/`)
  if (!res.ok) throw new Error("Failed to fetch questions")
  return res.json()
}

export async function analyzeAnswers(sessionId: string, answers: number[]) {
  const res = await fetch(`${BACKEND_URL}/final/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      answers: answers,
    }),
  })
  if (!res.ok) throw new Error("Failed to analyze answers")
  return res.json()
}
