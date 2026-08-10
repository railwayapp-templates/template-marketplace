# Deploy Ghostfolio on Railway

Personal finance portfolio tracker for stocks, ETFs, and crypto.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghostfolio-1)

## About

Ghostfolio is an open-source personal finance platform for tracking stocks, exchange-traded funds, and cryptocurrencies. It provides portfolio views, performance analysis, and market-oriented dashboards for individuals who want a self-hosted view of their financial data.

This template runs Ghostfolio with PostgreSQL for durable application data and Redis for caching. The application service should use private networking for database and cache connections, while its HTTP endpoint is exposed for browser access. Generated passwords and signing values are kept as template-time secrets and service references rather than copied credentials. Configure a persistent volume for PostgreSQL and review the upstream deployment guidance before importing existing data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:14-bullseye@sha256:c2a30d08a6f9e6c365595fd086c9e0436064c52425f15f72379ecf0807bac518` | Database |
| Redis | `redis:6.2-bullseye@sha256:5cdb2ac6f780e1d250787f4a887c1ed1166e3389757189ea913059409acc6f7c` | Database |
| Ghostfolio | `ghostfolio/ghostfolio:3.35.0@sha256:369cf19ae629062ae3b316cbdd0c6952536219ee0326cc03733a93f4e2639606` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | ghostfolio |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `HOST` | Ghostfolio | 0.0.0.0 |
| `PORT` | Ghostfolio | 3333 |
| `NODE_ENV` | Ghostfolio | production |
| `REDIS_PORT` | Ghostfolio | 6379 |
| `POSTGRES_USER` | Ghostfolio | (secret) |
| `JWT_SECRET_KEY` | Ghostfolio | (secret) |
| `ACCESS_TOKEN_SALT` | Ghostfolio | (secret) |
| `POSTGRES_PASSWORD` | Ghostfolio | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/ghostfolio-1)
