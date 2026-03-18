# Deploy Plausible Analytics | Open Source Google Analytics Alternative on Railway

Self-host Plausible Analytics — privacy-first, GDPR-Compliant Web Analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/plausible)

## About

This Railway template deploys a fully self-hosted **Plausible Community Edition (CE)** instance — a privacy-first, open-source Google Analytics alternative — with all three required services pre-wired and ready to go. The stack includes the Plausible CE app (`ghcr.io/plausible/community-edition`), a PostgreSQL database for user accounts and site settings, and a ClickHouse database for analytics event storage. Services communicate over Railway's private network, so no analytics data is exposed externally.

![Plausible Railway Arch](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773212100/plausible_railway_arch_ybzzyn.png)

---

Plausible CE is the self-hosted, AGPL-licensed release of [Plausible Analytics](https://github.com/plausible/analytics) — a lightweight web analytics tool that collects no personal data, sets no cookies, and requires no consent banners. It's fully compliant with GDPR, CCPA, and PECR out of the box.

**Key features:**
- Tracking script under 1 KB — 75x smaller than Google Analytics, zero page-speed impact
- Cookieless tracking — no cookie banners required under GDPR
- Single-page dashboard with all essential metrics: visitors, pageviews, sources, top pages, devices, locations
- Custom events, goals, funnels, and UTM campaign tracking
- Google Search Console integration
- Real-time visitor view
- Weekly/monthly email reports
- Public dashboard sharing and embeds

**Architecture:** Plausible CE is an Elixir/Phoenix application. PostgreSQL stores users, sites, and settings. ClickHouse stores all analytics event data — its columnar architecture makes aggregation queries dramatically faster than Postgres at scale. On Railway, all three services communicate over the private `.railway.internal` network; only the Plausible web app is exposed publicly.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| clickhouse | [railwayapp-templates/plausible](https://github.com/railwayapp-templates/plausible) (root: packages/clickhouse) | Database |
| plausible | `ghcr.io/plausible/community-edition:v2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `PORT` | clickhouse | 8123 | HTTP API port for ClickHouse |
| `CLICKHOUSE_DB` | clickhouse | plausible_events_db | Database storing analytics events |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Username for ClickHouse authentication |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for ClickHouse user |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 | Enable SQL-based access control |
| `BASE_URL` | plausible | - | Public URL of Plausible instance |
| `DATABASE_URL` | plausible | - | Postgres connection string for Plausible |
| `SECRET_KEY_BASE` | plausible | (secret) | Secret used for encryption and sessions |
| `DISABLE_REGISTRATION` | plausible | invite_only | Restrict account creation to invites |
| `CLICKHOUSE_DATABASE_URL` | plausible | - | ClickHouse database connection string |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `sh -c "/entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/template/plausible)
