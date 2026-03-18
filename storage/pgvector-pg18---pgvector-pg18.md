# Deploy pgvector-pg18 on Railway

PostgreSQL 18 with powerful vector search support.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgvector-pg18)

## About

**TL;DR:** This template is like the existing pgvector template, but with PostgreSQL v18 instead of PostgreSQL v16.

This template provides PostgreSQL v18 with the pgvector extension pre-installed. You’ll need to enable the `pgvector` extension in each database where you intend to use it.

1. **Connection Setup:**
   - Find the appropriate connection string under the service variables tab:
     - `DATABASE_URL`: Used for connecting from other Railway services.
     - `DATABASE_PUBLIC_URL`: Used for connecting from external services/tools.
   - Reference these URLs in your other services variables as needed (For instance, `${{ pgvector.DATABASE_URL }}`)

2. **Enabling PGVector Extension:**
   Before using pgvector, you must enable the extension in your database:

   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgvector-pg18)
