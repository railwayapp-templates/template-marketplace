# Deploy postgres-pgvector on Railway

Postgres with PGVector and volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-pgvector)

## About

Most AI projects use or are compatible with Postgres, although they need vector plugin as well.

The pgvector/pgvector docker was too opaque to troubleshoot, so i broke my head on this.

Now you can see all the tables with their data and edit right in railway.

Give it a try, no headaches, simple click and go!

Uses railway template for the latest postgres, then uses init script to load the vector plugin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres pgvector | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |
| `POSTGRES_INIT_ARGS` | -c shared_preload_libraries=vector |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/postgres-pgvector)
