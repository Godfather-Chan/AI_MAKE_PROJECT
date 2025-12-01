# schemas/question_schema.py
from pydantic import BaseModel
from typing import List, Optional

class Question(BaseModel):
    id: int
    question: str
    type: str
    options: List[str]

class QuestionsResponse(BaseModel):
    questions: List[Question]
    session_id: Optional[str] = None
