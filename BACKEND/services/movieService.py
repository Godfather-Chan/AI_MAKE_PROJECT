import requests
import os

class MovieService:
    def __init__(self):
        self.api_key = os.getenv("TMDB_API_KEY")
        self.base_url = "https://api.themoviedb.org/3"

    def recommend_movies(self, preferences: dict):
        # preferences 예:
        # {"genre": ["Comedy", "Drama"], "mood": "Calm"}

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

        selected_genres = [genre_map[g] for g in preferences.get("genre", []) if g in genre_map]

        params = {
            "api_key": self.api_key,
            "language": "ko-KR",
            "with_genres": ",".join(map(str, selected_genres)),
            "sort_by": "vote_average.desc",
            "vote_count.gte": 50
        }

        res = requests.get(f"{self.base_url}/discover/movie", params=params)
        res.raise_for_status()
        return res.json()["results"][:5]
