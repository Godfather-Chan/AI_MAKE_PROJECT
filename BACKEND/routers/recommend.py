from fastapi import APIRouter
from services.movieService import MovieService

router = APIRouter()

movie_service = MovieService()

@router.post("/recommend")
def recommend_movies(payload: dict):
    # 프론트에서 보내는 값 이름을 맞춰준다
    result_code = payload.get("result_code")  
    answers = payload.get("answers")

    # result_code / answers 둘 중 하나는 반드시 와야 한다
    if not result_code and not answers:
        return {"error": "Missing result_code or answers"}

    # MovieService에 전달
    result = movie_service.recommend_movies(result_code=result_code, answers=answers)

    return {"recommended_movies": result}
