# Deploy FerretDB (Open-Source MongoDB-Compatible Database) on Railway

FerretDB [May ’26] (Run MongoDB Apps on PostgreSQL Backend) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ferretdb)

## About

FerretDB is a free, open-source database solution that provides a MongoDB-compatible interface while using PostgreSQL or other SQL databases as the backend. It allows developers to run MongoDB workloads without relying on MongoDB’s proprietary software, ensuring full data portability, transparency, and cost efficiency.

You can self-host FerretDB on Railway to maintain complete control over your database infrastructure while taking advantage of Railway’s modern cloud platform. Hosting FerretDB on Railway ensures smooth scalability, automated deployment, and effortless maintenance, with zero dependency on MongoDB’s closed-source components.

FerretDB enables you to use your existing MongoDB tools and drivers seamlessly while storing data in PostgreSQL or other SQL databases. Railway’s infrastructure automates deployment, scaling, and monitoring - allowing you to focus on application development instead of database management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ferretdb | `ghcr.io/ferretdb/ferretdb:latest` | Worker |
| Postgres | `ghcr.io/ferretdb/postgres-documentdb:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/ferretdb)
