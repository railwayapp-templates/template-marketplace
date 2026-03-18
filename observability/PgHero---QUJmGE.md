# Deploy PgHero on Railway

A performance dashboard for Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/QUJmGE)

## About

A simple performance dashboard for Postgres. For documentation and guides check out: https://github.com/ankane/pghero

Requirements: enable `pg_stat_statements`

Steps:
- Start your postgres service with a custom start command to enabled pg_stat_statements: /usr/local/bin/docker-entrypoint.sh postgres --port=5432 -c 'shared_preload_libraries=timescaledb,pg_stat_statements'
- Once restarted, run CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgHero | `ankane/pghero` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATABASE_URL` | - | Set this to you private postgres url, something like ${{POSTGRES.PRIVATE_URL}} |
| `PGHERO_PASSWORD` | (secret) | User for basic auth |
| `PGHERO_USERNAME` | (secret) | Used for adding basic auth |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/QUJmGE)
