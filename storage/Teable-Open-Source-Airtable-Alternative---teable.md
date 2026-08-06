# Deploy Teable (Open-Source Airtable Alternative) on Railway

Teable [Aug ’26] (Airtable & Baserow alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable)

## About

Teable is a modern, open-source Airtable alternative available on GitHub, designed to provide flexible and scalable database management with a spreadsheet-like interface. With Teable, users gain full control over their data and workflows, supported by an active developer community and extensive documentation on the official Teable docs.

You can self host Teable to manage all your projects, data, and team workflows entirely under your control, without depending on third-party platforms. By deploying Teable with Docker, you get the same ease of use as Airtable but with self-hosted flexibility. Hosting on Railway makes this process simple: it removes the complexities of infrastructure management and lets you scale instantly while keeping your Teable environment private and secure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| teable | `teableio/teable` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | teable | 3000 | - |
| `BRAND_NAME` | teable | Teable | - |
| `SECRET_KEY` | teable | (secret) | - |
| `BACKEND_JWT_SECRET` | teable | (secret) | - |
| `SANDBOX_JWT_SECRET` | teable | (secret) | - |
| `BACKEND_CACHE_PROVIDER` | teable | redis | - |
| `BACKEND_SESSION_SECRET` | teable | (secret) | - |
| `BACKEND_MAIL_ENCRYPTION_IV` | teable | a741f1e00a9f1696 | - |
| `NEXT_ENV_IMAGES_ALL_REMOTE` | teable | true | - |
| `BACKEND_MAIL_ENCRYPTION_KEY` | teable | 836e6dbba8300dc1 | - |
| `BACKEND_STORAGE_ENCRYPTION_IV` | teable | 5f1c7827775fedfc | - |
| `BACKEND_STORAGE_ENCRYPTION_KEY` | teable | 0b0d8c88913f8651 | - |
| `ENABLEALPINEPRIVATE_NETWORKING` | teable | true | - |
| `BACKEND_DATA_DB_URL_ENCRYPTION_IV` | teable | 8e2b6e9abf58f3e0 | - |
| `BACKEND_ACCESS_TOKEN_ENCRYPTION_IV` | teable | (secret) | - |
| `BACKEND_DATA_DB_URL_ENCRYPTION_KEY` | teable | 29666e20940d02b2 | - |
| `BACKEND_ACCESS_TOKEN_ENCRYPTION_KEY` | teable | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/teable)
