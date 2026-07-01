# Deploy plausible on Railway

Privacy-friendly open-source web analytics — GDPR compliant, no cookie

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plausible-2)

## About

Deploy **Plausible Community Edition** on Railway in minutes. Plausible is a lightweight, open-source web analytics platform that doesn't use cookies and is fully compliant with GDPR, CCPA, and PECR. This template sets up Plausible CE with ClickHouse for high-performance analytics storage and PostgreSQL for metadata.

Plausible CE is the self-hosted version of [Plausible Analytics](https://plausible.io), a privacy-first alternative to Google Analytics. Unlike traditional analytics tools, Plausible:

- **No cookies required** — No cookie consent banners needed
- **GDPR/CCPA compliant** out of the box
- **Lightweight script** — &lt; 1KB, loads instantly
- **ClickHouse-powered** — Handles millions of page views
- **27.4K+ GitHub stars** — Battle-tested by thousands

This Railway template deploys three components:

| Component | Purpose | Image |
|-----------|---------|-------|
| **Plausible CE** | Web analytics application | `ghcr.io/plausible/community-edition:v3.2.1` |
| **ClickHouse** | Column-oriented analytics database | `clickhouse/clickhouse-server:24.12-alpine` |
| **PostgreSQL** | Metadata and user data storage | Railway plugin |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse/clickhouse-server:24.12-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| plausible-ce | [INAPP-Mobile/railway-plausible](https://github.com/INAPP-Mobile/railway-plausible) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `SECRET_KEY_BASE` | plausible-ce | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/plausible-2)
