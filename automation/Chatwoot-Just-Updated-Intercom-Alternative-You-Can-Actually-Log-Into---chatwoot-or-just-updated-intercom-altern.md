# Deploy Chatwoot | (Just Updated) Intercom Alternative You Can Actually Log Into on Railway

Intercom alternative. Admin seeded on deploy - stock Chatwoot has no user.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-or-just-updated-intercom-altern)

## About

Chatwoot is an open-source customer engagement platform — a self-hosted alternative to Intercom, Zendesk and Freshdesk. It gives your team one shared inbox for live chat, email, WhatsApp, Instagram, Facebook, SMS, Telegram and API channels, with contact records, canned responses, labels, automations, macros, campaigns and reporting on top.

This template deploys Chatwoot v4.17.1 as three services — the Rails app with its Sidekiq worker in one container, PostgreSQL with pgvector, and Redis — and **seeds the administrator account for you at deploy time**.

A stock Chatwoot production deploy has no user account and no way to make one. Chatwoot creates its first user through `POST /api/v1/accounts`, which is registered only while public sign-ups are enabled; with sign-ups off the route raises a routing error and returns `404`, and with sign-ups on the same route is open to any stranger who finds the URL. The seed data that creates a sample administrator runs in the development environment only. So a deployer either faces a login page they can never pass, or a public registration form on their own support desk.

This template closes that gap. On every boot, before the port opens, the entrypoint waits for Postgres, runs `rails db:chatwoot_prepare` (create, schema load, migrate) and then seeds a super administrator from `CHATWOOT_ADMIN_EMAIL` and `CHATWOOT_ADMIN_PASSWORD`, both generated per deploy. The password is re-applied on each boot, so a redeploy is a working password reset — useful because Chatwoot's own reset path is an emailed link, and a fresh deploy has no SMTP provider yet. Public sign-ups stay closed (`ENABLE_ACCOUNT_SIGNUP=false`), so `POST /api/v1/accounts` answers `404` to the internet while you log in normally.

Rails and Sidekiq run in one container on purpose. Chatwoot stores attachments on local disk by default, and Railway volumes cannot be shared between services — two services mounting the same path get two separate volumes. Split across a web service and a worker service, the worker writes uploads the web service cannot read. One container, one volume at `/app/storage`, and the entrypoint stops the container if Sidekiq dies rather than leaving a healthy-looking app whose background jobs are gone.

Postgres uses the pgvector image because Chatwoot's Captain AI features need the `vector` extension, and Redis persists with an append-only file so queued jobs survive a restart. Sizing: the app service is the memory-hungry one (~1–1.4 GB with the worker in-process), Postgres and Redis are small.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatwoot | `ghcr.io/bon5co/chatwoot-railway:v4.17.1` | Web service |
| redis | `redis:8.2.1` | Database |
| postgres | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | chatwoot | (secret) |
| `SECRET_KEY_BASE` | chatwoot | (secret) |
| `POSTGRES_PASSWORD` | chatwoot | (secret) |
| `CHATWOOT_ADMIN_PASSWORD` | chatwoot | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/chatwoot-or-just-updated-intercom-altern)
