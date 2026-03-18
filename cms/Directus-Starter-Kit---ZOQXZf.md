# Deploy Directus Starter Kit on Railway

Directus, PostgreSQL, Redis, S3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZOQXZf)

## About

This railway deploy button combines Directus, Redis, PostgreSQL, and S3 to enable anyone to quickly deploy everything they need right away.

This will be updated soon to allow you to easily add any extension by editing the deployed config file. 

This deploys Directus 10.5

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| directus | [buildmycity/directus-starter-railway](https://github.com/buildmycity/directus-starter-railway) | Web service |

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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `KEY` | directus | - | generate a key here: generate-secret.vercel.app/32 |
| `SECRET` | directus | (secret) | generate a secret here: generate-secret.vercel.app/32 |
| `ADMIN_EMAIL` | directus | - | Set your initial admin email. (this can be deleted after initial deploy) |
| `CONFIG_PATH` | directus | directus.config.js | wouldn't touch this ;) |
| `ADMIN_PASSWORD` | directus | (secret) | Set your initial admin password. (this can be deleted after initial deploy) |
| `STORAGE_S3_KEY` | directus | - | S3 Key |
| `STORAGE_S3_BUCKET` | directus | - | STORAGE_S3_BUCKET |
| `STORAGE_S3_REGION` | directus | - | S3 Region |
| `STORAGE_S3_SECRET` | directus | (secret) | S3 Secret Token |
| `STORAGE_S3_ENDPOINT` | directus | - | S3 Endpoint |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/ZOQXZf)
