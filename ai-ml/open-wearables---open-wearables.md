# Deploy open-wearables on Railway

Unify wearable health data through one AI-ready API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/open-wearables)

## About

> Self-hosted platform to unify wearable health data through one AI-ready API.

open-wearables is a open-source platform that unifies wearable device data from multiple providers and enables AI-powered health insights through natural language automations. Build health applications faster with a single API, embeddable widgets, and intelligent webhook notifications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Celery Worker | [healthkowshik/open-wearables](https://github.com/healthkowshik/open-wearables) (root: /backend) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| Frontend | [healthkowshik/open-wearables](https://github.com/healthkowshik/open-wearables) (root: /frontend) | Web service |
| Celery Beat | [healthkowshik/open-wearables](https://github.com/healthkowshik/open-wearables) (root: /backend) | Worker |
| backend | [healthkowshik/open-wearables](https://github.com/healthkowshik/open-wearables) (root: /backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_HOST` | Celery Worker | - | DB_HOST |
| `DB_NAME` | Celery Worker | - | DB_NAME |
| `DB_PORT` | Celery Worker | - | DB_PORT |
| `DB_USER` | Celery Worker | (secret) | DB_USER |
| `REDIS_HOST` | Celery Worker | - | REDIS_HOST |
| `REDIS_PORT` | Celery Worker | - | REDIS_PORT |
| `SECRET_KEY` | Celery Worker | (secret) | SECRET_KEY |
| `DB_PASSWORD` | Celery Worker | (secret) | DB_PASSWORD |
| `ENVIRONMENT` | Celery Worker | - | ENVIRONMENT |
| `REDIS_PASSWORD` | Celery Worker | (secret) | REDIS_PASSWORD |
| `POSTGRES_DB` | Postgres | - | POSTGRES_DB |
| `DATABASE_URL` | Postgres | - | DATABASE_URL |
| `POSTGRES_USER` | Postgres | (secret) | POSTGRES_USER |
| `POSTGRES_PASSWORD` | Postgres | (secret) | POSTGRES_PASSWORD |
| `DATABASE_PUBLIC_URL` | Postgres | - | DATABASE_PUBLIC_URL |
| `REDISHOST` | Redis | - | REDISHOST |
| `REDISPORT` | Redis | - | REDISPORT |
| `REDISUSER` | Redis | - | REDISUSER |
| `REDIS_URL` | Redis | - | REDIS_URL |
| `REDISPASSWORD` | Redis | (secret) | REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | REDIS_PASSWORD |
| `REDIS_PUBLIC_URL` | Redis | - | REDIS_PUBLIC_URL |
| `VITE_API_URL` | Frontend | - | VITE_API_URL |
| `DB_HOST` | Celery Beat | - | DB_HOST |
| `DB_NAME` | Celery Beat | - | DB_NAME |
| `DB_PORT` | Celery Beat | - | DB_PORT |
| `DB_USER` | Celery Beat | (secret) | DB_USER |
| `REDIS_HOST` | Celery Beat | - | REDIS_HOST |
| `REDIS_PORT` | Celery Beat | - | REDIS_PORT |
| `SECRET_KEY` | Celery Beat | (secret) | SECRET_KEY |
| `DB_PASSWORD` | Celery Beat | (secret) | DB_PASSWORD |
| `ENVIRONMENT` | Celery Beat | - | ENVIRONMENT |
| `REDIS_PASSWORD` | Celery Beat | (secret) | REDIS_PASSWORD |
| `DB_HOST` | backend | - | DB_HOST |
| `DB_NAME` | backend | - | DB_NAME |
| `DB_PORT` | backend | - | DB_PORT |
| `DB_USER` | backend | (secret) | DB_USER |
| `REDIS_HOST` | backend | - | REDIS_HOST |
| `REDIS_PORT` | backend | - | REDIS_PORT |
| `SECRET_KEY` | backend | (secret) | SECRET_KEY |
| `DB_PASSWORD` | backend | (secret) | DB_PASSWORD |
| `ENVIRONMENT` | backend | - | ENVIRONMENT |
| `SERVER_HOST` | backend | - | SERVER_HOST |
| `CORS_ORIGINS` | backend | - | CORS_ORIGINS |
| `FRONTEND_URL` | backend | - | FRONTEND_URL |
| `REDIS_PASSWORD` | backend | (secret) | REDIS_PASSWORD |

## Configuration

- **Start command:** `scripts/start/worker.sh`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `scripts/start/beat.sh`
- **Start command:** `scripts/start/app.sh`

**Category:** AI/ML · **Languages:** Python, TypeScript, CSS, Dockerfile, Makefile, Shell, Mako, JavaScript

[View on Railway →](https://railway.com/template/open-wearables)
