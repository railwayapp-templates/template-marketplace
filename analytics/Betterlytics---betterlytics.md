# Deploy Betterlytics on Railway

Betterlytics is a cookieless analytics platform GDPR-compliant.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/betterlytics)

## About

Betterlytics is a privacy-first, cookieless Google Analytics alternative. A tracking script under 2KB captures pageviews, funnels, geography, Core Web Vitals, and errors without cookies or consent banners. This template self-hosts the full stack on Railway — Next.js dashboard, ingestion backend, Postgres, and ClickHouse.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/betterlytics)

Hosting Betterlytics means running three containers on Railway’s private network: a public app (nginx + Next.js dashboard + ingestion backend), Postgres for accounts and site config, and ClickHouse for high-volume events. Railway terminates TLS, so the app speaks HTTP internally (`HTTP_SCHEME=http`, `FORCE_HTTP_SCHEME=https`). You attach two volumes — Postgres at `/var/lib/postgresql/data` and ClickHouse at `/var/lib/clickhouse` — set one shared `SECRET_BASE` on all three services plus `DOMAIN` on the app, and let the entrypoint wait for both databases, run migrations, then start supervisord. First boot can take a few minutes. After that, add a site in the UI and drop `/analytics.js` on your pages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | [AnarchistManifesto/Betterlytics](https://github.com/AnarchistManifesto/Betterlytics) (root: /clickhouse) | Database |
| betterlytics | [AnarchistManifesto/Betterlytics](https://github.com/AnarchistManifesto/Betterlytics) (root: /betterlytics) | Web service |
| postgres | [AnarchistManifesto/Betterlytics](https://github.com/AnarchistManifesto/Betterlytics) (root: /postgres) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_BASE` | clickhouse | (secret) | Secret key used by ClickHouse-related services for secure authentication and encryption. |
| `CLICKHOUSE_DB` | clickhouse | analytics | Name of the ClickHouse database used by Betterlytics. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Username for the ClickHouse database connection. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for the ClickHouse database user. |
| `CLICKHOUSE_BACKEND_USER` | clickhouse | (secret) | Username used by Betterlytics for backend access to ClickHouse. |
| `CLICKHOUSE_DASHBOARD_USER` | clickhouse | (secret) | Username used for ClickHouse dashboard access. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 | Enables ClickHouse default access management. |
| `DOMAIN` | betterlytics | - | Public domain where Betterlytics is accessible. Railway automatically provides this domain. |
| `ADMIN_EMAIL` | betterlytics | admin@gmail.com | Email address used for the Betterlytics administrator account. |
| `HTTP_SCHEME` | betterlytics | http | HTTP scheme used by Betterlytics for application URLs. |
| `SECRET_BASE` | betterlytics | (secret) | Secret key used by Betterlytics for application security, sessions, and encryption. |
| `DATABASE_URL` | betterlytics | - | PostgreSQL connection URL used by Betterlytics. |
| `CLICKHOUSE_DB` | betterlytics | analytics | Name of the ClickHouse database used to store Betterlytics analytics data. |
| `ENABLE_EMAILS` | betterlytics | false | Enables or disables Betterlytics email functionality. |
| `POSTGRES_HOST` | betterlytics | postgres.railway.internal | Private hostname of the PostgreSQL service used by Betterlytics. |
| `ADMIN_PASSWORD` | betterlytics | (secret) | Password used for the Betterlytics administrator account. |
| `CLICKHOUSE_URL` | betterlytics | - | URL used by Betterlytics to connect to ClickHouse. |
| `CLICKHOUSE_HOST` | betterlytics | clickhouse.railway.internal | Private hostname of the ClickHouse service used by Betterlytics. |
| `CLICKHOUSE_USER` | betterlytics | (secret) | Username Betterlytics uses to connect to ClickHouse. |
| `DEFAULT_LANGUAGE` | betterlytics | en | Default language used by the Betterlytics interface. |
| `FORCE_HTTP_SCHEME` | betterlytics | https | Forces Betterlytics to use the specified HTTP scheme when generating application URLs. |
| `ENABLE_GEOLOCATION` | betterlytics | false | Enables or disables visitor geolocation features. |
| `CLICKHOUSE_PASSWORD` | betterlytics | (secret) | Password Betterlytics uses to authenticate with ClickHouse. |
| `CLICKHOUSE_BACKEND_USER` | betterlytics | (secret) | ClickHouse username used for Betterlytics backend operations. |
| `ENABLE_UPTIME_MONITORING` | betterlytics | false | Enables or disables Betterlytics uptime monitoring. |
| `CLICKHOUSE_DASHBOARD_USER` | betterlytics | (secret) | ClickHouse username used for dashboard access. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | betterlytics | 1 | Enables ClickHouse default access management. |
| `POSTGRES_DB` | postgres | dashboard | Name of the PostgreSQL database used by Betterlytics. |
| `SECRET_BASE` | postgres | (secret) | Secret value used by the PostgreSQL service configuration. |
| `POSTGRES_USER` | postgres | (secret) | Username for the PostgreSQL database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password for the PostgreSQL database user. |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/betterlytics)
