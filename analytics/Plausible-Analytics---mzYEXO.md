# Deploy Plausible Analytics on Railway

An easy to use, privacy-friendly, open-source Google Analytics alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mzYEXO)

## About

A simple, open-source, lightweight (&lt;1 KB) and privacy-friendly alternative to Google Analytics. Plausible is trusted by 10,000+ paying subscribers to deliver website and business insights without compromising user privacy.

Hosting Plausible Analytics involves deploying three interconnected services: the main Plausible application for user interaction and dashboard access, ClickHouse database for efficient analytics data storage and querying, and PostgreSQL for user accounts and metadata. This template uses the Plausible Analytics Community Edition and handles all service configuration automatically. The setup includes custom ClickHouse tuning for Railway's infrastructure and optional SMTP configuration for email notifications and weekly reports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | [railwayapp-templates/plausible](https://github.com/railwayapp-templates/plausible) (root: /packages/clickhouse) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Plausible Analytics CE | `ghcr.io/plausible/community-edition:v2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_DB` | ClickHouse | plausible_events_db | the database name for ClickHouse. Do not change. |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | username for Clickhouse DB. Do not change. |
| `CLICKHOUSE_DOMAIN` | ClickHouse | - | The public ClickHouse domain. Only set if you make the service public. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | the password to be used with ClickHouse |
| `CLICKHOUSE_PRIVATE_DOMAIN` | ClickHouse | - | The private (railway internal only) ClickHouse domain. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | ClickHouse | true | Required for private alpine networking |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enables authentication. Do not change.  |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | Plausible Analytics CE | 8000 | port that the Plausible Analytics web app is served over |
| `BASE_URL` | Plausible Analytics CE | - | the base url for your app. Must start with https://. |
| `ECTO_IPV6` | Plausible Analytics CE | true | Enables plausible to talk to PostgreSQL over IPv6 |
| `DATABASE_URL` | Plausible Analytics CE | - | Connection string for the PostgreSQL database |
| `ECTO_CH_IPV6` | Plausible Analytics CE | true | Tells Plausible Analytics to use IPV6 networking with ClickHouse. Required for private networking.   |
| `SMTP_RETRIES` | Plausible Analytics CE | 3 | Number of retries to make until mailer gives up. |
| `TOTP_VAULT_KEY` | Plausible Analytics CE | - | Configures the secret used for encrypting TOTP secrets at rest |
| `SECRET_KEY_BASE` | Plausible Analytics CE | (secret) | secret used for generating password hashes. |
| `CLICKHOUSE_DATABASE_URL` | Plausible Analytics CE | - | Connection string for Clickhouse DB.  |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Plausible Analytics CE | true | required for access to clickhouse |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "while ! nc -z ${CLICKHOUSE_PRIVATE_DOMAIN} 8123 ; do sleep 5 ; done && /entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/mzYEXO)
