# Deploy Twenty CRM API on Railway

Self-hosted Twenty CRM with REST, GraphQL and webhooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-twenty-crm-with-rest-graphql-api)

## About

This Railway template runs self-hosted Twenty with its generated REST and GraphQL APIs plus webhooks. Create a custom object like Invoice and it immediately exposes the same endpoints as People or Companies.

Self-hosting Twenty on Railway means your CRM data, uploaded files and API logs stay on infrastructure you control. You get the full open-source CRM without babysitting VPS packages or database backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| twenty-worker | `twentycrm/twenty:v2.48.0@sha256:43fab4bffacdcd63ff3c9257b7f8985a4424d81e9eb43982b9c16a841d555e52` | Worker |
| twenty | `twentycrm/twenty:v2.48.0@sha256:43fab4bffacdcd63ff3c9257b7f8985a4424d81e9eb43982b9c16a841d555e52` | Web service |
| Redis | `redis:8.2.10@sha256:47670742d7924adbcdb404d1288b6327815b23141969c0939b8e5d61f78c2634` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16.15@sha256:34c3e49e7ed2aaef6c575fb23bb37b878007e97752d3bf27ccb550046f893ca7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | twenty-worker | - | Redis connection; the worker pulls jobs from these queues. |
| `APP_SECRET` | twenty-worker | (secret) | Same signing secret as the server (reference). |
| `SERVER_URL` | twenty-worker | - | Public URL of the Twenty server, used in emails and links. |
| `STORAGE_TYPE` | twenty-worker | local | File storage backend (local). |
| `ENCRYPTION_KEY` | twenty-worker | - | Same encryption key as the server (reference). |
| `PG_DATABASE_URL` | twenty-worker | - | Postgres connection from the Postgres service. |
| `DISABLE_DB_MIGRATIONS` | twenty-worker | true | true: migrations run on the server, not the worker. |
| `DISABLE_CRON_JOBS_REGISTRATION` | twenty-worker | true | true: crons are registered by the server. |
| `PORT` | twenty | 3000 | Port Railway routes the public domain to (3000). |
| `NODE_PORT` | twenty | 3000 | Port the Twenty server listens on (3000). |
| `REDIS_URL` | twenty | - | Redis connection for cache and job queues. |
| `APP_SECRET` | twenty | (secret) | Signs logins and sessions, generated per deploy; keep it stable. |
| `SERVER_URL` | twenty | - | Public HTTPS URL of Twenty; used in links, OAuth callbacks and the web app. |
| `STORAGE_TYPE` | twenty | local | File storage backend; local keeps files on the server volume. |
| `ENCRYPTION_KEY` | twenty | - | Encrypts stored credentials at rest, generated per deploy; never change it. |
| `PG_DATABASE_URL` | twenty | - | Postgres connection from the Postgres service. |
| `DISABLE_DB_MIGRATIONS` | twenty | false | false: the server creates and upgrades the database on boot. |
| `DISABLE_CRON_JOBS_REGISTRATION` | twenty | false | false: the server registers background cron jobs on boot. |
| `REDISHOST` | Redis | - | Private host of Redis. |
| `REDISPORT` | Redis | 6379 | Redis port. |
| `REDISUSER` | Redis | default | Redis user. |
| `REDIS_URL` | Redis | - | Private connection URL used by Twenty. |
| `REDISPASSWORD` | Redis | (secret) | Redis password. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated per deploy. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private connection URL used by Twenty. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated per deploy. |

## Configuration

- **Start command:** `/app/entrypoint.sh yarn worker:prod`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/packages/twenty-server/.local-storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --maxmemory-policy noeviction --bind '* -::*'"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/deploy-twenty-crm-with-rest-graphql-api)
