from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_client import ask_ollama
from app.services.parser import extract_json

router = APIRouter()

class ChatRequest(BaseModel):
    prompt: str
    model: str = "llama3.2"

@router.post("/ai/report")
def generate_report(req: ChatRequest):
    system_prompt = """
    다음 대화 내용을 분석하여 JSON으로 출력하세요...
    JSON 형식:
    {
      "boss": {...},
      "stats": [...],
      "mission": "string"
    }
    """

    prompt = system_prompt + "\n\n[대화 로그]\n" + req.prompt + "\n\nJSON: "

    raw = ask_ollama(req.model, prompt)
    parsed = extract_json(raw)

    if parsed:
        return parsed

    return {"error": "JSON 파싱 실패", "raw": raw}
