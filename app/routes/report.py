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

    prompt = f"""
    당신은 최고의 심리 분석가이자 판타지 게임 기획자입니다.
    아래 대화 내용을 분석하여 반드시 **순수 JSON만** 출력하세요.

    [생성 규칙]
    - JSON만 출력 (앞뒤 텍스트 금지)
    - 코드블록 금지 (```json 사용 금지)
    - 설명 문장/해설/인사말 절대 금지
    - 문자열 내부는 반드시 escape
    - stats의 percentage 총합은 반드시 100

    [대화 내용]
    {req.prompt}

    [반드시 아래 JSON 구조만 출력]
    {{
    "boss": {{
        "name": "",
        "title": "",
        "description": "",
        "weakness": "",
        "level": 1
    }},
    "stats": [
        {{ "type": "WARMTH", "percentage": 0 }},
        {{ "type": "ACTION", "percentage": 0 }},
        {{ "type": "INSIGHT", "percentage": 0 }},
        {{ "type": "STORM", "percentage": 0 }}
    ],
    "mission": ""
    }}
    """

    raw = ask_ollama(req.model, prompt)
    parsed = extract_json(raw)

    if parsed:
        return parsed

    return {"error": "JSON 파싱 실패", "raw": raw}
