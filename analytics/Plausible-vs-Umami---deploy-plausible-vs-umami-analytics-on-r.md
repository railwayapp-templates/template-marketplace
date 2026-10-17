# Deploy Plausible vs Umami on Railway

Plausible CE vs Umami, both self-hosted analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-plausible-vs-umami-analytics-on-r)

## About

Plausible CE and Umami are open-source, cookieless web analytics tools you can self-host. Plausible uses Postgres for config and ClickHouse for events, scaling to high traffic. Umami runs on one PostgreSQL database, simpler but capped sooner on huge volumes.

Plausible CE is AGPL-3.0, Elixir, with Postgres for users/sites/goals and ClickHouse for events. The official image `ghcr.io/plausible/community-edition:v3.2.1` runs the same start command as upstream. The Railway template includes a public HTTPS domain, Postgres, ClickHouse, and volumes.

Plausible's dashboard covers top pages, referrers, countries, devices, live view. Goals, custom events, outbound links, downloads, form submissions are built in. v3 added scroll depth, engagement time, segments, team roles. Umami offers a clean dashboard with pageviews, referrers, custom events, but fewer advanced features. Neither ships marketing funnels.

Pick Umami for a single-database, MIT setup on lower traffic. Pick Plausible CE for ClickHouse scale, Stats API, or documented daily rotating salt hashing.

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

[View on Railway →](https://railway.com/deploy/deploy-plausible-vs-umami-analytics-on-r)
