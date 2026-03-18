# Deploy Dialoqbase - AI Chatbot Builder | Open Source Chatbase Alternative on Railway on Railway

Self-host DIaloqbase. Chat with your docs - PDF, URL, Git, YT

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/self-host-dialoqbase)

## About

Dialoqbase is an open-source application for building custom chatbots powered by your own knowledge base. It uses LangChain and your choice of LLM provider — OpenAI, Anthropic, Google, Cohere, Fireworks, or local models — to generate accurate, context-aware responses from documents, websites, PDFs, and more. Self-hosting Dialoqbase gives you full control over your data, models, and costs with no per-message fees.

Self Host Dialoqbase stack in one click: the Dialoqbase app server, a PostgreSQL database with the `pgvector` extension for vector similarity search, and a Redis instance for background document ingestion queuing. All three services are pre-wired with private networking — no manual connection strings needed.

![Dialoqbase Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773651415/Railway_Tempalte_arch_ifaygv.png)

Dialoqbase is a web application that lets teams create and embed context-aware chatbots without building retrieval pipelines from scratch. It handles chunking, embedding, vector storage, and LLM querying in one self-contained app.

Key features:
- **Multi-provider LLM support** — OpenAI, Anthropic Claude, Google Gemini, Cohere, Fireworks, HuggingFace, Ollama, and local models
- **Rich data loaders** — websites, PDFs, DOCX, plain text, sitemaps, YouTube, GitHub repos, MP3/MP4
- **pgvector-powered search** — no separate vector database needed; Postgres handles embeddings and similarity queries
- **Bot integrations** — embed on any website, or deploy to Telegram, Discord, and WhatsApp
- **Multi-user support** — admin controls for user registration limits and bot creation quotas
- **Queue-based ingestion** — Redis-backed Bull queues handle large document processing without blocking the API

The Dialoqbase app talks to Postgres over Railway's private network for fast, secure DB access, and connects to Redis internally for job queue management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dialoqbase | `n4z3m/dialoqbase:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| pgvector | `pgvector/pgvector:pg18` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Dialoqbase | 3000 | Application HTTP server port |
| `NO_SEED` | Dialoqbase | false | Disable initial database seed |
| `REDIS_URL` | Dialoqbase | - | Redis connection URL for caching |
| `DATABASE_URL` | Dialoqbase | - | Internal pgvector database connection URL |
| `JINA_API_KEY` | Dialoqbase | (secret) | API key for Jina AI |
| `DB_SECRET_KEY` | Dialoqbase | (secret) | Secret key for database encryption |
| `COHERE_API_KEY` | Dialoqbase | (secret) | API key for Cohere models |
| `GOOGLE_API_KEY` | Dialoqbase | (secret) | API key for Google AI services |
| `OPENAI_API_KEY` | Dialoqbase | (secret) | API key for OpenAI access |
| `FASTIFY_ADDRESS` | Dialoqbase | 0.0.0.0 | Fastify server bind address |
| `ANTHROPIC_API_KEY` | Dialoqbase | (secret) | API key for Anthropic models |
| `DB_BOT_SECRET_KEY` | Dialoqbase | (secret) | Secret key for bot authentication |
| `FIREWORKS_API_KEY` | Dialoqbase | (secret) | API key for Fireworks AI |
| `HUGGING_FACE_API_KEY` | Dialoqbase | (secret) | API key for HuggingFace services |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | pgvector | railway | Initial database created on startup |
| `DATABASE_URL` | pgvector | - | Public pgvector database connection |
| `POSTGRES_USER` | pgvector | (secret) | Default database superuser name |
| `PGHOST_PRIVATE` | pgvector | - | Internal Postgres host domain |
| `PGPORT_PRIVATE` | pgvector | 5432 | Internal Postgres port |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Postgres database user password |
| `DATABASE_URL_PRIVATE` | pgvector | - | Internal pgvector database connection |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/self-host-dialoqbase)
