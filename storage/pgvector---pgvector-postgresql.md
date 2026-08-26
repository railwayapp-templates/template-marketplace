# Deploy pgvector on Railway

Vector search for PostgreSQL, built for embeddings and AI workloads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgvector-postgresql)

## About

pgvector is an open-source PostgreSQL extension that adds vector similarity search directly to PostgreSQL. It allows you to store embeddings alongside relational data and query them using exact or approximate nearest-neighbor search, making it useful for RAG, semantic search, recommendation systems, and AI applications.

Hosting pgvector on Railway gives you a persistent PostgreSQL database with vector search capabilities without introducing a separate vector database into your stack.

This template uses the official pgvector PostgreSQL image and stores database data in a persistent Railway volume. Applications can connect using the PostgreSQL wire protocol on port `5432`.

pgvector is installed in the image, but the extension must be enabled once inside the database before vector columns and operators can be used.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | vector | Default database created on first startup |
| `DATABASE_URL` | - | Public PostgreSQL connection URL |
| `POSTGRES_USER` | (secret) | Initial PostgreSQL administrator user |
| `PGHOST_PRIVATE` | - | Private Railway hostname for internal connections |
| `PGPORT_PRIVATE` | 5432 | Internal PostgreSQL TCP port |
| `POSTGRES_PASSWORD` | (secret) | Initial PostgreSQL administrator password |
| `DATABASE_URL_PRIVATE` | - | Private PostgreSQL connection URL |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgvector-postgresql)
