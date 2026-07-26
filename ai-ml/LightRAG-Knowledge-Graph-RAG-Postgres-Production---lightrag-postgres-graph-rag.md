# Deploy LightRAG — Knowledge Graph RAG [Postgres Production] on Railway

Knowledge-graph RAG on Postgres — Web UI, 20+ LLM providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightrag-postgres-graph-rag)

## About

LightRAG is an open-source, graph-enhanced RAG (retrieval-augmented generation) system from HKUDS — it builds a knowledge graph from your documents so queries can follow relationships between entities, not just match similar text. This template deploys it in a **production configuration**: LightRAG backed by PostgreSQL for all four storage roles, rather than the file-based defaults that LightRAG's own docs mark as development-only.

---

LightRAG needs four kinds of storage: KV (LLM response cache, chunks), vector (embeddings), graph (the knowledge graph itself), and doc-status (ingestion tracking). Out of the box it uses in-memory, file-persisted stores — NetworkX for the graph, NanoVectorDB for vectors — and LightRAG's documentation is explicit that these are **for development and debugging, not production**.

This template uses PostgreSQL for all four. A single Postgres instance with the pgvector and Apache AGE extensions handles KV, vector search, the knowledge graph, and doc-status together — production-grade storage that survives scale, backs up cleanly, and doesn't lose your graph to a corrupted file. That's the difference between a demo you can query and a knowledge base you can trust.

Two things to know when configuring it:

**The LLM and the embedding model are configured separately.** `LLM_BINDING` sets the chat model; the embedding model has its own `EMBEDDING_BINDING` and `EMBEDDING_DIM`. Both must be set, and the embedding dimension must match your model (1536 for OpenAI's `text-embedding-3-small`).

**The graph backend requires Apache AGE, not plain Postgres.** LightRAG's `PGGraphStorage` runs on the AGE extension, so this template uses a Postgres image with pgvector and AGE built in — a stock Postgres won't provide graph storage.

LightRAG delegates inference to external providers, so **no GPU is needed**. Memory scales with document volume and graph size; Railway's larger plans handle sizable collections comfortably.

Typical cost: **~$10–20/month** on Railway for LightRAG and Postgres, plus your LLM and embedding provider usage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LightRAG | `ghcr.io/hkuds/lightrag` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | - |
| `PORT` | 9621 | - |
| `INPUT_DIR` | /app/data/inputs | - |
| `LLM_MODEL` | gpt-4o-mini | - |
| `MAX_ASYNC` | 4 | - |
| `LLM_BINDING` | openai | - |
| `WORKING_DIR` | /app/data/rag_storage | - |
| `TOKEN_SECRET` | (secret) | - |
| `AUTH_ACCOUNTS` | - | Web UI login credentials. Please provide in format: 'username:password' |
| `EMBEDDING_DIM` | 3072 | - |
| `EMBEDDING_MODEL` | <user-provided> | - |
| `LIGHTRAG_API_KEY` | (secret) | - |
| `LLM_BINDING_HOST` | https://api.openai.com/v1 | - |
| `SUMMARY_LANGUAGE` | English | - |
| `EMBEDDING_BINDING` | openai | - |
| `LLM_BINDING_API_KEY` | (secret) | - |
| `MAX_PARALLEL_INSERT` | 2 | - |
| `EMBEDDING_TOKEN_LIMIT` | (secret) | - |
| `EMBEDDING_BINDING_HOST` | https://api.openai.com/v1 | - |
| `EMBEDDING_BINDING_API_KEY` | (secret) | - |
| `ENABLE_LLM_CACHE_FOR_EXTRACT` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lightrag-postgres-graph-rag)
