# Deploy chatwoot on Railway

Open-source customer support platform: alternative to Intercom and Zendesk.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-3)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-3?utm_medium=integration&utm_source=button&utm_campaign=chatwoot)

[Chatwoot](https://www.chatwoot.com/) is the open-source customer support platform: a shared inbox for email, website live chat, WhatsApp, Instagram, Telegram and more, with automations, canned responses, CSAT surveys, and Captain AI — a self-hosted alternative to Intercom and Zendesk.

Chatwoot v4 is a Rails application with a real background-job tier. This template runs it as four Railway services: the web app (Rails/Puma), a dedicated Sidekiq worker (emails, automations, campaigns — kept off the web process so conversations stay snappy), PostgreSQL 16 **with pgvector** (required by v4 for Captain AI; the missing extension is why older Chatwoot templates broke on upgrade), and password-protected Redis for queues and ActionCable. Attachments go to a **Railway bucket over S3** instead of a service volume, and database migrations run as a Railway pre-deploy command (`rails db:chatwoot_prepare`) so every upgrade migrates itself. First boot takes ~2 minutes of migrations, then create your admin account at the web service's domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [nomideusz/chatwoot-railway](https://github.com/nomideusz/chatwoot-railway) (root: /postgres) | Database |
| redis | [nomideusz/chatwoot-railway](https://github.com/nomideusz/chatwoot-railway) (root: /redis) | Database |
| web | [nomideusz/chatwoot-railway](https://github.com/nomideusz/chatwoot-railway) (root: /web) | Web service |
| worker | [nomideusz/chatwoot-railway](https://github.com/nomideusz/chatwoot-railway) (root: /worker) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password. |
| `PORT` | web | 3000 | Rails listen port. Must stay 3000 — Railway would otherwise inject 8080. |
| `REDIS_URL` | web | - | Redis URI for Sidekiq and ActionCable. Wired automatically — don't change. |
| `FRONTEND_URL` | web | - | Public URL of this Chatwoot instance. Wired automatically — don't change. |
| `POSTGRES_HOST` | web | - | Postgres private hostname. Wired automatically — don't change. |
| `REDIS_PASSWORD` | web | (secret) | Redis password, shared from the redis service. Wired automatically — don't change. |
| `SECRET_KEY_BASE` | web | (secret) | Rails master secret. Must match on web and worker (worker references this value). |
| `STORAGE_ENDPOINT` | web | - | Bundled Railway bucket endpoint URL. Wired automatically — don't change. |
| `POSTGRES_PASSWORD` | web | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `STORAGE_BUCKET_NAME` | web | - | Bundled Railway bucket name. Wired automatically — don't change. |
| `STORAGE_ACCESS_KEY_ID` | web | - | Bundled Railway bucket access key. Wired automatically — don't change. |
| `STORAGE_SECRET_ACCESS_KEY` | web | (secret) | Bundled Railway bucket secret key. Wired automatically — don't change. |
| `REDIS_URL` | worker | - | Redis URI for Sidekiq and ActionCable. Wired automatically — don't change. |
| `FRONTEND_URL` | worker | - | Public URL of this Chatwoot instance. Wired automatically — don't change. |
| `POSTGRES_HOST` | worker | - | Postgres private hostname. Wired automatically — don't change. |
| `REDIS_PASSWORD` | worker | (secret) | Redis password, shared from the redis service. Wired automatically — don't change. |
| `SECRET_KEY_BASE` | worker | (secret) | Rails master secret. Must match on web and worker (worker references this value). |
| `STORAGE_ENDPOINT` | worker | - | Bundled Railway bucket endpoint URL. Wired automatically — don't change. |
| `POSTGRES_PASSWORD` | worker | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `STORAGE_BUCKET_NAME` | worker | - | Bundled Railway bucket name. Wired automatically — don't change. |
| `STORAGE_ACCESS_KEY_ID` | worker | - | Bundled Railway bucket access key. Wired automatically — don't change. |
| `STORAGE_SECRET_ACCESS_KEY` | worker | (secret) | Bundled Railway bucket secret key. Wired automatically — don't change. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/chatwoot-3)
