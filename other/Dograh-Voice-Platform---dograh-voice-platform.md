# Deploy Dograh Voice Platform on Railway

Voice AI agents, visual workflow builder, telephony. Vapi alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dograh-voice-platform)

## About

Dograh is an open source voice AI agent platform. You build agents in a visual
workflow editor, connect your own speech and language model accounts, and answer
or place phone calls through a carrier you supply. It is a self-hosted stand-in
for hosted services like Vapi and Retell, with your data and your provider keys
staying on infrastructure you control.

This template runs Dograh as five services: the web app, the backend, a
PostgreSQL database with vector search, Redis for background jobs, and an
S3-compatible store for call recordings. The backend container also runs the
database migrations and the background job worker, matching how the project
ships it upstream.

Everything is wired together on deploy. Passwords are generated fresh for each
deployment and there are no questions to answer before it starts. Model provider
keys are entered inside the app after you create your account, so they are never
stored as Railway variables.

Pinned to release `dograh-v1.45.0` from 11 August 2026, using the images the
project publishes itself. No source builds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ui | `dograhai/dograh-ui:1.45.0` | Web service |
| redis | `redis:7.4.2` | Database |
| api | `dograhai/dograh-api:1.45.0` | Web service |
| minio | `minio/minio:RELEASE.2025-06-13T11-33-47Z` | Database |
| postgres | `pgvector/pgvector:0.8.2-pg17-trixie` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ui | 3010 | - |
| `HOSTNAME` | ui | :: | - |
| `NODE_ENV` | ui | oss | - |
| `ENABLE_TELEMETRY` | ui | true | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `PORT` | api | 8000 | - |
| `LOG_LEVEL` | api | INFO | - |
| `S3_BUCKET` | api | voice-audio | - |
| `S3_REGION` | api | us-east-1 | - |
| `ARQ_WORKERS` | api | 1 | - |
| `ENVIRONMENT` | api | production | - |
| `AUTH_PROVIDER` | api | local | - |
| `ENABLE_AWS_S3` | api | true | - |
| `ENABLE_COTURN` | api | false | - |
| `ENABLE_SIGNUP` | api | true | Leave this on to create your first account, then set it to false to stop anyone else registering. |
| `OSS_JWT_SECRET` | api | (secret) | - |
| `DEPLOYMENT_MODE` | api | oss | - |
| `FASTAPI_WORKERS` | api | 1 | - |
| `ENABLE_TELEMETRY` | api | true | Anonymous usage statistics sent to the Dograh project. Set to false to turn it off. |
| `ENABLE_ARI_MANAGER` | api | false | - |
| `FORWARDED_ALLOW_IPS` | api | * | - |
| `S3_ADDRESSING_STYLE` | api | path | - |
| `S3_SIGNATURE_VERSION` | api | s3v4 | - |
| `AWS_SECRET_ACCESS_KEY` | api | (secret) | - |
| `TELEPHONY_WS_TOKEN_SECRET` | api | (secret) | - |
| `TELEPHONY_WS_TOKEN_ENFORCE` | api | (secret) | - |
| `ENABLE_CAMPAIGN_ORCHESTRATOR` | api | true | - |
| `PORT` | minio | 9000 | - |
| `MINIO_ROOT_USER` | minio | (secret) | - |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | - |
| `MINIO_API_CORS_ALLOW_ORIGIN` | minio | * | - |
| `POSTGRES_DB` | postgres | dograh | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh redis-server --requirepass \"$REDIS_PASSWORD\""`
- **Healthcheck:** `/api/v1/health`
- **Start command:** `/bin/sh -c "rm -rf /data/lost+found && mkdir -p /data/voice-audio && exec /usr/bin/minio server /data --console-address :9001"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/dograh-voice-platform)
