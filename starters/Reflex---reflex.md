# Deploy Reflex on Railway

Full-stack Python web app with Reflex, Postgres and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reflex)

## About

[Reflex](https://reflex.dev) is an open-source framework for building full-stack web apps in pure Python. You write the UI and the backend logic in Python, and Reflex compiles the frontend to a fast React app. This template deploys a production-ready Reflex app with Postgres and Redis on Railway.

A Reflex app has two parts: a static frontend (HTML, CSS, and JavaScript) and a Python backend that keeps a WebSocket open to every browser session. This template builds the frontend once, when the image is built, so deploys, restarts and new replicas start in seconds without compiling anything. At runtime the **Reflex** service serves everything on one port: Caddy serves the prebuilt frontend and forwards backend routes to the Reflex backend in the same container. **Postgres** stores application data and **Redis** stores session state, each as its own Railway service, so you can add Reflex replicas. Database migrations run once per deploy, before the new version takes traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| reflex-railway | [reflex-dev/reflex-railway](https://github.com/reflex-dev/reflex-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | reflex-railway | 8080 |
| `GRANIAN_WORKERS` | reflex-railway | 2 |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile, TypeScript, Mako, Shell

[View on Railway →](https://railway.com/deploy/reflex)
