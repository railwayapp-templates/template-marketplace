# Deploy Sim AI on Railway

Deploy and Host Sim AI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sim-ai)

## About

Deploy Sim AI `v0.8.2`, an open-source visual platform for building, running, and scheduling AI-agent workflows.

This template deploys five coordinated services: the Sim web application and API, its realtime Socket.IO service, PostgreSQL 17 with pgvector, a one-shot database migration job, and the Sim cron scheduler. The application and realtime service each receive a Railway HTTPS domain; PostgreSQL, migrations, and cron remain private.

Open the `simstudio` domain to register the first account. Configure model-provider and integration credentials in Sim as needed. Database, authentication, encryption, internal API, and cron secrets are generated per deployment and wired through Railway references.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| realtime | `ghcr.io/simstudioai/realtime:v0.8.2@sha256:dd72bef164e69fed345f52feca98663dcdba0409bbb6da439e623992d0b30f67` | Web service |
| simstudio | `ghcr.io/simstudioai/simstudio:v0.8.2@sha256:08212f69ee05fd80bafd236b9932974d6704035ba7f50c2b897515b041805fec` | Web service |
| pgvector | `pgvector/pgvector:pg17` | Database |
| migrations | `ghcr.io/simstudioai/migrations:v0.8.2@sha256:bd08017162914796c787a5bd7804a5e3c56802511d928b984cecc312c1570cf5` | Worker |
| cron | `ghcr.io/simstudioai/cron:v0.8.2@sha256:e8a00f3d7292fdd1357e2cb7e09380cc336cdaf15e94d0b0059204a9e719e145` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | realtime | production | - |
| `BETTER_AUTH_SECRET` | realtime | (secret) | - |
| `INTERNAL_API_SECRET` | realtime | (secret) | - |
| `CRON_SECRET` | simstudio | (secret) | Shared secret authenticating private cron requests. |
| `BETTER_AUTH_SECRET` | simstudio | (secret) | - |
| `INTERNAL_API_SECRET` | simstudio | (secret) | - |
| `DISABLE_REGISTRATION` | simstudio | false | - |
| `POSTGRES_DB` | pgvector | railway | - |
| `POSTGRES_USER` | pgvector | (secret) | - |
| `PGPORT_PRIVATE` | pgvector | 5432 | - |
| `POSTGRES_PASSWORD` | pgvector | (secret) | - |
| `TZ` | cron | UTC | Timezone used by the cron schedule. |
| `SIM_URL` | cron | - | Private Sim application origin used by scheduled jobs. |
| `CRON_SECRET` | cron | (secret) | Shared scheduler authentication secret. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run db:migrate`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sim-ai)
