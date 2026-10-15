# Deploy PostgreSQL with pgvectorscale on Railway

PostgreSQL 18 with pgvector and pgvectorscale for vector search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-with-pgvectorscale)

## About

PostgreSQL 18 with pgvector and pgvectorscale for vector search. pgvector adds
vector types and HNSW and IVFFlat indexes; pgvectorscale adds StreamingDiskANN
indexes and statistical binary quantization for larger embedding tables. Both
extensions are created for you in the default database.

The template runs one PostgreSQL service from a tested image for amd64 and
arm64, with a volume at `/var/lib/postgresql/data` and a generated password.
The image builds on Railway's own `postgres-ssl` image, so it keeps SSL,
pgBackRest WAL archiving, point-in-time recovery, and Railway's volume checks.
On every boot it creates missing extensions and updates their SQL to match the
image, so an image update never leaves a database on an old extension version.
Patch releases install automatically during Railway's nightly update window.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/joeychilson/railway-pgvectorscale:1.0` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Database created on first boot, with the extensions installed in it. |
| `DATABASE_URL` | - | Connection string for services in this project, over private networking. |
| `POSTGRES_USER` | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | (secret) | Password for the postgres user. Generated for you. |
| `DATABASE_PUBLIC_URL` | - | Connection string through the TCP proxy, for access from outside Railway. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-with-pgvectorscale)
