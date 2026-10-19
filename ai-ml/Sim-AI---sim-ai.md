# Deploy Sim AI on Railway

Deploy and Host Sim AI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sim-ai)

## About

Deploy Sim AI `v0.9.26`, an open-source visual platform for building, running, and scheduling AI-agent workflows.

This template deploys five coordinated services: the Sim web application and API, its realtime Socket.IO service, PostgreSQL 17 with pgvector, a one-shot database migration job, and the Sim cron scheduler. The application and realtime service each receive a Railway HTTPS domain; PostgreSQL, migrations, and cron remain private.

Open the `simstudio` domain to register the first account. Configure model-provider and integration credentials in Sim as needed. Database, authentication, encryption, internal API, and cron secrets are generated per deployment and wired through Railway references.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| realtime | `ghcr.io/simstudioai/realtime:v0.9.26@sha256:4933bb15a72ce263ad1586bba8014d9461bfaf5af6a72a6f1a9061cab54ffd2c` | Web service |
| simstudio | `ghcr.io/simstudioai/simstudio:v0.9.26@sha256:c8497809d08830b9126a686803aa6867f5e0cf40a7d0bc1fa989c70a3c136bfb` | Web service |
| pgvector | `pgvector/pgvector:pg17@sha256:dca0d688bbb31d3f851502ffcb9c7791387b4fcc544ae434dab41761e5ece317` | Database |
| migrations | `ghcr.io/simstudioai/migrations:v0.9.26@sha256:9ec1485c135bb8b11efcdd1f4ba6f2142a3e1e62715ff967c77028e9d224c6b4` | Worker |
| cron | `ghcr.io/simstudioai/cron:v0.9.26@sha256:8c3d2b53fd10d08ffe151869758b2c582b3882da1743daf5d9b74952ef6a92bd` | Worker |

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
