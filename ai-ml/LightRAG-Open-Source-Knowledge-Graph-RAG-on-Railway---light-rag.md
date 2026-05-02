# Deploy LightRAG | Open Source Knowledge Graph RAG on Railway on Railway

Self host LightRAG. Graph-enhanced retrieval with Web UI & multi LLMs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/light-rag)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/light-rag?referralCode=QXdhdr)

LightRAG is an open-source graph-enhanced RAG framework from HKU Data Science Lab with 34k+ GitHub stars, presented at EMNLP 2025. It extracts entities and relationships from your documents to build a knowledge graph, then combines graph-based retrieval with vector search to deliver more accurate, context-aware answers than traditional chunk-based RAG systems.

This template pre-configures the LightRAG Server (`ghcr.io/hkuds/lightrag:latest`) with OpenAI LLM and embedding bindings, JWT authentication, API key protection, and a persistent volume for local file-based storage. Upload documents, query them through the built-in Web UI, and visualize your knowledge graph -- all from a single service.

LightRAG (MIT license) goes beyond vector-only retrieval by building a knowledge graph from your documents. Its dual-level retrieval system handles both precise entity lookups and broad thematic queries.

- **Knowledge graph extraction** -- automatically identifies entities and relationships across documents
- **Dual-level retrieval** -- low-level (specific entities/relationships) and high-level (themes/topics) search modes, plus a hybrid mode combining both
- **Incremental updates** -- add new documents without rebuilding the entire index
- **Web UI with graph visualization** -- explore your knowledge graph with gravity layouts, node queries, and subgraph filtering
- **Ollama-compatible API** -- connect Open WebUI or any Ollama-compatible chat client directly to LightRAG
- **20+ LLM providers** -- OpenAI, Ollama, Azure OpenAI, Gemini, Anthropic (via compatible endpoint), AWS Bedrock
- **Pluggable storage** -- swap from local files to PostgreSQL, MongoDB, Neo4j, Milvus, Qdrant, Redis, Faiss, or OpenSearch
- **Reranking support** -- Cohere, Jina, and Aliyun rerankers for improved result quality

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LightRAG | `ghcr.io/hkuds/lightrag:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind to all interfaces |
| `PORT` | 9621 | HTTP server listening port |
| `INPUT_DIR` | /app/data/inputs | Document upload directory |
| `LLM_MODEL` | gpt-4o-mini | LLM model identifier |
| `MAX_ASYNC` | 4 | Max concurrent LLM requests |
| `LLM_BINDING` | openai | LLM provider backend |
| `WORKING_DIR` | /app/data/rag_storage | Knowledge graph data path |
| `TOKEN_SECRET` | (secret) | JWT signing key |
| `AUTH_ACCOUNTS` | - | Web UI login credentials. Please provide in format: 'username:password' |
| `EMBEDDING_DIM` | 3072 | Embedding vector dimensions |
| `EMBEDDING_MODEL` | <user-provided> | Embedding model identifier |
| `LIGHTRAG_API_KEY` | (secret) | REST API authentication key |
| `LLM_BINDING_HOST` | https://api.openai.com/v1 | LLM API endpoint URL |
| `SUMMARY_LANGUAGE` | English | Summary output language |
| `EMBEDDING_BINDING` | openai | Embedding provider backend |
| `LLM_BINDING_API_KEY` | (secret) | LLM provider API key |
| `MAX_PARALLEL_INSERT` | 2 | Parallel document processing |
| `EMBEDDING_TOKEN_LIMIT` | (secret) | Max tokens per embedding |
| `EMBEDDING_BINDING_HOST` | https://api.openai.com/v1 | Embedding API endpoint URL |
| `EMBEDDING_BINDING_API_KEY` | (secret) | Embedding provider API key |
| `ENABLE_LLM_CACHE_FOR_EXTRACT` | true | Cache entity extraction |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/light-rag)
