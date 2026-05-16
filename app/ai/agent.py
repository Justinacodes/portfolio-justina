from strands import tool
from groq import Groq
import os

# Populated by server.py before first request
_embed = None
_collection = None

_groq = Groq(api_key=os.environ["GROQ_API_KEY"])

SYSTEM_PROMPT = (
    "You are Justina Ominisan's AI portfolio assistant. "
    "Answer using ONLY the provided context. "
    "Be concise, friendly, and professional. "
    "If the answer isn't covered, say so honestly."
)


@tool
def search_portfolio(query: str) -> str:
    """Retrieve relevant sections from Justina's portfolio data."""
    vecs = _embed.encode(query).tolist()
    results = _collection.query(query_embeddings=[vecs], n_results=3)
    docs = results["documents"][0]
    return "\n\n---\n\n".join(docs) if docs else "No relevant information found."


def chat(query: str) -> str:
    context = search_portfolio(query)

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
