class AnalysisService:
    def process_user_answers(self, answers: dict):
        # answers 예:
        # { "1": ["Comedy"], "4": ["차분하고 따뜻함"] }

        genre_map = {
            "액션": "Action",
            "코미디": "Comedy",
            "로맨스": "Romance",
            "드라마": "Drama",
            "SF·판타지": "Sci-Fi",
            "스릴러·공포": "Thriller",
            "애니메이션": "Animation"
        }

        genre_preferences = []
        for q, val in answers.items():
            if isinstance(val, list):
                for item in val:
                    if item in genre_map:
                        genre_preferences.append(genre_map[item])

        return {
            "genre": genre_preferences,
            "mood": "Calm"  # 심리 질문 기반 확장 가능
        }
