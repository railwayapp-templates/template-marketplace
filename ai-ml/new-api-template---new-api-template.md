# Deploy new-api-template on Railway

new-api LLM gateway on Railway: MySQL+Redis, auto secrets, persistence

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/new-api-template)

## About

This template provisions three services on Railway: the **new-api** gateway (built from the pinned upstream image via this repo's Dockerfile, with a persistent `/data` volume and a public HTTPS domain), **MySQL 8.4** as the primary datastore (volume-mounted at `/var/lib/mysql`), and **Redis 7.4** as cache and session backing. All cross-service wiring is pre-configured with Railway variable references: `SQL_DSN`, `REDIS_CONN_STRING`, `SESSION_SECRET`, `CRYPTO_SECRET`, and the boot-wait host variables. Railway probes `/api/status` as the healthcheck; restart policy is on-failure with 10 retries.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7.4` | Database |
| MySQL | `mysql:8.4` | Database |
| new-api | [lNamelessl/new-api-railway-template](https://github.com/lNamelessl/new-api-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `MYSQL_DATABASE` | MySQL | db | database name |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `CRYPTO_SECRET` | new-api | (secret) | - |
| `SESSION_SECRET` | new-api | (secret) | - |

## Configuration

- **Start command:** `sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/new-api-template)
