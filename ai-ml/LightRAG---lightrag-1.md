# Deploy LightRAG on Railway

LightRAG Pro Stack: Light RAG, PostgreSQL, pgvector, GraphRAG and auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightrag-1)

## About

Deploy [LightRAG on Railway](https://railway.com/deploy/lightrag-1) to build a document knowledge base combining a knowledge graph with vector search. This **LightRAG Pro Stack** connects the native Web UI and authenticated API to **PostgreSQL 18 with pgvector**, with two persistent volumes and generated administrator credentials. **No model API key is required to deploy:** enter it in Railway or in the protected application setup screen afterward.

LightRAG, also written **Light RAG**, supports document Q&A and relationship exploration. It runs **v1.5.7** with a setup extension on the official container pinned by digest. Inference uses your configured provider.

| Service | Storage | Purpose |
| --- | --- | --- |
| LightRAG v1.5.7 + setup extension | `/app/data` | Web UI, APIs, uploaded/working files, prompts, logs, encrypted provider settings |
| Native Railway PostgreSQL 18 | `/var/lib/postgresql/data` | All four storage backends and pgvector; `PGDATA` is the `pgdata` subdirectory |

Only LightRAG has a public HTTPS domain. PostgreSQL uses private networking, the native SSL image and standard `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` and `DATABASE_URL` variables.

| Variable | Purpose |
| --- | --- |
| `LLM_BINDING_API_KEY` | Optional chat key; leave empty to configure chat in `/setup` |
| `LLM_MODEL`, `LLM_BINDING_HOST` | Chat model and API base |
| `EMBEDDING_BINDING_API_KEY` | Optional embedding key; references the Railway chat key by default |
| `EMBEDDING_MODEL`, `EMBEDDING_DIM`, `EMBEDDING_BINDING_HOST` | Embedding model, dimension and API base |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Administrator login; default username `admin`, generated password |
| `LIGHTRAG_API_KEY` | Generated application API credential |
| `TOKEN_SECRET` | Generated signing/encryption secret; keep stable |

Saving configuration gracefully restarts the worker. Update admin variables in Railway and redeploy to change login.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| LightRAG | [XavTo/LightRAG-Railway](https://github.com/XavTo/LightRAG-Railway) | Web service |

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
| `LLM_BINDING_API_KEY` | LightRAG | (secret) | Optional. Set here, or leave blank and configure chat and embeddings in /setup after deployment. Railway keys take priority. OpenAI and compatible gateways supported. |
| `MAX_PARALLEL_INSERT` | LightRAG | 1 | - |
| `EMBEDDING_BINDING_HOST` | LightRAG | https://api.openai.com/v1 | - |
| `LIGHTRAG_GRAPH_STORAGE` | LightRAG | PGTableGraphStorage | - |
| `LIGHTRAG_VECTOR_STORAGE` | LightRAG | PGVectorStorage | - |
| `POSTGRES_MAX_CONNECTIONS` | LightRAG | 10 | - |
| `EMBEDDING_BINDING_API_KEY` | LightRAG | (secret) | Optional at deployment. Use a separate embedding key here, or configure it in /setup. Defaults to the Railway chat key when supplied. |
| `LIGHTRAG_DOC_STATUS_STORAGE` | LightRAG | PGDocStatusStorage | - |
| `POSTGRES_CONNECTION_RETRIES` | LightRAG | 20 | - |
| `POSTGRES_CONNECTION_RETRY_BACKOFF` | LightRAG | 2 | - |
| `POSTGRES_CONNECTION_RETRY_BACKOFF_MAX` | LightRAG | 10 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/lightrag-1)
