# Deploy Sim AI on Railway

Deploy and Host Sim AI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sim-ai)

## About

Deploy Sim AI `v0.8.33`, an open-source visual platform for building, running, and scheduling AI-agent workflows.

This template deploys five coordinated services: the Sim web application and API, its realtime Socket.IO service, PostgreSQL 17 with pgvector, a one-shot database migration job, and the Sim cron scheduler. The application and realtime service each receive a Railway HTTPS domain; PostgreSQL, migrations, and cron remain private.

Open the `simstudio` domain to register the first account. Configure model-provider and integration credentials in Sim as needed. Database, authentication, encryption, internal API, and cron secrets are generated per deployment and wired through Railway references.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| realtime | `ghcr.io/simstudioai/realtime:v0.8.33@sha256:89a87e083ede6da494a19fa5292a3e37b1b877c5e65fde2d0bd099ff755bd489` | Web service |
| simstudio | `ghcr.io/simstudioai/simstudio:v0.8.33@sha256:28daaa1390f8a9bcf429855071fc68c4e93aa329e93be010be89f12350d1d27e` | Web service |
| pgvector | `pgvector/pgvector:pg17` | Database |
| migrations | `ghcr.io/simstudioai/migrations:v0.8.33@sha256:1abb5deb558ebef9cd051ee2547d96237a921a4fc7f54946ee629b8e5402e01f` | Worker |
| cron | `ghcr.io/simstudioai/cron:v0.8.33@sha256:b5ce1038971225cd082dce7e701a81af5d24bd712a75b7adca9d7f6f04134b49` | Worker |

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
- **Healthcheck:** `/api/health`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run db:migrate`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sim-ai)
