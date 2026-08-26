# Deploy Betterlytics — Cookieless, GDPR-Compliant Web Analytics on Railway

Self-host Betterlytics — fast cookieless analytics, no banner

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/betterlytics-analytics)

## About

Betterlytics is a modern, cookieless, privacy-first web analytics platform — a fast, GDPR-compliant alternative to Google Analytics and Plausible, built with Rust, ClickHouse, and Next.js. It measures traffic, not individuals: no cookies, no personal data, no consent banner required, and a clean single-page dashboard for real-time stats. This template deploys your own Betterlytics instance so you own every pageview — analytics data that stays entirely on your infrastructure, with a lightweight tracking script and a fast columnar backend built for scale.

---

Betterlytics is a modern analytics stack, and its speed comes from ClickHouse — knowing what that means for your deployment is the key, and this template sets it up.

**Cookieless and GDPR-compliant by design — no banner needed.** Betterlytics measures traffic without cookies and without storing personal data or IP addresses, so it's compliant with GDPR, CCPA, and PECR out of the box, and doesn't trigger the cookie-consent banner requirement. Add a small tracking script to your site and you get pageviews, sources, and events — without the privacy and compliance overhead of Google Analytics.

**Built on Rust and ClickHouse for speed.** Unlike PHP- or Node-based analytics tools, Betterlytics uses a Rust backend for fast, efficient event ingestion and ClickHouse for storage — a columnar database purpose-built for analytics queries. This is what keeps the dashboard responsive and queries fast even as your pageview volume grows into the millions, where row-based databases would slow down.

**ClickHouse needs headroom — size the plan accordingly.** ClickHouse is powerful but not featherweight: it wants meaningful memory to run well, so provision a Railway plan with adequate RAM rather than the smallest tier. This is the main operational consideration — Betterlytics is fast, but that speed comes from a real analytics database, so give it room, and scale the memory for high-traffic sites.

**Your analytics data stays yours.** Every event lives in your ClickHouse instance on your Railway infrastructure — never sent to a third party, never sold, never used to build advertising profiles. Complete data sovereignty over your visitors' activity, which matters for EU companies, healthcare, fintech, and anyone privacy-conscious. Betterlytics presents traffic, sources, pages, and events on one modern single-page dashboard — no nested reports or training required — and tracks unlimited sites from one instance at flat cost.

Because Betterlytics is a newer, fast-moving project, pin the image version you deploy and check the repository for the current environment variables and setup steps before deploying, so your configuration matches the latest release.

Typical cost: **~$10–20/month** on Railway for the app and ClickHouse, scaling with traffic and the memory ClickHouse needs. Betterlytics is open source and free to self-host.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | [OpenSource-Templates/Betterlytics](https://github.com/OpenSource-Templates/Betterlytics) | Database |
| betterlytics | [OpenSource-Templates/Betterlytics](https://github.com/OpenSource-Templates/Betterlytics) | Worker |
| postgres | [OpenSource-Templates/Betterlytics](https://github.com/OpenSource-Templates/Betterlytics) | Database |

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
| `DOMAIN` | betterlytics | - | DOMAIN |
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
- **Volume:** `/var/lib/postgresql`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/betterlytics-analytics)
