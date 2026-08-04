# Deploy Velix API on Railway

Self-hosted multi-instance WhatsApp REST API for messaging & automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/velix-api)

## About

Velix API is an open-source, self-hosted WhatsApp REST API solution that enables multi-instance WhatsApp management ([Dokploy Docs](https://docs.dokploy.com/docs/templates/velix-api)).

Hosting and deploying Velix API involves running a lightweight Docker container image ([GitHub Container Registry](https://www.google.com/search?q=https://github.com/paulolinder/velix-api)) connected to a PostgreSQL database for multi-instance metadata and a Redis instance for session caching, queues, and rate-limiting. A persistent storage volume mounted to `/data` is essential to preserve local WhatsApp session state files (`/data/instances`) and uploaded media (`/data/media`) across container restarts. Deploying Velix API requires setting key environment variables including `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, and exposing HTTP port `8080`. With modern PaaS platforms like Railway ([Railway](https://railway.com)), developers can provision the app container, database, and Redis in a single unified project canvas without manually configuring VPS networks, SSL certificates, or server firewalls.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| velix-api | `ghcr.io/paulolinder/velix-api:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | velix-api | 8080 | - |
| `APP_ENV` | velix-api | production | - |
| `HTTP_PORT` | velix-api | 8080 | - |
| `LOG_LEVEL` | velix-api | info | - |
| `JWT_SECRET` | velix-api | (secret) | - |
| `ENGINE_STORE_PATH` | velix-api | /data/instances | - |
| `MEDIA_STORAGE_PATH` | velix-api | /data/media | - |
| `ENGINE_MAX_INSTANCES` | velix-api | 200 | - |
| `REGISTRATION_ENABLED` | velix-api | false | - |
| `ENGINE_AUTO_RECONNECT` | velix-api | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/velix-api)
