# Deploy Directus Azure and Redis on Railway

Quickly deploy directus docker with redis, pg and azure blog storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bFcsEC)

## About

The railway deploy button leverages Directus, Redis, and Azure Blob Storage for seamless railway management. Directus empowers admins to configure routes and schedules, while Redis optimizes data access speed. Azure Blob Storage efficiently handles multimedia content. Streamlined railway operations at your fingertips!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| directus | [BlackDahlia313/directus-starter-azure](https://github.com/BlackDahlia313/directus-starter-azure) | Web service |
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
| `KEY` | directus | - | SET YOUR KEY |
| `SECRET` | directus | (secret) | SET A SECRET KEY |
| `ADMIN_EMAIL` | directus | - | SET ADMIN EMAIL |
| `CONFIG_PATH` | directus | directus.config.js | Path to the config file. Leave this by default. |
| `CACHE_ENABLED` | directus | true | SET TRUE OR FALSE (ID LEAVE TRUE) |
| `ADMIN_PASSWORD` | directus | (secret) | SET ADMIN PASSWORD |
| `STORAGE_AZURE_ENDPOINT` | directus | - | Azure Endpoint |
| `STORAGE_AZURE_ACCOUNT_NAME` | directus | - | Azure Account Name |
| `STORAGE_AZURE_CONTAINER_NAME` | directus | - | Azure Container Name |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/bFcsEC)
