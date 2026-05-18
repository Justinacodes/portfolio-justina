from groq import Groq
from pathlib import Path
import os

_groq = Groq(api_key=os.environ["GROQ_API_KEY"])

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


def chat(query: str) -> str:
    context = _search(query)

    response = _groq.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    f"{SYSTEM_PROMPT}\n\n"
                    f"=== Portfolio Context ===\n{context}\n========================"
                ),
            },
            {"role": "user", "content": query},
        ],
        max_tokens=512,
    )
    return response.choices[0].message.content
