from fastapi import APIRouter
from schemas.analysis_schema import AnalysisInput

router = APIRouter(prefix="/analysis", tags=["analysis"])

def calculate_taste_type(scores):
    adventure = scores.get("adventure", 0)
    romance = scores.get("romance", 0)
    comedy = scores.get("comedy", 0)
    dark = scores.get("dark", 0)
    fantasy = scores.get("fantasy", 0)
    animation = scores.get("animation", 0)
    documentary = scores.get("documentary", 0)

    taste_map = {
        "ADVENTURE": adventure,
        "ROMANCE": romance,
        "COMEDY": comedy,
        "DARK": dark,
        "FANTASY": fantasy,
        "ANIMATION": animation,
        "DOCUMENTARY": documentary,
    }

    # 가장 높은 점수의 유형 선택
    taste_type = max(taste_map, key=taste_map.get)
    return taste_type


@router.post("/")
def analyze_user(input_data: AnalysisInput):
    taste_type = calculate_taste_type(input_data.scores)
    return {
        "taste_type": taste_type,
        "analysis": f"Your main taste type is {taste_type}"
    }
