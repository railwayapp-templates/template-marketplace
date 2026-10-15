# Deploy Lobe Chat | (Just Updated) ChatGPT Alternative, Chats and Files Survive Redeploys on Railway

Self-hosted AI chat for every model, with Postgres, Redis and file storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobe-chat-or-just-updated-chatgpt-altern)

## About

Lobe Chat (LobeHub) is an open-source AI chat workspace: one interface for OpenAI, Anthropic, Gemini, Ollama and dozens of other model providers, with knowledge-base file uploads, agents, and multi-user accounts. This template deploys the full server-database edition — the app, a ParadeDB Postgres, Redis, and S3-compatible object storage — so chats, accounts, and uploaded files are stored on your own volumes.

The template runs four services. `lobe-chat` is the application, listening on Railway's injected port. `postgres` is ParadeDB (Postgres 17 with the `pg_search` and `pgvector` extensions Lobe Chat requires for its knowledge base), with data on a persistent volume mounted at `/var/lib/postgresql`. `redis` holds sessions and caches on a volume at `/data`. `minio` is an S3-compatible object store on a volume at `/data` that keeps file uploads; its bucket is created at boot. The authentication secret, the key-vault encryption secret, the database password, and the storage credentials are all generated at deploy time. Open the public URL, create the first account on the sign-up page, then add your model provider API keys under Settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `paradedb/paradedb:0.26.1-pg17` | Database |
| lobe-chat | `lobehub/lobehub:2.2.19` | Web service |
| minio | `pgsty/silo:RELEASE.2026-09-16T00-00-00Z` | Web service |
| redis | `redis:8.2.1-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `AUTH_SECRET` | lobe-chat | (secret) |
| `KEY_VAULTS_SECRET` | lobe-chat | (secret) |
| `S3_SECRET_ACCESS_KEY` | lobe-chat | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'export MINIO_API_CORS_ALLOW_ORIGIN="*"; mkdir -p "/data/$LOBE_BUCKET" && exec silo server /data --address ":9000" --console-address ":9001"'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data --maxmemory-policy noeviction'`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lobe-chat-or-just-updated-chatgpt-altern)
