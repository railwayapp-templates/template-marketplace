# Deploy Maybe on Railway

The OS for your personal finances

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_mFlP4)

## About

Maybe is an OS for your personal finances by a small team alongside an incredible community.

# Deploying

This template should give you a minimal Maybe install. After creating your account, you should consider setting `REQUIRE_INVITE_CODE` to `true` to prevent others from signing up.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Maybe | `ghcr.io/maybe-finance/maybe:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Maybe | 3000 | - |
| `DB_PORT` | Maybe | 5432 | - |
| `SELF_HOSTED` | Maybe | true | - |
| `POSTGRES_USER` | Maybe | (secret) | - |
| `SYNTH_API_KEY` | Maybe | (secret) | For stock tickers |
| `RAILS_FORCE_SSL` | Maybe | false | - |
| `SECRET_KEY_BASE` | Maybe | (secret) | - |
| `RAILS_ASSUME_SSL` | Maybe | false | - |
| `POSTGRES_PASSWORD` | Maybe | (secret) | - |
| `GOOD_JOB_EXECUTION_MODE` | Maybe | async | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Start command:** `sh -c "sleep 3 && /rails/bin/docker-entrypoint ./bin/rails server"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/_mFlP4)
