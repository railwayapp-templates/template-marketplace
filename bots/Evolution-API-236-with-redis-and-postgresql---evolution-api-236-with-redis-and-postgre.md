# Deploy Evolution API 2.3.6 with redis and postgresql on Railway

Deploy and Host Evolution API 2.3.6 with redis and postgresql with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-236-with-redis-and-postgre)

## About

Hosting Evolution API on Railway ensures your WhatsApp automation remains stable, scalable, and always online. This template pre-configures all necessary environment variables, connecting the Evolution API container directly to a managed PostgreSQL database and a Redis instance. This architecture handles high-volume messaging, keeps webhook events reliable, and maintains persistent multi-device sessions without manual server configuration or complex Docker setups.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| evoapicloud/evolution-api:v2.3.6 | `evoapicloud/evolution-api:v2.3.6` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-api-236-with-redis-and-postgre)
