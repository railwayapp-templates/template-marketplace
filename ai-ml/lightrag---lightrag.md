# Deploy lightrag on Railway

One-click Graph RAG • Knowledge Graph + Vector Search • Web UI included

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightrag)

## About

One-click deployment of LightRAG - the most popular Graph RAG framework with 25K+ GitHub stars. Featured in EMNLP 2025.

LightRAG is a graph-based Retrieval-Augmented Generation system that outperforms traditional RAG by building knowledge graphs from your documents. Unlike simple vector search, LightRAG understands relationships between entities, delivering smarter and more contextual answers.

This template includes the full LightRAG server with a built-in Web UI for document management, chat interface, and interactive knowledge graph visualization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lightrag-railway | [rohansx/lightrag-railway](https://github.com/rohansx/lightrag-railway) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9621 |
| `INPUT_DIR` | /app/data/inputs |
| `LLM_MODEL` | gpt-4o-mini |
| `MAX_ASYNC` | 4 |
| `LLM_BINDING` | openai |
| `LLM_TIMEOUT` | 180 |
| `WORKING_DIR` | /app/data/rag_storage |
| `EMBEDDING_DIM` | 1536 |
| `EMBEDDING_MODEL` | text-embedding-3-small |
| `LLM_BINDING_HOST` | https://api.openai.com/v1 |
| `EMBEDDING_BINDING` | openai |
| `LLM_BINDING_API_KEY` | (secret) |
| `MAX_PARALLEL_INSERT` | 2 |
| `EMBEDDING_BINDING_HOST` | https://api.openai.com/v1 |

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/lightrag)
