# routers/questions.py
from fastapi import APIRouter
from uuid import uuid4
from data.questions import QUESTIONS
from schemas.question_schema import QuestionsResponse, Question

router = APIRouter(prefix="/questions", tags=["Questions"])

@router.get("/", response_model=QuestionsResponse)
def get_questions():
    session_id = str(uuid4())  # 세션 ID 자동 발급
    return QuestionsResponse(
        questions=[Question(**q) for q in QUESTIONS],
        session_id=session_id
    )
