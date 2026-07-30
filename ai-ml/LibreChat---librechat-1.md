# Deploy LibreChat on Railway

Multi-provider AI chat with agents, files, search, and RAG.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-1)

## About

LibreChat is an open-source, multi-user AI chat interface that brings multiple model providers into one customizable application. It supports agents, files, conversation search, retrieval-augmented generation (RAG), model switching, presets, and secure authentication while letting operators retain control of application data and provider credentials.

Hosting LibreChat requires five coordinated services: the LibreChat web application, MongoDB for users and conversations, Meilisearch for full-text conversation search, PostgreSQL with pgvector for embeddings, and the LibreChat RAG API for file indexing and retrieval. This template pins the Umbrel-tested LibreChat 0.8.7 service graph. Only LibreChat receives a public Railway domain; every dependency remains on Railway's private network. Persistent volumes protect uploaded files, MongoDB records, Meilisearch indexes, and vector data. Railway generates internal database, search, encryption, and signing credentials, while AI-provider keys remain optional external inputs with no defaults.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RAG API | `ghcr.io/danny-avila/librechat-rag-api-dev-lite:v0.7.3` | Worker |
| LibreChat | `ghcr.io/danny-avila/librechat:v0.8.7` | Web service |
| Meilisearch | `getmeili/meilisearch:v1.12.3` | Database |
| MongoDB | `mongo:8.0.10` | Database |
| VectorDB | `ankane/pgvector:v0.5.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | RAG API | 8000 |
| `DB_PORT` | RAG API | 5432 |
| `RAG_HOST` | RAG API | 0.0.0.0 |
| `RAG_PORT` | RAG API | 8000 |
| `JWT_SECRET` | RAG API | (secret) |
| `CONSOLE_JSON` | RAG API | false |
| `DEBUG_RAG_API` | RAG API | false |
| `POSTGRES_USER` | RAG API | (secret) |
| `VECTOR_DB_TYPE` | RAG API | pgvector |
| `COLLECTION_NAME` | RAG API | librechat |
| `EMBEDDINGS_MODEL` | RAG API | text-embedding-3-small |
| `POSTGRES_PASSWORD` | RAG API | (secret) |
| `RAG_GOOGLE_API_KEY` | RAG API | (secret) |
| `RAG_OPENAI_API_KEY` | RAG API | (secret) |
| `EMBEDDINGS_PROVIDER` | RAG API | openai |
| `EMBEDDING_BATCH_SIZE` | RAG API | 250 |
| `DEBUG_PGVECTOR_QUERIES` | RAG API | false |
| `EMBEDDING_MAX_QUEUE_SIZE` | RAG API | 3 |
| `HOST` | LibreChat | 0.0.0.0 |
| `PORT` | LibreChat | 3080 |
| `SEARCH` | LibreChat | true |
| `NO_INDEX` | LibreChat | true |
| `APP_TITLE` | LibreChat | LibreChat |
| `JWT_SECRET` | LibreChat | (secret) |
| `LOG_TO_FILE` | LibreChat | false |
| `TRUST_PROXY` | LibreChat | 1 |
| `CONSOLE_JSON` | LibreChat | false |
| `OPENAI_API_KEY` | LibreChat | (secret) |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) |
| `ALLOW_REGISTRATION` | LibreChat | true |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) |
| `ASSISTANTS_API_KEY` | LibreChat | (secret) |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) |
| `ALLOW_PASSWORD_RESET` | LibreChat | (secret) |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false |
| `ALLOW_UNVERIFIED_EMAIL_LOGIN` | LibreChat | (secret) |
| `PORT` | Meilisearch | 7700 |
| `MEILI_ENV` | Meilisearch | production |
| `MEILI_NO_ANALYTICS` | Meilisearch | true |
| `MONGO_INITDB_DATABASE` | MongoDB | LibreChat |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `POSTGRES_DB` | VectorDB | librechat |
| `POSTGRES_USER` | VectorDB | (secret) |
| `POSTGRES_PASSWORD` | VectorDB | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c 'mkdir -p /app/uploads && chown -R 1000:1000 /app/uploads && exec su node -s /bin/sh -c "exec npm run backend"'`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Volume:** `/meili_data`
- **Volume:** `/data/db`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-1)
