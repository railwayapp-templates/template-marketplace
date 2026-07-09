# Deploy Plausible CE on Railway

Deploy and Host Plausible CE with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plausible-ce-1)

## About

Plausible Community Edition is a privacy-friendly, open-source web analytics platform. It's a lightweight, cookie-free alternative to Google Analytics, designed for self-hosting. Built on Elixir/Phoenix with ClickHouse for event storage, it serves real-time dashboards while remaining GDPR/CCPA/PECR compliant out of the box.

This template deploys Plausible CE on Railway as a 3-sibling-service architecture: the Plausible CE app itself, ClickHouse for high-performance event storage, and PostgreSQL for application metadata. Both data services use Railway volumes for persistence. Internal networking is wired automatically (postgres.railway.internal, clickhouse.railway.internal). The template ships with literal credential defaults so a one-click deploy boots into a working state — no manual env-var hunting. First deploy takes ~60-90 seconds (Postgres initdb + Plausible CE DB migrations + Elixir release boot).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plausible-ce | [INAPP-Mobile/railway-plausible](https://github.com/INAPP-Mobile/railway-plausible) | Web service |
| postgres | `postgres:16-alpine` | Database |
| ClickHouse | `clickhouse/clickhouse-server:24.12-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BASE_URL` | plausible-ce | - | Public URL of deployed Plausible instance. https:// prefix required. |
| `DATABASE_URL` | plausible-ce | postgresql://postgres:postgres@postgres.railway.internal:5432/plausible | PostgreSQL connection URL to sibling postgres service. Literal credentials match Postgres tile defaults. |
| `SECRET_KEY_BASE` | plausible-ce | (secret) | 64-byte random string for cookie signing. Auto-generated per deploy. |
| `DISABLE_REGISTRATION` | plausible-ce | false | Set to true after creating admin user to prevent public signups. |
| `CLICKHOUSE_DATABASE_URL` | plausible-ce | http://plausible:plausible2026@clickhouse.railway.internal:8123/plausible | ClickHouse connection URL. Literal credentials match ClickHouse tile defaults. |
| `ENABLE_EMAIL_VERIFICATION` | plausible-ce | false | Set to true to require email verification on signup. |
| `POSTGRES_DB` | postgres | plausible | Initial database. Must match Plausible CE DATABASE_URL path component. |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name. Must match Plausible CE DATABASE_URL user portion. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres password. Literal 'postgres' for marketplace-safe first-time deploy auth. |
| `CLICKHOUSE_DB` | ClickHouse | plausible | ClickHouse database name. |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user. Matches Plausible CE CLICKHOUSE_DATABASE_URL user portion. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse password. Literal 'plausible2026' for marketplace-safe deploys. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`
- **Volume:** `/var/lib/clickhouse`

**Category:** Other · **Languages:** Python, Dockerfile, TypeScript, Shell

[View on Railway →](https://railway.com/deploy/plausible-ce-1)
