# Deploy Ghostfolio | Open Source Sharesight Alternative on Railway on Railway

Self-host Ghostfolio. Wealth Dashboard - Track stocks, ETFs, crypto

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghostfolio)

## About

Ghostfolio is an open-source wealth management and portfolio tracking platform that lets you monitor stocks, ETFs, bonds, cryptocurrencies, commodities, and cash holdings across multiple accounts in a single privacy-respecting dashboard. Self-host Ghostfolio on Railway to keep your full transaction history under your control while still getting institutional-grade analytics, performance attribution, and risk metrics.

This Railway template deploys Ghostfolio (NestJS + Next.js stack from `ghostfolio/ghostfolio`), a managed PostgreSQL database for transactions and accounts, and a managed Redis instance for caching market-data lookups — pre-wired with the JWT secret, access token salt, Redis auth, and HTTPS root URL needed for a production deployment.

![Ghostfolio Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777481480/986952db-4aaf-4a73-94a9-0eac80476057.png)

Ghostfolio is built around a clean separation of concerns: a NestJS API that owns Prisma migrations and market-data ingestion, a Next.js frontend, a PostgreSQL database for source-of-truth transactional data, and a Redis cache for hot price lookups and session handling. Key features for self-hosters:

- Multi-currency portfolio tracking (USD, EUR, GBP, CHF, and any currency Yahoo Finance supports)
- Performance analytics with time-weighted return, money-weighted return, and benchmark comparisons
- Asset class breakdown, sector and country allocation, dividend timeline, and risk metrics
- CSV import for transactions, plus a public REST API for programmatic access
- OIDC / OAuth login support, two-factor auth, and per-user data isolation

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Ghostfolio | `ghostfolio/ghostfolio:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `HOST` | Ghostfolio | 0.0.0.0 | Bind address |
| `PORT` | Ghostfolio | 3333 | App listening port |
| `REDIS_DB` | Ghostfolio | 0 | Redis DB index |
| `ROOT_URL` | Ghostfolio | - | Public app URL for emails/OIDC |
| `REDIS_HOST` | Ghostfolio | - | Internal Redis hostname |
| `REDIS_PORT` | Ghostfolio | - | Redis port |
| `POSTGRES_DB` | Ghostfolio | - | DB name reused by app bootstrap |
| `DATABASE_URL` | Ghostfolio | - | Prisma Postgres connection string |
| `POSTGRES_USER` | Ghostfolio | (secret) | DB user reused by app bootstrap |
| `JWT_SECRET_KEY` | Ghostfolio | (secret) | JWT signing secret |
| `REDIS_PASSWORD` | Ghostfolio | (secret) | Redis auth password |
| `ACCESS_TOKEN_SALT` | Ghostfolio | (secret) | Salt for API access tokens |
| `POSTGRES_PASSWORD` | Ghostfolio | (secret) | DB password reused by app bootstrap |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/ghostfolio)
