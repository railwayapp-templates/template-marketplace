# Deploy Libredesk on Railway

Modern, open source, self-hosted customer support desk. Single binary app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libredesk)

## About

Libredesk is a modern, open source, self-hosted customer support desk. Shared inboxes, automation, SLA management, CSAT surveys, and AI-assisted responses - all in a single binary.

This template deploys Libredesk with PostgreSQL and Redis pre-configured. On first deploy, the database schema is installed and an admin user is created with the password you provide.      
Upgrades are automatic - just redeploy with the latest image and migrations run on startup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17-alpine` | Database |
| libredesk | `libredesk/libredesk:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | libredesk | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | libredesk | 9000 | - |
| `LIBREDESK_APP__ENV` | libredesk | prod | - |
| `LIBREDESK_DB__PORT` | libredesk | 5432 | - |
| `LIBREDESK_DB__USER` | libredesk | (secret) | - |
| `LIBREDESK_DB__PASSWORD` | libredesk | (secret) | - |
| `LIBREDESK_DB__SSL_MODE` | libredesk | disable | - |
| `LIBREDESK_APP__SERVER__ADDRESS` | libredesk | 0.0.0.0:9000 | - |
| `LIBREDESK_SYSTEM_USER_PASSWORD` | libredesk | (secret) | Min 10 chars. Must include uppercase, lowercase, number, and special character. e.g. MyPassword@123; Login with email 'System' and this password after deploy. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/var/lib/postgresql/data/pgdata `
- **Start command:** `/bin/sh -c "(./libredesk --install --idempotent-install --yes || true) && (./libredesk --upgrade --yes || true) && exec ./libredesk"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/libredesk/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/libredesk)
