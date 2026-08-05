# Deploy Tianji — Analytics, Uptime & Server Monitoring on Railway

Self-host Tianji — website analytics, uptime & server status in one

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tianji-analytics-monitoring)

## About

Tianji is an open-source, all-in-one insight hub that combines website analytics, uptime monitoring, and server status tracking in a single self-hosted platform. Instead of running Umami for analytics, Uptime Kuma for uptime, and a separate tool for server health — three deployments to maintain — you get all three in one lightweight app with a unified dashboard. It's privacy-first (no cookies, GDPR/CCPA-friendly), so there are no cookie banners to add. This template deploys it with PostgreSQL pre-wired, ready in minutes.

---

Tianji is simple to run, and a few things are worth setting so it's secure and does what you expect from the start.

**Three tools in one — that's the point.** Tianji replaces the common stack of a separate analytics tool, uptime monitor, and server-status dashboard with one app. Website analytics (page views, unique visitors, referrers, events, UTM), uptime monitoring (HTTP/S, TCP, ping, DNS checks with alerts), server status (CPU, memory, disk, load), plus status pages and surveys — all share one dashboard and one database. On Railway that's one service to deploy and pay for instead of three.

**Set `JWT_SECRET` — it secures every login.** Tianji signs authentication tokens with `JWT_SECRET`, so set it to a strong random value and keep it stable. Changing it later invalidates existing sessions. This template generates one for you.

**Lock down registration and change the default admin.** Tianji's default admin is `admin` / `admin` — change that password immediately on first login. Set `ALLOW_REGISTER=false` so the public can't create accounts on your instance; leave it open only if you deliberately want open signup.

**Privacy-first analytics — no cookie banner needed.** Tianji tracks visitors without cookies and is built to be GDPR/CCPA-friendly, so you get Google-Analytics-style insight without a consent banner. You add a small tracking script to your site's header to start collecting.

**Server-status monitoring needs the reporter on each server.** Website analytics and uptime checks work from Tianji alone. To track a server's CPU, memory, and disk, you install Tianji's lightweight reporter daemon on that machine, pointed at your Tianji instance. That's the one extra step for the server-status feature — the analytics and uptime features need nothing installed elsewhere.

Typical cost: **~$5–10/month** on Railway for Tianji and PostgreSQL — cheaper than running three separate monitoring tools. Tianji is Apache-2.0 licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Tianji | `moonrailgun/tianji` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `JWT_SECRET` | Tianji | (secret) | - |
| `ALLOW_OPENAPI` | Tianji | true | - |
| `ALLOW_REGISTER` | Tianji | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Tianji | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/tianji-analytics-monitoring)
