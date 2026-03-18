# Deploy Evo AI on Railway

Open-source platform to create and manage AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mpbtSK)

## About

**Evo AI** is an open-source platform designed for creating and managing AI agents. It facilitates integration with various AI models and services, enabling developers to build sophisticated, multi-agent systems with ease.

Hosting Evo AI allows you to leverage its full capabilities for developing and managing AI agents. Whether you choose to self-host or deploy in the cloud, Evo AI offers flexibility and control over your AI infrastructure. Deploying on Railway simplifies the process, providing managed infrastructure that ensures scalability, reliability, and ease of maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evoai-api | `evoapicloud/evo-ai:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| evoai-frontend | `evoapicloud/evo-ai-frontend:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | evoai-api | 0.0.0.0 | - |
| `PORT` | evoai-api | 8000 | - |
| `DEBUG` | evoai-api | false | - |
| `API_TITLE` | evoai-api | Evo API | - |
| `LOG_LEVEL` | evoai-api | INFO | - |
| `REDIS_SSL` | evoai-api | false | - |
| `REDIS_TTL` | evoai-api | 3600 | - |
| `SMTP_FROM` | evoai-api | - | Example: your_email@mail.com |
| `SMTP_HOST` | evoai-api | - | Exemple: smtp@gmail.com |
| `SMTP_PORT` | evoai-api | 587 | - |
| `SMTP_USER` | evoai-api | (secret) | Example: your_email@mail.com |
| `DEMO_EMAIL` | evoai-api | - | Different from admin email |
| `PYTHONPATH` | evoai-api | /app/src | - |
| `REDIS_PORT` | evoai-api | 6379 | - |
| `SECRET_KEY` | evoai-api | (secret) | - |
| `ADMIN_EMAIL` | evoai-api | - | Administrator email |
| `API_VERSION` | evoai-api | 1.0.0 | - |
| `SMTP_USE_SSL` | evoai-api | false | - |
| `SMTP_USE_TLS` | evoai-api | true | - |
| `DEMO_PASSWORD` | evoai-api | (secret) | Demo password |
| `JWT_ALGORITHM` | evoai-api | HS256 | - |
| `SMTP_PASSWORD` | evoai-api | (secret) | Email password |
| `EMAIL_PROVIDER` | evoai-api | smtp | - |
| `JWT_SECRET_KEY` | evoai-api | (secret) | - |
| `REDIS_PASSWORD` | evoai-api | (secret) | - |
| `API_DESCRIPTION` | evoai-api | API for running AI agents | - |
| `TOOLS_CACHE_TTL` | evoai-api | 3600 | - |
| `DEMO_CLIENT_NAME` | evoai-api | - | Demo client name (first client) |
| `REDIS_KEY_PREFIX` | evoai-api | evoai | - |
| `ORGANIZATION_NAME` | evoai-api | Evo AI | - |
| `JWT_EXPIRATION_TIME` | evoai-api | 3600 | - |
| `ADMIN_INITIAL_PASSWORD` | evoai-api | (secret) | Administrator password |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | evoai-frontend | 3000 | - |
| `NODE_ENV` | evoai-frontend | production | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evoai/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mpbtSK)
