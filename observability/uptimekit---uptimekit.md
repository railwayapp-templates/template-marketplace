# Deploy uptimekit on Railway

An open-source, modern, and powerful status page and monitoring solution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/uptimekit)

## About

Important: read the “Important Notes” section below before deploying/using this template.

UptimeKit is an open-source uptime monitoring platform for tracking service availability, incidents, and performance over time. It includes a dashboard to manage monitors, a scheduler for background checks, a public status page for incident communication, and analytics storage backed by Postgres, Redis, and ClickHouse.

Hosting uptimekit involves running multiple services that work together: the Dashboard (UI and core API), the Scheduler (background jobs and monitoring orchestration), the Status Page (public-facing pages), and a Worker (executes monitoring work). Data services include Postgres for primary application data, Redis for queues/caching, and ClickHouse for high-volume event and time-series analytics. On Railway, each service is deployed independently and connected via private networking, making it easy to scale services as your monitoring needs grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Scheduler | `uptimekit/scheduler:latest` | Worker |
| ClickHouse | `clickhouse/clickhouse-server:25.8` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Status Page | `uptimekit/status-page:latest` | Web service |
| Dashboard | `uptimekit/dash:latest` | Web service |
| Worker | `uptimekit/worker:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `CLICKHOUSE_USER` | Scheduler | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Scheduler | (secret) | - |
| `PORT` | ClickHouse | 8123 | - |
| `PUBLIC_PORT` | ClickHouse | 443 | - |
| `CLICKHOUSE_DB` | ClickHouse | uptimekit | - |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | - |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `CLICKHOUSE_USER` | Status Page | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Status Page | (secret) | - |
| `PORT` | Dashboard | 3000 | - |
| `CLICKHOUSE_USER` | Dashboard | (secret) | - |
| `BETTER_AUTH_SECRET` | Dashboard | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Dashboard | (secret) | - |
| `WORKER_API_KEY` | Worker | (secret) | Create a Worker API Key through the Dashboard Admin Panel! |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/template/uptimekit)
