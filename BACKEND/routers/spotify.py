from fastapi import APIRouter
from services.spotify_service import spotify_service, GENRE_MAP

router = APIRouter(prefix="/spotify", tags=["Spotify"])

@router.get("/recommend")
def recommend_music(movie_genre: str):
    """
    영화 선호 장르 기반 음악 추천 API
    예: /spotify/recommend?movie_genre=드라마
    """
    if movie_genre not in GENRE_MAP:
        return {
            "status": "error",
            "message": "지원하지 않는 영화 장르입니다."
        }

    spotify_genre = GENRE_MAP[movie_genre]
    tracks = spotify_service.get_tracks_by_genre(spotify_genre)

    return {
        "status": "success",
        "movie_genre": movie_genre,
        "spotify_genre": spotify_genre,
        "tracks": tracks
    }
