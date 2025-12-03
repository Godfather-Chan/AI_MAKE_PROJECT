from fastapi import FastAPI
from routers.questions import router as questions_router
from routers.analysis import router as analysis_router
from routers.recommend import router as recommend_router
from routers.spotify import router as spotify_router
from routers.final import router as final_router

app = FastAPI(title="미루어보자 Backend API", version="1.0.0")

@app.get("/")
def root():
    return {"status": "ok"}

app.include_router(questions_router)
app.include_router(analysis_router)
app.include_router(recommend_router)
app.include_router(spotify_router)
app.include_router(final_router)
