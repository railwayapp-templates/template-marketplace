# Deploy Django, Celery, Redis & Postgres on Railway

Full Django/Postgres stack with Celery tasks and Redis as cache/queue.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/NBR_V3)

## About

Deploy a "complete" Django setup - DB, caching and background tasks with Celery are all set up and ready to go. The project also includes Whitenoise for serving static files, and a docker-compose file for local development environment that matches this Railway equivalent.

Python 3.12 and Django 5.2!

Check out the full readme and brief on GitHub: https://github.com/Antvirf/railway_django_stack

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| django | [Antvirf/railway_django_stack](https://github.com/Antvirf/railway_django_stack) | Web service |
| celery-worker | [Antvirf/railway_django_stack](https://github.com/Antvirf/railway_django_stack) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | django | 8000 | Application port to serve Django from. Make sure to update your app too if you change this. |
| `DEBUG` | django | True | Whether to run Django in DEBUG mode. Defaults to False if not provided. |
| `REDISHOST` | django | redis.railway.internal | Private network address for Redis |
| `REDISPORT` | django | 6379 | Private network port for Redis |
| `RUN_MIGRATIONS` | django | True | Whether to run migrations automatically on container boot. |
| `DJANGO_SECRET_KEY` | django | (secret) | Create your own Django secret key. Use the same value for the Celery worker. |
| `REDISHOST` | celery-worker | redis.railway.internal | Private network address for Redis |
| `REDISPORT` | celery-worker | 6379 | Private network port for Redis |
| `DJANGO_SECRET_KEY` | celery-worker | (secret) | Create your own Django secret key. Use the same value for the Django service. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **Start command:** `/app/deployment/server-entrypoint.sh`
- **Healthcheck:** `/healthcheck/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/app/deployment/worker-entrypoint.sh`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/bitnami`

**Category:** Starters · **Languages:** Python, Dockerfile, Shell, Makefile

[View on Railway →](https://railway.com/deploy/NBR_V3)
