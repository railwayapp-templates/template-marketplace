# Deploy Trigger.dev on Railway

Open source background jobs with no timeouts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/qcn55C)

## About

# Trigger.dev (v3)

![Trigger.dev](https://trigger.dev/build/_assets/og-image-Z4SREFCI.jpg)

All the required environment variables are pre-configured.

To know more about all the environment variables.
https://github.com/triggerdotdev/docker/blob/main/.env.example

* **Website:** https://trigger.dev
* **Docs:** https://trigger.dev/docs

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Trigger.dev | `ghcr.io/triggerdotdev/trigger.dev` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Trigger.dev | 3030 | - |
| `APP_ENV` | Trigger.dev | production | - |
| `NODE_ENV` | Trigger.dev | production | - |
| `V3_ENABLED` | Trigger.dev | true | - |
| `LOGIN_ORIGIN` | Trigger.dev | (secret) | - |
| `REDIS_PASSWORD` | Trigger.dev | (secret) | - |
| `REDIS_USERNAME` | Trigger.dev | (secret) | - |
| `REMIX_APP_PORT` | Trigger.dev | 3030 | - |
| `SESSION_SECRET` | Trigger.dev | (secret) | - |
| `PROVIDER_SECRET` | Trigger.dev | (secret) | - |
| `MAGIC_LINK_SECRET` | Trigger.dev | (secret) | - |
| `COORDINATOR_SECRET` | Trigger.dev | (secret) | - |
| `WHITELISTED_EMAILS` | Trigger.dev | - | This is used for validating emails that are allowed to log in. Every email that do not match this regex will be rejected. For example: `authorized@yahoo\.com|authorized@gmail\.com` |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Automation

[View on Railway →](https://railway.com/template/qcn55C)
