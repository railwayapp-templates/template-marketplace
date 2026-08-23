# Deploy PostgreSQL + Hybrid Search on Railway

Embeddings, BM25 and 30+ language search — replace your search cluster.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-hybrid-search)

## About

PostgreSQL 18 with BM25 ranking, vector search and analyzers for 30+
languages — including Chinese, Japanese, Korean and Thai — built on Railway's own Postgres
image, so you keep TLS and pgBackRest point-in-time recovery.

It exists to answer one question: do you need a second service just to search your own
data? BM25 relevance, vector similarity and ordinary SQL joins all run in one query here,
which is impossible across a Postgres/Elasticsearch split without a sync pipeline to keep
them agreeing.

Deploying is one click and there is nothing to configure afterwards. Every extension is
created on first boot — `vector`, `vchord_bm25`, `icu_ext`, `unaccent`, `pg_trgm`,
`btree_gin`, `fuzzystrmatch` — along with a multilingual analyzer and a small SQL API for
creating and querying search indexes. A stock Postgres leaves you to work out which
`CREATE EXTENSION` statements to run; this one has run them before you connect.

Storage is a Railway volume mounted at `/var/lib/postgresql/data`, so your data survives
redeploys. Because the image is built on Railway's `postgres-ssl`, the TLS certificate and
pgBackRest backup tooling come with it rather than being traded away.

Railway's own database dashboard comes with it too, and this is worth knowing before you
reach for a client. The console gives you **Data** for browsing tables and running queries,
**Stats**, and **Config** for connection details, connection pooling and an **Extensions**
view. That last one earns its place here more than it would on a stock Postgres: the
extensions are the product, so being able to confirm all eight are installed from the
console — without connecting to anything — is how you know the deploy did what it claims.

Idle memory is about 7 MB, so leaving it running between projects costs almost nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgresSearch | `ghcr.io/yuting1214/postgres-search:0.4.0` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-hybrid-search)
