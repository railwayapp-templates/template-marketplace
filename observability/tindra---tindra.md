# Deploy tindra on Railway

Deploy and Host Tindra on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tindra)

## About

Tindra is a self-hosted error tracking, performance monitoring, profiling, uptime monitoring, and cron monitoring platform with full Sentry SDK compatibility. This template deploys the stable release `0.6.4` as a single Go binary backed by PostgreSQL 18, with persistent volumes for the database and uploaded source maps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tindra-setup | [monotykamary/railway-template-tindra](https://github.com/monotykamary/railway-template-tindra) (root: /setup) | Worker |
| postgres | `postgres:18-alpine` | Database |
| tindra | `ghcr.io/blendbyte/tindra:0.6.4` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SETUP_ADMIN_PASSWORD` | tindra-setup | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tindra)
