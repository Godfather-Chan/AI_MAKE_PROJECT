import { apiClient } from "./axios"
import type { MovieRecommendation, MusicRecommendation } from "../types"

export const recommendApi = {
  async getMovieRecommendations(sessionId: string): Promise<MovieRecommendation> {
    const response = await apiClient.post<MovieRecommendation>("/recommend", {
      session_id: sessionId,
      scores: {}, // Will be fetched from analysis
    })
    return response.data
  },

  async getMusicRecommendations(sessionId: string): Promise<MusicRecommendation> {
    // This would call the Spotify endpoint
    const response = await apiClient.get<MusicRecommendation>(`/spotify/recommendations?session_id=${sessionId}`)
    return response.data
  },
}
