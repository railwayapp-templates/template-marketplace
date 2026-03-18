# Deploy Paperless on Railway

System transforming physical paperwork into a searchable online archive

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b72Thf)

## About

# Paperless-ngx

Paperless-ngx is a document management system that transforms your physical documents into a searchable online archive so you can keep, well, _less paper_.

Paperless-ngx is the official successor to the original [Paperless](https://github.com/the-paperless-project/paperless) & [Paperless-ng](https://github.com/jonaswinkler/paperless-ng) projects and is designed to distribute the responsibility of advancing and supporting the project among a team of people.

# Features

![screenshot](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/main/docs/assets/screenshots/documents-smallcards-dark.png)

A full list of [features](https://docs.paperless-ngx.com/#features) and [screenshots](https://docs.paperless-ngx.com/#screenshots) are available in the [documentation](https://docs.paperless-ngx.com/).

### Documentation

The documentation for Paperless-ngx is available at [https://docs.paperless-ngx.com](https://docs.paperless-ngx.com/).

### Installation

Installing requires little configuration, only configuration required is an admin username.

The admin password is set automatically, please see `PAPERLESS_ADMIN_PASSWORD` in service-variables to find it. You can also set it to a custom value during deployment configuration. 

Of course there's a lot of configuration you can add to this service through environment variables. Please see [Paperless Config](https://docs.paperless-ngx.com/configuration/) for more information.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Paperless | `ghcr.io/paperless-ngx/paperless-ngx` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `PORT` | Paperless | 8000 | - |
| `PAPERLESS_URL` | Paperless | - | For CORS policies, if using a custom domain, please change this |
| `PAPERLESS_DATA_DIR` | Paperless | /data/data | - |
| `PAPERLESS_ADMIN_USER` | Paperless | (secret) | Admin Account Username |
| `PAPERLESS_MEDIA_ROOT` | Paperless | /data/media | - |
| `PAPERLESS_SECRET_KEY` | Paperless | (secret) | - |
| `PAPERLESS_ADMIN_PASSWORD` | Paperless | (secret) | Admin Account Password |
| `PAPERLESS_CONSUMPTION_DIR` | Paperless | /data/consume | - |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_URL` | Postgres | - | Public URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private Port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/b72Thf)
