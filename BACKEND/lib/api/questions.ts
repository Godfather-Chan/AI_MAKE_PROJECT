import { apiClient } from "./axios"
import type { QuestionsResponse } from "../types"

export const questionsApi = {
  async getQuestions(): Promise<QuestionsResponse> {
    const response = await apiClient.get<QuestionsResponse>("/questions")
    return response.data
  },
}
