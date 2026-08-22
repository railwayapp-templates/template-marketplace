# Deploy Plane | (Just Updated) Jira & Linear Alternative Whose Admin Isn't Claimable By Strangers on Railway

Self-hosted Jira & Linear alternative; admin not claimable by strangers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane-or-just-updated-jira-and-linear-al)

## About

Plane is an open-source project and product management tool — a self-hosted alternative to Jira and Linear covering issues, cycles, modules, and roadmaps. This template deploys the community all-in-one image, pinned by digest to v1.4.1, as five preconfigured services with your admin account seeded on first boot.

This template runs Plane's all-in-one community image (web, API, background workers, and realtime server under one process) alongside Postgres, Redis, RabbitMQ, and MinIO for object storage. Every stateful service carries its own volume, so your issues, uploads, and job queue survive redeploys. The wrapper seeds an instance admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD` before the public port opens and re-applies the password on every boot — so a redeploy is a working password reset. Public signup is disabled and telemetry is off by default. The admin console lives at `/god-mode`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1-alpine` | Database |
| postgres | `postgres:16.4-alpine` | Database |
| plane | `ghcr.io/bon5co/plane-railway:1.4.1` | Web service |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| rabbitmq | `rabbitmq:4.1-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `SECRET_KEY` | plane | (secret) |
| `ADMIN_PASSWORD` | plane | (secret) |
| `AWS_SECRET_ACCESS_KEY` | plane | (secret) |
| `LIVE_SERVER_SECRET_KEY` | plane | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'exec minio server --address "[::]:$PORT" --console-address 127.0.0.1:9001 /data'`
- **Volume:** `/var/lib/rabbitmq`

**Category:** Other

[View on Railway →](https://railway.com/deploy/plane-or-just-updated-jira-and-linear-al)
