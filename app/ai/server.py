from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import chat

app = FastAPI(title="Justina Portfolio Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://www.justinaominisan.com.ng"],
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
    answer = chat(req.message)
    return ChatResponse(response=answer)
