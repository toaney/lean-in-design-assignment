from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import articles, circles, home

app = FastAPI(title="Lean In API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(articles.router)
app.include_router(circles.router)
app.include_router(home.router)


@app.get("/")
def read_root():
    return {"status": "healthy", "service": "Lean In API"}
