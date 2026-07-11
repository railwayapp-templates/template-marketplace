# Deploy Postgres 18 + PostGIS + pgvector (SSL, PITR-ready) on Railway

Deploy and Host Postgres 18 + PostGIS + pgvector (SSL, PITR-ready)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-18-postgis-pgvector-ssl-pitr-re)

## About

Postgres 18 with PostGIS 3.6 (geospatial) and pgvector (AI embeddings) pre-installed, built directly on Railway's official Postgres image. You inherit everything the official template ships — SSL out of the box, pgBackRest for point-in-time recovery, pg_stat_statements — and add geo and vector search with zero build steps.

Deploy this template and you get a single-node Postgres 18 service with a persistent volume, a generated password, private and public connection URLs, and a TCP proxy for external access. SSL certificates are generated and auto-renewed by the image. The image is rebuilt weekly in CI on top of Railway's `postgres-ssl:18` base — picking up Postgres minors, extension updates, and Railway's pgBackRest fixes — and every build passes a boot-and-query smoke test before it's published. Activate the extensions per database with `CREATE EXTENSION postgis;` and `CREATE EXTENSION vector;`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-18-ssl | `ghcr.io/lifeofjer/postgres-18-ssl:18` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgres-18-postgis-pgvector-ssl-pitr-re)
