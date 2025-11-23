import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def ask_ollama(model: str, prompt: str) -> str:
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }

    r = requests.post(OLLAMA_URL, json=payload)
    data = r.json()
    return data.get("response", "")
