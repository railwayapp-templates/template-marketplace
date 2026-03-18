# Deploy Open Wearables on Railway

Self-hosted platform to unify wearable data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-wearables-1)

## About

Open Wearables is a self-hosted platform that unifies health data from multiple wearable devices (Garmin, Whoop, Apple Health, etc.) through a single REST API. Developers can integrate once instead of maintaining separate implementations for each provider, while individuals can self-host to maintain complete control over their health data.

Open Wearables is designed for self-hosting with minimal setup complexity. The platform runs as a complete stack with FastAPI backend, React frontend, PostgreSQL database, Redis for caching, and Celery for background data syncing. Each deployment serves a single organization (no multi-tenancy), making it straightforward to manage. The platform handles OAuth flows for wearable providers, normalizes data across different devices, and exposes everything through a unified API. Deploying on Railway means you can get production-ready infrastructure running in minutes without manual server configuration, while maintaining full data sovereignty.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| celery-worker | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) (root: /backend) | Worker |
| frontend | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) (root: /frontend) | Web service |
| backend | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) (root: /backend) | Web service |
| celery-beat | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) (root: /backend) | Worker |
| Redis | `redis:8.2.1` | Database |
| celery-flower | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) (root: /backend) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | open-wearables |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `DB_USER` | celery-worker | (secret) |
| `REDIS_DB` | celery-worker | 0 |
| `SECRET_KEY` | celery-worker | (secret) |
| `DB_PASSWORD` | celery-worker | (secret) |
| `ENVIRONMENT` | celery-worker | production |
| `REDIS_PASSWORD` | celery-worker | (secret) |
| `REDIS_USERNAME` | celery-worker | (secret) |
| `DB_USER` | backend | (secret) |
| `REDIS_DB` | backend | 0 |
| `SECRET_KEY` | backend | (secret) |
| `DB_PASSWORD` | backend | (secret) |
| `ENVIRONMENT` | backend | production |
| `ADMIN_PASSWORD` | backend | (secret) |
| `REDIS_PASSWORD` | backend | (secret) |
| `REDIS_USERNAME` | backend | (secret) |
| `SENTRY_ENABLED` | backend | false |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | backend | (secret) |
| `DB_USER` | celery-beat | (secret) |
| `REDIS_DB` | celery-beat | 0 |
| `SECRET_KEY` | celery-beat | (secret) |
| `DB_PASSWORD` | celery-beat | (secret) |
| `ENVIRONMENT` | celery-beat | production |
| `REDIS_PASSWORD` | celery-beat | (secret) |
| `REDIS_USERNAME` | celery-beat | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `DB_USER` | celery-flower | (secret) |
| `REDIS_DB` | celery-flower | 0 |
| `SECRET_KEY` | celery-flower | (secret) |
| `DB_PASSWORD` | celery-flower | (secret) |
| `ENVIRONMENT` | celery-flower | production |
| `REDIS_PASSWORD` | celery-flower | (secret) |
| `REDIS_USERNAME` | celery-flower | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `scripts/start/worker.sh`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `scripts/start/app.sh`
- **Start command:** `scripts/start/beat.sh`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `scripts/start/flower.sh`

**Category:** AI/ML · **Languages:** Python, TypeScript, MDX, CSS, Dockerfile, Makefile, Shell, Mako, JavaScript

[View on Railway →](https://railway.com/deploy/open-wearables-1)
