# Deploy PostgreSQL with pgvectorscale and pg_textsearch on Railway

PostgreSQL 18 with pgvectorscale and pg_textsearch extensions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-with-pgvectorscale-and-pgtext)

## About

PostgreSQL 18 with pgvectorscale and pg_textsearch enables hybrid search combining vector similarity and BM25 text ranking in a single database. pgvectorscale provides high-performance embedding search using StreamingDiskANN indexes, while pg_textsearch adds modern ranked text search with the BM25 algorithm.

This template deploys a PostgreSQL 18 database with three extensions pre-installed: pgvector for vector data types, pgvectorscale for optimized vector indexing, and pg_textsearch for BM25 text search. The extensions are automatically enabled on database creation, so you can immediately start building AI-powered search applications. No additional configuration is required - just connect and start creating indexes on your embedding and text columns.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/joeychilson/railway-pg-vectorscale-textsearch:latest` | Database |

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

[View on Railway →](https://railway.com/deploy/postgresql-with-pgvectorscale-and-pgtext)
