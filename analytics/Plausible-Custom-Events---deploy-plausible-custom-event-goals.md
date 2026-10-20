# Deploy Plausible Custom Events on Railway

Track signups, clicks and goals without cookies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-plausible-custom-event-goals)

## About

Plausible CE and ClickHouse on Railway for site owners who count signups and clicks, not cookies. Covers custom events: the plausible-event-name=Signup class or a plausible() call, and the goal you must create to see them.

Your event data stays in your own Postgres and ClickHouse, not someone else's dashboard. Railway handles the domain, TLS, private IPv6 networking, volumes and the /api/health check. You still own the goal names and the tracking snippet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:24.12-alpine` | Database |
| plausible | `ghcr.io/plausible/community-edition:v3.2.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres superuser password |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Start command:** `sh -c "/entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/plausible`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/deploy-plausible-custom-event-goals)
