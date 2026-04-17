# Deploy Baserow (Distributed Arch.) | Open Source Airtable Alternative on Railway on Railway

Self Host Baserow. No-code database with automations, API, & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baserow-airtable-alternative)

## About

Deploy Baserow on Railway with a production-grade architecture — separate backend, frontend, and worker services that scale independently. 

Baserow is an open-source no-code database platform and Airtable alternative that lets teams build databases, automations, apps, and AI agents without writing code. Trusted by 150,000+ users, it's MIT-licensed and GDPR/HIPAA/SOC 2 compliant.

Self-host Baserow on Railway with this template to get independent scaling, cleaner healthchecks, and the latest v2.2.0 features. 

![Baserow Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776345385/baserow-railway-arch_wc8fbx.png)

Baserow is a privacy-first, open-source no-code platform built on Django (backend) and Nuxt.js (frontend), backed by PostgreSQL and Redis. It provides the power of a relational database with the simplicity of a spreadsheet.

Key features:

- **Multiple views** — Grid, Kanban, Calendar, Gallery, Form, and Survey on the same data
- **Linked records** — foreign-key relationships, lookups, and rollups across tables
- **Built-in automations** — trigger actions on row create/update/delete (email, webhook, row update)
- **Application builder** — build custom dashboards and interfaces on your data, no code required
- **Real-time collaboration** — live cursor tracking, instant cell updates across all users
- **Full REST API** — token-based CRUD for every table, with webhook support
- **AI fields** — generate cell values using OpenAI, Anthropic, or Mistral (bring your own API key)

This architecture separates concerns: the Backend handles API requests and WebSocket connections, the Frontend serves the Nuxt SSR UI, and Celery workers process background jobs (exports, automations, webhooks) asynchronously.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Baserow Backend | `baserow/backend:2.2.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| Celery Beat | `baserow/backend:2.2.0` | Worker |
| Baserow Frontend | `baserow/web-frontend:2.2.0` | Web service |
| Celery Worker | `baserow/backend:2.2.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDIS_URL` | Baserow Backend | - | Redis connection string |
| `SECRET_KEY` | Baserow Backend | (secret) | Django signing key for sessions |
| `DATABASE_URL` | Baserow Backend | - | PostgreSQL connection string |
| `PUBLIC_BACKEND_URL` | Baserow Backend | - | Public API URL for browser requests |
| `BASEROW_BACKEND_DEBUG` | Baserow Backend | false | Disable Django debug mode |
| `PUBLIC_WEB_FRONTEND_URL` | Baserow Backend | - | Public frontend URL |
| `BASEROW_BACKEND_LOG_LEVEL` | Baserow Backend | WARNING | Reduce backend log verbosity |
| `BASEROW_EXTRA_ALLOWED_HOSTS` | Baserow Backend | - | Django ALLOWED_HOSTS |
| `BASEROW_AMOUNT_OF_GUNICORN_WORKERS` | Baserow Backend | 2 | REST API worker count |
| `BASEROW_TRIGGER_SYNC_TEMPLATES_AFTER_MIGRATION` | Baserow Backend | false | Skip template sync on boot |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `REDIS_URL` | Celery Beat | - | Redis connection string |
| `SECRET_KEY` | Celery Beat | (secret) | Must match backend SECRET_KEY |
| `DATABASE_URL` | Celery Beat | - | PostgreSQL connection string |
| `BASEROW_BACKEND_LOG_LEVEL` | Celery Beat | WARNING | Reduce beat log verbosity |
| `PUBLIC_BACKEND_URL` | Baserow Frontend | - | Backend API URL for browser |
| `PRIVATE_BACKEND_URL` | Baserow Frontend | - | Internal backend for SSR |
| `PUBLIC_WEB_FRONTEND_URL` | Baserow Frontend | - | Own public URL |
| `BASEROW_DISABLE_PUBLIC_URL_CHECK` | Baserow Frontend | true | Skip URL validation on startup |
| `REDIS_URL` | Celery Worker | - | Redis connection string |
| `SECRET_KEY` | Celery Worker | (secret) | Must match backend SECRET_KEY |
| `DATABASE_URL` | Celery Worker | - | PostgreSQL connection string |
| `BASEROW_BACKEND_LOG_LEVEL` | Celery Worker | WARNING | Reduce worker log verbosity |
| `BASEROW_TRIGGER_SYNC_TEMPLATES_AFTER_MIGRATION` | Celery Worker | false | Skip template sync |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/baserow/media`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/baserow/backend/docker/docker-entrypoint.sh celery-beat`
- **Start command:** `/baserow/backend/docker/docker-entrypoint.sh celery-worker`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/baserow-airtable-alternative)
