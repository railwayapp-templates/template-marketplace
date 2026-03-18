# Deploy Maybe on Railway

The personal finance app for everyone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dFsiOp)

## About

# Maybe Finance

The personal finance app for everyone

v0.5.0 (Updated 05/06/2025)

<img src="https://github.com/user-attachments/assets/13fc5ef4-ce0f-4073-a163-9dbc3eb4c8e5" alt="maybe_hero" width="1190">

Website: https://maybe.co

Repository: https://github.com/maybe-finance/maybe

Disclaimer:

Maybe is distributed under an AGPLv3 license. " Maybe" is a trademark of Maybe Finance, Inc.

"Joseph Ho" is not affiliated with Maybe Finance, Inc. in any way or form.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Sidekiq | `ghcr.io/maybe-finance/maybe:latest` | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |
| Maybe | `ghcr.io/maybe-finance/maybe:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_HOST` | Sidekiq | postgres.railway.internal |
| `DB_PORT` | Sidekiq | 5432 |
| `POSTGRES_DB` | Sidekiq | railway |
| `SELF_HOSTED` | Sidekiq | true |
| `POSTGRES_USER` | Sidekiq | (secret) |
| `RAILS_FORCE_SSL` | Sidekiq | false |
| `SECRET_KEY_BASE` | Sidekiq | (secret) |
| `RAILS_ASSUME_SSL` | Sidekiq | false |
| `POSTGRES_PASSWORD` | Sidekiq | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | Redis | no |
| `DB_HOST` | Maybe | postgres.railway.internal |
| `DB_PORT` | Maybe | 5432 |
| `POSTGRES_DB` | Maybe | railway |
| `SELF_HOSTED` | Maybe | true |
| `POSTGRES_USER` | Maybe | (secret) |
| `RAILS_FORCE_SSL` | Maybe | false |
| `SECRET_KEY_BASE` | Maybe | (secret) |
| `RAILS_ASSUME_SSL` | Maybe | false |
| `POSTGRES_PASSWORD` | Maybe | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `bundle exec sidekiq`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `sh -c "sleep 3 && /rails/bin/docker-entrypoint ./bin/rails server"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/template/dFsiOp)
