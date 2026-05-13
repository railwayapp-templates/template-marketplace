# Deploy Rybbit | Open Source Modern Google Analytics Alternative on Railway

Self-Host Rybbit. Product analytics, session replay, funnels & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rybbit-analytics)

## About

Rybbit is an open-source, cookieless, privacy-friendly web analytics platform — a clean self-hosted alternative to Google Analytics, Plausible, and Umami. It tracks pageviews, sessions, custom events, funnels, retention, and full session replay without third-party cookies, and gives you a sleek real-time dashboard your team can actually use.

This Railway template deploys Rybbit on Railway with everything wired up: a Rybbit backend (Fastify + Better Auth), a Rybbit Next.js client dashboard, a ClickHouse analytics column store, a Railway-managed Postgres for user accounts and configuration, and a Caddy reverse proxy that serves the whole stack from a single public URL.

![Rybbit on Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778608057/cda10247-4266-4b2d-8603-e5e93a54748d.png)

Rybbit is a modern web analytics engine built around ClickHouse for fast, cheap event storage and a Next.js dashboard for visualization. Self-hosting Rybbit on Railway means your analytics data never leaves your infrastructure, you skip cookie consent banners (Rybbit is cookieless by design), and you pay only for compute — no per-event pricing, no data caps.

Key features include:
- Real-time pageviews, sessions, and unique visitor counts
- Cookieless, GDPR/CCPA/PECR-friendly tracking
- Custom events, funnels, retention cohorts, and goals
- Full session replay with privacy controls
- Geo, device, browser, OS, UTM, and referrer breakdowns
- Organizations + multi-user access with role-based permissions
- Embeddable tracking script under 30 KB

Because the stack is multi-service (backend, client, ClickHouse, Postgres, proxy), the template ships a Caddy reverse proxy that serves both the dashboard and the API from a single domain — required because Rybbit's Better Auth pins `trustedOrigins` to a single origin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | `ghcr.io/rybbit-io/rybbit-backend:latest` | Worker |
| Client | `ghcr.io/rybbit-io/rybbit-client:latest` | Worker |
| ClickHouse | `clickhouse/clickhouse-server:25.4.2` | Database |
| Proxy | `caddy:2.10.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Backend | 3001 | Backend HTTP port |
| `BASE_URL` | Backend | - | Public-facing app URL |
| `NODE_ENV` | Backend | production | Node runtime mode |
| `POSTGRES_DB` | Backend | - | Postgres database name |
| `CLICKHOUSE_DB` | Backend | - | ClickHouse database name |
| `POSTGRES_HOST` | Backend | - | Postgres private host |
| `POSTGRES_PORT` | Backend | - | Postgres port |
| `POSTGRES_USER` | Backend | (secret) | Postgres user |
| `DISABLE_SIGNUP` | Backend | false | Allow first-user signup (flip to true after admin) |
| `CLICKHOUSE_HOST` | Backend | - | ClickHouse HTTP URL |
| `CLICKHOUSE_USER` | Backend | (secret) | ClickHouse user |
| `DISABLE_TELEMETRY` | Backend | true | Opt out of upstream telemetry |
| `POSTGRES_PASSWORD` | Backend | (secret) | Postgres password |
| `BETTER_AUTH_SECRET` | Backend | (secret) | Session signing secret |
| `CLICKHOUSE_PASSWORD` | Backend | (secret) | ClickHouse password reference |
| `PORT` | Client | 3002 | Client HTTP port |
| `NODE_ENV` | Client | production | Node runtime mode |
| `NEXT_PUBLIC_BACKEND_URL` | Client | - | Browser-side API base URL |
| `NEXT_PUBLIC_DISABLE_SIGNUP` | Client | false | Hide signup UI when locked down |
| `CLICKHOUSE_DB` | ClickHouse | analytics | Analytics database name |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user (Rybbit only supports default) |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | ClickHouse password |
| `PORT` | Proxy | 8080 | Caddy HTTP listen port |
| `CLIENT_URL` | Proxy | - | Upstream client |
| `BACKEND_URL` | Proxy | - | Upstream backend |
| `CADDYFILE_B64` | Proxy | ewoJYXV0b19odHRwcyBvZmYKCWFkbWluIG9mZgp9Cgo6eyRQT1JUfSB7CgllbmNvZGUgenN0ZCBnemlwCgoJaGFuZGxlIC9hcGkvKiB7CgkJcmV2ZXJzZV9wcm94eSB7JEJBQ0tFTkRfVVJMfSB7CgkJCWhlYWRlcl91cCBIb3N0IHtob3N0fQoJCQloZWFkZXJfdXAgWC1SZWFsLUlQIHtyZW1vdGVfaG9zdH0KCQkJaGVhZGVyX3VwIFgtRm9yd2FyZGVkLUZvciB7cmVtb3RlX2hvc3R9CgkJCWhlYWRlcl91cCBYLUZvcndhcmRlZC1Qcm90byB7c2NoZW1lfQoJCX0KCX0KCgloYW5kbGUgewoJCXJldmVyc2VfcHJveHkgeyRDTElFTlRfVVJMfSB7CgkJCWhlYWRlcl91cCBIb3N0IHtob3N0fQoJCQloZWFkZXJfdXAgWC1SZWFsLUlQIHtyZW1vdGVfaG9zdH0KCQkJaGVhZGVyX3VwIFgtRm9yd2FyZGVkLUZvciB7cmVtb3RlX2hvc3R9CgkJCWhlYWRlcl91cCBYLUZvcndhcmRlZC1Qcm90byB7c2NoZW1lfQoJCX0KCX0KfQ== | Base64 Caddyfile (path /api/* → backend, /* → client) |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c 'echo "$CADDYFILE_B64" | base64 -d > /etc/caddy/Caddyfile && caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/rybbit-analytics)
