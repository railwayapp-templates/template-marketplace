# Deploy pgbr on Railway

Postgres backup & restore

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgbr)

## About

pgbr (PostgreSQL Backup & Restore) is a self-hosted tool designed for developers to easily manage reliable database backups. It provides a clean, secure web interface to create, restore, schedule, and migrate PostgreSQL databases using native `pg_dump` and `pg_restore` operations, all without needing to write complex command-line scripts.

Hosting pgbr on Railway involves deploying its lightweight Docker container. Once deployed, pgbr securely stores encrypted database connections and allows you to configure automated, cron-based backup schedules. By hosting it in the cloud alongside your actual PostgreSQL databases, you drastically reduce latency during data transfers, making scheduled backups, data restoration, and one-click migrations significantly faster and more dependable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgbr | `darseen/pgbr:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port |
| `BASE_URL` | - | The base URL of your pgbr service. |
| `PGBR_DATA` | /var/lib/pgbr/data | PGBR data path |
| `AUTH_SECRET` | (secret) | Used to sign user sessions |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/pgbr/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/pgbr)
