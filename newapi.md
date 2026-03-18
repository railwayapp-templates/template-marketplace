# Deploy newapi on Railway

new-api (AI) railway template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/newapi)

## About

newapi is an open-source API management and distribution platform that supports multiple AI model providers (OpenAI, Azure, Anthropic, etc.). It provides a unified API gateway with features like token management, quota control, usage tracking, and multi-tenant support, making it ideal for teams and organizations managing access to various LLM services.

Hosting newapi requires a web server to run the Go-based backend along with a React frontend, and a persistent data store for configuration, user accounts, tokens, and usage logs. The Railway template streamlines this by bundling newapi with PostgreSQL for primary data storage and Redis for caching and rate limiting—all pre-configured and wired together. Railway handles database provisioning, networking between services, environment variable injection, and automatic builds from the Docker image. This means you can go from template deployment to a fully functional API management platform in minutes, without manually configuring any infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| newapi-railway-template | [dielect/newapi-railway-template](https://github.com/dielect/newapi-railway-template) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | newapi-railway-template | Asia/Shanghai | - |
| `PORT` | newapi-railway-template | 3000 | - |
| `CRYPTO_SECRET` | newapi-railway-template | (secret) | - |
| `SESSION_SECRET` | newapi-railway-template | (secret) | - |
| `ERROR_LOG_ENABLED` | newapi-railway-template | true | - |
| `BATCH_UPDATE_ENABLED` | newapi-railway-template | true | - |
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

- **Healthcheck:** `/api/status`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/newapi)
