from __future__ import annotations

import logging
from typing import List

import chromadb
from chromadb import EmbeddingFunction, Documents, Embeddings
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

_client: chromadb.PersistentClient | None = None
_collection: chromadb.Collection | None = None

COLLECTION_NAME = "portfolio"
EMBED_MODEL = "all-MiniLM-L6-v2"


class _DirectSTEmbedding(EmbeddingFunction):
    """Wraps SentenceTransformer directly — avoids the transformers AutoProcessor
    issue that appears in transformers ≥ 5.x when using ChromaDB's built-in wrapper."""

    def __init__(self, model_name: str) -> None:
        self._model = SentenceTransformer(model_name)

    def __call__(self, input: Documents) -> Embeddings:
        vecs: List[List[float]] = self._model.encode(list(input)).tolist()
        return vecs


def _make_client() -> chromadb.PersistentClient:
    return chromadb.PersistentClient(path="./chroma_db")


def get_collection() -> chromadb.Collection:
    global _client, _collection
    if _collection is None:
        _client = _make_client()
        ef = _DirectSTEmbedding(EMBED_MODEL)
        _collection = _client.get_or_create_collection(
            name=COLLECTION_NAME,
            embedding_function=ef,
            metadata={"hnsw:space": "cosine"},
        )
    return _collection


def reset_collection() -> None:
    """Delete and recreate the collection — used before a full re-ingest."""
    global _client, _collection
    client = _client or _make_client()
    try:
        client.delete_collection(COLLECTION_NAME)
        logger.info("Deleted existing ChromaDB collection '%s'", COLLECTION_NAME)
    except Exception:
        pass
    _collection = None


def query(text: str, n_results: int = 8) -> list[dict]:
    """Query the collection and return deduplicated chunks ranked by relevance."""
    collection = get_collection()
    count = collection.count()
    if count == 0:
        return []

    safe_n = min(n_results, count)
    results = collection.query(query_texts=[text], n_results=safe_n)

    chunks = []
    seen_texts: set[str] = set()
    if results["documents"]:
        for doc, meta, distance in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0],
        ):
            key = doc[:120]
            if key in seen_texts:
                continue
            seen_texts.add(key)
            chunks.append({
                "text": doc,
                "type": meta.get("type", ""),
                "id": meta.get("id", ""),
                "score": round(1 - distance, 4),
            })
    return chunks


def query_multi(texts: list[str], n_per_query: int = 6) -> list[dict]:
    """Query with multiple text variants and merge/deduplicate results."""
    seen: dict[str, dict] = {}
    for text in texts:
        for chunk in query(text, n_results=n_per_query):
            cid = chunk["id"]
            if cid not in seen or chunk["score"] > seen[cid]["score"]:
                seen[cid] = chunk
    return sorted(seen.values(), key=lambda c: c["score"], reverse=True)[:10]
