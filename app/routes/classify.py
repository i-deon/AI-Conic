from fastapi import APIRouter
from pydantic import BaseModel
from transformers import pipeline

router = APIRouter(
    prefix="/ai",
    tags=["Classify"]
)

class InputText(BaseModel):
    text: str

classifier = pipeline(
    "zero-shot-classification",
    model="joeddav/xlm-roberta-large-xnli"
)

labels = ["슬픔", "혼란", "불안", "분노"]
kingdom = ["WARMTH", "INSIGHT", "STORM", "ACTION"]

def classify_logic(text: str):
    result = classifier(
        text,
        labels,
        multi_label=False
    )
    idx = labels.index(result["labels"][0])
    return {
        "emotion": labels[idx],
        "kingdom": kingdom[idx],
        "confidence": result["scores"][0]
    }

@router.post("/classify")
def classify_api(body: InputText):
    return classify_logic(body.text)
