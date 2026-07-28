# Deploy Document Search | Upload PDFs, Search Them by Meaning on Railway

Upload PDFs and search them by meaning: Docling, embeddings, pgvector.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/document-search-or-upload-pdfs-search-th)

## About

Upload a PDF and ask a question of it a moment later — and get back the passage that answers the question rather than the one that repeats your words.

Four services wired together: an API, an indexer, a document converter and Postgres with pgvector. No API keys to obtain, and no document text leaves the deployment.

Docling has a template in this catalogue. pgvector has several. Neither is a pipeline, and the pipeline is the part that takes a week to get right.

What sits between "a converter exists" and "search works" is: a queue that survives restarts and can be worked by more than one process; chunking that follows the document's structure instead of cutting sentences in half; embeddings that have to come from somewhere; idempotency, so the same file uploaded twice is one document rather than two; and a retry path for the document that failed because a service was still starting when it arrived.

Every one of those is a decision someone has to make. This template makes them, and the verification script proves the result end to end.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Search API | [ak40u/document-search-railway-starter](https://github.com/ak40u/document-search-railway-starter) | Web service |
| Postgres | `pgvector/pgvector:pg17` | Database |
| Docling | `ghcr.io/docling-project/docling-serve:v1.28.0` | Database |
| Indexer | [ak40u/document-search-railway-starter](https://github.com/ak40u/document-search-railway-starter) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Search API | 8080 |
| `API_TOKEN` | Search API | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Docling | 5001 |
| `UVICORN_HOST` | Docling | :: |
| `UVICORN_PORT` | Docling | 5001 |
| `DOCLING_SERVE_ENABLE_UI` | Docling | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/opt/app-root/src/.cache`
- **Start command:** `node dist/worker.js`

**Category:** AI/ML · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/document-search-or-upload-pdfs-search-th)
