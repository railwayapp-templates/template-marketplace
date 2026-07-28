# Deploy Celery | Web, Worker and Scheduler as Three Services on Railway

Web, worker and scheduler wired up: Celery on Redis, outcomes in Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/celery-or-web-worker-and-scheduler-as-th)

## About

A web service that answers immediately, a worker that does the slow part, and a scheduler for the work nobody asked for — three services from one image, with Redis as the queue and Postgres as the record of what happened.

Post a job, get an id back in milliseconds, read the outcome when it is ready.

The Queues category of this catalogue holds 55 templates and 2837 installs in total, on a platform where background work is table stakes. The most installed Django-and-Celery template sits at 245 installs with a 64% success rate.

The reason is not that Celery is difficult. It is that the shape is: three processes sharing one codebase, a broker, a database, and settings that agree — and when any part of it is wrong, the failure is quiet. Tasks disappear when a worker restarts, because Celery acknowledges a message on receipt by default. The scheduler runs everything twice because somebody scaled it to two replicas. Nothing writes down what happened, so "did last night's export run?" has no answer anywhere.

This template is that shape, assembled and checked.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | [ak40u/celery-railway-starter](https://github.com/ak40u/celery-railway-starter) | Worker |
| Scheduler | [ak40u/celery-railway-starter](https://github.com/ak40u/celery-railway-starter) | Worker |
| API | [ak40u/celery-railway-starter](https://github.com/ak40u/celery-railway-starter) | Web service |
| Redis | `redis:8.6.5-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | API | 8080 |
| `API_TOKEN` | API | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Redis | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `celery -A app.tasks.celery worker --loglevel=info --concurrency=2`
- **Start command:** `celery -A app.tasks.celery beat --loglevel=info`
- **Start command:** `uvicorn app.web:app --host 0.0.0.0 --port 8080`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/celery-or-web-worker-and-scheduler-as-th)
