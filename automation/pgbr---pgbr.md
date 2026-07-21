# Deploy pgbr on Railway

Postgres backup & restore

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgbr)

## About

pgbr (PostgreSQL Backup & Restore) is a self-hosted tool designed for developers to easily manage reliable database backups. It provides a clean, secure web interface to create, restore, schedule, and migrate PostgreSQL databases using native `pg_dump` and `pg_restore` operations, all without needing to write complex command-line scripts.

Hosting pgbr on Railway involves deploying its lightweight Docker container. Once deployed, pgbr securely stores encrypted database connections and allows you to configure automated, cron-based backup schedules. By hosting it in the cloud alongside your actual PostgreSQL databases, you drastically reduce latency during data transfers, making scheduled backups, data restoration, and one-click migrations significantly faster and more dependable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `ghcr.io/darseen/pgbr-worker:latest` | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| dashboard | `ghcr.io/darseen/pgbr-dashboard:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | worker | - | Redis URL |
| `DATABASE_URL` | worker | - | Database URL |
| `ENCRYPTION_KEY` | worker | - | Encrytion key |
| `STORAGE_BUCKET` | worker | - | Storage bucket |
| `STORAGE_REGION` | worker | - | Storage region |
| `STORAGE_ENDPOINT` | worker | - | Storage endpoint |
| `STORAGE_ACCESS_KEY_ID` | worker | - | Storage access key |
| `STORAGE_FORCE_PATH_STYLE` | worker | true | Storage force path style |
| `STORAGE_SECRET_ACCESS_KEY` | worker | (secret) | Storage secret access key |
| `REDISHOST` | Redis | - | Redis host |
| `REDISPORT` | Redis | 6379 | Redis port |
| `REDISUSER` | Redis | default | Redis user |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | dashboard | 3000 | Application port |
| `BASE_URL` | dashboard | - | The base URL of your pgbr service. |
| `REDIS_URL` | dashboard | - | Redis URL |
| `AUTH_SECRET` | dashboard | (secret) | Used to sign user sessions |
| `DATABASE_URL` | dashboard | - | Database URL |
| `ENCRYPTION_KEY` | dashboard | - | Encrytion key |
| `STORAGE_BUCKET` | dashboard | - | Storage bucket |
| `STORAGE_REGION` | dashboard | - | Storage region |
| `STORAGE_ENDPOINT` | dashboard | - | Storage endpoint |
| `STORAGE_ACCESS_KEY_ID` | dashboard | - | Storage access key |
| `STORAGE_FORCE_PATH_STYLE` | dashboard | true | Storage force path style |
| `STORAGE_SECRET_ACCESS_KEY` | dashboard | (secret) | Storage secret access key |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/pgbr)
