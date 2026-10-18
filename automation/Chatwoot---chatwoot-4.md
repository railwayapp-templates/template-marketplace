# Deploy Chatwoot on Railway

Open-source customer support: live chat, shared inbox, automations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-4)

## About

Chatwoot is the open-source customer support platform — live chat, a shared omnichannel inbox (email, website widget, WhatsApp, Telegram, social), help center, and automations. Deploy the complete production stack in one click: Rails web app, Sidekiq worker, PostgreSQL 16 + pgvector, and Redis. The deploy form has zero fields — secrets are generated and services auto-wire over the private network. Open the public URL after deploy and the setup wizard creates your admin account.

Four always-on services on Railway: `chatwoot` (Rails web, honors the injected `PORT`, unauthenticated `GET /health`), `chatwoot-worker` (Sidekiq — email, webhooks, automations), `postgres` (PostgreSQL 16 with the pgvector extension Chatwoot 4.x migrations require), and `redis` (cache + job queues, append-only). Uploads persist on the `chatwoot-data` volume (`/app/storage`); Postgres and Redis each keep their own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatwoot-worker | [mc9max/chatwoot](https://github.com/mc9max/chatwoot) (root: worker) | Worker |
| redis | [mc9max/chatwoot](https://github.com/mc9max/chatwoot) (root: redis) | Database |
| chatwoot | [mc9max/chatwoot](https://github.com/mc9max/chatwoot) | Web service |
| postgres | [mc9max/chatwoot](https://github.com/mc9max/chatwoot) (root: postgres) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET_KEY_BASE` | chatwoot-worker | (secret) |
| `POSTGRES_PASSWORD` | chatwoot-worker | (secret) |
| `SECRET_KEY_BASE` | chatwoot | (secret) |
| `POSTGRES_PASSWORD` | chatwoot | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/chatwoot-4)
