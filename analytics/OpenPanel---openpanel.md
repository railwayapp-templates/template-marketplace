# Deploy OpenPanel on Railway

Mixpanel and Plausible combined into one tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openpanel)

## About

OpenPanel is a powerful analytics platform that captures and visualizes user behavior across web, mobile apps, and backend services. It combines the power of Mixpanel with the simplicity of Plausible.

Hosting OpenPanel involves setting up the necessary infrastructure to support its features, including a PostgreSQL database for storing user data and a web interface for managing analytics. Railway simplifies this process by providing a one-click deployment option, allowing you to get started quickly without worrying about the underlying infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenPanel Dashboard | `lindesvard/openpanel-dashboard:2` | Web service |
| GeoIP API | `observabilitystack/geoip-api` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Clickhouse Server | `clickhouse/clickhouse-server:24.12.2.29-alpine` | Database |
| OpenPanel API | `lindesvard/openpanel-api:2` | Web service |
| OpenPanel Worker | `lindesvard/openpanel-worker:2` | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenPanel Dashboard | 3000 | - |
| `COOKIE_SECRET` | OpenPanel Dashboard | (secret) | - |
| `RESEND_API_KEY` | OpenPanel Dashboard | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `CLICKHOUSE_DB` | Clickhouse Server | openpanel | - |
| `CLICKHOUSE_USER` | Clickhouse Server | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Clickhouse Server | (secret) | - |
| `PORT` | OpenPanel API | 3000 | - |
| `NODE_ENV` | OpenPanel API | production | - |
| `BATCH_SIZE` | OpenPanel API | 5000 | - |
| `SELF_HOSTED` | OpenPanel API | true | - |
| `EMAIL_SENDER` | OpenPanel API | noreply@localhost | - |
| `COOKIE_SECRET` | OpenPanel API | (secret) | - |
| `BATCH_INTERVAL` | OpenPanel API | 10000 | - |
| `RESEND_API_KEY` | OpenPanel API | (secret) | Set this to your Resend API key for features that require email. Don't forget to set `EMAIL_SENDER` as well! |
| `ALLOW_INVITATION` | OpenPanel API | true | - |
| `ALLOW_REGISTRATION` | OpenPanel API | true | Set this to `false` to bar registrations to your OpenPanel instance. |
| `COOKIE_SECRET` | OpenPanel Worker | (secret) | - |
| `RESEND_API_KEY` | OpenPanel Worker | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openpanel)
