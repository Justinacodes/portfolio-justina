from sentence_transformers import SentenceTransformer
import chromadb
import ollama

model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.PersistentClient(path="./chroma")
collection = client.get_collection("portfolio")

def ask_portfolio(query):

    query_embedding = model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=2
    )

    context = "\n".join(results["documents"][0])

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "system",
                "content": f"""
You are Justina's AI portfolio assistant.

Use ONLY the provided context to answer questions.

Context:
{context}
                """
            },
            {
                "role": "user",
                "content": query
            }
        ]
    )

    return response["message"]["content"]