# Deploy swetrix on Railway

Open source, privacy-first web analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swetrix)

## About

Swetrix is an open-source, privacy-first web analytics platform — a cookieless Google Analytics alternative with built-in error tracking, performance monitoring, funnels, and custom events. Community Edition is self-hostable so you keep full ownership of your traffic data.

This template deploys Swetrix Community Edition as five services: a public nginx gateway, the web UI, the analytics API, Redis for caching, and ClickHouse for analytics storage. Only the gateway is exposed; UI and API share one origin via `/backend/` routing (Swetrix v5). You get a working dashboard after deploy — register the first admin account, then further sign-ups stay blocked when registration is disabled. Optional SMTP unlocks password resets and invites; Google/OIDC integrations can be added later via env vars.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1` | Database |
| frontend | [osbytes/template-swetrix](https://github.com/osbytes/template-swetrix) (root: /services/frontend) | Worker |
| clickhouse | [osbytes/template-swetrix](https://github.com/osbytes/template-swetrix) (root: /services/clickhouse) | Worker |
| gateway | [osbytes/template-swetrix](https://github.com/osbytes/template-swetrix) (root: /services/gateway) | Web service |
| api | [osbytes/template-swetrix](https://github.com/osbytes/template-swetrix) (root: /services/api) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | default | - |
| `REDIS_URL` | redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | redis | (secret) | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `REDIS_PUBLIC_URL` | redis | - | Connection string for connecting to redis externally |
| `PORT` | frontend | 3000 | - |
| `PORT` | clickhouse | 8123 | - |
| `CLICKHOUSE_DB` | clickhouse | analytics | - |
| `CLICKHOUSE_USER` | clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | - |
| `PORT` | gateway | 8080 | - |
| `PORT` | api | 5005 | - |
| `SMTP_MOCK` | api | true | - |
| `SMTP_USER` | api | (secret) | - |
| `DEBUG_MODE` | api | false | - |
| `REDIS_PORT` | api | 6379 | - |
| `REDIS_USER` | api | (secret) | - |
| `OIDC_PROMPT` | api | select_account | - |
| `OIDC_ENABLED` | api | false | - |
| `SMTP_PASSWORD` | api | (secret) | - |
| `OIDC_ONLY_AUTH` | api | false | - |
| `REDIS_PASSWORD` | api | (secret) | - |
| `CLICKHOUSE_PORT` | api | 8123 | - |
| `CLICKHOUSE_USER` | api | (secret) | - |
| `IS_PRIMARY_NODE` | api | true | - |
| `SECRET_KEY_BASE` | api | (secret) | - |
| `CLIENT_IP_HEADER` | api | x-forwarded-for | - |
| `OIDC_CLIENT_SECRET` | api | (secret) | - |
| `CLICKHOUSE_DATABASE` | api | analytics | - |
| `CLICKHOUSE_PASSWORD` | api | (secret) | - |
| `DISABLE_REGISTRATION` | api | true | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/ping`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/swetrix)
