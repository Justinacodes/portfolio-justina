from sentence_transformers import SentenceTransformer
import chromadb
from pathlib import Path

model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.PersistentClient(path="./chroma")
collection = client.get_or_create_collection("portfolio")

data_path = Path("./data")

documents = []

for file in data_path.glob("*.txt"):
    text = file.read_text()
    documents.append({
        "id": file.stem,
        "text": text
    })

for doc in documents:
    embedding = model.encode(doc["text"]).tolist()

    collection.add(
        ids=[doc["id"]],
        documents=[doc["text"]],
        embeddings=[embedding]
    )

print("Documents embedded successfully.")