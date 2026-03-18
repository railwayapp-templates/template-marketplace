# Deploy pgcron-railway on Railway

Open-source cron-based job scheduler for PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgcron-railway)

## About

pg_cron is a simple cron-based job scheduler for PostgreSQL (10 or higher) that runs inside the database as an extension. It uses the same syntax as regular cron, but it allows you to schedule PostgreSQL commands directly from the database. You can also use '[1-59] seconds' to schedule a job based on an interval. It is fully compatible with Railway Postgres Data.

Hosting pgcron-railway involves enabling the pg_cron extension in your Railway PostgreSQL database, configuring the postgresql.conf settings (like shared_preload_libraries), and using SQL commands to define and manage scheduled tasks. Since Railway supports the pg_cron extension natively, no manual server setup is required. You can manage jobs using standard SQL within your existing application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgcron-railway | `niarde/postgres-extensions:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgcron-railway)
