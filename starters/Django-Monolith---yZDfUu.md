# Deploy Django Monolith on Railway

A Django app connected to a Postgres database with Celery and Celery Beat.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/yZDfUu)

## About

## Overview

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.

This Django starter template deploys a Django app as a majestic monolith that is connected to a PostgreSQL database and Redis Cache on Railway.

It spins up 5 services (with the same codebase) in one project. They are:

**app service:** This runs the app.

**worker service:** This runs the Celery workers.

**cron service:** This runs Celery Beat and takes care of all cron tasks.

**Postgres:** This is the PostgreSQL database that the app is connected to.

**Redis:** This is the queue and cache store/database that the app is connected to.

## Highlights
- Ridiculously fast
- Reassuringly secure
- Exceedingly scalable
- Fully loaded
- Incredibly versatile

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |
| App Service | [unicodeveloper/deploy-django-on-railway](https://github.com/unicodeveloper/deploy-django-on-railway) | Web service |
| Worker Service | [unicodeveloper/deploy-django-on-railway](https://github.com/unicodeveloper/deploy-django-on-railway) | Worker |
| Cron Service | [unicodeveloper/deploy-django-on-railway](https://github.com/unicodeveloper/deploy-django-on-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `celery -A liftoff worker -l info`
- **Start command:** `celery -A liftoff beat -l info`

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/template/yZDfUu)
