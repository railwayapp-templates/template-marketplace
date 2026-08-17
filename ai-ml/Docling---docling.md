# Deploy Docling on Railway

LlamaParse Alternative. Convert PDF, DOCX and scans to Markdown and JSON

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docling)

## About

Docling Serve is the HTTP API in front of Docling, IBM Research's open-source document-conversion toolkit. Give it a PDF, DOCX, PPTX, XLSX, HTML file, image or audio clip and it returns structured Markdown, JSON, HTML or DocTags — produced by real layout-analysis and table-structure models (TableFormer) plus OCR, not a naive text dump. Teams building RAG systems and AI agents self-host it for dependable reading order and table fidelity without sending private documents to a third-party parser.

Deploy Docling Serve on Railway in its upstream scaled shape: a public `docling-serve` API on port 5001 serving the REST routes, `/docs` and a Gradio playground at `/ui`; a private `docling-worker` tier of two replicas that owns the models and runs every conversion; a managed Redis for the queue and results; and a managed bucket, `docling-artifacts`, for exports. Both application services run `ghcr.io/docling-project/docling-serve-cpu:v1.30.0`. Requests hit the API, go onto the queue and a worker picks them up, so the API stays responsive while long conversions run.

![Docling Serve Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786895812/507afbe9-9614-4734-b69b-72e7bb4098b3.png)

Generative AI is only as good as the text you feed it, and most PDFs resist being read in order. Docling runs a layout model to find columns, headings, captions and figures, TableFormer to rebuild tables cell by cell, and OCR on scans, then emits a lossless `DoclingDocument`. Self-host it when documents are confidential or volume makes per-page pricing hurt.

- Converts PDF, DOCX, XLSX, PPTX, HTML, Markdown, CSV, images and audio
- Layout analysis, TableFormer tables, formula and code detection, OCR for scans
- Sync, async and file-upload conversion plus hybrid chunking for RAG
- Integrations for LangChain, LlamaIndex, Haystack, CrewAI and Docling MCP

**How the services fit together.** The API never loads a model — it only enqueues work and reads results, so conversion CPU and RAM sit entirely in the worker tier. Redis holds the queue, finished payloads (four-hour TTL) and the notifications that wake the API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| docling-worker | `ghcr.io/docling-project/docling-serve-cpu:v1.30.0` | Worker |
| docling-serve | `ghcr.io/docling-project/docling-serve-cpu:v1.30.0` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DOCLING_SERVE_ENG_KIND` | docling-worker | rq | Use Redis queue engine |
| `DOCLING_SERVE_LOG_LEVEL` | docling-worker | INFO | Show conversion progress logs |
| `DOCLING_SERVE_ENG_RQ_REDIS_URL` | docling-worker | - | Queue and result store |
| `DOCLING_SERVE_ENG_RQ_QUEUE_NAME` | docling-worker | convert | Queue this worker consumes |
| `DOCLING_SERVE_ARTIFACT_STORAGE_BUCKET` | docling-worker | - | Export bucket name |
| `DOCLING_SERVE_ARTIFACT_STORAGE_ENABLED` | docling-worker | true | Worker uploads exported files |
| `DOCLING_SERVE_ARTIFACT_STORAGE_ENDPOINT` | docling-worker | t3.storageapi.dev | Bare host, no scheme |
| `DOCLING_SERVE_ARTIFACT_STORAGE_ACCESS_KEY` | docling-worker | - | Bucket access key |
| `DOCLING_SERVE_ARTIFACT_STORAGE_SECRET_KEY` | docling-worker | (secret) | Bucket secret key |
| `PORT` | docling-serve | 5001 | HTTP port for health probe |
| `UVICORN_PORT` | docling-serve | - | Port the API actually binds |
| `DOCLING_SERVE_API_KEY` | docling-serve | (secret) | X-Api-Key value for all routes |
| `DOCLING_SERVE_ENG_KIND` | docling-serve | rq | Use Redis queue engine |
| `DOCLING_SERVE_ENABLE_UI` | docling-serve | true | Mount Gradio playground at /ui |
| `DOCLING_SERVE_LOG_LEVEL` | docling-serve | INFO | Show conversion progress logs |
| `DOCLING_SERVE_ENG_RQ_REDIS_URL` | docling-serve | - | Queue and result store |
| `DOCLING_SERVE_ENG_RQ_QUEUE_NAME` | docling-serve | convert | Queue name workers listen on |
| `DOCLING_SERVE_ARTIFACT_STORAGE_BUCKET` | docling-serve | - | Export bucket name |
| `DOCLING_SERVE_ARTIFACT_STORAGE_ENABLED` | docling-serve | true | Enable presigned URL target |
| `DOCLING_SERVE_ARTIFACT_STORAGE_ENDPOINT` | docling-serve | t3.storageapi.dev | Bare host, no scheme |
| `DOCLING_SERVE_ARTIFACT_STORAGE_ACCESS_KEY` | docling-serve | - | Bucket access key |
| `DOCLING_SERVE_ARTIFACT_STORAGE_SECRET_KEY` | docling-serve | (secret) | Bucket secret key |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Start command:** `container-entrypoint docling-serve rq-worker`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/docling)
