# Deploy evolution-n8n on Railway

WhatsApp automation stack: Evolution API v2 + n8n, Postgres, Redis, S3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-n8n)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-n8n?utm_medium=integration&utm_source=button&utm_campaign=evolution-n8n)

[Evolution API](https://evolution-api.com/) is an open-source WhatsApp REST API: connect numbers via QR code or the official WhatsApp Business API, send and receive messages, media, buttons, and group events — and [n8n](https://n8n.io/) is the workflow automation platform that turns those messages into bots, funnels, and integrations with 400+ services. Together they are the standard self-hosted WhatsApp automation stack.

This template runs the full automation stack as four Railway services wired over private networking: Evolution API v2.3.7 and n8n each with their own public domain, plus one PostgreSQL instance serving both apps (separate `evolution` and `n8n` databases via init script) and Redis for Evolution's cache. WhatsApp messages and media persist in Postgres, session credentials survive redeploys via Postgres and a small instance volume (no re-pairing), and the Redis URI carries `?family=0` — the fix for the ioredis IPv6 incompatibility with Railway's private networking that breaks naive templates. Open Evolution's `/manager` UI with your generated API key, pair a number, then point a webhook at an n8n workflow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | [nomideusz/evolution-n8n-railway](https://github.com/nomideusz/evolution-n8n-railway) (root: /n8n) | Web service |
| redis | [nomideusz/evolution-n8n-railway](https://github.com/nomideusz/evolution-n8n-railway) (root: /redis) | Worker |
| postgres | [nomideusz/evolution-n8n-railway](https://github.com/nomideusz/evolution-n8n-railway) (root: /postgres) | Database |
| evolution | [nomideusz/evolution-n8n-railway](https://github.com/nomideusz/evolution-n8n-railway) (root: /evolution) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | n8n's listen port. Must stay 5678 — Railway would otherwise inject 8080. |
| `N8N_HOST` | n8n | - | Public hostname of this n8n instance. Wired automatically — don't change. |
| `WEBHOOK_URL` | n8n | - | Public base URL used in generated webhook URLs. Wired automatically — don't change. |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres private hostname. Wired automatically — don't change. |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts credentials stored by n8n. Must be identical on every n8n service; losing it orphans saved credentials. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. |
| `SERVER_URL` | evolution | - | Public URL of this Evolution API instance. Wired automatically — don't change. |
| `CACHE_REDIS_URI` | evolution | - | Redis cache URI. The family=0 suffix is required on Railway (IPv6-only private DNS) — don't remove it. |
| `AUTHENTICATION_API_KEY` | evolution | (secret) | Global API key — use it in the apikey header and to sign in to the /manager UI. |
| `DATABASE_CONNECTION_URI` | evolution | - | Postgres connection string. Wired automatically — don't change. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Volume:** `/evolution/instances`

**Category:** Bots · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/evolution-n8n)
