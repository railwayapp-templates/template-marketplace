# Deploy Next.js + FastAPI Full-Stack Starter on Railway

Monorepo starter with worker, Redis & Postgres. Works instantly.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-fastapi-full-stack-starter)

## About

Deploy a production-style full-stack monorepo starter with **Next.js**, **FastAPI**, **PostgreSQL**, **Redis**, and a **background worker**. Includes a real end-to-end async flow out of the box: create a record in the UI and watch it move from `pending` → `processing` → `completed` automatically.

This template is a production-inspired starter scaffold designed to help you launch real applications faster.

It includes:

* **web** → Next.js frontend
* **api** → FastAPI backend
* **worker** → background processing service
* **postgres** → persistent relational database
* **redis** → cache and async queue

The application deploys empty by default, but the full flow works immediately.

Create a record from the UI and the worker will process it automatically in the background.

This demonstrates a real-world architecture from day one without requiring you to rebuild the foundation later.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | [acewebs/fastapi-nextjs-fullstack-starter](https://github.com/acewebs/fastapi-nextjs-fullstack-starter) (root: api/) | Worker |
| redis | `redis:8.2.1` | Database |
| worker | [acewebs/fastapi-nextjs-fullstack-starter](https://github.com/acewebs/fastapi-nextjs-fullstack-starter) (root: worker) | Worker |
| web | [acewebs/fastapi-nextjs-fullstack-starter](https://github.com/acewebs/fastapi-nextjs-fullstack-starter) (root: web) | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | api | 0.0.0.0 | - |
| `PORT` | api | 8000 | - |
| `APP_ENV` | api | production | - |
| `APP_NAME` | api | starter-api | - |
| `LOG_LEVEL` | api | info | - |
| `SECRET_KEY` | api | (secret) | - |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDIS_URL` | redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `REDIS_PUBLIC_URL` | redis | - | Connection string for connecting to redis externally |
| `APP_ENV` | worker | production | - |
| `LOG_LEVEL` | worker | info | - |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, Python, Shell, CSS, Dockerfile, Mako, JavaScript

[View on Railway →](https://railway.com/deploy/nextjs-fastapi-full-stack-starter)
