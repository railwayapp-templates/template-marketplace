# Deploy LightRAG Server + Web UI on Railway

Graph-based RAG server with web UI, auth on, file storage on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightrag-server-web-ui)

## About

LightRAG is an open-source retrieval-augmented generation engine that builds a knowledge graph from your documents and combines graph traversal with vector search to answer questions. This template deploys the official LightRAG Server: a FastAPI backend, a WebUI for uploading documents and exploring the graph, a REST API, and an Ollama-compatible chat endpoint for clients such as Open WebUI.

Hosting LightRAG Server is a single container. This template uses the official `ghcr.io/hkuds/lightrag:v1.5.7` image with a Railway volume mounted at `/data`, where LightRAG keeps its knowledge graph, vector index, LLM cache, document status and uploaded files. `PORT` and the domain target are pinned to 9621 so Railway's healthcheck hits `/health` on the right port, and `HOST` is `::` so other Railway services can reach the API over private networking. Authentication is enabled out of the box: a generated password for the `admin` WebUI login, a generated JWT secret and a generated API key. Bring your own LLM and embedding provider: the defaults point at OpenAI and one `OPENAI_API_KEY` is enough, or switch the bindings to Gemini, Azure, Bedrock, Ollama or any OpenAI-compatible gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LightRAG | `ghcr.io/hkuds/lightrag:v1.5.7` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind address. Keep 0.0.0.0: uvicorn binds '::' as IPv6-only (asyncio sets IPV6_V6ONLY) and Railway's healthcheck then never connects. |
| `PORT` | 9621 | Port the LightRAG server listens on (the server reads PORT). Railway's healthcheck and edge proxy probe $PORT, so keep it 9621 to match the domain target port. |
| `INPUT_DIR` | /data/inputs | Uploaded source documents. Lives on the /data volume. |
| `LLM_MODEL` | gpt-5.4-mini | Model used for entity extraction and answer generation (upstream env.example default). |
| `PROMPT_DIR` | /data/prompts | Optional prompt overrides (entity type profiles, user prompt prefix files). Lives on the /data volume. |
| `LLM_BINDING` | openai | LLM provider: openai, azure_openai, gemini, ollama, lollms or bedrock. Any OpenAI-compatible gateway (LiteLLM, Bifrost, vLLM) works with openai plus LLM_BINDING_HOST. |
| `WORKING_DIR` | /data/rag_storage | Knowledge graph, vector index, LLM cache and document-status files (JSON, NanoVectorDB, NetworkX). Lives on the Railway volume mounted at /data. Do not point it at /app/data: that would hide the tiktoken cache baked into the image. |
| `TOKEN_SECRET` | (secret) | JWT signing secret for WebUI sessions. Must be set to a non-default value whenever AUTH_ACCOUNTS is configured, otherwise the server refuses to start. |
| `AUTH_ACCOUNTS` | - | WebUI login accounts as comma-separated user:password pairs. The generated value creates the user 'admin'; the password is everything after the colon. Requires TOKEN_SECRET. |
| `EMBEDDING_DIM` | 3072 | Vector size of EMBEDDING_MODEL (3072 for text-embedding-3-large, 1536 for text-embedding-3-small). The server refuses to start without it when EMBEDDING_MODEL is not the provider default. Never change after indexing. |
| `OPENAI_API_KEY` | (secret) | Optional. One OpenAI key used for BOTH the LLM and embeddings while the two binding-specific keys below are empty (default openai bindings). The server boots and the WebUI works without it, but document indexing and queries fail until a key is set. |
| `EMBEDDING_MODEL` | text-embedding-3-large | Embedding model. Do not change after the first document is indexed; existing vectors are not re-embedded. |
| `WHITELIST_PATHS` | /health | Paths exempt from authentication. /health must stay listed (Railway healthcheck). Upstream default is '/health,/api/*', which leaves the Ollama-compatible /api routes (they call your LLM) open to anyone; restore it only if an Ollama client cannot send X-API-Key. |
| `LIGHTRAG_API_KEY` | (secret) | API key for programmatic access. Send it as the X-API-Key header on /documents, /query, /graphs and /api requests. The WebUI uses the AUTH_ACCOUNTS login instead. |
| `LLM_BINDING_HOST` | https://api.openai.com/v1 | LLM API base URL. Point it at another OpenAI-compatible endpoint to use a different provider. |
| `SUMMARY_LANGUAGE` | English | Optional. Language the LLM uses for entity and relation descriptions. |
| `EMBEDDING_BINDING` | openai | Embedding provider: openai, azure_openai, gemini, jina, voyageai, ollama, lollms or bedrock. |
| `TOKEN_EXPIRE_HOURS` | (secret) | WebUI login session lifetime in hours. |
| `LIGHTRAG_KV_STORAGE` | JsonKVStorage | Optional. Key-value backend (upstream default JsonKVStorage, files under WORKING_DIR). PGKVStorage, RedisKVStorage and MongoKVStorage need an extra service and their own connection variables. |
| `LLM_BINDING_API_KEY` | (secret) | Optional. API key for LLM_BINDING_HOST when it is not the OPENAI_API_KEY above (Gemini, Azure, a gateway virtual key). |
| `EMBEDDING_BINDING_HOST` | https://api.openai.com/v1 | Embedding API base URL. |
| `LIGHTRAG_GRAPH_STORAGE` | NetworkXStorage | Optional. Graph backend (upstream default NetworkXStorage). Alternatives: Neo4JStorage, PGGraphStorage, MemgraphStorage. |
| `LIGHTRAG_VECTOR_STORAGE` | NanoVectorDBStorage | Optional. Vector backend (upstream default NanoVectorDBStorage). Alternatives: PGVectorStorage, QdrantVectorDBStorage, MilvusVectorDBStorage, FaissVectorDBStorage. |
| `EMBEDDING_BINDING_API_KEY` | (secret) | Optional. API key for EMBEDDING_BINDING_HOST when it is not the OPENAI_API_KEY above. |
| `LIGHTRAG_DOC_STATUS_STORAGE` | JsonDocStatusStorage | Optional. Document status backend (upstream default JsonDocStatusStorage). Alternatives: PGDocStatusStorage, MongoDocStatusStorage. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lightrag-server-web-ui)
