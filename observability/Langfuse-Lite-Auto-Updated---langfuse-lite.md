# Deploy Langfuse Lite (Auto-Updated) on Railway

Just 3 services + a bucket instead of 6. Pre-prod LLM observability.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-lite)

## About

Langfuse is an open-source LLM engineering platform: tracing, evals, prompt management, and metrics. Langfuse Lite deploys it in just 3 services plus a storage bucket, about half the footprint of a full production topology, for pre-production environments where cost matters more than high availability. This is an unofficial community template, not affiliated with Langfuse GmbH.

A full Langfuse self-host needs six components: web app, worker, Postgres, ClickHouse, Redis, and S3-compatible blob storage. Langfuse Lite keeps all six functions but co-locates web, worker, and Redis in a single container. Postgres runs Railway's own postgres-ssl image with a volume, ClickHouse runs single-node with a volume, and blob storage is a Railway bucket. Every credential is generated per deploy, so no configuration is required.

**Important:** this template runs Langfuse v4's native ingestion path (events_only write mode). Instrument with Python SDK 4.7.0+, JS SDK 5.4.0+, or native OpenTelemetry. Older SDKs using the legacy batch endpoint are rejected. After deploying, open the app URL and create your account immediately, since sign-up is open on a fresh instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langfuse | [elleryfamilia/langfuse-lite-railway](https://github.com/elleryfamilia/langfuse-lite-railway) (root: services/langfuse) | Web service |
| ClickHouse | [elleryfamilia/langfuse-lite-railway](https://github.com/elleryfamilia/langfuse-lite-railway) (root: services/clickhouse) | Database |
| Postgres | [elleryfamilia/langfuse-lite-railway](https://github.com/elleryfamilia/langfuse-lite-railway) (root: services/postgres) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Langfuse | 3000 |
| `CLICKHOUSE_USER` | Langfuse | (secret) |
| `NEXTAUTH_SECRET` | Langfuse | (secret) |
| `CLICKHOUSE_PASSWORD` | Langfuse | (secret) |
| `REDIS_CONNECTION_STRING` | Langfuse | redis://127.0.0.1:6379 |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse | false |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse | events/ |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Langfuse | media/ |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse | false |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Langfuse | false |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Langfuse | (secret) |
| `CLICKHOUSE_DB` | ClickHouse | default |
| `CLICKHOUSE_USER` | ClickHouse | (secret) |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) |
| `TZ` | Postgres | UTC |
| `PGTZ` | Postgres | UTC |
| `POSTGRES_DB` | Postgres | langfuse |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/public/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/langfuse-lite)
