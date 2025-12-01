from fastapi import APIRouter
from services.movieService import MovieService

router = APIRouter()

# MovieService 인스턴스 생성
movie_service = MovieService()

@router.post("/recommend")
def recommend_movies(payload: dict):
    preferences = payload.get("preferences")
    result = movie_service.recommend_movies(preferences)
    return {"recommended_movies": result}
