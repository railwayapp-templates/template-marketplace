# Deploy adonisjs-pg-with-queues on Railway

AdonisJS template with PostgreSQL and queues configured to use Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adonisjs-pg-with-queues)

## About

Deploy AdonisJS apps on Railway with queues and PostgreSQL

PostgreSQL, Redis and AdonisJS

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-sample-deploy | [thetutlage/railway-sample-deploy](https://github.com/thetutlage/railway-sample-deploy) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| railway-sample-deploy-4mp3 | [thetutlage/railway-sample-deploy](https://github.com/thetutlage/railway-sample-deploy) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | railway-sample-deploy | UTC | - |
| `HOST` | railway-sample-deploy | 0.0.0.0 | - |
| `PORT` | railway-sample-deploy | 3333 | - |
| `APP_KEY` | railway-sample-deploy | ldr1Bmks-LVC3MnA8z8-iUluvUFq6T_y | - |
| `NODE_ENV` | railway-sample-deploy | production | - |
| `LOG_LEVEL` | railway-sample-deploy | info | - |
| `QUEUE_DRIVER` | railway-sample-deploy | redis | - |
| `DB_CONNECTION` | railway-sample-deploy | postgres | - |
| `REDIS_PASSWORD` | railway-sample-deploy | (secret) | - |
| `SESSION_DRIVER` | railway-sample-deploy | cookie | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `TZ` | railway-sample-deploy-4mp3 | UTC | - |
| `HOST` | railway-sample-deploy-4mp3 | 0.0.0.0 | - |
| `PORT` | railway-sample-deploy-4mp3 | 3333 | - |
| `APP_KEY` | railway-sample-deploy-4mp3 | ldr1Bmks-LVC3MnA8z8-iUluvUFq6T_y | - |
| `NODE_ENV` | railway-sample-deploy-4mp3 | production | - |
| `LOG_LEVEL` | railway-sample-deploy-4mp3 | info | - |
| `QUEUE_DRIVER` | railway-sample-deploy-4mp3 | redis | - |
| `DB_CONNECTION` | railway-sample-deploy-4mp3 | postgres | - |
| `REDIS_PASSWORD` | railway-sample-deploy-4mp3 | (secret) | - |
| `SESSION_DRIVER` | railway-sample-deploy-4mp3 | cookie | - |

## Configuration

- **Start command:** `npm run start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `node build/ace queue:work`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript, Edge

[View on Railway →](https://railway.com/deploy/adonisjs-pg-with-queues)
