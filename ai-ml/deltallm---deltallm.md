# Deploy deltallm on Railway

Deploy DeltaLLM with managed PostgreSQL and Redis on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deltallm)

## About

DeltaLLM is a self-hosted AI gateway with an OpenAI-compatible API, model routing, virtual API keys, spend tracking, guardrails, and an Admin UI.

This Railway template provisions:

- a `deltallm` web service
- managed PostgreSQL
- managed Redis
- public HTTP networking for the Admin UI and gateway API
- a `/health/readiness` healthcheck

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| deltallm | `deltallm/deltallm:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDIS_URL` | deltallm | - | Internal Redis connection URL supplied by the Railway Redis service. |
| `DATABASE_URL` | deltallm | - | Internal PostgreSQL connection URL supplied by the Railway Postgres service. |
| `DELTALLM_SALT_KEY` | deltallm | - | Per-deployment secret salt used for hashing and signing internal values. |
| `DELTALLM_REDIS_URL` | deltallm | - | DeltaLLM Redis URL, wired to the Railway Redis service. |
| `DELTALLM_MASTER_KEY` | deltallm | - | Set this yourself. Initial gateway API credential; use at least 32 characters with letters and digits. |
| `DELTALLM_CONFIG_PATH` | deltallm | /app/config.example.yaml | Path to the bundled DeltaLLM YAML config inside the Docker image. |
| `PLATFORM_BOOTSTRAP_ADMIN_EMAIL` | deltallm | - | Set this yourself. Initial Admin UI login email. |
| `PLATFORM_BOOTSTRAP_ADMIN_PASSWORD` | deltallm | (secret) | Set this yourself. Initial Admin UI password; use at least 12 characters. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deltallm)
