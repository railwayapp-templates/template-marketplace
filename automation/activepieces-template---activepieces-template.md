# Deploy activepieces-template on Railway

Activepieces + Postgres and Redis. Generated secrets. Healthcheck.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-template)

## About

Self-host [Activepieces](https://activepieces.com/) with Railway Postgres and Redis. Official `ghcr.io/activepieces/activepieces` image, one container in `WORKER_AND_APP` mode. This is the Apache-2.0 Zapier alternative on [c17.io/stacks/activepieces](https://c17.io/stacks/activepieces). n8n is a **separate** template: [9o4t/n8n](https://github.com/9o4t/n8n).

No LLM or SaaS API keys are required to boot. The template generates `AP_ENCRYPTION_KEY` and `AP_JWT_SECRET`, and wires `AP_FRONTEND_URL` to the public domain.

Activepieces is open-source workflow automation (pieces instead of Zapier apps). Connections are encrypted with `AP_ENCRYPTION_KEY`. The job queue is Redis. Structured data is Postgres.

On Railway this is three services:

| Service | Source | Public | Notes |
|---|---|---|---|
| `activepieces` | `ghcr.io/activepieces/activepieces` | Yes | `AP_PORT=${{PORT}}`. Health `GET /api/v1/health`. |
| `Postgres` | Railway plugin | No | Flows, runs, connections. |
| `Redis` | Railway plugin | No | BullMQ queue. Required for this image; in-memory Redis is not used. |

The first account you create becomes the platform admin. There is no default username or password.

Losing `AP_ENCRYPTION_KEY` makes stored connections unreadable, even from a full database backup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| activepieces | `ghcr.io/activepieces/activepieces` | Web service |
| Redis | `redis:7` | Database |
| Postgres | `postgres:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AP_JWT_SECRET` | activepieces | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/pieces`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/cache`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-template)
