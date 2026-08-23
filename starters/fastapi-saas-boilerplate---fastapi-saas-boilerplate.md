# Deploy fastapi-saas-boilerplate on Railway

FastAPI SaaS starter with JWT auth, Async Postgres, Redis & Stripe.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-saas-boilerplate)

## About

A production-ready, highly scalable FastAPI backend starter designed for modern SaaS applications. It features asynchronous request handling, built-in OAuth2 JWT authentication, SQLModel ORM integration, Redis task queue management, and pre-configured Stripe subscription billing endpoints so you can launch your MVP in record time.

Hosting this boilerplate on Railway provides a unified, zero-config cloud infrastructure setup. Railway automatically builds the multi-stage Docker container, runs zero-downtime database schema migrations via Alembic on startup, and provisions managed PostgreSQL and Redis services. Environment variables like connection strings and secure secret keys are injected seamlessly, giving you high-availability hosting with automatic scale-to-fit resource provisioning without the hassle of managing underlying server hardware or complex networking rules.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| fastapi-saas-boilerplate | [Utee/fastapi-saas-boilerplate](https://github.com/Utee/fastapi-saas-boilerplate) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Internal hostname for the Redis database service |
| `REDISPORT` | Redis | 6379 | Network port for connecting to the Redis service |
| `REDISUSER` | Redis | default | Default authentication username for Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Secure password generated for Redis authentication |
| `REDIS_PASSWORD` | Redis | (secret) | Secure hash password generated for Redis authentication |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Starters · **Languages:** Python, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/fastapi-saas-boilerplate)
