from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_client import ask_ollama

router = APIRouter()

class ChatRequest(BaseModel):
    prompt: str
    model: str = "llama3.2"

@router.post("/ai/chat")
def chat(req: ChatRequest):
    reply = ask_ollama(req.model, req.prompt)
    return {"reply": reply}
