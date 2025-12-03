import { apiClient } from "./axios"
import type { FinalResult } from "../types"

export const finalApi = {
  async getFinalResult(sessionId: string): Promise<FinalResult> {
    const response = await apiClient.post<FinalResult>("/final/recommend", {
      session_id: sessionId,
      answers: {},
    })
    return response.data
  },
}
