# Deploy LightRAG on Railway

LightRAG Pro Stack: Light RAG, PostgreSQL, pgvector, GraphRAG and auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightrag-1)

## About

LightRAG (Light RAG) combines a knowledge graph with vector search so you can ask questions about your own documents. This **LightRAG Pro Stack** includes the Web UI, authenticated API, PostgreSQL and pgvector, with persistent storage already connected.

This template runs **LightRAG v1.5.7** and **Railway PostgreSQL 18 with pgvector** using the official LightRAG image pinned by digest and Railway’s native PostgreSQL SSL image. PostgreSQL stores the documents, processing status, embeddings, entities and relationships. Native `PGTableGraphStorage` keeps the knowledge graph in PostgreSQL as well.

There are two services and two persistent volumes. The PostgreSQL service includes Railway’s standard `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` and `DATABASE_URL` variables for the Data and Connect panels. The database is reachable over Railway's private network; only LightRAG receives a public HTTPS domain. An administrator password, API key and token signing secret are generated separately for every deployment.

### Get started

1. Enter your **OpenAI API key** in `LLM_BINDING_API_KEY` and deploy. This is the only required input.
2. Wait for both services to start, then open the LightRAG public URL.
3. Sign in with username **admin** and the generated **ADMIN_PASSWORD** from the LightRAG service variables.
4. Upload a text document or a PDF containing selectable text. Wait until its status is **Processed**.
5. Open Retrieval and ask a question about the document. You can also explore its entities and relationships in the graph view.

You can change `ADMIN_USERNAME` and `ADMIN_PASSWORD` in Railway variables, then redeploy LightRAG. The API key is a separate credential; it is not your administrator password or your model provider key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| LightRAG | `ghcr.io/hkuds/lightrag@sha256:5bdbd524931b011df246fe20888d110cef691e6804c12cde636a2b746d7de27e` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | lightrag | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `HOST` | LightRAG | 0.0.0.0 | - |
| `PORT` | LightRAG | 9621 | - |
| `LOG_DIR` | LightRAG | /app/data/logs | - |
| `INPUT_DIR` | LightRAG | /app/data/inputs | - |
| `LLM_MODEL` | LightRAG | gpt-4o-mini | - |
| `MAX_ASYNC` | LightRAG | 2 | - |
| `WORKSPACE` | LightRAG | railway | - |
| `PROMPT_DIR` | LightRAG | /app/data/prompts | - |
| `LLM_BINDING` | LightRAG | openai | - |
| `WEBUI_TITLE` | LightRAG | LightRAG Pro Stack | - |
| `WORKING_DIR` | LightRAG | /app/data/rag_storage | - |
| `TOKEN_SECRET` | LightRAG | (secret) | - |
| `EMBEDDING_DIM` | LightRAG | 1536 | - |
| `POSTGRES_USER` | LightRAG | (secret) | - |
| `ADMIN_PASSWORD` | LightRAG | (secret) | - |
| `ADMIN_USERNAME` | LightRAG | (secret) | - |
| `EMBEDDING_MODEL` | LightRAG | text-embedding-3-small | - |
| `LIGHTRAG_PARSER` | LightRAG | *:native-teP,*:legacy-R | - |
| `WHITELIST_PATHS` | LightRAG | /health | - |
| `ENABLE_LLM_CACHE` | LightRAG | true | - |
| `LIGHTRAG_API_KEY` | LightRAG | (secret) | - |
| `LLM_BINDING_HOST` | LightRAG | https://api.openai.com/v1 | - |
| `SUMMARY_LANGUAGE` | LightRAG | English | - |
| `EMBEDDING_BINDING` | LightRAG | openai | - |
| `POSTGRES_PASSWORD` | LightRAG | (secret) | - |
| `POSTGRES_SSL_MODE` | LightRAG | disable | - |
| `WEBUI_DESCRIPTION` | LightRAG | Private GraphRAG workspace with PostgreSQL and pgvector | - |
| `VLM_PROCESS_ENABLE` | LightRAG | false | - |
| `LIGHTRAG_KV_STORAGE` | LightRAG | PGKVStorage | - |
| `LLM_BINDING_API_KEY` | LightRAG | (secret) | Your OpenAI API key. Used for chat and embeddings by default. For another provider, also change the model and API host variables. |
| `MAX_PARALLEL_INSERT` | LightRAG | 1 | - |
| `EMBEDDING_BINDING_HOST` | LightRAG | https://api.openai.com/v1 | - |
| `LIGHTRAG_GRAPH_STORAGE` | LightRAG | PGTableGraphStorage | - |
| `LIGHTRAG_VECTOR_STORAGE` | LightRAG | PGVectorStorage | - |
| `POSTGRES_MAX_CONNECTIONS` | LightRAG | 10 | - |
| `EMBEDDING_BINDING_API_KEY` | LightRAG | (secret) | - |
| `LIGHTRAG_DOC_STATUS_STORAGE` | LightRAG | PGDocStatusStorage | - |
| `POSTGRES_CONNECTION_RETRIES` | LightRAG | 20 | - |
| `POSTGRES_CONNECTION_RETRY_BACKOFF` | LightRAG | 2 | - |
| `POSTGRES_CONNECTION_RETRY_BACKOFF_MAX` | LightRAG | 10 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lightrag-1)
