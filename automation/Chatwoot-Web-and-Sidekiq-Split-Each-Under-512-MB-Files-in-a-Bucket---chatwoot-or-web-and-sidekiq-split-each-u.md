# Deploy Chatwoot | Web and Sidekiq Split, Each Under 512 MB, Files in a Bucket on Railway

Self-host Chatwoot on Railway — web and Sidekiq split, files in a Bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-or-web-and-sidekiq-split-each-u)

## About

Chatwoot, the open-source customer support desk, self-hosted as five pieces: the web app, a separate Sidekiq worker, Postgres with pgvector, Valkey and a Railway Bucket for files. Every image is pinned.

Nothing to fill in. Open the domain and create the first admin account.

Chatwoot is a Rails app with a Sidekiq worker next to it. Here they run as two services on the same official image:

- **Chatwoot**: Puma serving the dashboard, the API and the live-chat widget (public)
- **Sidekiq**: the background jobs: outgoing email, channel webhooks, attachments, scheduled tasks (private)
- **Postgres 16 with pgvector**, on its own volume
- **Valkey**, the Redis-compatible queue and cache, on its own volume with append-only persistence
- **Bucket**: Railway object storage for every uploaded and downloaded file

The database is prepared before the web app takes traffic: the pre-deploy step waits for Postgres and runs `db:chatwoot_prepare`, which creates the schema on the first deploy and migrates it on later ones.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:8.1.10-alpine` | Database |
| Chatwoot | `chatwoot/chatwoot:v4.18.0-ce` | Web service |
| Postgres | `pgvector/pgvector:0.8.7-pg16` | Database |
| Sidekiq | `chatwoot/chatwoot:v4.18.0-ce` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `VALKEY_PASSWORD` | Valkey | (secret) |
| `PORT` | Chatwoot | 3000 |
| `PIDFILE` | Chatwoot | /tmp/puma.pid |
| `NODE_ENV` | Chatwoot | production |
| `RAILS_ENV` | Chatwoot | production |
| `POSTGRES_PORT` | Chatwoot | 5432 |
| `SECRET_KEY_BASE` | Chatwoot | (secret) |
| `INSTALLATION_ENV` | Chatwoot | docker |
| `POSTGRES_PASSWORD` | Chatwoot | (secret) |
| `POSTGRES_USERNAME` | Chatwoot | (secret) |
| `RAILS_LOG_TO_STDOUT` | Chatwoot | true |
| `ENABLE_ACCOUNT_SIGNUP` | Chatwoot | false |
| `ACTIVE_STORAGE_SERVICE` | Chatwoot | s3_compatible |
| `STORAGE_SECRET_ACCESS_KEY` | Chatwoot | (secret) |
| `POSTGRES_DB` | Postgres | chatwoot |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NODE_ENV` | Sidekiq | production |
| `RAILS_ENV` | Sidekiq | production |
| `POSTGRES_PORT` | Sidekiq | 5432 |
| `SECRET_KEY_BASE` | Sidekiq | (secret) |
| `INSTALLATION_ENV` | Sidekiq | docker |
| `POSTGRES_PASSWORD` | Sidekiq | (secret) |
| `POSTGRES_USERNAME` | Sidekiq | (secret) |
| `RAILS_LOG_TO_STDOUT` | Sidekiq | true |
| `SIDEKIQ_CONCURRENCY` | Sidekiq | 5 |
| `DISABLE_SIDEKIQ_ALIVE` | Sidekiq | true |
| `ACTIVE_STORAGE_SERVICE` | Sidekiq | s3_compatible |
| `STORAGE_SECRET_ACCESS_KEY` | Sidekiq | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "exec valkey-server --requirepass $VALKEY_PASSWORD --appendonly yes --dir /data"`
- **Volume:** `/data`
- **Start command:** `bundle exec puma -C config/puma.rb`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bundle exec sidekiq -C config/sidekiq.yml`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/chatwoot-or-web-and-sidekiq-split-each-u)
