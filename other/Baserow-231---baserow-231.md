# Deploy Baserow 2.3.1 on Railway

Deploys Baserow version 2.3.1

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baserow-231)

## About

Installs Baserow version 2.3.1 on Railway.  Baserow is an online database and application builder. Alternative to AitTable.

Services installed: Docker, Postgres, Redis

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Baserow | `baserow/baserow:2.3.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDIS_MAXMEMORY` | Redis | 256mb |
| `REDIS_MAXMEMORY_POLICY` | Redis | allkeys-lru |
| `SECRET_KEY` | Baserow | (secret) |
| `BASEROW_BACKEND_DEBUG` | Baserow | false |
| `BASEROW_AMOUNT_OF_WORKERS` | Baserow | 1 |
| `BASEROW_BACKEND_LOG_LEVEL` | Baserow | WARNING |
| `BASEROW_AMOUNT_OF_GUNICORN_WORKERS` | Baserow | 2 |
| `BASEROW_TRIGGER_SYNC_TEMPLATES_AFTER_MIGRATION` | Baserow | false |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/baserow/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/baserow-231)
