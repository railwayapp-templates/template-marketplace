# Deploy NocoDB with PostgreSQL, Redis & Files on Railway

No-code tables, forms and APIs with Postgres, Redis and durable files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-with-postgresql-redis-and-files)

## About

No-code tables, forms and APIs with Postgres, Redis and durable files.

Deploying this template creates Postgres, Redis, NocoDB in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis@sha256:3811787313eba226a2ef38658c6ccb91cd5e110edc89c37767de373120a0e5a0` | Database |
| NocoDB | `nocodb/nocodb@sha256:27d2fd14670db892ac721849d4f071edce47e386a1e74c921a0162644b9c213d` | Web service |
| Postgres | `postgres@sha256:ca0bd484cb98bf4b24eb1010e73fb3fcbd6714d240fbc1a10eea5b7dbecb641d` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password; keep this service private. |
| `PORT` | NocoDB | 8080 | - |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | Stable signing secret for user sessions, generated on deploy. |
| `POSTGRES_DB` | Postgres | nocodb | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated separately for every deployment. |

## Configuration

- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --maxmemory-policy noeviction --bind 0.0.0.0 :: --dir /data'`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nocodb-with-postgresql-redis-and-files)
