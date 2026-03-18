# Deploy rindexer on Railway

A no-code blazing fast EVM indexer tool built in rust.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Rqrlcf)

## About

This template deploys the demo at https://github.com/o-az/rindexer-railway/tree/main/rindexer to railway.

To deploy against your own contract configuration, fork https://github.com/o-az/rindexer-railway, update https://github.com/o-az/rindexer-railway/tree/main/rindexer and deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| rindexer | [o-az/rindexer-railway](https://github.com/o-az/rindexer-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PROJECT_PATH` | rindexer | ./rindexer | - |
| `POSTGRES_PASSWORD` | rindexer | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/Rqrlcf)
