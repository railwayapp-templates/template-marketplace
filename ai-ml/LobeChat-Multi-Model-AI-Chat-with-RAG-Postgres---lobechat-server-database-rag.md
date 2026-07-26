# Deploy LobeChat — Multi-Model AI Chat with RAG [Postgres] on Railway

Self-host LobeChat with history, RAG & 40+ providers — server mode

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobechat-server-database-rag)

## About

LobeChat is a polished, open-source AI chat platform — a self-hosted ChatGPT-style interface supporting 40+ model providers (OpenAI, Anthropic, Google, and more), a plugin system, and a document Knowledge Base with RAG. This template deploys the **server-database version**: LobeChat backed by PostgreSQL with pgvector and S3-compatible storage, so your chat history persists, syncs across devices, and the Knowledge Base actually works.

---

LobeChat ships in two very different modes, and choosing wrong is the most common self-hosting mistake.

The default single-container image stores everything **in the browser** — no server-side history, no cross-device sync, and the Knowledge Base doesn't function. It's fine for a personal scratchpad and useless as a team or multi-device deployment.

This template runs the **server-database version**, which persists everything properly. That requires three pieces wired together, and one of them catches almost everyone:

- **PostgreSQL with pgvector** stores accounts, history, and the RAG embeddings for the Knowledge Base
- **`KEY_VAULTS_SECRET`** encrypts the API keys users store — set once, keep stable, or stored keys become unreadable
- **S3-compatible storage is mandatory**, not optional. LobeChat has no local-disk fallback for file uploads, so without S3 the Knowledge Base and file attachments silently fail. This template includes MinIO as that storage layer

One more setting matters: **`APP_URL` must be your real public domain.** OAuth callbacks and async features like AI image generation make requests against it, and if it's wrong they fail without an obvious error.

LobeChat delegates inference to external providers, so **no GPU is needed** — connect cloud models and it runs on CPU.

Typical cost: **~$10–20/month** on Railway for LobeChat, Postgres, and MinIO, plus your model providers' usage. LobeChat is Apache-2.0 with no paid tier for self-hosting.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LobeChat | `lobehub/lobehub` | Worker |
| RustFS | `rustfs/rustfs:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| RustFS Init | `alpine:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_TLS` | LobeChat | 0 | - |
| `S3_BUCKET` | LobeChat | lobe | - |
| `S3_SET_ACL` | LobeChat | 0 | - |
| `AUTH_SECRET` | LobeChat | (secret) | - |
| `REDIS_PREFIX` | LobeChat | lobechat | - |
| `S3_ACCESS_KEY` | LobeChat | admin | - |
| `INTERNAL_APP_URL` | LobeChat | http://localhost:3210 | - |
| `S3_ACCESS_KEY_ID` | LobeChat | admin | - |
| `KEY_VAULTS_SECRET` | LobeChat | (secret) | - |
| `S3_ENABLE_PATH_STYLE` | LobeChat | 1 | - |
| `S3_SECRET_ACCESS_KEY` | LobeChat | (secret) | - |
| `LLM_VISION_IMAGE_USE_BASE64` | LobeChat | 1 | - |
| `RUSTFS_ACCESS_KEY` | RustFS | admin | - |
| `RUSTFS_SECRET_KEY` | RustFS | (secret) | - |
| `RUSTFS_CONSOLE_ENABLE` | RustFS | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `RUSTFS_SECRET_KEY` | RustFS Init | (secret) | - |

## Configuration

- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lobechat-server-database-rag)
