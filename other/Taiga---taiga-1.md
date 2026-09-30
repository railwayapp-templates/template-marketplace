# Deploy Taiga on Railway

Deploy Taiga, open source Scrum/Kanban project management, on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/taiga-1)

## About

Taiga is a free, open-source project management platform built for agile teams.
It supports Scrum, Kanban and mixed workflows with backlogs, sprints, user
stories, tasks, issues, wikis and real-time collaboration. It is developed by
Kaleidos and released under MPL-2.0 (backend/events) and AGPL-3.0 (frontend).

Hosting Taiga means running four cooperating pieces: the web frontend (SPA),
the Django backend API (gunicorn), the real-time events/WebSocket server and
the Celery async worker, all backed by PostgreSQL and RabbitMQ. The official
images ship separately, so a typical deployment requires wiring them together
with private networking, shared volumes and coordinated configuration.

This template packages everything into a single all-in-one container
(nginx + gunicorn + celery + taiga-events, orchestrated by supervisord). A
complete Taiga instance runs with just three services: `app`, `postgres` and
`rabbitmq`. It fits the Railway free tier, auto-creates the first admin user,
and derives the public site URL automatically from your domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Taiga | [BURNI80/taiga-railway-template](https://github.com/BURNI80/taiga-railway-template) (root: docker/app) | Web service |
| Rabbitmq | `rabbitmq:3.8.34-alpine` | Database |
| Postgres | `postgres:12.3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ADMIN_USER` | Taiga | (secret) | ADMIN_USER |
| `ADMIN_EMAIL` | Taiga | admin@example.com | ADMIN_EMAIL |
| `POSTGRES_DB` | Taiga | - | POSTGRES_DB |
| `POSTGRES_HOST` | Taiga | postgres.railway.internal | POSTGRES_HOST |
| `POSTGRES_PORT` | Taiga | 5432 | POSTGRES_PORT |
| `POSTGRES_USER` | Taiga | (secret) | POSTGRES_USER |
| `RABBITMQ_PASS` | Taiga | - | RABBITMQ_PASS |
| `RABBITMQ_USER` | Taiga | (secret) | RABBITMQ_USER |
| `GUNICORN_WORKERS` | Taiga | 1 | GUNICORN_WORKERS |
| `TAIGA_SECRET_KEY` | Taiga | (secret) | TAIGA_SECRET_KEY |
| `POSTGRES_PASSWORD` | Taiga | (secret) | POSTGRES_PASSWORD |
| `CELERY_CONCURRENCY` | Taiga | 1 | CELERY_CONCURRENCY |
| `ADMIN_INITIAL_PASSWORD` | Taiga | (secret) | ADMIN_INITIAL_PASSWORD |
| `DJANGO_SETTINGS_MODULE` | Taiga | settings.settings_railway | DJANGO_SETTINGS_MODULE |
| `ADMIN_BOOTSTRAP_ENABLED` | Taiga | true | ADMIN_BOOTSTRAP_ENABLED |
| `TAIGA_ASYNC_RABBITMQ_HOST` | Taiga | rabbitmq.railway.internal | TAIGA_ASYNC_RABBITMQ_HOST |
| `TAIGA_EVENTS_RABBITMQ_HOST` | Taiga | rabbitmq.railway.internal | TAIGA_EVENTS_RABBITMQ_HOST |
| `RABBITMQ_DEFAULT_PASS` | Rabbitmq | - | RABBITMQ_DEFAULT_PASS |
| `RABBITMQ_DEFAULT_USER` | Rabbitmq | (secret) | RABBITMQ_DEFAULT_USER |
| `RABBITMQ_DEFAULT_VHOST` | Rabbitmq | taiga | RABBITMQ_DEFAULT_VHOST |
| `POSTGRES_DB` | Postgres | taiga | POSTGRES_DB |
| `POSTGRES_USER` | Postgres | (secret) | POSTGRES_USER |
| `POSTGRES_PASSWORD` | Postgres | (secret) | POSTGRES_PASSWORD |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/taiga-back/media`
- **Volume:** `/var/lib/rabbitmq`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/taiga-1)
