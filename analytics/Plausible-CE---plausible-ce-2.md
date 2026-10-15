# Deploy Plausible CE on Railway

Cookie-free, privacy-friendly Google Analytics alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plausible-ce-2)

## About

Plausible CE is the free, AGPL-3.0 self-hosted edition of Plausible Analytics: a lightweight, cookie-free Google Analytics alternative with a one-page dashboard. This template runs the official v3.2.1 image with Postgres for accounts and ClickHouse for events, so you own every pageview and skip the consent banner.

The template deploys three services. `plausible` runs `ghcr.io/plausible/community-edition:v3.2.1` on port 8000 with a public HTTPS domain and a volume at `/var/lib/plausible`. Railway Postgres holds users, sites, goals and settings. ClickHouse (`clickhouse/clickhouse-server:24.12-alpine`, volume `/var/lib/clickhouse`) stores the events. It mirrors the official compose file, so upstream notes apply.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ClickHouse | `clickhouse/clickhouse-server:24.12-alpine` | Database |
| plausible | `ghcr.io/plausible/community-edition:v3.2.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres superuser password |
| `CLICKHOUSE_DB` | ClickHouse | plausible_events_db | ClickHouse database for Plausible events |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user name |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse user password |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enable SQL access management for the default user |
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

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `sh -c "/entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/plausible`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/plausible-ce-2)
