# Deploy Baserow | No-Code Database on Railway on Railway

Self-host Baserow. The open-source Airtable alternative on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baserow-no-code-database)

## About

Deploy Baserow on Railway to get a fully self-hosted no-code database platform in minutes. Baserow is an open-source Airtable alternative that lets teams build databases, automations, apps, and AI agents without writing code. Self-host Baserow on Railway to keep full control of your data while getting the simplicity of a managed spreadsheet-database hybrid.

This Railway template deploys Baserow with PostgreSQL for persistent storage and Redis for caching and real-time features, all pre-configured and ready to use.

Baserow is a privacy-first, open-source no-code platform trusted by over 150,000 users. It provides the power of a relational database with the simplicity of a spreadsheet. Key features include:

- **Multiple views** — Grid, Kanban, Calendar, Gallery, Form, and Survey views on the same data
- **Linked records** — Relate tables together with foreign-key lookups and rollups
- **Built-in automations** — Trigger actions on row create/update/delete (send email, call webhook, update row)
- **Application builder** — Build custom interfaces and dashboards on top of your data
- **Real-time collaboration** — Multiple users can edit simultaneously with live updates
- **REST API** — Full CRUD API for every table with token-based authentication
- **GDPR, HIPAA, SOC 2 compliant** — Enterprise-grade data governance when self-hosted

The template runs Baserow's all-in-one Docker image with an external PostgreSQL database and Redis cache for production reliability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Baserow | `baserow/baserow:2.0.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `REDIS_URL` | Baserow | - | Redis connection string |
| `SECRET_KEY` | Baserow | (secret) | Django signing key for sessions |
| `DATABASE_URL` | Baserow | - | PostgreSQL connection string |
| `BASEROW_PUBLIC_URL` | Baserow | - | Public-facing URL with protocol |
| `BASEROW_BACKEND_DEBUG` | Baserow | false | Disable Django debug mode |
| `BASEROW_AMOUNT_OF_WORKERS` | Baserow | 1 | Celery background worker count |
| `BASEROW_BACKEND_LOG_LEVEL` | Baserow | WARNING | Reduce backend log verbosity |
| `BASEROW_AMOUNT_OF_GUNICORN_WORKERS` | Baserow | 2 | REST API worker count |
| `BASEROW_TRIGGER_SYNC_TEMPLATES_AFTER_MIGRATION` | Baserow | false | Skip template sync on boot |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/baserow/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/baserow-no-code-database)
