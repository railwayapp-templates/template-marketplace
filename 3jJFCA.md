# Deploy pgvector on Railway

Open-source vector similarity search for Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/3jJFCA)

## About

pgvector is a PostgreSQL extension that adds vector similarity search capabilities to standard PostgreSQL databases. It enables storage and querying of high-dimensional vectors for machine learning applications, embeddings, and similarity search operations.

pgvector runs as a PostgreSQL extension requiring a compatible PostgreSQL version and proper extension installation during database initialization. You'll need to manage vector index creation, query performance tuning for similarity searches, and storage scaling as vector datasets grow. The database handles vector operations like cosine similarity, L2 distance, and inner product calculations while maintaining ACID compliance. Connection pooling becomes important for concurrent vector operations, and backup strategies must account for large vector datasets.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Name of the default database |
| `DATABASE_URL` | - | Public URL |
| `POSTGRES_USER` | (secret) | Name of the initial user |
| `PGHOST_PRIVATE` | - | Private domain |
| `PGPORT_PRIVATE` | 5432 | Private port |
| `POSTGRES_PASSWORD` | (secret) | The Postgres password |
| `DATABASE_URL_PRIVATE` | - | Private URL |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/template/3jJFCA)
