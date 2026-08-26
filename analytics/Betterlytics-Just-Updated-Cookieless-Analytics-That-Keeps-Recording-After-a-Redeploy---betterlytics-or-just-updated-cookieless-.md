# Deploy Betterlytics | (Just Updated) Cookieless Analytics That Keeps Recording After a Redeploy on Railway

Google Analytics alternative whose ClickHouse logins survive a redeploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/betterlytics-or-just-updated-cookieless-)

## About

Betterlytics is a cookieless, privacy-first web analytics platform — a self-hosted Google
Analytics alternative with real-time traffic, funnels, campaign tracking and per-site
dashboards, backed by ClickHouse for event storage and PostgreSQL for accounts and site
configuration.

This template runs the official Betterlytics self-host image behind an in-container nginx
gateway, with PostgreSQL and ClickHouse as separate services, each on its own volume. The
ClickHouse service creates the `backend` and `dashboard` roles and their grants on every
boot rather than only on an empty data directory, so a container recreate does not leave the
application unable to authenticate against its own event store. The administrator account is
seeded from the deploy's variables before the public port is ever opened, and it is
re-applied on each boot, so a redeploy is a working password reset. The tracking endpoint is
rate-limited per client using the first address of `X-Forwarded-For` — Railway's edge address
rotates per request, so a limiter keyed on the socket peer is one shared bucket for the whole
internet. A DB-IP Lite country database is baked into the image, so the Geography breakdown
works with no MaxMind account. A supervisord event listener stops the container when any
managed process dies permanently, so a broken dashboard fails the deploy instead of passing a
healthcheck that only proves the tracking backend answers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `ghcr.io/bon5co/betterlytics-railway-clickhouse:v1.3.5` | Database |
| betterlytics | `ghcr.io/bon5co/betterlytics-railway:v1.3.5` | Web service |
| postgres | `postgres:17.5` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `CLICKHOUSE_BACKEND_PASSWORD` | clickhouse | (secret) |
| `CLICKHOUSE_DASHBOARD_PASSWORD` | clickhouse | (secret) |
| `ADMIN_PASSWORD` | betterlytics | (secret) |
| `NEXTAUTH_SECRET` | betterlytics | (secret) |
| `POSTGRES_PASSWORD` | betterlytics | (secret) |
| `CLICKHOUSE_PASSWORD` | betterlytics | (secret) |
| `TOTP_SECRET_ENCRYPTION_KEY` | betterlytics | (secret) |
| `CLICKHOUSE_BACKEND_PASSWORD` | betterlytics | (secret) |
| `CLICKHOUSE_DASHBOARD_PASSWORD` | betterlytics | (secret) |
| `POSTGRES_SITECONFIG_RO_PASSWORD` | betterlytics | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/betterlytics-or-just-updated-cookieless-)
