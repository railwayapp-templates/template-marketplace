# Deploy Svix on Railway

Svix webhook sending service with Postgres, Redis queue and retries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/svix)

## About

Svix is an open-source webhooks service. Your application sends events to Svix once, and Svix delivers them to every subscribed endpoint with signing, automatic retries with exponential backoff, rate limiting and delivery logs, so you do not have to build and operate webhook infrastructure yourself. SDKs exist for most languages.

This template deploys the Svix server v1.101.0 with Railway Postgres for data and Railway Redis as the task queue and cache. Migrations run on startup. The API is on the public domain and listens on IPv4 and IPv6 privately. Requests are authenticated with JWTs signed by the generated `SVIX_JWT_SECRET`; create one with `svix-server jwt generate` over `railway ssh` or sign your own HS256 token. The worker runs in the same service and delivered a real test webhook during verification. The Hobby plan is enough for moderate volumes. Back up Postgres regularly to keep delivery history.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| svix | `svix/svix-server:v1.101.0` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | svix | 8071 |
| `SVIX_CACHE_TYPE` | svix | redis |
| `SVIX_JWT_SECRET` | svix | (secret) |
| `SVIX_QUEUE_TYPE` | svix | redis |
| `SVIX_ENVIRONMENT` | svix | prod |
| `SVIX_LISTEN_ADDRESS` | svix | [::]:8071 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `svix-server --run-migrations --wait-for 60`
- **Healthcheck:** `/api/v1/health/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/svix)
