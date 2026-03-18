# Deploy Django with Celery on Railway

Basic structure of a Django app with Postgres, Celery, Redis, and Flower.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/a6vvTu)

## About

Django app with Postgres, Celery, Redis, and Flower. The deployed Celery repo should be changed to your own app repo with Celery added to your requirements file.

Using Flower for observing Celery tasks, with port 5555 open.

Requires wiring up access between databases and app & Celery.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Django | [tecladocode/django-celery-starter](https://github.com/tecladocode/django-celery-starter) | Worker |
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Celery | [tecladocode/django-celery-starter](https://github.com/tecladocode/django-celery-starter) | Worker |
| Flower monitoring | [tecladocode/django-celery-starter](https://github.com/tecladocode/django-celery-starter) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `celery -A mysite worker -l info`
- **Start command:** `celery -A mysite flower`
- **TCP Proxies:** 5555

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/a6vvTu)
