# Deploy Aegra on Railway

A self-hosted backend for building and running LangGraph AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aegra)

## About

Aegra is an open-source backend for running LangGraph-compatible AI agents and Agent Protocol workloads. This template packages Aegra for Railway with PostgreSQL persistence and a minimal starter graph, providing a clean foundation for self-hosted agent applications.

This Railway template deploys Aegra together with PostgreSQL as its persistent data layer.

Aegra runs as a stateless application service, while PostgreSQL stores persistent application state, metadata, and LangGraph checkpoints. The deployment is designed for developers who want to run LangGraph-compatible agents on their own infrastructure without manually assembling the runtime environment.

The Aegra service is built from the dedicated Railway wrapper repository:

`codestorm-official/aegra-railway`

The repository keeps the Railway deployment lightweight and avoids development-only dependencies and example configurations from the upstream monorepo.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Aegra | [codestorm-official/aegra-railway](https://github.com/codestorm-official/aegra-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `LOG_LEVEL` | Aegra | INFO | - |
| `RUN_MIGRATIONS_ON_STARTUP` | Aegra | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile, Python

[View on Railway →](https://railway.com/deploy/aegra)
