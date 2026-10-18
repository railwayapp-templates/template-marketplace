# Deploy Plausible vs Fathom on Railway

Self-hosted Plausible CE vs Fathom's paid SaaS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-plausible-vs-fathom-analytics)

## About

This template runs self-hosted Plausible CE on Railway with Postgres and ClickHouse, so you pay for resources instead of Fathom's SaaS, whose $15/month entry plan covers 100,000 pageviews across 50 sites.

This template runs Plausible Community Edition v3.2.1, an Elixir/Phoenix app, with Railway Postgres for users and settings and ClickHouse for raw events.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plausible | `ghcr.io/plausible/community-edition:v3.2.1` | Web service |
| ClickHouse | `clickhouse/clickhouse-server:24.12-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | plausible | 8000 | Port the Plausible web server listens on |
| `TMPDIR` | plausible | /var/lib/plausible/tmp | Temporary files directory on the volume |
| `BASE_URL` | plausible | - | Public URL of your Plausible instance |
| `HTTP_PORT` | plausible | 8000 | HTTP port for Plausible |
| `LISTEN_IP` | plausible | :: | IP address Plausible binds to |
| `DATABASE_URL` | plausible | - | Postgres connection string for Plausible |
| `ECTO_CH_IPV6` | plausible | true | Use IPv6 to reach ClickHouse over private network |
| `TOTP_VAULT_KEY` | plausible | - | Key that encrypts 2FA secrets; keep stable |
| `SECRET_KEY_BASE` | plausible | (secret) | Secret used to sign sessions; keep stable |
| `DISABLE_REGISTRATION` | plausible | invite_only | Registration mode, e.g. invite_only |
| `CLICKHOUSE_DATABASE_URL` | plausible | - | ClickHouse connection URL for event storage |
| `ENABLE_EMAIL_VERIFICATION` | plausible | false | Require email verification on signup |
| `CLICKHOUSE_DB` | ClickHouse | plausible_events_db | ClickHouse database for Plausible events |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user name |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse user password |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enable SQL access management for the default user |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres superuser password |

## Configuration

- **Start command:** `sh -c "/entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/plausible`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/deploy-plausible-vs-fathom-analytics)
