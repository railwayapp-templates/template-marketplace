# Deploy Maybe | Your Personal Finance Tracking, YNAB Alternative on Railway

Self Host Maybe. Track accounts, investments & budgets with AI features

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maybe)

## About

Deploy Maybe on Railway to get a fully open-source personal finance dashboard running in minutes. Self-host Maybe with complete control over your financial data — no third-party SaaS, no subscription fees, and full privacy for your accounts, investments, and transactions.

This Railway template pre-configures Maybe with PostgreSQL for data persistence, Redis for background job queuing, and a dedicated Sidekiq worker for async processing. Everything is wired together with Railway's service references so the entire stack deploys as a single click.

![Maybe Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776784026/Maybe-railway-architecture_spaxgv.png)

Maybe is an open-source personal finance OS built with Ruby on Rails. Originally a venture-backed startup, Maybe was open-sourced under the AGPLv3 license and has become one of the most popular self-hosted finance tools on GitHub with over 40k stars.

Key features include:

- **Net worth tracking** across all accounts (bank, investment, crypto, real estate)
- **Transaction management** with categories, tags, rules, and CSV import
- **Investment portfolio monitoring** with performance analytics and allocation views
- **AI-powered insights** via optional OpenAI integration (chat with your finances, auto-categorization rules)
- **Multi-currency support** with automatic exchange rate conversion
- **Budgeting tools** for tracking income vs expenses
- **Sidekiq background workers** for syncing accounts and running scheduled tasks

The architecture consists of four services: the Rails web app serving the UI on port 3000, a Sidekiq worker processing background jobs, PostgreSQL for relational data, and Redis as the job queue and cache layer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Maybe | `ghcr.io/maybe-finance/maybe:stable` | Web service |
| Worker | `ghcr.io/maybe-finance/maybe:stable` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Maybe | 3000 | HTTP listening port |
| `DB_HOST` | Maybe | - | Postgres internal hostname |
| `DB_PORT` | Maybe | - | Postgres port |
| `REDIS_URL` | Maybe | - | Redis connection with auth |
| `POSTGRES_DB` | Maybe | - | Database name |
| `SELF_HOSTED` | Maybe | true | Enable self-hosted mode |
| `POSTGRES_USER` | Maybe | (secret) | Database username |
| `RAILS_FORCE_SSL` | Maybe | false | Railway handles TLS termination |
| `SECRET_KEY_BASE` | Maybe | (secret) | Rails session signing key |
| `RAILS_ASSUME_SSL` | Maybe | false | Railway handles TLS termination |
| `POSTGRES_PASSWORD` | Maybe | (secret) | Database password |
| `DB_HOST` | Worker | - | Postgres internal hostname |
| `DB_PORT` | Worker | - | Postgres port |
| `REDIS_URL` | Worker | - | Redis connection with auth |
| `POSTGRES_DB` | Worker | - | Database name |
| `SELF_HOSTED` | Worker | true | Enable self-hosted mode |
| `POSTGRES_USER` | Worker | (secret) | Database username |
| `RAILS_FORCE_SSL` | Worker | false | Railway handles TLS termination |
| `SECRET_KEY_BASE` | Worker | (secret) | Shared Rails signing key |
| `RAILS_ASSUME_SSL` | Worker | false | Railway handles TLS termination |
| `POSTGRES_PASSWORD` | Worker | (secret) | Database password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`
- **Start command:** `bundle exec sidekiq`

**Category:** Other

[View on Railway →](https://railway.com/deploy/maybe)
