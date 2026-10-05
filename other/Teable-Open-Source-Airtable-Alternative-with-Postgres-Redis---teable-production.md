# Deploy Teable | Open-Source Airtable Alternative with Postgres & Redis on Railway

No-code Postgres database with grid, kanban, forms and real-time collab

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/teable-production?utm_medium=integration&utm_source=button&utm_campaign=teable-production)

[Teable](https://teable.ai/) is the open-source Airtable alternative built on real Postgres: spreadsheet-style grids that scale to millions of rows, kanban, gallery, calendar and form views, formulas, links between tables, real-time collaboration, record history, and a REST API with personal access tokens. Your data lives in ordinary Postgres tables you can query with SQL. This template runs the official Teable image with Postgres, Redis and a volume for attachments, with every encryption secret generated for you.

The stack is three services: Teable, Postgres and Redis.

- **Upstream's own image, pinned.** Teable runs from the official `ghcr.io/teableio/teable` image at a fixed release tag, so a redeploy never surprises you with an untested version.
- **No public default keys.** Teable falls back to encryption keys that are published in its git history when they are not set, including the ones protecting attachment links and API tokens. This template generates every one of them (`SECRET_KEY`, the built-in code sandbox's `SANDBOX_JWT_SECRET` and eight 16-character keys) at deploy time, so Teable boots without its security warning.
- **Attachments on a volume.** Uploaded files are stored on a persistent volume mounted at `/app/.assets`, so they survive redeploys.
- **Redis for realtime and queues.** Teable uses Redis for its cache, background jobs and the real-time sync between browsers. Redis keeps an append-only file on its own volume.
- **Upgrades that migrate themselves.** Every boot runs Teable's database migrations before serving, and Railway's health check on `/health` only switches traffic once they finish.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Teable | `ghcr.io/teableio/teable:release.2026-10-02T04-02-20Z.3278` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.10.2-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Teable | 3000 | Port Teable listens on - leave as is |
| `SECRET_KEY` | Teable | (secret) | Master secret: signs logins and share links and encrypts stored AI keys. BACK IT UP - changing it logs everyone out and breaks stored keys |
| `PUBLIC_ORIGIN` | Teable | - | Public URL of Teable (links, attachments, sharing) - set it to your custom domain after adding one |
| `BACKEND_MAIL_HOST` | Teable | - | Optional SMTP server for invitations and password resets (Railway allows outbound SMTP on Pro only) |
| `BACKEND_MAIL_PORT` | Teable | 465 | SMTP port |
| `SANDBOX_JWT_SECRET` | Teable | (secret) | Signs execution tokens between the backend and its built-in code sandbox (port 7070, private network only). Without it Teable falls back to a publicly known default |
| `BACKEND_MAIL_SECURE` | Teable | true | true for implicit TLS (port 465), false for STARTTLS (587) |
| `BACKEND_MAIL_SENDER` | Teable | - | Sender address for Teable emails |
| `PRISMA_DATABASE_URL` | Teable | - | Postgres on the private network |
| `BACKEND_CACHE_PROVIDER` | Teable | redis | Cache, queues and realtime sync run on Redis |
| `BACKEND_MAIL_AUTH_PASS` | Teable | - | SMTP password |
| `BACKEND_MAIL_AUTH_USER` | Teable | (secret) | SMTP username |
| `BACKEND_CACHE_REDIS_URI` | Teable | - | Redis on the private network (family=0 lets it connect over IPv6) |
| `BACKEND_MAIL_SENDER_NAME` | Teable | Teable | Sender name for Teable emails |
| `BACKEND_MAIL_ENCRYPTION_IV` | Teable | - | Email link IV (16 hex chars) |
| `BACKEND_MAIL_ENCRYPTION_KEY` | Teable | - | Encrypts email unsubscribe links (16 hex chars) |
| `BACKEND_STORAGE_ENCRYPTION_IV` | Teable | - | Attachment token IV (16 hex chars) |
| `BACKEND_STORAGE_ENCRYPTION_KEY` | Teable | - | Encrypts attachment access tokens (16 hex chars) |
| `BACKEND_DATA_DB_URL_ENCRYPTION_IV` | Teable | - | External database URL IV (16 hex chars) |
| `BACKEND_ACCESS_TOKEN_ENCRYPTION_IV` | Teable | (secret) | API token IV (16 hex chars) |
| `BACKEND_DATA_DB_URL_ENCRYPTION_KEY` | Teable | - | Encrypts external database URLs (16 hex chars) |
| `BACKEND_ACCESS_TOKEN_ENCRYPTION_KEY` | Teable | (secret) | Encrypts personal API tokens - changing it invalidates every token (16 hex chars) |
| `POSTGRES_DB` | Postgres | teable | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.assets`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/teable-production)
