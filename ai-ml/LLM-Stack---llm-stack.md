# Deploy LLM Stack on Railway

Full LLM stack on Railway with RAG, LLM proxy, and integrated chat UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llm-stack)

## About

LLM Stack is a production-ready AI application platform that deploys in one click. It provides 7 pre-configured microservices including LiteLLM (proxy for 100+ LLMs), Open WebUI (chat interface), PostgreSQL with pgvector, Redis, Qdrant vector database, R2R RAG framework, and a React client for building AI-powered applications.

Deploying LLM Stack on Railway is a streamlined, one-click process that automatically provisions and configures all seven microservices. Railway handles service discovery, internal networking, and environment variable configuration automatically. The platform auto-provisions PostgreSQL and Redis plugins, while services like LiteLLM, Open WebUI, Qdrant, and R2R are deployed as containerized applications. Setup takes 5-10 minutes with no manual configuration required. All services communicate seamlessly via Railway's internal network, and you can immediately start building AI applications by adding your LLM provider API keys. Railway manages scaling, monitoring, and infrastructure so you can focus on development.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| r2r | [nanocreek/llm-stack](https://github.com/nanocreek/llm-stack) (root: /services/r2r) | Worker |
| qdrant | [nanocreek/llm-stack](https://github.com/nanocreek/llm-stack) (root: /services/qdrant) | Worker |
| PostgresPgvector | [nanocreek/llm-stack](https://github.com/nanocreek/llm-stack) (root: /services/postgres-pgvector) | Worker |
| litellm | [nanocreek/llm-stack](https://github.com/nanocreek/llm-stack) (root: /services/litellm) | Web service |
| Redis | `redis:8.2.1` | Database |
| openwebui | [nanocreek/llm-stack](https://github.com/nanocreek/llm-stack) (root: /services/openwebui) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `R2R_HOST` | r2r | 0.0.0.0 |
| `R2R_PORT` | r2r | 7272 |
| `LITELLM_URL` | r2r | http://litellm.railway.internal:4000 |
| `R2R_LOG_LEVEL` | r2r | INFO |
| `R2R_QDRANT_HOST` | r2r | qdrant.railway.internal |
| `R2R_QDRANT_PORT` | r2r | 6333 |
| `R2R_PROJECT_NAME` | r2r | r2r_default |
| `R2R_POSTGRES_HOST` | r2r | postgres-pgvector.railway.internal |
| `R2R_POSTGRES_PORT` | r2r | 5432 |
| `R2R_POSTGRES_USER` | r2r | (secret) |
| `R2R_POSTGRES_PASSWORD` | r2r | (secret) |
| `R2R_VECTOR_DB_PROVIDER` | r2r | qdrant |
| `QDRANT__LOG_LEVEL` | qdrant | info |
| `QDRANT__SERVICE__GRPC_PORT` | qdrant | 6334 |
| `QDRANT__SERVICE__HTTP_PORT` | qdrant | 6333 |
| `QDRANT__SNAPSHOTS__ENABLED` | qdrant | true |
| `QDRANT__PERFORMANCE__INDEX_THREADS` | qdrant | 0 |
| `QDRANT__STORAGE__FLUSH_INTERVAL_MS` | qdrant | 5000 |
| `QDRANT__SNAPSHOTS__SNAPSHOT_INTERVAL` | qdrant | 600 |
| `QDRANT__SNAPSHOTS__MAX_SNAPSHOTS_TO_KEEP` | qdrant | 5 |
| `POSTGRES_DB` | PostgresPgvector | r2r |
| `POSTGRES_USER` | PostgresPgvector | (secret) |
| `POSTGRES_PASSWORD` | PostgresPgvector | (secret) |
| `LITELLM_HOST` | litellm | 0.0.0.0 |
| `LITELLM_PORT` | litellm | 4000 |
| `REDIS_PASSWORD` | litellm | (secret) |
| `LITELLM_LOG_LEVEL` | litellm | INFO |
| `LITELLM_PROXY_TIMEOUT` | litellm | 300 |
| `LITELLM_PROXY_BATCH_WRITE_AT` | litellm | 100 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | openwebui | 8080 |
| `VECTOR_DB` | openwebui | qdrant |
| `WEBUI_AUTH` | openwebui | false |
| `WEBUI_NAME` | openwebui | OpenWebUI |
| `QDRANT_PORT` | openwebui | 6333 |
| `ENABLE_OAUTH` | openwebui | false |
| `ENABLE_SIGNUP` | openwebui | true |
| `OPENAI_API_KEY` | openwebui | (secret) |
| `WEBUI_LOG_LEVEL` | openwebui | INFO |
| `WEBUI_SECRET_KEY` | openwebui | (secret) |
| `DEFAULT_USER_ROLE` | openwebui | user |
| `RAG_EMBEDDING_MODEL` | openwebui | nomic-embed-text |
| `SESSION_COOKIE_NAME` | openwebui | webui-session |
| `SESSION_COOKIE_SECURE` | openwebui | false |
| `SESSION_COOKIE_SAMESITE` | openwebui | Lax |
| `ENABLE_API_KEY_GENERATION` | openwebui | (secret) |
| `ENABLE_QDRANT_EMBED_MODELS` | openwebui | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, JavaScript, Dockerfile, CSS, HTML

[View on Railway →](https://railway.com/deploy/llm-stack)
