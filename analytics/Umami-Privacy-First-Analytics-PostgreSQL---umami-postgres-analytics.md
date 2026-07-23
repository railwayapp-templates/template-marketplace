# Deploy Umami — Privacy-First Analytics [PostgreSQL] on Railway

Self-hosted Google Analytics alternative — no cookies, GDPR-ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-postgres-analytics)

## About

Umami is an open-source, privacy-first analytics platform — a lightweight alternative to Google Analytics that tracks visitors without cookies, without personal data, and without sending anything to a third party. It is GDPR, CCPA, and PECR compliant by default, needs no cookie consent banner, and loads from a tracking script a fraction of the size of Google's.

This template deploys Umami with a managed PostgreSQL database, wired together and ready to use in minutes.

---

Self-hosting Umami means your visitor data never leaves infrastructure you control. Google Analytics ships every page view to Google's servers and hands you sampled data in return; Umami keeps the full, unsampled dataset in your own PostgreSQL database, exportable at any time.

Running it yourself normally means a Node.js app, a PostgreSQL instance, connection strings, a session secret, SSL, and automatic migrations to manage. This template collapses all of that into a two-service Railway project. Umami applies its own database migrations on first boot, so there is no schema step — the dashboard is live as soon as the build finishes.

Typical cost: **~$5–10/month** on Railway's Hobby plan for both services, flat regardless of traffic volume. There is no per-event billing and no monthly subscription — a sharp contrast to hosted analytics tools that charge per pageview once you outgrow the free tier.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umami | `umamisoftware/umami:postgresql-latest` | Database |
| Valkey | `valkey/valkey:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOSTNAME` | umami | :: | - |
| `APP_SECRET` | umami | (secret) | - |
| `DATABASE_TYPE` | umami | postgres | - |
| `PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK` | umami | 1 | - |
| `VALKEY_PORT` | Valkey | 6379 | - |
| `VALKEY_USER` | Valkey | (secret) | - |
| `VALKEY_PASSWORD` | Valkey | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/umami-postgres-analytics)
