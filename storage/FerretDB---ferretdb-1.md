# Deploy FerretDB on Railway

FerretDB 2.7 MongoDB-compatible database on Postgres with DocumentDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ferretdb-1)

## About

FerretDB is an open-source, MongoDB-compatible database that stores documents in PostgreSQL through Microsoft's DocumentDB extension. Existing MongoDB drivers, tools and ODMs such as Mongoose connect unchanged, while the data lives in Postgres under an Apache 2.0 license, making it a truly open replacement for MongoDB.

This template deploys FerretDB v2.7.0 with its matching PostgreSQL 17 image that includes the DocumentDB extension, stored on a Railway volume. MongoDB clients authenticate with the Postgres username and generated password over SCRAM. Services on Railway connect over the private network on port 27017, and external clients use the Railway TCP proxy. Telemetry is off. Both images come from Docker Hub; the same database image from GHCR stalled during deployment on Railway in testing. Storage grows with data; watch the volume on the Hobby plan. Back up the database volume regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ferretdb | `ferretdb/ferretdb:2.7.0` | TCP service |
| documentdb | `ferretdb/postgres-documentdb:17-0.107.0-ferretdb-2.7.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | ferretdb | 8088 |
| `FERRETDB_TELEMETRY` | ferretdb | disable |
| `POSTGRES_DB` | documentdb | postgres |
| `POSTGRES_USER` | documentdb | (secret) |
| `POSTGRES_PASSWORD` | documentdb | (secret) |

## Configuration

- **Healthcheck:** `/debug/readyz`
- **TCP Proxies:** 27017
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/ferretdb-1)
