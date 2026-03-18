# Deploy API Key Manager on Railway

Deploy and Host API Key Manager with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/api-key-manager)

## About

API Key Manager is a self-hosted API key management service that provides secure key generation, rate limiting, usage tracking, and audit logging. It offers a complete alternative to paid services like Unkey.dev, giving you full control over your API authentication infrastructure.

API Key Manager requires PostgreSQL for data persistence and Redis for rate limiting. The service exposes a REST API that any application can integrate with, regardless of programming language. When deployed on Railway, both database services are provisioned automatically and connected via environment variables. The FastAPI backend handles all key operations including creation, verification, rotation, and revocation with zero configuration required from users.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| API-Key-Manager | [utsav-pal/API-Key-Manager](https://github.com/utsav-pal/API-Key-Manager) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis | - | Redis server hostname |
| `REDISPORT` | redis | 6379 | Redis server port |
| `REDISUSER` | redis | default | Redis username |
| `REDIS_URL` | redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | redis | (secret) | Redis password |
| `REDIS_PASSWORD` | redis | (secret) | Redis password (legacy) |
| `REDIS_PUBLIC_URL` | redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | API-Key-Manager | 8000 | Application port (default: 8000) |
| `REDIS_URL` | API-Key-Manager | - | Redis connection string for rate limiting |
| `SECRET_KEY` | API-Key-Manager | (secret) | JWT signing key - use a secure random string (min 32 characters) |
| `DATABASE_URL` | API-Key-Manager | - | PostgreSQL connection string for data storage |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/api-key-manager)
