import { apiClient } from "./axios"
import type { AnalysisInput, AnalysisResult } from "../types"

export const analysisApi = {
  async analyzeUser(input: AnalysisInput): Promise<AnalysisResult> {
    const response = await apiClient.post<AnalysisResult>("/analysis", input)
    return response.data
  },
}
