from groq import Groq
from pathlib import Path
import os

_groq = Groq(api_key=os.environ["GROQ_API_KEY"])

# Groq retires models periodically (llama-3.3-70b-versatile returned 404
# model_not_found), so keep this overridable without touching code.
# Check availability with: GET https://api.groq.com/openai/v1/models
GROQ_MODEL = os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")

# (doc_id, text) pairs loaded once at startup
_docs: list[tuple[str, str]] = []

SYSTEM_PROMPT = (
    "You are Justina Ominisan's AI portfolio assistant. "
    "Answer using ONLY the provided context. "
    "Be concise, friendly, and professional. "
    "If the answer isn't covered, say so honestly."
)

# Default data directory is relative to this file, not the CWD
_DEFAULT_DATA = Path(__file__).parent / "data"


def load_docs(data_path: Path | None = None) -> None:
    """Load all .txt files from the data directory into memory."""
    global _docs
    _docs = []
    path = data_path or _DEFAULT_DATA
    for file in sorted(path.glob("*.txt")):
        text = file.read_text(encoding="utf-8").strip()
        if text:
            _docs.append((file.stem, text))
    print(f"[startup] Loaded {len(_docs)} portfolio documents from {path}")


def _search(query: str, n: int = 3) -> str:
    """Return the top-n most relevant docs using keyword overlap scoring."""
    if not _docs:
        return "No portfolio information available."

    query_tokens = set(query.lower().split())
    scored = sorted(
        _docs,
        key=lambda pair: len(query_tokens & set(pair[1].lower().split())),
        reverse=True,
    )
    top = [text for _, text in scored[:n]]
    return "\n\n---\n\n".join(top)


def _build_messages(query: str) -> list[dict]:
    """Build the messages list used by both streaming and non-streaming chat."""
    context = _search(query)
    return [
        {
            "role": "system",
            "content": (
                f"{SYSTEM_PROMPT}\n\n"
                f"=== Portfolio Context ===\n{context}\n========================"
            ),
        },
        {"role": "user", "content": query},
    ]


def chat(query: str) -> str:
    response = _groq.chat.completions.create(
        model=GROQ_MODEL,
        messages=_build_messages(query),
        max_tokens=512,
    )
    return response.choices[0].message.content


def chat_stream(query: str):
    """Generator that yields text chunks as they arrive from Groq."""
    stream = _groq.chat.completions.create(
        model=GROQ_MODEL,
        messages=_build_messages(query),
        max_tokens=512,
        stream=True,
    )
    for chunk in stream:
        delta = chunk.choices[0].delta
        if delta.content:
            yield delta.content
