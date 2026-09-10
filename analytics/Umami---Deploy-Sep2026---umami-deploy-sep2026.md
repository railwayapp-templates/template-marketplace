# Deploy Umami - Deploy Sep2026 on Railway

Simple self hosted Umami platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-deploy-sep2026)

## About

Self hosted version of Umami on Railway. PLUG AND PLAY, EASY TO USE
A simple plug and Play umami version of this.

This is so simple to use, track every website, campaign, mail or link that u need. Get the statistics.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| umami | `umamisoftware/umami:postgresql-latest` | Database |
| Valkey | `valkey/valkey:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | description |
| `DATABASE_URL` | Postgres | - | description |
| `POSTGRES_USER` | Postgres | (secret) | description |
| `POSTGRES_PASSWORD` | Postgres | (secret) | description |
| `DATABASE_PUBLIC_URL` | Postgres | - | description |
| `HOSTNAME` | umami | :: | description |
| `HOST_URL` | umami | - | description |
| `HASH_SALT` | umami | - | description |
| `REDIS_URL` | umami | - | description |
| `APP_SECRET` | umami | (secret) | description |
| `DATABASE_URL` | umami | - | description |
| `DATABASE_TYPE` | umami | postgres | description |
| `PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK` | umami | 1 | description |
| `VALKEY_URL` | Valkey | - | description |
| `VALKEY_HOST` | Valkey | - | description |
| `VALKEY_PORT` | Valkey | 6379 | description |
| `VALKEY_USER` | Valkey | (secret) | description |
| `VALKEY_PASSWORD` | Valkey | (secret) | description |
| `VALKEY_PUBLIC_URL` | Valkey | - | description |
| `VALKEY_PUBLIC_HOST` | Valkey | - | description |
| `VALKEY_PUBLIC_PORT` | Valkey | - | description |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-deploy-sep2026)
