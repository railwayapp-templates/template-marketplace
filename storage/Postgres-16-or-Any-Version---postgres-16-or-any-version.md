# Deploy Postgres 16 or Any Version on Railway

Choose tag Postgres version and deploy - default 16

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-16-or-any-version)

## About

Deploy this repository as a new service on Railway. The service runs PostgreSQL in a container and persists data to a volume. Configure `POSTGRES_PASSWORD`, `POSTGRES_VERSION`, `POSTGRES_USER`, `POSTGRES_DB`, and `POSTGRES_CONFIG` in the service variables.

This template is hosted as a Docker-based service on Railway. PostgreSQL runs from the official Docker image; the version is chosen via the `POSTGRES_VERSION` build variable. Data is stored in a volume mounted at `/var/lib/postgresql/data`. Use Railway's TCP Proxy if you need to connect from outside Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres 16 | [feliperosenek/postgres-any-version-railway](https://github.com/feliperosenek/postgres-any-version-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | - | PSQL Database |
| `POSTGRES_USER` | (secret) | PSQL User Database |
| `POSTGRES_VERSION` | 16 | PSQL Version Install |
| `POSTGRES_PASSWORD` | (secret) | PSQL Password Database |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-16-or-any-version)
