from fastapi import APIRouter, HTTPException
from services.movieService import MovieService
from services.spotify_service import SpotifyService
from services.analysisService import AnalysisService

router = APIRouter(prefix="/final", tags=["Final Recommend"])

@router.post("/recommend")
async def final_recommend(payload: dict):
    try:
        session_id = payload["session_id"]
        answers = payload["answers"]
        spotify_code = payload.get("spotify_code")

        analysis = AnalysisService()
        movie_service = MovieService()
        spotify_service = SpotifyService()

        # 1) 분석 결과 추출
        user_pref = analysis.process_user_answers(answers)

        # 2) TMDB 추천
        movie_results = movie_service.recommend_movies(user_pref)

        # 3) Spotify 추천 (선택적)
        spotify_tracks = []
        if spotify_code:
            token_data = spotify_service.get_access_token(spotify_code)
            access_token = token_data["access_token"]
            spotify_tracks = spotify_service.get_user_top_tracks(access_token)

        # 4) 최종 응답 형태 통일
        return {
            "session_id": session_id,
            "preference": user_pref,
            "movies": movie_results,
            "tracks": spotify_tracks
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
