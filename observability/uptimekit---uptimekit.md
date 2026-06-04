# Deploy uptimekit on Railway

An open-source, modern, and powerful status page and monitoring solution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptimekit)

## About

Important: read the “Important Notes” section below before deploying/using this template.

UptimeKit is an open-source uptime monitoring platform for tracking service availability, incidents, and performance over time. It includes a dashboard to manage monitors, a scheduler for background checks, a public status page for incident communication, and analytics storage backed by Postgres, Redis, and ClickHouse.

Hosting uptimekit involves running multiple services that work together: the Dashboard (UI and core API), the Scheduler (background jobs and monitoring orchestration), the Status Page (public-facing pages), and a Worker (executes monitoring work). Data services include Postgres for primary application data, Redis for queues/caching, and ClickHouse for high-volume event and time-series analytics. On Railway, each service is deployed independently and connected via private networking, making it easy to scale services as your monitoring needs grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Timescale | `timescale/timescaledb:2.27.1-pg18` | Database |
| Status Page | `ghcr.io/uptimekit/status-page:latest` | Web service |
| Dashboard | `ghcr.io/uptimekit/dash:latest` | Web service |
| Worker | `ghcr.io/uptimekit/worker:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Timescale | railway | Name of the default database |
| `DATABASE_URL` | Timescale | - | The DB url of the database over the private network |
| `POSTGRES_USER` | Timescale | (secret) | Username of the default account |
| `POSTGRES_PASSWORD` | Timescale | (secret) | The database password |
| `DATABASE_PUBLIC_URL` | Timescale | - | The full public URL of the database |
| `TIMESERIES_BACKEND` | Status Page | timescale | - |
| `STATUS_PAGE_PUBLIC_DOMAIN` | Status Page | - | The public service or customer domain, of the form `example.up.railway.app` |
| `PORT` | Dashboard | 3000 | - |
| `BETTER_AUTH_SECRET` | Dashboard | (secret) | - |
| `TIMESERIES_BACKEND` | Dashboard | timescale | - |
| `NEXT_PUBLIC_SELFHOSTED` | Dashboard | true | - |
| `WORKER_API_KEY` | Worker | (secret) | Create a Worker API Key through the Dashboard Admin Panel! |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "unset PGPORT; unset PGHOST; docker-entrypoint.sh postgres -p 5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptimekit)
