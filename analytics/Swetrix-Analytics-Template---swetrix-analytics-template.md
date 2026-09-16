# Deploy Swetrix Analytics Template on Railway

Privacy-first analytics with funnels, sessions, and events on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swetrix-analytics-template)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new)

Privacy-first web analytics with funnels, sessions, custom events, and performance tracking — full Swetrix CE on Railway.

**Live demo:** [gateway-production-0764.up.railway.app/login](https://gateway-production-0764.up.railway.app/login)

This template deploys the official Swetrix v5.4.1 images with Railway Redis, ClickHouse, and an nginx gateway. Only the gateway is public; API, frontend, Redis, and ClickHouse use private DNS.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Swetrix-API | `swetrix/swetrix-api:v5.4.1` | Worker |
| Redis | `redis:8.2` | Database |
| ClickHouse | `clickhouse/clickhouse-server:25.8-alpine` | Database |
| Swetrix-FE | `swetrix/swetrix-fe:v5.4.1` | Worker |
| Gateway | [romeoxt/railway-template-swetrix-analytics](https://github.com/romeoxt/railway-template-swetrix-analytics) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BASE_URL` | Swetrix-API | - | Public URL of the Swetrix dashboard (Gateway domain). |
| `SMTP_MOCK` | Swetrix-API | true | Skip real email sending during MVP setup (true). |
| `REDIS_HOST` | Swetrix-API | redis | Redis hostname. Use short service name redis for private networking. |
| `REDIS_PORT` | Swetrix-API | 6379 | Redis port (6379). |
| `REDIS_PASSWORD` | Swetrix-API | (secret) | Redis password from the Redis service. |
| `CLICKHOUSE_HOST` | Swetrix-API | - | ClickHouse HTTP endpoint on private networking. |
| `CLICKHOUSE_PORT` | Swetrix-API | 8123 | ClickHouse HTTP port (8123). |
| `CLICKHOUSE_USER` | Swetrix-API | (secret) | ClickHouse username. |
| `SECRET_KEY_BASE` | Swetrix-API | (secret) | Secret key for session signing and encryption. Auto-generated at deploy. |
| `CLIENT_IP_HEADER` | Swetrix-API | x-forwarded-for | Header Gateway sends for real client IP (x-forwarded-for). |
| `CLICKHOUSE_DATABASE` | Swetrix-API | analytics | ClickHouse database name for analytics events. |
| `CLICKHOUSE_PASSWORD` | Swetrix-API | (secret) | ClickHouse password (must match ClickHouse service). |
| `DISABLE_REGISTRATION` | Swetrix-API | true | Lock registration after the first user account is created. |
| `REDISHOST` | Redis | - | Private hostname for this Redis instance. |
| `REDISPORT` | Redis | 6379 | Redis server port (6379). |
| `REDISUSER` | Redis | default | Redis username for authenticated connections. |
| `REDIS_URL` | Redis | - | Full Redis connection URL (auto-composed from other vars). |
| `REDISPASSWORD` | Redis | (secret) | Alias for REDIS_PASSWORD used by Railway Redis plugin. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password. Auto-generated at deploy. |
| `CLICKHOUSE_DB` | ClickHouse | analytics | Default database created on first boot (analytics). |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse admin username. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse password. Auto-generated at deploy. |
| `BASE_URL` | Swetrix-FE | - | Public URL of the Swetrix dashboard (Gateway domain). |
| `SWETRIX_FE_HOST` | Gateway | - | Private hostname of the Swetrix frontend service (Railway internal DNS). |
| `SWETRIX_FE_PORT` | Gateway | 8080 | Port the Swetrix FE container listens on. Railway sets $PORT to 8080. |
| `SWETRIX_API_HOST` | Gateway | - | Private hostname of the Swetrix API service (Railway internal DNS). |
| `SWETRIX_API_PORT` | Gateway | 5005 | Port the Swetrix API container listens on (5005). |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/swetrix-analytics-template)
