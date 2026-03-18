# Deploy OpenPanel on Railway

Mixpanel and Plausible combined into one tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openpanel)

## About

OpenPanel is a powerful analytics platform that captures and visualizes user behavior across web, mobile apps, and backend services. It combines the power of Mixpanel with the simplicity of Plausible.

Hosting OpenPanel involves setting up the necessary infrastructure to support its features, including a PostgreSQL database for storing user data and a web interface for managing analytics. Railway simplifies this process by providing a one-click deployment option, allowing you to get started quickly without worrying about the underlying infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenPanel Dashboard | `lindesvard/openpanel-dashboard` | Web service |
| GeoIP API | `observabilitystack/geoip-api` | Worker |
| Clickhouse Server | `clickhouse/clickhouse-server:24.12.2.29-alpine` | Database |
| Redis | `railwayapp/redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| OpenPanel API | `lindesvard/openpanel-api` | Web service |
| OpenPanel Worker | `lindesvard/openpanel-worker` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenPanel Dashboard | 3000 | - |
| `COOKIE_SECRET` | OpenPanel Dashboard | (secret) | - |
| `RESEND_API_KEY` | OpenPanel Dashboard | (secret) | - |
| `CLICKHOUSE_DB` | Clickhouse Server | openpanel | - |
| `CLICKHOUSE_USER` | Clickhouse Server | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Clickhouse Server | (secret) | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | OpenPanel API | 3000 | - |
| `NODE_ENV` | OpenPanel API | production | - |
| `BATCH_SIZE` | OpenPanel API | 5000 | - |
| `SELF_HOSTED` | OpenPanel API | true | - |
| `EMAIL_SENDER` | OpenPanel API | noreply@localhost | - |
| `COOKIE_SECRET` | OpenPanel API | (secret) | - |
| `BATCH_INTERVAL` | OpenPanel API | 10000 | - |
| `RESEND_API_KEY` | OpenPanel API | (secret) | Set this to your Resend API key for features that require email. Don't forget to set `EMAIL_SENDER` as well! |
| `ALLOW_INVITATION` | OpenPanel API | true | - |
| `ALLOW_REGISTRATION` | OpenPanel API | false | Set this to `true` to allow registrations to your OpenPanel instance. |
| `COOKIE_SECRET` | OpenPanel Worker | (secret) | - |
| `RESEND_API_KEY` | OpenPanel Worker | (secret) | - |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openpanel)
