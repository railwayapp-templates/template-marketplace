# Deploy Misskey on Railway

An unofficial template for Misskey

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/8bBGvg)

## About

This is an unofficial template for [Misskey](https://misskey-hub.net/).

**Note: This template only works with the Hobby plan or higher.**

This template uses a custom docker image that can be configured from environment variables.

For detailed instructions, please check the README.

https://github.com/mkizka/misskey-railway-template

Please report any issues [here](https://github.com/mkizka/misskey-railway-template/issues). Thank you!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Misskey | `ghcr.io/mkizka/misskey-railway` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MISSKEY__ID` | Misskey | aidx | - |
| `MISSKEY__DB__PORT` | Misskey | 5432 | - |
| `MISSKEY__DB__USER` | Misskey | (secret) | - |
| `MISSKEY__REDIS__PORT` | Misskey | 6379 | - |
| `MISSKEY__REDIS__USERNAME` | Misskey | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/misskey/files`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/8bBGvg)
