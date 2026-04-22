# Deploy Dev Monitoring Suite on Railway

Uptime monitoring with alerts, incidents & live dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dev-monitoring-suite)

## About

Dev Monitoring Suite is a full-stack uptime monitoring platform built with Node.js, PostgreSQL, and Redis. It provides real-time website monitoring, incident tracking, alert notifications (email & Slack), and a live dashboard — everything you need to keep your services healthy.

Hosting Dev Monitoring Suite on Railway involves deploying three services: the Node.js application server, a PostgreSQL database for storing monitors and incidents, and a Redis instance for caching and session management. Railway automatically provisions and connects all three services. The app runs scheduled cron jobs every minute to ping your configured URLs, logs response times, triggers alerts on failures, and displays live status on a built-in dashboard. Setup takes under five minutes — just deploy and start adding your URLs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| dev-monitoring-suite | [Jeah84/dev-monitoring-suite](https://github.com/Jeah84/dev-monitoring-suite) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the default PostgreSQL database |
| `DATABASE_URL` | Postgres | - | PostgreSQL connection URL (private network) |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL database username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL database password (auto-generated) |
| `DATABASE_PUBLIC_URL` | Postgres | - | PostgreSQL connection URL (public network) |
| `REDISPORT` | Redis | 6379 | Redis port number |
| `REDISUSER` | Redis | default | Redis username |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/dev-monitoring-suite)
