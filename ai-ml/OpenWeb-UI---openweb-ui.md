# Deploy OpenWeb UI on Railway

Self-host Open WebUI [Oct'26]— private ChatGPT UI with RAG over documents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openweb-ui)

## About

Open WebUI is the most widely used self-hosted AI chat interface — a private, ChatGPT-style front end over OpenAI, Anthropic or any OpenAI-compatible model. This template deploys it for the job most people want from it: chatting with their own documents. Postgres with pgvector holds the embeddings, Apache Tika handles extraction, and embeddings run through an API rather than in-container — the configuration that keeps document upload from killing the worker.

Open WebUI chats fine out of the box. It is document ingestion that breaks it, and every default below is a default that works on a laptop and fails in a container.

**The default vector store crashes the worker on upload.** Open WebUI defaults to ChromaDB on local SQLite, which its own docs call unsafe for multi-process access — there is a named failure mode for workers dying during upload. On Railway it also sits on an ephemeral container layer. Set `VECTOR_DB=pgvector` with `PGVECTOR_DB_URL`, on a Postgres image that has the extension.

**RAG settings stop listening to environment variables after first boot.** Open WebUI persists many settings into the database on first launch, and changing the variable afterwards does not replace the stored value. Get the vector store, extraction engine and embedding engine right *before* the first deploy, or change them in the admin interface — editing variables and redeploying looks like it should work and quietly does not.

**Running the embedding model in-container is the wrong default.** Out of the box Open WebUI loads SentenceTransformers in-process, downloading weights at runtime and taking the memory with it. Railway has no GPU, so this is CPU work in a small container: slow first ingest and a memory spike that reads as a crash. Set `RAG_EMBEDDING_ENGINE=openai` or `ollama`.

**Uploaded documents are files, not rows.** Postgres holds metadata and embeddings; the original PDFs and spreadsheets sit on disk under the app data directory. Any claim that all Open WebUI data lives in Postgres is wrong, and believing it means a redeploy that keeps every chat and loses every source file.

**Default extraction is not good enough for real documents.** Open WebUI's docs advise against the built-in extractor beyond plain text. Tika or Docling as a sidecar handles PDFs, Office formats and OCR properly — and `TIKA_SERVER_VERSION` must match the Tika you run, or extraction fails against an otherwise healthy server.

Typical cost: **~$20–30/month** for Open WebUI, pgvector Postgres and the Tika sidecar at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes — Tika is a JVM and wants real memory. Open WebUI is free; embedding and inference bill to your provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Open WebUI | 8080 | HTTP server listening port |
| `REDIS_URL` | Open WebUI | - | REDIS_URL |
| `WEBUI_URL` | Open WebUI | - | Public URL for OpenWebUI |
| `WEBUI_AUTH` | Open WebUI | true | Enable authentication for web interface |
| `DATABASE_URL` | Open WebUI | - | Postgres connection string for OpenWebUI |
| `DO_NOT_TRACK` | Open WebUI | true | Disable tracking signals |
| `OPENAI_API_KEY` | Open WebUI | (secret) | Optional OpenAI API key |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Secret key for session security |
| `WEBSOCKET_MANAGER` | Open WebUI | redis | Use Redis for websocket scaling |
| `DATABASE_POOL_SIZE` | Open WebUI | 10 | Base database connection pool size |
| `SCARF_NO_ANALYTICS` | Open WebUI | true | Disable Scarf package analytics |
| `OPENAI_API_BASE_URL` | Open WebUI | https://api.openai.com/v1 | Base endpoint for OpenAI API. Modify if using Gemini. Note: OpenWebUI doesnt support Anthropic's format. Need to proxy that if you want to use it |
| `WEBSOCKET_REDIS_URL` | Open WebUI | - | Redis backend for websocket manager |
| `ANONYMIZED_TELEMETRY` | Open WebUI | false | Disable anonymous usage telemetry |
| `DATABASE_POOL_RECYCLE` | Open WebUI | 1800 | Seconds before recycling connections |
| `DATABASE_POOL_TIMEOUT` | Open WebUI | 30 | Seconds to wait for connection |
| `ENABLE_WEBSOCKET_SUPPORT` | Open WebUI | true | Enable real-time websocket communication |
| `DATABASE_POOL_MAX_OVERFLOW` | Open WebUI | 5 | Extra connections beyond pool size |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openweb-ui)
