# Deploy LightRAG on Railway

Turns your documents into a searchable knowledge graph you can query

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightrag-rag)

## About

LightRAG is an open-source retrieval-augmented generation engine from the Data Intelligence Lab at the University of Hong Kong. It reads your documents, uses a language model to pull out entities and the relationships between them, and stores that knowledge graph alongside vector embeddings of every chunk. Questions are answered by walking the graph *and* searching the vectors, so the model sees how facts connect rather than a bag of similar paragraphs. Teams use it for private assistants over runbooks, contracts, papers and support histories.

Deploy LightRAG on Railway and the stack arrives wired together: the LightRAG API server with its web interface, a PostgreSQL database holding the key-value store, document status, pgvector embeddings and the graph itself, and an Ollama service running the language and embedding models on Railway's own CPU. The browser reaches LightRAG over HTTPS; LightRAG reaches PostgreSQL and Ollama privately, and neither has a public address. So you can self-host LightRAG and index your first document without an API key from anyone, then move to a hosted model by changing two variables.

![Diagram of the LightRAG, Ollama and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787361745/lightrag-architecture.png)

Classic RAG embeds chunks and retrieves whatever looks similar to the question. That breaks down when the answer depends on a relationship spread across documents — who owns which service, which incident caused which change. Graph RAG builds an entity graph first, and LightRAG does it cheaply enough to run continuously: one extraction pass per chunk, new documents merging into the graph rather than triggering a rebuild.

Key features:

- Dual-level retrieval combining graph traversal with vector similarity, in `local`, `global`, `hybrid`, `mix` and `naive` modes
- Incremental indexing, so adding a document does not re-index the corpus
- Pluggable bindings: Ollama, OpenAI and compatible endpoints, Azure OpenAI, Bedrock, Gemini
- Pluggable storage: PostgreSQL, Redis, MongoDB, Neo4j, Milvus, Qdrant, Memgraph
- A REST API with Ollama-compatible chat routes for existing clients

Three services. **LightRAG** serves the API and web interface on port 9621, the only public address. **PostgreSQL** holds everything durable — documents, pgvector embeddings, processing status and the graph — using table-backed graph storage, so no Apache AGE build or second database is needed. **Ollama** runs `qwen2.5:3b` for extraction and `bge-m3` for embeddings, its model files on a volume so they download once.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lightrag | `ghcr.io/hkuds/lightrag:latest` | Web service |
| ollama | `ollama/ollama:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | lightrag | 0.0.0.0 | Bind address inside the container |
| `PORT` | lightrag | 9621 | HTTP server listening port |
| `TOP_K` | lightrag | 20 | Graph entities retrieved per query |
| `LOG_DIR` | lightrag | /app/storage/logs | Rotating log files |
| `TIMEOUT` | lightrag | 600 | Worker request timeout |
| `INPUT_DIR` | lightrag | /app/storage/inputs | Uploaded documents on the volume |
| `LLM_MODEL` | lightrag | qwen2.5:3b | Model used for extraction and answers |
| `PROMPT_DIR` | lightrag | /app/storage/prompts | Custom prompt profiles |
| `CHUNK_TOP_K` | lightrag | 5 | Text chunks retrieved per query |
| `LLM_BINDING` | lightrag | ollama | Language model provider |
| `LLM_TIMEOUT` | lightrag | 600 | Seconds before a model call fails |
| `WEBUI_TITLE` | lightrag | LightRAG Knowledge Graph | Title shown in the web UI |
| `WORKING_DIR` | lightrag | /app/storage/rag_storage | Working files on the volume |
| `TOKEN_SECRET` | lightrag | (secret) | Session token signing key |
| `AUTH_ACCOUNTS` | lightrag | - | Web UI login as user:password |
| `EMBEDDING_DIM` | lightrag | 1024 | Embedding vector width |
| `MAX_ASYNC_LLM` | lightrag | 2 | Concurrent language model calls |
| `POSTGRES_HOST` | lightrag | - | Private database hostname |
| `POSTGRES_PORT` | lightrag | - | Database port |
| `POSTGRES_USER` | lightrag | (secret) | Database user |
| `EMBEDDING_MODEL` | lightrag | bge-m3 | Embedding model |
| `WHITELIST_PATHS` | lightrag | /health | Only route exempt from authentication |
| `ENABLE_LLM_CACHE` | lightrag | true | Cache repeated model responses |
| `LIGHTRAG_API_KEY` | lightrag | (secret) | Value clients send as X-API-Key |
| `LLM_BINDING_HOST` | lightrag | - | Private model server URL |
| `MAX_TOTAL_TOKENS` | lightrag | (secret) | Total context budget per query |
| `SUMMARY_LANGUAGE` | lightrag | English | Language of generated summaries |
| `EMBEDDING_BINDING` | lightrag | ollama | Embedding provider |
| `EMBEDDING_TIMEOUT` | lightrag | 300 | Seconds before an embedding call fails |
| `MAX_ENTITY_TOKENS` | lightrag | (secret) | Entity share of that budget |
| `POSTGRES_DATABASE` | lightrag | - | Database name |
| `POSTGRES_PASSWORD` | lightrag | (secret) | Database password |
| `WEBUI_DESCRIPTION` | lightrag | Graph-based Retrieval-Augmented Generation on Railway | Subtitle in the web UI |
| `OLLAMA_LLM_NUM_CTX` | lightrag | 16384 | Context window requested from Ollama |
| `TOKEN_EXPIRE_HOURS` | lightrag | (secret) | Session lifetime in hours |
| `EMBEDDING_BATCH_NUM` | lightrag | 8 | Chunks embedded per request |
| `FORWARDED_ALLOW_IPS` | lightrag | * | Trust proxy headers from Railway's edge |
| `LIGHTRAG_KV_STORAGE` | lightrag | PGKVStorage | Key-value store backend |
| `MAX_PARALLEL_INSERT` | lightrag | 2 | Documents indexed at once |
| `MAX_RELATION_TOKENS` | lightrag | (secret) | Relation share of that budget |
| `QUERY_MAX_ASYNC_LLM` | lightrag | 2 | Concurrent query calls |
| `SUMMARY_CONTEXT_SIZE` | lightrag | 8000 | Context for description summaries |
| `KEYWORD_MAX_ASYNC_LLM` | lightrag | 2 | Concurrent keyword-extraction calls |
| `OLLAMA_LLM_NUM_THREAD` | lightrag | 8 | CPU threads for generation |
| `EMBEDDING_BINDING_HOST` | lightrag | - | Private embedding server URL |
| `LIGHTRAG_GRAPH_STORAGE` | lightrag | PGTableGraphStorage | Graph backend, plain tables |
| `LIGHTRAG_VECTOR_STORAGE` | lightrag | PGVectorStorage | Vector store backend |
| `EMBEDDING_FUNC_MAX_ASYNC` | lightrag | 2 | Concurrent embedding calls |
| `MAX_EXTRACT_INPUT_TOKENS` | lightrag | (secret) | Largest extraction input |
| `OLLAMA_EMBEDDING_NUM_CTX` | lightrag | 8192 | Embedding context window |
| `POSTGRES_MAX_CONNECTIONS` | lightrag | 12 | Connection pool ceiling |
| `ENTITY_EXTRACTION_USE_JSON` | lightrag | true | Structured extraction output |
| `POSTGRES_VECTOR_INDEX_TYPE` | lightrag | HNSW | pgvector index type |
| `LIGHTRAG_DOC_STATUS_STORAGE` | lightrag | PGDocStatusStorage | Document status backend |
| `OLLAMA_EMBEDDING_NUM_THREAD` | lightrag | 8 | CPU threads for embedding |
| `PORT` | ollama | 11434 | HTTP server listening port |
| `OLLAMA_HOST` | ollama | [::]:11434 | Dual-stack bind for private networking |
| `OLLAMA_MODELS` | ollama | /root/.ollama/models | Model directory on the volume |
| `OLLAMA_NO_CLOUD` | ollama | 1 | Disable remote cloud inference |
| `OLLAMA_KEEP_ALIVE` | ollama | 30m | How long a model stays loaded |
| `OLLAMA_PULL_MODELS` | ollama | qwen2.5:3b bge-m3 | Models pulled on first boot |
| `OLLAMA_LOAD_TIMEOUT` | ollama | 10m | Model load timeout |
| `OLLAMA_NUM_PARALLEL` | ollama | 1 | Concurrent requests per model |
| `OLLAMA_CONTEXT_LENGTH` | ollama | 16384 | Default context window |
| `OLLAMA_MAX_LOADED_MODELS` | ollama | 2 | Keep chat and embedding models resident |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the image |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c '( until /bin/ollama list >/dev/null 2>&1; do sleep 2; done; for m in $OLLAMA_PULL_MODELS; do echo "[railway] pulling $m"; if /bin/ollama pull "$m" >/dev/null 2>&1; then echo "[railway] ready: $m"; else echo "[railway] pull FAILED: $m"; fi; done; echo "[railway] models on volume:"; /bin/ollama list ) & exec /bin/ollama serve'`
- **Healthcheck:** `/`
- **Volume:** `/root/.ollama`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lightrag-rag)
