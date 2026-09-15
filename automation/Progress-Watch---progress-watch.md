# Deploy Progress Watch on Railway

Self-hostable progress tracking for anything that runs without you.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/progress-watch)

## About

Progress Watch is open source progress tracking for anything that runs without you: a crawl, a training run, a migration, a CI job, an AI agent. Each one reports counts with a single HTTP request, the CLI or MCP. You watch them live in
the browser from anywhere and get a push notification when they finish.

This template runs the published Docker image, `progresswatch/progresswatch`, with Sidekiq embedded in the web process, next to a PostgreSQL database and a Redis instance. PostgreSQL keeps spaces and the structure of each task. Redis
holds live progress and the notification queue; progress is never written to the database, so it stays small however long anything runs. A secret key is generated for every deploy, migrations run on boot, and Railway waits for `/up` to
answer before sending traffic. To turn on push notifications, add a VAPID key pair to the service variables after the first deploy, as described at https://progress.watch/docs/notifications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| progresswatch/progresswatch:latest | `progresswatch/progresswatch:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `FORCE_SSL` | progresswatch/progresswatch:latest | true |  Railway serves HTTPS |
| `DATABASE_URL` | progresswatch/progresswatch:latest | - | Spaces and task structure. |
| `SECRET_KEY_BASE` | progresswatch/progresswatch:latest | (secret) | Generated for every deploy. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/up`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/progress-watch)
