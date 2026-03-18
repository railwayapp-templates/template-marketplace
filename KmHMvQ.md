# Deploy Litestar Fullstack on Railway

A fullstack web app for the Litestar Framework

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/KmHMvQ)

## About

# Litestar Fullstack

Built by [@cofin](https://github.com/cofin/)

* https://github.com/cofin/litestar-fullstack

This template deploys a fullstack, ready to use web app built on the Litestar framework, SAQ background workers, PostgreSQL database, Redis worker queue, Vite, Vue, and more!

This is a reference application that you can use to get your next Litestar application running quickly.

It contains most of the boilerplate required for a production web API.

Features:

- Latest Litestar configured with best practices
- Integration with SQLAlchemy 2.0, SAQ (Simple Asynchronous Queue), and litestar-saqlalchemy
- Extends built-in litestar click CLI
- Frontend integrated with vitejs and includes Jinja2 templates that integrate with Vite websocket/HMR support
- Multi-stage docker build using a Google Distroless (distroless/cc) Python 3.11 runtime image.
- pre-configured user model that includes teams and associated team roles
- examples of using guards for superuser and team based auth.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| litestar-fullstack | [litestar-org/litestar-fullstack](https://github.com/litestar-org/litestar-fullstack) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `DB_URL` | litestar-fullstack | - | URL for your database |
| `REDIS_URL` | litestar-fullstack | - | URL to Redis instance |
| `DB_POOL_SIZE` | litestar-fullstack | 5 | Database Connection Pool Size |
| `LITESTAR_APP` | litestar-fullstack | app.asgi:create_app | App Location |
| `OPENAPI_TITLE` | litestar-fullstack | Litestar Fullstack Reference App | App Name for the OpenAPI documentation |
| `APP_SECRET_KEY` | litestar-fullstack | (secret) | Secret key for your application |
| `APP_ENVIRONMENT` | litestar-fullstack | dev | - |
| `DB_POOL_TIMEOUT` | litestar-fullstack | 30 | Timeout for DB Pool |
| `WORKER_CONCURRENCY` | litestar-fullstack | 1 | Concurrent Workers |
| `WORKER_WEB_ENABLED` | litestar-fullstack | True | Enable the SAQ worker web UI |
| `DB_POOL_MAX_OVERFLOW` | litestar-fullstack | 10 | - |
| `OPENAPI_CONTACT_NAME` | litestar-fullstack | Litestar Organization | Contact Name for the OpenAPI documentation |
| `OPENAPI_CONTACT_EMAIL` | litestar-fullstack | fullstack@litestar.dev | Email for the OpenAPI documentation |
| `WORKER_BACKGROUND_WORKERS` | litestar-fullstack | 1 | Number of SAQ workers  |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `app run-all -H 0.0.0.0 -p $PORT`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, TypeScript, Dockerfile, Makefile, JavaScript, Mako, CSS, Jinja, Shell

[View on Railway →](https://railway.com/template/KmHMvQ)
