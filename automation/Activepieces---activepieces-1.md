# Deploy Activepieces on Railway

Open-source no-code workflow automation platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-1)

## About

Activepieces is an open-source no-code automation platform that lets you connect apps and automate workflows without writing code. It is a self-hostable alternative to Zapier and Make, built with TypeScript and designed for both individuals and teams.

Hosting Activepieces on Railway gives you a fully managed deployment of the automation platform backed by a PostgreSQL database and Redis instance. Railway handles networking, environment wiring, and restarts automatically. The Activepieces container runs on port 80, connects to Postgres for persistent workflow storage, and uses Redis for background job queuing. Encryption keys and JWT secrets are auto-generated on first deploy so your instance is secure out of the box. You retain full control over your data and automation logic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| railway-activepieces | [c-treinta/railway-activepieces](https://github.com/c-treinta/railway-activepieces) (root: app/) | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | railway-activepieces | 80 | Internal container port |
| `AP_REDIS_URL` | railway-activepieces | - | Redis connection URL |
| `AP_JWT_SECRET` | railway-activepieces | (secret) | Auto-generated JWT signing secret |
| `AP_FRONTEND_URL` | railway-activepieces | - | Public URL of this |
| `AP_POSTGRES_HOST` | railway-activepieces | - | Postgres private hostname |
| `AP_POSTGRES_PORT` | railway-activepieces | - | Postgres port |
| `AP_ENCRYPTION_KEY` | railway-activepieces | - | Auto-generated encryption key |
| `AP_NODE_ENVIRONMENT` | railway-activepieces | production | Node runtime environment |
| `AP_POSTGRES_DATABASE` | railway-activepieces | - | Postgres database name |
| `AP_POSTGRES_PASSWORD` | railway-activepieces | (secret) | Postgres password |
| `AP_POSTGRES_USERNAME` | railway-activepieces | (secret) | Postgres username |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Automation · **Languages:** Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/activepieces-1)
