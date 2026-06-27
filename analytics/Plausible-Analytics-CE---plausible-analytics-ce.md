# Deploy Plausible Analytics CE on Railway

Privacy-friendly, cookie-free, self-hosted web analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plausible-analytics-ce)

## About

Plausible Analytics is an open-source web analytics tool focused on privacy. It records visits, page views, and traffic sources without cookies or personal data, so a site can run it without a consent banner. Community Edition is the self-hosted build, licensed under AGPLv3. This template deploys Community Edition v3.2.1.

Plausible Community Edition runs as three parts: the Plausible app, a PostgreSQL database for accounts and site settings, and a ClickHouse database for analytics events. Self-hosting it by hand means wiring those together with Docker Compose, writing ClickHouse config files, setting up TLS, generating secrets, and keeping persistent volumes. This template does that work for you on Railway. It provisions managed PostgreSQL, a ClickHouse image tuned for low memory and Railway's private network, and the Plausible app behind an HTTPS domain. Secrets are generated at deploy time, the two databases stay private, and the database migrations run on first start.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Plausible | `ghcr.io/plausible/community-edition:v3.2.1` | Web service |
| ClickHouse | [agafonovim/railway-templates](https://github.com/agafonovim/railway-templates) (root: /plausible/clickhouse) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Plausible | 8000 | Port Railway routes the public domain to; must equal HTTP_PORT. |
| `TMPDIR` | Plausible | /tmp | Writable temp dir for the app. |
| `BASE_URL` | Plausible | - | Public URL of the dashboard. |
| `HTTP_PORT` | Plausible | 8000 | Port Plausible listens on. |
| `LISTEN_IP` | Plausible | 0.0.0.0 | Bind address for the public edge. |
| `DATABASE_URL` | Plausible | - | PostgreSQL connection (accounts, sites). |
| `SECRET_KEY_BASE` | Plausible | (secret) | App secret for sessions/encryption. |
| `DISABLE_REGISTRATION` | Plausible | invite_only | Signup policy; set to true after creating the first admin. |
| `CLICKHOUSE_DATABASE_URL` | Plausible | - | ClickHouse connection (analytics events). |
| `ENABLE_EMAIL_VERIFICATION` | Plausible | false | Require email verification on signup (needs SMTP). |
| `CLICKHOUSE_DB` | ClickHouse | plausible_events_db | Database holding Plausible analytics events. |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | User Plausible connects to ClickHouse as. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse user password. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enable SQL-driven access management. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "/entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/plausible-analytics-ce)
