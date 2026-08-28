# Deploy Plausible CE | (Just Updated) Google Analytics Alternative Nobody Else Can Claim on Railway

Privacy-first analytics. Owner account seeded before the URL goes live.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plausible-ce-or-just-updated-google-anal)

## About

Plausible Community Edition is a lightweight, privacy-first web analytics
platform and a self-hosted alternative to Google Analytics: no cookies, no
personal data collection, a single script tag, and a dashboard your team can
read without training. This template deploys Plausible CE v3.2.1 together with
its PostgreSQL and ClickHouse databases, and — unlike a stock deploy — it seeds
your owner account before the public URL ever serves a request.

Plausible CE is an Elixir/Phoenix application backed by two databases:
PostgreSQL for accounts, sites and settings, and ClickHouse for the event
stream that powers the dashboards. Hosting it means running all three, wiring
the connection strings, keeping a durable disk under each datastore, and
running the schema migrations on every upgrade.

It also means dealing with first launch. A stock Plausible image starts with an
empty user table, and while that is true Plausible deliberately opens
registration to whoever arrives first — the guard that would normally close
sign-ups is bypassed during first launch, so `DISABLE_REGISTRATION` does not
help. On a public URL that means the first stranger who loads `/register` gets
the owner account, and the deployer is locked out for good, because Plausible's
password recovery is an emailed link and a fresh deployment has no mail server.

This template removes that window. Migrations run, the owner account and its
team are created, and only then is the HTTP port opened, so the very first
request the public URL serves already redirects `/register` to `/login`. The
owner password is re-applied on every boot, which makes a redeploy a working
password reset — the recovery path a self-hosted analytics instance otherwise
does not have. Both databases carry volumes, every image is pinned, and the
deploy form asks for nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| plausible | `ghcr.io/bon5co/plausible-railway:v3.2.1` | Web service |
| clickhouse | `clickhouse/clickhouse-server:24.12-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `SECRET_KEY_BASE` | plausible | (secret) |
| `PLAUSIBLE_ADMIN_PASSWORD` | plausible | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/plausible-ce-or-just-updated-google-anal)
