export interface Question {
  id: number
  question: string
  type: "single" | "multi"
  options: string[]
}

export interface QuestionsResponse {
  questions: Question[]
  session_id: string
}

export interface MovieRecommendation {
  id: number
  title: string
  poster_path?: string
  overview?: string
  vote_average?: number
  release_date?: string
}

export interface MusicTrack {
  id: string
  name: string
  artist: string
  preview_url?: string
  external_urls?: {
    spotify: string
  }
}

export interface PreferenceInfo {
  type: string
  name: string
  description: string
}

export interface AnalysisResult {
  session_id: string
  preference: PreferenceInfo
  movies: MovieRecommendation[]
  tracks: MusicTrack[]
}
