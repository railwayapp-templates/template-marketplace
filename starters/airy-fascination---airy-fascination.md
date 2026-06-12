# Deploy airy-fascination on Railway

Deploy and Host airy-fascination with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/airy-fascination)

## About

Hosting **airy-fascination** involves deploying a Laravel application with its required runtime, dependencies, and services. This typically includes configuring a PHP runtime, installing Composer dependencies, setting environment variables, running database migrations, and ensuring a production-ready web server. Using a managed platform like [Railway](https://railway.app?utm_source=chatgpt.com) simplifies this process by handling infrastructure provisioning, service orchestration, and scaling, so you can focus on application logic rather than server maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| nextbite-worker | [quintonis/NextBite-backend](https://github.com/quintonis/NextBite-backend) | Worker |
| nexbite-schedular | [quintonis/NextBite-backend](https://github.com/quintonis/NextBite-backend) | Worker |
| NextBite-backend | [quintonis/NextBite-backend](https://github.com/quintonis/NextBite-backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | setup user |
| `POSTGRES_USER` | Postgres | (secret) | setup user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | - | setup user |
| `REDISUSER` | Redis | - | setup user |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `APP_ENV` | nextbite-worker | - | setup user |
| `APP_DEBUG` | nextbite-worker | - | setup user |
| `CACHE_STORE` | nextbite-worker | - | setup user |
| `REDIS_CLIENT` | nextbite-worker | - | setup user |
| `USDA_API_KEY` | nextbite-worker | (secret) | - |
| `MAIL_PASSWORD` | nextbite-worker | (secret) | - |
| `MAIL_USERNAME` | nextbite-worker | (secret) | - |
| `OPENAI_API_KEY` | nextbite-worker | (secret) | - |
| `RUN_MIGRATIONS` | nextbite-worker | - | setup user |
| `SESSION_DRIVER` | nextbite-worker | - | setup user |
| `QUEUE_CONNECTION` | nextbite-worker | - |  setup user |
| `MAILTRAP_API_TOKEN` | nextbite-worker | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | nextbite-worker | (secret) | - |
| `APP_ENV` | nexbite-schedular | - | setup user |
| `APP_DEBUG` | nexbite-schedular | - | setup user |
| `CACHE_STORE` | nexbite-schedular | - | setup user |
| `REDIS_CLIENT` | nexbite-schedular | - | setup user |
| `USDA_API_KEY` | nexbite-schedular | (secret) | - |
| `MAIL_PASSWORD` | nexbite-schedular | (secret) | - |
| `MAIL_USERNAME` | nexbite-schedular | (secret) | - |
| `OPENAI_API_KEY` | nexbite-schedular | (secret) | - |
| `RUN_MIGRATIONS` | nexbite-schedular | - | setup user |
| `SESSION_DRIVER` | nexbite-schedular | - | setup user |
| `QUEUE_CONNECTION` | nexbite-schedular | - | setup user |
| `MAILTRAP_API_TOKEN` | nexbite-schedular | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | nexbite-schedular | (secret) | - |
| `CACHE_STORE` | NextBite-backend | - | setup user |
| `MAIL_SCHEME` | NextBite-backend | - | setup user |
| `REDIS_CLIENT` | NextBite-backend | - | setup user |
| `USDA_API_KEY` | NextBite-backend | (secret) | - |
| `MAIL_PASSWORD` | NextBite-backend | (secret) | - |
| `MAIL_USERNAME` | NextBite-backend | (secret) | - |
| `OPENAI_API_KEY` | NextBite-backend | (secret) | - |
| `RUN_MIGRATIONS` | NextBite-backend | - | setup user |
| `SESSION_DRIVER` | NextBite-backend | - | setup user |
| `QUEUE_CONNECTION` | NextBite-backend | - | setup user |
| `MAILTRAP_API_TOKEN` | NextBite-backend | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | NextBite-backend | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `bash railway/run-worker.sh`
- **Start command:** `bash railway/init-app.sh`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** PHP, Blade, Shell, VCL, Dockerfile, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/airy-fascination)
