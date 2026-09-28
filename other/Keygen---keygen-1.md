# Deploy Keygen on Railway

Keygen CE 1.7: software licensing and license-key validation API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keygen-1)

## About

Keygen is a software licensing and distribution API. It issues license keys, validates them, tracks machine activations and enforces policies such as expiry, seats and feature entitlements. Desktop apps, on-premise software, plugins and SaaS add-ons call it to check whether a customer's license is valid. Keygen CE is the free self-hosted edition.

This template runs Keygen CE `keygen/api:v1.7.2` as a web service and a Sidekiq worker, with Railway Postgres and Redis. On the first deploy, a pre-deploy step runs Keygen's setup, which creates the account and an admin user. Later deploys only run migrations. The pre-deploy step also waits for the database. Setup output is filtered so that secrets stay out of the logs. The admin email defaults to `admin@example.com`, and the password is generated. CE is API-only, without a dashboard. Keygen is published under the Fair Core License, which is source-available rather than open source.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| keygen | `keygen/api:v1.7.2` | Web service |
| keygen-worker | `keygen/api:v1.7.2` | Worker |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `BIND` | keygen | :: |
| `PORT` | keygen | 3000 |
| `KEYGEN_MODE` | keygen | singleplayer |
| `KEYGEN_HOSTS` | keygen | healthcheck.railway.app |
| `KEYGEN_EDITION` | keygen | CE |
| `SECRET_KEY_BASE` | keygen | (secret) |
| `RAILS_MAX_THREADS` | keygen | 5 |
| `KEYGEN_ADMIN_EMAIL` | keygen | admin@example.com |
| `RAILS_LOG_TO_STDOUT` | keygen | 1 |
| `KEYGEN_ADMIN_PASSWORD` | keygen | (secret) |
| `SECRET_KEY_BASE` | keygen-worker | (secret) |
| `RAILS_MAX_THREADS` | keygen-worker | 5 |
| `RAILS_LOG_TO_STDOUT` | keygen-worker | 1 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/app/scripts/entrypoint.sh worker`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/keygen-1)
