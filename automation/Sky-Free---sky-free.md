# Deploy Sky Free on Railway

Multi-channel messaging SaaS built on the WhatsApp Cloud API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sky-free)

## About

Sky Free is a multi-channel customer engagement platform for WhatsApp, Instagram, and web chat — unifying conversations, contacts, campaigns, and AI-powered automation into one team inbox. It supports white-label, multi-tenant deployments, so agencies can resell it under their own brand while managing multiple client workspaces from a single instance.

Sky Free runs as a Node.js/Express + React application backed by PostgreSQL and Redis, deployed from one Docker image with three interchangeable roles — web server, background worker (queues, cron jobs, automation execution), and a Caddy-based reverse proxy — selected via an `APP_MODE` environment variable. Production deployments benefit from PgBouncer in front of Postgres for connection pooling under bursty WhatsApp webhook traffic, and Redis for sessions, queues, and multi-instance Socket.IO sync. Mobile app builds (Android/iOS via Capacitor) require Java, Gradle, and Android SDK tooling baked into the image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.6.3` | Database |
| Scheduler | `skyfreeindia/skyfree` | Web service |
| Application | `skyfreeindia/skyfree` | Web service |
| Autoscaler | `skyfreeindia/skyfree` | Web service |
| Sender | `skyfreeindia/skyfree` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Auto filled |
| `REDISPORT` | Redis | 6379 | Auto filled |
| `REDISUSER` | Redis | default | Auto filled |
| `REDIS_URL` | Redis | - | Auto filled |
| `REDISPASSWORD` | Redis | (secret) | Auto filled |
| `REDIS_PASSWORD` | Redis | (secret) | Auto filled |
| `REDIS_PUBLIC_URL` | Redis | - | Auto filled |
| `PORT` | Scheduler | 8080 | Auto filled |
| `APP_URL` | Scheduler | - | Auto filled |
| `APP_MODE` | Scheduler | worker | Auto filled |
| `NODE_ENV` | Scheduler | production | Auto filled |
| `LOG_LEVEL` | Scheduler | info | Auto filled |
| `REDIS_URL` | Scheduler | - | Auto filled |
| `LICENSE_KEY` | Scheduler | - | Auto filled |
| `WORKER_ROLE` | Scheduler | scheduler | Auto filled |
| `DATABASE_URL` | Scheduler | - | Auto filled |
| `PORT` | Application | 8080 | Auto filled |
| `APP_URL` | Application | - | Auto filled |
| `APP_MODE` | Application | web | Auto filled |
| `NODE_ENV` | Application | production | Auto filled |
| `LOG_LEVEL` | Application | info | Auto filled |
| `REDIS_URL` | Application | - | Auto filled |
| `LICENSE_KEY` | Application | - | Auto filled |
| `DATABASE_URL` | Application | - | Auto filled |
| `SESSION_SECRET` | Application | (secret) | Auto filled |
| `PORT` | Autoscaler | 8080 | Auto filled |
| `APP_URL` | Autoscaler | - | Auto filled |
| `APP_MODE` | Autoscaler | worker | Auto filled |
| `NODE_ENV` | Autoscaler | production | Auto filled |
| `LOG_LEVEL` | Autoscaler | info | Auto filled |
| `REDIS_URL` | Autoscaler | - | Auto filled |
| `LICENSE_KEY` | Autoscaler | - | Auto filled |
| `WORKER_ROLE` | Autoscaler | autoscaler | Auto filled |
| `DATABASE_URL` | Autoscaler | - | Auto filled |
| `PORT` | Sender | 8080 | Auto filled |
| `APP_URL` | Sender | - | Auto filled |
| `APP_MODE` | Sender | worker | Auto filled |
| `NODE_ENV` | Sender | "production | Auto filled |
| `LOG_LEVEL` | Sender | info | Auto filled |
| `REDIS_URL` | Sender | - | Auto filled |
| `LICENSE_KEY` | Sender | - | Auto filled |
| `WORKER_ROLE` | Sender | sender | Auto filled |
| `DATABASE_URL` | Sender | - | Auto filled |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health/live`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/sky-free)
