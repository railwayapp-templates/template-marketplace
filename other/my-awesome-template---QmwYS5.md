# Deploy my awesome template on Railway

A template for testing things

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/QmwYS5)

## About

A very good description. A very good description. A very good description. A very good description. A very good description. A very good description. A very good description. A very good description. A very good description. A very good description. A very good description.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `ghcr.io/coffee-cup/railway-utils` | Worker |
| Redis | `bitnami/redis` | Database |
| backend | `ghcr.io/coffee-cup/railway-utils` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `OPTIONAL_VARIABLE` | backend | - | This is optional |
| `REQUIRED_VARIABLE` | backend | - | This is a very important required variable |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/QmwYS5)
