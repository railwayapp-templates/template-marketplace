# Deploy Chatwoot | Intercom Alternative, Sidekiq Worker + 2FA Included on Railway

Intercom alternative: live chat, email, WhatsApp. Worker included, 2FA on.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-or-intercom-alternative-sidekiq)

## About

Chatwoot is an open-source customer engagement platform — a self-hosted alternative to Intercom, Zendesk and Freshdesk. It gives your team one shared inbox for live chat, email, WhatsApp, Instagram, Facebook, SMS, Telegram and API channels, with contact records, canned responses, labels, automations, macros, campaigns and reporting on top.

This template deploys a complete four-service Chatwoot stack: the Rails web app, a **Sidekiq background worker**, PostgreSQL with pgvector, and Redis — each on its own persistent volume.

Chatwoot is not a single container. The Rails app serves the dashboard and the widget, but everything that happens *after* a message arrives — outgoing email notifications, campaign sends, IMAP polling, automation rules, scheduled jobs, conversation cleanup, report rollups — runs in a separate Sidekiq worker process against Redis. A Chatwoot deploy without that worker looks healthy and quietly never sends a notification email.

This template runs both, from one pinned image (`chatwoot/chatwoot:v4.16.2-ce`, wrapped as `ghcr.io/bon5co/chatwoot-railway`). The wrapper bakes every platform-known setting into the image, so the deploy form has **nothing you have to fill in** — every variable arrives with a generated value. On the first deploy the entrypoint waits for Postgres, runs `rails db:chatwoot_prepare` (create + schema load + seed), then serves on Railway's injected `$PORT` bound to `::`; on later deploys the same command just runs pending migrations. The worker waits for that schema to exist before it starts, so nothing crash-loops through the first boot.

Two security defaults differ from a stock install, deliberately:

- **Public sign-ups are closed** (`ENABLE_ACCOUNT_SIGNUP=false`). A fresh Chatwoot on a public URL otherwise lets any stranger who finds it register an account. You still create the first administrator normally — `/installation/onboarding` is a separate route and is open until you complete it.
- **MFA/2FA works out of the box.** Chatwoot only enables two-factor auth when all three `ACTIVE_RECORD_ENCRYPTION_*` keys are set; this template generates all three per deploy.

Postgres uses the pgvector image because Chatwoot's Captain AI features need the `vector` extension, and Redis persists with an append-only file so queued jobs survive a restart. Sizing: the Rails service is the memory-hungry one (~700 MB–1 GB idle), Sidekiq ~400 MB, Postgres and Redis are small.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `pgvector/pgvector:pg17` | Database |
| chatwoot | `ghcr.io/bon5co/chatwoot-railway:latest` | Web service |
| redis | `redis:8.2.1` | Database |
| worker | `ghcr.io/bon5co/chatwoot-railway:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | chatwoot | (secret) |
| `SECRET_KEY_BASE` | chatwoot | (secret) |
| `POSTGRES_PASSWORD` | chatwoot | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `REDIS_PASSWORD` | worker | (secret) |
| `SECRET_KEY_BASE` | worker | (secret) |
| `POSTGRES_PASSWORD` | worker | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Start command:** `bundle exec sidekiq -C config/sidekiq.yml`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/chatwoot-or-intercom-alternative-sidekiq)
