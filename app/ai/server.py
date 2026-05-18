from pathlib import Path as _Path
import os

# Load .env only when running locally (file won't exist on Render)
_env_file = _Path(__file__).parent.parent.parent / ".env"
if _env_file.exists():
    from dotenv import load_dotenv
    load_dotenv(_env_file)

if not os.environ.get("GROQ_API_KEY"):
    raise RuntimeError(
        "GROQ_API_KEY is not set. "
        "Add it in Render → Environment, or in your local .env file."
    )

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agent import chat, load_docs

load_docs()

app = FastAPI(title="Justina Portfolio Chatbot")

origins = ["http://localhost:3000", "https://www.justinaominisan.com.ng"]
if extra := os.environ.get("ALLOWED_ORIGIN"):
    origins.append(extra)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    return ChatResponse(response=chat(req.message))
