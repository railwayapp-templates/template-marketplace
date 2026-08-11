# Deploy Laravel Complete — Reliable Community Template on Railway

Pinned Laravel 13 web, worker and scheduler with private MySQL and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laravel-complete-reliable-community-temp)

## About

Deploy a community-maintained Laravel 13 stack with separate web, queue-worker, and scheduler roles, plus private MySQL and Redis services. The template pins its application and database images, generates credentials during deployment, persists both data services, and keeps internal traffic on Railway private networking. It is not endorsed by Laravel or Railway.

The web service runs database migrations before serving the application and exposes Laravel's `/up` health endpoint. Worker and scheduler services use the same pinned image and wait for the migration table before starting their long-running roles. MySQL and Redis remain private and use persistent volumes. Railway-generated application, database, and Redis secrets are shared through service references, so deployers do not need to paste credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql | `mysql:8.4.6` | Database |
| redis | `redis:7.2.10-alpine` | Database |
| scheduler | [hryhory-sinenka/railway-reliability-templates](https://github.com/hryhory-sinenka/railway-reliability-templates) (root: /laravel) | Worker |
| web | [hryhory-sinenka/railway-reliability-templates](https://github.com/hryhory-sinenka/railway-reliability-templates) (root: /laravel) | Web service |
| worker | [hryhory-sinenka/railway-reliability-templates](https://github.com/hryhory-sinenka/railway-reliability-templates) (root: /laravel) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_USER` | mysql | (secret) |
| `MYSQL_DATABASE` | mysql | laravel |
| `MYSQL_PASSWORD` | mysql | (secret) |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `APP_ENV` | scheduler | production |
| `DB_PORT` | scheduler | 3306 |
| `APP_ROLE` | scheduler | scheduler |
| `APP_DEBUG` | scheduler | false |
| `REDIS_PORT` | scheduler | 6379 |
| `CACHE_STORE` | scheduler | redis |
| `DB_PASSWORD` | scheduler | (secret) |
| `DB_USERNAME` | scheduler | (secret) |
| `LOG_CHANNEL` | scheduler | stderr |
| `DB_CONNECTION` | scheduler | mysql |
| `REDIS_PASSWORD` | scheduler | (secret) |
| `QUEUE_CONNECTION` | scheduler | redis |
| `APP_ENV` | web | production |
| `DB_PORT` | web | 3306 |
| `APP_ROLE` | web | web |
| `APP_DEBUG` | web | false |
| `REDIS_PORT` | web | 6379 |
| `CACHE_STORE` | web | redis |
| `DB_PASSWORD` | web | (secret) |
| `DB_USERNAME` | web | (secret) |
| `LOG_CHANNEL` | web | stderr |
| `DB_CONNECTION` | web | mysql |
| `REDIS_PASSWORD` | web | (secret) |
| `QUEUE_CONNECTION` | web | redis |
| `APP_ENV` | worker | production |
| `DB_PORT` | worker | 3306 |
| `APP_ROLE` | worker | worker |
| `APP_DEBUG` | worker | false |
| `REDIS_PORT` | worker | 6379 |
| `CACHE_STORE` | worker | redis |
| `DB_PASSWORD` | worker | (secret) |
| `DB_USERNAME` | worker | (secret) |
| `LOG_CHANNEL` | worker | stderr |
| `DB_CONNECTION` | worker | mysql |
| `REDIS_PASSWORD` | worker | (secret) |
| `QUEUE_CONNECTION` | worker | redis |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `redis-server --appendonly yes --requirepass $REDIS_PASSWORD`
- **Volume:** `/data`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/laravel-complete-reliable-community-temp)
