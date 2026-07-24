# Deploy Umami Analytics (Privacy-First) on Railway

Privacy-first Google Analytics alternative. Umami v3 + Postgres 17.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-analytics-privacy-first)

## About

Self-host Umami — the privacy-first, cookieless Google Analytics alternative — in one click. This template runs the current Umami v3 (many older templates are stuck on the discontinued v2 tag scheme) with PostgreSQL 17, generated secrets, and telemetry disabled.

Umami is a lightweight web analytics platform: add one small script tag to your site and get pageviews, referrers, devices, and events in a clean dashboard — no cookies, no personal data collection, GDPR-friendly without consent banners. This template pins `ghcr.io/umami-software/umami:3.2.0` (the PostgreSQL build of the current major version), stores all data in a private-only Postgres 17 with a persistent volume, generates the `APP_SECRET` per deploy, and turns off telemetry and update checks. Umami itself is stateless — everything lives in the database, making backups a single `pg_dump` or a Railway volume backup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umami | `ghcr.io/umami-software/umami:3.2.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | umami | 3000 | Port Umami listens on. Must match the public domain target port (3000). Do not change. |
| `APP_SECRET` | umami | (secret) | Auto-generated secret used to hash session data. Do not change after first deploy. |
| `DATABASE_URL` | umami | - | Postgres connection string, wired to the bundled Postgres service. Do not change. |
| `DISABLE_UPDATES` | umami | 1 | Disables update checks from the Umami dashboard. |
| `DISABLE_TELEMETRY` | umami | 1 | Disables Umami anonymous telemetry. |
| `POSTGRES_DB` | Postgres | umami | Database name created on first boot. |
| `DATABASE_URL` | Postgres | - | Connection string used by Umami over private networking. |
| `POSTGRES_USER` | Postgres | (secret) | Database user for Umami. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password. |

## Configuration

- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-analytics-privacy-first)
