# Deploy Postgres with pgVector Engine on Railway

[Mar '26] Host a PostgreSQL database with vector support in under 1 minute

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgres-with-pgvector-engine)

## About

pgvector is a **PostgreSQL extension** that adds vector similarity search capabilities to your database. It lets you store embeddings alongside your regular data and perform nearest-neighbor searches directly in SQL—critical for AI applications, semantic search, and recommendation engines without needing a separate vector database.

This template gives you a production-ready PostgreSQL instance with the pgVector extension pre-enabled. Instead of spinning up a dedicated vector database, configuring indexes, and wiring up separate infrastructure, you deploy once and immediately start writing embeddings into Postgres. Railway takes care of provisioning, storage, networking, environment variables, and lifecycle management so you can focus on your application logic. The result: a vector-ready database in under a minute, without touching a terminal.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Name of the database created on startup. |
| `DATABASE_URL` | - | Full public connection string for Postgres. |
| `POSTGRES_USER` | (secret) | Postgres superuser name. |
| `PGHOST_PRIVATE` | - | Private internal domain for Postgres in Railway. |
| `PGPORT_PRIVATE` | 5432 | Private internal port for Postgres. |
| `POSTGRES_PASSWORD` | (secret) | Password for the Postgres superuser. |
| `DATABASE_URL_PRIVATE` | - | Full private connection string for internal services. |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/template/postgres-with-pgvector-engine)
