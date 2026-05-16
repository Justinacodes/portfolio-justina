from dotenv import load_dotenv
from pathlib import Path as _Path
load_dotenv(_Path(__file__).parent.parent.parent / ".env")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
from sentence_transformers import SentenceTransformer
import chromadb
import os

# Load model once and share with agent module
_embed = SentenceTransformer("all-MiniLM-L6-v2")
_db = chromadb.PersistentClient(path="./chroma")


def _ensure_ingested():
    """Ingest portfolio text files into ChromaDB if the collection is empty."""
    collection = _db.get_or_create_collection("portfolio")

    if collection.count() > 0:
        return

    data_path = Path("./data")
    for file in data_path.glob("*.txt"):
        text = file.read_text(encoding="utf-8").strip()
        if not text:
            continue
        embedding = _embed.encode(text).tolist()
        collection.add(ids=[file.stem], documents=[text], embeddings=[embedding])

    print(f"[startup] Ingested {collection.count()} documents into ChromaDB")


_ensure_ingested()

import agent as _agent  # noqa: E402
_agent._embed = _embed  # reuse already-loaded model
_agent._db = _db
_agent._collection = _db.get_collection("portfolio")

from agent import chat  # noqa: E402

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
