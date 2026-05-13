from strands import tool
from sentence_transformers import SentenceTransformer
import chromadb
import ollama

_embed = SentenceTransformer("all-MiniLM-L6-v2")
_db = chromadb.PersistentClient(path="./chroma")
_collection = _db.get_collection("portfolio")

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

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "system",
                "content": f"{SYSTEM_PROMPT}\n\n=== Portfolio Context ===\n{context}\n========================",
            },
            {"role": "user", "content": query},
        ],
    )
    return response["message"]["content"]
