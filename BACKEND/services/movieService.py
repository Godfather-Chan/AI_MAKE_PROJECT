import requests
import os

class MovieService:
    def __init__(self):
        self.api_key = os.getenv("TMDB_API_KEY")
        self.base_url = "https://api.themoviedb.org/3"

    def recommend_movies(self, result_code=None, answers=None):
        """
        result_code 또는 answers 기반으로 추천 장르를 결정하고 TMDB 검색.
        """

        # 1) result_code → 장르 매핑
        result_to_genre = {
            "A": ["Action", "Thriller"],
            "B": ["Comedy"],
            "C": ["Drama", "Romance"],
            "D": ["Sci-Fi"],
        }

        # 2) answers → 장르 계산 로직 (너가 기존 프론트에 맞춰 정의한 기준)
        # 지금은 예시로 하나 넣어둠
        if answers:
            genre_list = self._convert_answers_to_genres(answers)
        else:
            genre_list = result_to_genre.get(result_code, ["Drama"])

        # 3) 장르 코드 매핑
        genre_map = {
            "Action": 28,
            "Comedy": 35,
            "Drama": 18,
            "Romance": 10749,
            "Sci-Fi": 878,
            "Thriller": 53,
            "Animation": 16,
            "Horror": 27,
        }

        selected_genres = [genre_map[g] for g in genre_list if g in genre_map]

        params = {
            "api_key": self.api_key,
            "language": "ko-KR",
            "with_genres": ",".join(map(str, selected_genres)),
            "sort_by": "vote_average.desc",
            "vote_count.gte": 50
        }

        res = requests.get(f"{self.base_url}/discover/movie", params=params)
        res.raise_for_status()
        return {
            "movies": res.json()["results"][:5],
            "genres_used": genre_list
        }

    def _convert_answers_to_genres(self, answers):
        """
        너희 테스트 문항에 맞는 장르 변환 로직 넣는 자리
        지금은 예시로 기본값
        """
        score = sum(answers)
        if score <= 10:
            return ["Comedy"]
        elif score <= 20:
            return ["Drama", "Romance"]
        else:
            return ["Action", "Thriller"]
