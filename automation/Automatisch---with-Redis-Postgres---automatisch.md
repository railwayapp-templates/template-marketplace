# Deploy Automatisch - with Redis & Postgres on Railway

Zapier alternative. Build workflow automation without code.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automatisch)

## About

Automatisch is an open source workflow automation platform and a self-hostable alternative to Zapier. It lets you connect your apps and automate tasks with a visual, no-code flow builder. Build triggers, actions, and multi-step workflows entirely from your browser.

Deploying Automatisch requires four services: a web server, a background worker, PostgreSQL, and Redis. The web server handles the UI and API, while the worker processes automation jobs asynchronously. Both use the same Docker image (`automatischio/automatisch`), differentiated by the `WORKER` environment variable. PostgreSQL stores workflows, credentials, and execution history. Redis serves as the job queue and cache layer. On Railway, all four services are provisioned automatically with internal networking, so no manual infrastructure setup is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| worker | `automatischio/automatisch:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| automatisch | `automatischio/automatisch:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal hostname for Redis |
| `REDISPORT` | Redis | - | Port Redis listens on |
| `REDISUSER` | Redis | default | Redis ACL username |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis authentication password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis authentication password (auto-generated) |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection string |
| `PORT` | worker | 3000 | Port the application listens on |
| `WORKER` | worker | true | Enables background job processing mode |
| `APP_ENV` | worker | production | Application environment mode |
| `PROTOCOL` | worker | https | URL protocol for the application |
| `REDIS_HOST` | worker | - | Redis host address |
| `REDIS_PORT` | worker | - | Redis port |
| `POSTGRES_HOST` | worker | - | PostgreSQL host address |
| `POSTGRES_PORT` | worker | - | PostgreSQL port |
| `APP_SECRET_KEY` | worker | (secret) | Secures user sessions and CSRF tokens |
| `ENCRYPTION_KEY` | worker | - | Encrypts sensitive data like API keys and credentials |
| `REDIS_PASSWORD` | worker | (secret) | Redis authentication password |
| `POSTGRES_DATABASE` | worker | - | PostgreSQL database name |
| `POSTGRES_PASSWORD` | worker | (secret) | PostgreSQL password |
| `POSTGRES_USERNAME` | worker | (secret) | PostgreSQL username |
| `WEBHOOK_SECRET_KEY` | worker | (secret) | Signs and verifies incoming webhook payloads |
| `POSTGRES_DB` | Postgres | automatisch | Name of the default database to create |
| `DATABASE_URL` | Postgres | - | Internal PostgreSQL connection string |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL superuser password (auto-generated) |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection string |
| `HOST` | automatisch | - | Public domain assigned by Railway |
| `PORT` | automatisch | 3000 | Port the application listens on |
| `APP_ENV` | automatisch | production | Application environment mode |
| `PROTOCOL` | automatisch | https | URL protocol for the application |
| `REDIS_HOST` | automatisch | - | Redis host address |
| `REDIS_PORT` | automatisch | - | Redis port |
| `POSTGRES_HOST` | automatisch | - | PostgreSQL host address |
| `POSTGRES_PORT` | automatisch | - | PostgreSQL port |
| `APP_SECRET_KEY` | automatisch | (secret) | Secures user sessions and CSRF tokens |
| `ENCRYPTION_KEY` | automatisch | - | Encrypts sensitive data like API keys and credentials |
| `REDIS_PASSWORD` | automatisch | (secret) | Redis authentication password |
| `POSTGRES_DATABASE` | automatisch | - | PostgreSQL database name |
| `POSTGRES_PASSWORD` | automatisch | (secret) | PostgreSQL password |
| `POSTGRES_USERNAME` | automatisch | (secret) | PostgreSQL username |
| `WEBHOOK_SECRET_KEY` | automatisch | (secret) | Signs and verifies incoming webhook payloads |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/automatisch)
