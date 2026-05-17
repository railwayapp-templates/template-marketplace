# Deploy Railway RAG Stack on Railway

Local LLM + pgvector RAG — no external AI APIs needed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-rag-stack)

## About

Railway RAG Stack is a fully self-hosted Retrieval-Augmented Generation system powered by Ollama for local LLM inference, pgvector for semantic search, and a Bun REST API. Ingest documents, search by meaning, and chat with your data — no external AI APIs or usage fees required.

Hosting a RAG system involves running a language model server, a vector database, and an API layer in coordination. Railway RAG Stack deploys Ollama to serve embedding and generation models locally, Postgres with pgvector as the vector store, and a Bun API that chunks documents, generates embeddings, and retrieves relevant context before generation. Ollama models are persisted to a Railway volume to avoid re-downloading on every deploy. The API waits for Ollama readiness and pulls required models automatically on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ollama | [furelid/railway-rag-stack](https://github.com/furelid/railway-rag-stack) (root: ollama/) | Database |
| Api | [furelid/railway-rag-stack](https://github.com/furelid/railway-rag-stack) (root: ollama/) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LLM_MODEL` | Ollama | llama3.2:1b | Model to pull on startup |
| `EMBEDDING_MODEL` | Ollama | nomic-embed-text | Model to pull on startup |
| `PORT` | Api | 3000 | Server port |
| `LLM_MODEL` | Api | llama3.2:1b | Ollama model for generation |
| `OLLAMA_HOST` | Api | - | Ollama connection string |
| `DATABASE_URL` | Api | - | Postgres connection string |
| `EMBEDDING_MODEL` | Api | nomic-embed-text | Ollama model for embeddings |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/root/.ollama`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/railway-rag-stack)
