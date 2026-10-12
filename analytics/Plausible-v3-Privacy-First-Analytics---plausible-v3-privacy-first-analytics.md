# Deploy Plausible v3 Privacy-First Analytics on Railway

Cookie-free, lightweight web analytics you own, powered by ClickHouse.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plausible-v3-privacy-first-analytics)

## About

Plausible Community Edition is open-source, cookie-free web analytics: a lightweight script, a one-page dashboard and no personal data collection. This community template runs Plausible CE v3 on Railway with Postgres for accounts and ClickHouse for event data, tuned to stay small and inexpensive.

Plausible CE needs three things: the Plausible application (an Elixir web app that serves the dashboard, the tracking script and the event API), a PostgreSQL database for users, sites and settings, and ClickHouse for the high-volume event and session data. This template starts them with pinned versions, generated secrets and a ClickHouse configuration for small machines (console logging, unused system tables removed, small caches). Plausible waits for ClickHouse, creates and migrates both databases on start, and reports health through `/api/health`. Registration is invite-only after the first account, and email can be sent through HTTP-API providers that work on every Railway plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| clickhouse | [baranberkay96/plausible-railway](https://github.com/baranberkay96/plausible-railway) (branch: main) (root: /services/clickhouse) | Database |
| plausible | `ghcr.io/plausible/community-edition:v3.2.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | clickhouse | 8123 | ClickHouse HTTP port; Railway probes /ping. |
| `CLICKHOUSE_DB` | clickhouse | plausible_events_db | Events database created on first boot. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | User created by the official entrypoint (replaces the passwordless default user). |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for CLICKHOUSE_USER (alphanumeric, URL-safe). |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 0 | SQL user management off; Plausible does not need it. |
| `PORT` | plausible | 8000 | HTTP port (Plausible reads PORT when HTTP_PORT is unset). |
| `BASE_URL` | plausible | - | Public URL of this instance. Change when you add a custom domain. |
| `DATABASE_URL` | plausible | - | Postgres (users, sites, settings). |
| `TOTP_VAULT_KEY` | plausible | - | Base64 32-byte key that encrypts 2FA secrets at rest. Never change after first boot. |
| `CLICKHOUSE_HOST` | plausible | - | Used by the start command to wait for ClickHouse. |
| `SECRET_KEY_BASE` | plausible | (secret) | Signs sessions/cookies (>= 64 bytes). Never change after first boot. |
| `DISABLE_REGISTRATION` | plausible | invite_only | true | false | invite_only. CE default: the first account can register, afterwards invite-only. |
| `CLICKHOUSE_DATABASE_URL` | plausible | - | ClickHouse (events, sessions) over the private network. |
| `ENABLE_EMAIL_VERIFICATION` | plausible | false | Require email verification for new users (needs working email). |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c 'i=0; until wget -q -O /dev/null "http://${CLICKHOUSE_HOST}:8123/ping"; do i=$((i+1)); [ "$i" -ge 100 ] && echo "ClickHouse not reachable" && exit 1; echo "waiting for ClickHouse ($i)"; sleep 3; done; /entrypoint.sh db createdb && /entrypoint.sh db migrate && exec /entrypoint.sh run'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Tags:** plausible, web-analytics, privacy, gdpr, google-analytics-alternative · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/plausible-v3-privacy-first-analytics)
