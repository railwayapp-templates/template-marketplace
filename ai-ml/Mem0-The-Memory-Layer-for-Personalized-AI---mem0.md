# Deploy Mem0 | The Memory Layer for Personalized AI on Railway

Self Host Mem0. Give your AI agents persistent memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mem0)

## About

Deploy Mem0 on Railway to get a production-ready memory layer for your AI agents and LLM-powered applications. Mem0 is an open-source REST API server that provides persistent, intelligent memory — it extracts facts, preferences, and relationships from conversations and retrieves them with vector similarity search.

Self-host Mem0 on Railway with this template that pre-configures the Mem0 API server (built from the `mem0ai/mem0` GitHub repo), a PostgreSQL database with pgvector for vector embeddings, API key authentication, and JWT-secured endpoints. Bring your own OpenAI API key and start storing memories immediately.

Mem0 is the memory layer for personalized AI. It sits between your application and your LLM, maintaining a persistent understanding of each user across sessions. Unlike raw conversation history, Mem0 compresses interactions into structured memories — extracting and updating facts, preferences, and relationships automatically.

Key features of self-hosted Mem0 include:

- **Automatic memory extraction** — feed conversations in, get structured facts out without manual tagging
- **Vector similarity search** — retrieve relevant memories using pgvector-powered semantic search
- **Multi-user and multi-agent** — a single Mem0 instance serves your entire product with isolated user memory spaces
- **REST API with OpenAPI docs** — full CRUD on memories at `/memories`, with Swagger UI at `/docs`
- **Token reduction** — up to 80% prompt token savings by replacing full chat history with compressed memory
- **Provider-agnostic** — works with OpenAI, configurable LLM and embedding models via environment variables

The template deploys two services: the Mem0 API server and a PostgreSQL database with pgvector for storing vector embeddings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mem0 | `mem0/mem0-api-server:latest` | Web service |
| pgvector | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mem0 | 8000 | HTTP server listening port |
| `JWT_SECRET` | Mem0 | (secret) | JWT token signing secret |
| `APP_DB_NAME` | Mem0 | postgres | Application database name |
| `POSTGRES_DB` | Mem0 | postgres | Database name |
| `ADMIN_API_KEY` | Mem0 | (secret) | API authentication key |
| `AUTH_DISABLED` | Mem0 | false | Keep authentication enabled |
| `POSTGRES_HOST` | Mem0 | - | Internal hostname for pgvector service |
| `POSTGRES_PORT` | Mem0 | 5432 | PostgreSQL port |
| `POSTGRES_USER` | Mem0 | (secret) | Database username from pgvector |
| `MEM0_TELEMETRY` | Mem0 | false | Disable telemetry |
| `OPENAI_API_KEY` | Mem0 | (secret) | OpenAI API key for LLM and embeddings |
| `HISTORY_DB_PATH` | Mem0 | /app/history/history.db | SQLite history storage path |
| `PYTHONUNBUFFERED` | Mem0 | 1 | Unbuffered Python output for logs |
| `POSTGRES_PASSWORD` | Mem0 | (secret) | Database password from pgvector |
| `MEM0_DEFAULT_LLM_MODEL` | Mem0 | gpt-4.1-nano-2025-04-14 | LLM model for memory extraction |
| `PYTHONDONTWRITEBYTECODE` | Mem0 | 1 | Skip .pyc file generation |
| `MEM0_DEFAULT_EMBEDDER_MODEL` | Mem0 | text-embedding-3-small | Embedding model for vector search |
| `POSTGRES_DB` | pgvector | postgres | Database name |
| `POSTGRES_USER` | pgvector | (secret) | Database username |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Database password |

## Configuration

- **Start command:** `/bin/sh -c 'pip install psycopg-binary && mkdir -p /app/history && alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port 8000'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mem0)
