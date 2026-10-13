# Deploy Morphik | Multimodal Document RAG API with Postgres & pgvector on Railway

Document ingestion, search and RAG API on Postgres with pgvector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/morphik-rag)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/morphik-rag?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=morphik-rag)

[Morphik](https://www.morphik.ai/) is an open-source RAG backend for documents: upload PDFs, Word, Excel and PowerPoint files, images and plain text, and Morphik parses, chunks and embeds them, then lets you search them and ask questions over them through a REST API or its Python and TypeScript SDKs, with metadata filters, folders and per-user scoping. This template runs the Morphik API and its ingestion worker with Postgres (pgvector), Redis and a Railway bucket for the files, and works with OpenAI, Anthropic, OpenRouter or any OpenAI-compatible endpoint through LiteLLM.

The stack is four services and a bucket: Morphik (the API), Morphik Worker, Postgres, Redis and the Storage bucket.

- **Upstream's own image, pinned.** Both Morphik services build a thin wrapper around the official `ghcr.io/morphik-org/morphik-core` image at a fixed build (Morphik publishes no release tags, so the template pins an exact commit build instead of the moving `latest`). The wrapper only adds a Railway entrypoint and a `morphik.toml`; upgrading means bumping one `FROM` line.
- **Configured from variables.** Morphik reads its settings from `morphik.toml`. The entrypoint fills that file from the service variables on every boot, so models, keys and connection strings are all ordinary Railway variables.
- **API and worker scale separately.** Uploads go to the API, which stores the file and queues a job in Redis; the worker parses, chunks and embeds it. Because the two run in separate containers they share files through the Railway bucket, not a disk.
- **Secrets generated for you.** `JWT_SECRET_KEY`, `SESSION_SECRET_KEY` (upstream falls back to a publicly known default) and `ADMIN_SERVICE_SECRET` are generated at deploy time. Authentication is on: every API call needs a token.
- **Postgres with pgvector** stores documents, chunks and embeddings. Redis (the job queue) keeps an append-only file on its own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Morphik | [nomideusz/morphik-railway](https://github.com/nomideusz/morphik-railway) | Web service |
| Redis | `redis:8.10.2-alpine` | Database |
| Postgres | `pgvector/pgvector:0.8.7-pg17` | Database |
| Morphik Worker | [nomideusz/morphik-railway](https://github.com/nomideusz/morphik-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Morphik | 8000 | Port Morphik listens on - leave as is |
| `S3_BUCKET` | Morphik | - | Railway bucket holding uploaded files and page images |
| `TELEMETRY` | Morphik | false | Anonymous usage telemetry to Morphik; set true to opt in |
| `AWS_REGION` | Morphik | - | Bucket region |
| `REDIS_HOST` | Morphik | - | Redis on the private network (ingestion queue) |
| `POSTGRES_URI` | Morphik | - | Postgres (with pgvector) on the private network |
| `AWS_ACCESS_KEY` | Morphik | - | Bucket access key |
| `JWT_SECRET_KEY` | Morphik | (secret) | Signs every API token (morphik:// URIs). Changing it revokes all of them |
| `OPENAI_API_KEY` | Morphik | (secret) | OpenAI key - needed for the default models (gpt-4.1-mini answers, text-embedding-3-small embeddings) |
| `OPENAI_API_BASE` | Morphik | - | Optional OpenAI-compatible base URL (vLLM, LiteLLM proxy, Together, ...) used for openai/ models |
| `AWS_ENDPOINT_URL` | Morphik | - | Bucket S3 endpoint |
| `ANTHROPIC_API_KEY` | Morphik | (secret) | Anthropic key, for MORPHIK_COMPLETION_MODEL=anthropic/claude-... (Anthropic has no embedding models) |
| `MORPHIK_API_DOMAIN` | Morphik | - | Host written into generated morphik:// URIs - set it to your custom domain after adding one |
| `OPENROUTER_API_KEY` | Morphik | (secret) | OpenRouter key, for MORPHIK_COMPLETION_MODEL=openrouter/<provider>/<model> |
| `SESSION_SECRET_KEY` | Morphik | (secret) | Signs session cookies; replaces upstream's publicly known default |
| `ADMIN_SERVICE_SECRET` | Morphik | (secret) | Admin secret: send it as X-Morphik-Admin-Secret to POST /cloud/generate_uri to create apps and their morphik:// URIs. Keep it private |
| `AWS_SECRET_ACCESS_KEY` | Morphik | (secret) | Bucket secret key |
| `MORPHIK_EMBEDDING_MODEL` | Morphik | text-embedding-3-small | LiteLLM embedding model. Pick it before ingesting: switching later means re-ingesting |
| `MORPHIK_COMPLETION_MODEL` | Morphik | gpt-4.1-mini | LiteLLM model for answers, document analysis and image captions, e.g. gpt-4.1-mini, anthropic/claude-sonnet-4-5, openrouter/google/gemini-2.5-flash |
| `LITELLM_LOCAL_MODEL_COST_MAP` | Morphik | True | Use LiteLLM's bundled model price list instead of downloading it at boot |
| `MORPHIK_EMBEDDING_DIMENSIONS` | Morphik | 1536 | Vector size of the embedding model (1536 for text-embedding-3-small); fixed once the first document is stored |
| `POSTGRES_DB` | Postgres | morphik | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `S3_BUCKET` | Morphik Worker | - | Railway bucket holding uploaded files and page images |
| `TELEMETRY` | Morphik Worker | - | Anonymous usage telemetry to Morphik; set true to opt in |
| `AWS_REGION` | Morphik Worker | - | Bucket region |
| `REDIS_HOST` | Morphik Worker | - | Redis on the private network (ingestion queue) |
| `POSTGRES_URI` | Morphik Worker | - | Postgres (with pgvector) on the private network |
| `AWS_ACCESS_KEY` | Morphik Worker | - | Bucket access key |
| `JWT_SECRET_KEY` | Morphik Worker | (secret) | Same as the Morphik service - edit it there |
| `OPENAI_API_KEY` | Morphik Worker | (secret) | Same as the Morphik service - edit it there |
| `OPENAI_API_BASE` | Morphik Worker | - | Same as the Morphik service - edit it there |
| `AWS_ENDPOINT_URL` | Morphik Worker | - | Bucket S3 endpoint |
| `ANTHROPIC_API_KEY` | Morphik Worker | (secret) | Same as the Morphik service - edit it there |
| `OPENROUTER_API_KEY` | Morphik Worker | (secret) | Same as the Morphik service - edit it there |
| `SESSION_SECRET_KEY` | Morphik Worker | (secret) | Same as the Morphik service - edit it there |
| `AWS_SECRET_ACCESS_KEY` | Morphik Worker | (secret) | Bucket secret key |
| `MORPHIK_EMBEDDING_MODEL` | Morphik Worker | - | Same as the Morphik service - edit it there |
| `MORPHIK_COMPLETION_MODEL` | Morphik Worker | - | Same as the Morphik service - edit it there |
| `LITELLM_LOCAL_MODEL_COST_MAP` | Morphik Worker | True | Use LiteLLM's bundled model price list instead of downloading it at boot |
| `MORPHIK_EMBEDDING_DIMENSIONS` | Morphik Worker | - | Same as the Morphik service - edit it there |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --appendonly yes"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/app/railway-entrypoint.sh arq core.workers.ingestion_worker.WorkerSettings`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/morphik-rag)
