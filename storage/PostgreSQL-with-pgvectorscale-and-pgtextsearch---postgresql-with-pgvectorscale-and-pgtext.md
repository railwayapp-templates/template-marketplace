# Deploy PostgreSQL with pgvectorscale and pg_textsearch on Railway

PostgreSQL 18 with pgvectorscale and pg_textsearch for hybrid search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-with-pgvectorscale-and-pgtext)

## About

PostgreSQL 18 with pgvector, pgvectorscale, and pg_textsearch, for vector, BM25
keyword, and hybrid search in one database. pgvectorscale adds StreamingDiskANN
indexes for large embedding tables, and pg_textsearch adds BM25 ranking. All
three extensions are created for you in the default database.

The template runs one PostgreSQL service from a tested image for amd64 and
arm64, with a volume at `/var/lib/postgresql/data` and a generated password.
The image builds on Railway's own `postgres-ssl` image, so it keeps SSL,
pgBackRest WAL archiving, point-in-time recovery, and Railway's volume checks.
pg_textsearch has to be preloaded, and the image keeps
`shared_preload_libraries` correct on every boot. It also creates missing
extensions and updates their SQL to match the image, so an image update never
leaves a database on an old extension version. Patch releases install
automatically during Railway's nightly update window.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/joeychilson/railway-pgvectorscale-textsearch:1.1` | Database |

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

[View on Railway →](https://railway.com/deploy/postgresql-with-pgvectorscale-and-pgtext)
