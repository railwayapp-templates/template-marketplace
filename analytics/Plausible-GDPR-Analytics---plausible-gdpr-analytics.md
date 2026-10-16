# Deploy Plausible GDPR Analytics on Railway

Cookieless, GDPR-friendly web analytics you host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plausible-gdpr-analytics)

## About

Plausible GDPR Analytics is cookieless web analytics you run yourself. This template deploys Plausible Community Edition v3.2.1 with Railway Postgres and ClickHouse in one project. You pick the region, so visitor data stays where you put it, and no third-party analytics vendor ever sees your visitors.

It's the same three-service stack as the official community-edition compose file: the Elixir app (`ghcr.io/plausible/community-edition:v3.2.1`), Railway Postgres for users, sites and goals, and ClickHouse (`clickhouse/clickhouse-server:24.12-alpine`) for events. Plausible sets no cookies, uses no localStorage, and creates no persistent identifiers. Unique visitors come from `hash(daily_salt + website_domain + ip_address + user_agent)`; the salt is rotated and deleted every 24 hours, so nobody is recognisable across days, and raw IPs and User-Agent strings are never stored. CE and Cloud share that logic; only the database owner differs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:24.12-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| plausible | `ghcr.io/plausible/community-edition:v3.2.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_DB` | ClickHouse | plausible_events_db | ClickHouse database for Plausible events |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user name |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse user password |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enable SQL access management for the default user |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres superuser password |
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

- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "/entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/plausible`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/plausible-gdpr-analytics)
