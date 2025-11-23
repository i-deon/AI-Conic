from fastapi import FastAPI
from app.routes import chat, classify, report

app = FastAPI()

app.include_router(chat.router)
app.include_router(classify.router)
app.include_router(report.router)

# uvicorn main:app --reload
