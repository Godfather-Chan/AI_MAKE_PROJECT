from pydantic import BaseModel
from typing import Dict

class AnalysisInput(BaseModel):
    scores: Dict[str, int]
