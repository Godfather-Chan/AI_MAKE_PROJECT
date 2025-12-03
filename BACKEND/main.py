from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.questions import router as questions_router
from routers.analysis import router as analysis_router
from routers.recommend import router as recommend_router
from routers.spotify import router as spotify_router
from routers.final import router as final_router

app = FastAPI(title="미루어보자 Backend API", version="1.0.0")

# 🔥 CORS 설정은 FastAPI 생성 직후에 추가해야 한다
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://miruda.vercel.app",
        "https://ai-make-project.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

# 라우터 등록
app.include_router(questions_router)
app.include_router(analysis_router)
app.include_router(recommend_router)
app.include_router(spotify_router)
app.include_router(final_router)
