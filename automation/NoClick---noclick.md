# Deploy NoClick on Railway

Agents for any background task, on your ChatGPT or Claude subscription.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/noclick)

## About

Build agents that automate any background task, on your own Railway project, with the ChatGPT or Claude subscription you already have. One click: a Postgres database and the reviewed public release image, and nothing to fill in.

NoClick runs its backend, frontend, HTTP gateway and auth layer in one container. On first boot it prepares the database it was given, mints this instance's own secrets, and serves everything on the service's Railway domain. One replica is by design: the scheduler and realtime state are in-process.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| noclick | `ghcr.io/noclickapp/noclick:0.2.12` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JWT_SECRET` | noclick | (secret) |
| `SESSION_SECRET` | noclick | (secret) |
| `WORKFLOW_JWT_SECRET` | noclick | (secret) |
| `CRON_SCHEDULER_SECRET` | noclick | (secret) |
| `CREDENTIALS_ENCRYPTION_KEY` | noclick | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/noclick`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/noclick)
