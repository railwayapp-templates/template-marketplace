# Deploy FounderOS on Railway

FounderOS workspace with browser UI, Go API, Postgres, and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/founderos-1)

## About

FounderOS is a self-hosted founder operating system for running a solo business or small team. It combines a desktop-style workspace with projects, tasks, relationships, pipelines, knowledge, applications, and AI-assisted workflows. This Railway template deploys the browser UI with its Go API, PostgreSQL database, and Redis session cache for a ready-to-use private workspace.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/founderos-1)

This template runs FounderOS from a Docker image on Railway, with PostgreSQL and Redis provisioned as private supporting services. Railway supplies HTTPS, service networking, generated secrets, persistent database volumes, and one-click template deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| app | `xiaosong233/founderos-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `SECRET_KEY` | app | (secret) |
| `REDIS_PASSWORD` | app | (secret) |
| `INTERNAL_API_SECRET` | app | (secret) |
| `TOKEN_ENCRYPTION_KEY` | app | (secret) |
| `REDIS_KEY_HMAC_SECRET` | app | (secret) |
| `WEBHOOK_SIGNING_SECRET` | app | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/founderos-1)
