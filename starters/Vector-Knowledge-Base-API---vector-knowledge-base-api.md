# Deploy Vector Knowledge Base API on Railway

Index docs & run semantic search — FastAPI, Qdrant, Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vector-knowledge-base-api)

## About

A production-ready API for building semantic search and AI-powered knowledge bases. Index documents, generate embeddings, and retrieve relevant context using meaning instead of keywords. Built with FastAPI, Qdrant, and PostgreSQL, it supports local embeddings via fastembed and optional OpenAI integration.

This template provisions a complete semantic search stack on Railway, including a FastAPI app, Qdrant vector database, and PostgreSQL for metadata. Railway handles service provisioning, secret generation, and private networking automatically.

On deployment, the API initializes its database schema and is ready to index documents and run semantic queries immediately. Embeddings run locally via fastembed by default, avoiding external API costs, with optional OpenAI support via environment variables. Persistent volumes ensure data durability across redeploys, making it suitable for both rapid prototyping and production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres for vector index | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| vector index | [acewebs/fastapi-qdrant-starter](https://github.com/acewebs/fastapi-qdrant-starter) (root: /api) | Web service |
| qdrant for vector index | `ghcr.io/qdrant/qdrant/qdrant:v1.16.3-unprivileged` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | postgres for vector index | railway |
| `POSTGRES_USER` | postgres for vector index | (secret) |
| `POSTGRES_PASSWORD` | postgres for vector index | (secret) |
| `PORT` | vector index | 8000 |
| `API_KEY` | vector index | (secret) |
| `APP_ENV` | vector index | production |
| `APP_NAME` | vector index | qdrant-starter-api |
| `LOG_LEVEL` | vector index | info |
| `SECRET_KEY` | vector index | (secret) |
| `EMBED_ENGINE` | vector index | fastembed |
| `EMBEDDING_DIM` | vector index | 384 |
| `QDRANT_API_KEY` | vector index | (secret) |
| `EMBEDDING_MODEL` | vector index | BAAI/bge-small-en-v1.5 |
| `QDRANT_COLLECTION` | vector index | documents |
| `PORT` | qdrant for vector index | 6333 |
| `QDRANT__SERVICE__API_KEY` | qdrant for vector index | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/.storage`

**Category:** Starters · **Languages:** Python, Shell, Mako, Dockerfile

[View on Railway →](https://railway.com/deploy/vector-knowledge-base-api)
