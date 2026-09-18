# Deploy Unorouter on Railway

Self-hosted AI gateway + storefront. One key for 100+ AI providers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unorouter)

## About

- **Volumes**: gateway `/data` (SQLite DB, channel config, usage logs), storefront `/data` (rankings DB). Railway volumes mount root-owned; both images are configured so a fresh install boots cleanly.
- **Private networking**: `INTERNAL_API_URL` resolves to `http://:3000` at deploy time. The gateway is never publicly exposed unless you add a public domain to it.
- **First run**: create the admin account at the gateway's public URL (the dashboard is served by the gateway itself; first user becomes root with password `123456` — change it immediately after first login).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storefront | `ghcr.io/unorouter/unorouter:latest` | Web service |
| gateway | `ghcr.io/unorouter/new-api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | storefront | 3000 | HTTP port the storefront listens on. Railway maps this to the service's public domain. |
| `HOSTNAME` | storefront | 0.0.0.0 | Bind address. The distroless image reads this at runtime — keep 0.0.0.0 so Railway can reach the server. |
| `SESSION_SECRET` | storefront | (secret) | REQUIRED — random string (min 32 chars) used to seal the storefront's iron-session cookies. Auto-generated. |
| `NEXT_PUBLIC_URL` | storefront | - | Public origin of THIS storefront — used for absolute links, sitemap and canonical URLs, and cookie scoping. Auto-filled from the service's public domain. |
| `INTERNAL_API_URL` | storefront | - | Server-side routes proxy dashboard/billing/model calls to the gateway over Railway's private network. Auto-wired to the gateway service's private domain — do not edit. |
| `TURSO_DATABASE_URL` | storefront | file:/data/storefront.db | libSQL/SQLite file on the mounted volume that holds public model-tester rankings. Chat and per-device state live in the visitor's browser, not here. |
| `NEXT_PUBLIC_API_URL` | storefront | - | Origin the browser bundle shows in API docs and uses for direct browser→gateway calls (OAuth buttons, token endpoints, chat rooms). Auto-filled from this service's public domain. The storefront's own /api/* proxy (which injects your gateway key) is served same-origin, so browser chat traffic never needs to reach the gateway directly. |
| `NEXT_PUBLIC_APP_NAME` | storefront | UnoRouter | Brand name shown in the header, titles and SEO metadata. Change to your own name. |
| `NEXT_PUBLIC_CARDS_URL` | storefront | - | Origin of the gift-card store page. Auto-filled from this service's public domain. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | storefront | support@example.com | Support contact shown in the footer and help links. Change to your own address. |
| `TZ` | gateway | UTC | Timezone for usage-log timestamps. Keep UTC so log filtering matches the dashboard. |
| `PORT` | gateway | 3000 | HTTP port the gateway listens on. Railway maps this to the service's public domain. |
| `SQL_DSN` | gateway | - | Optional — external MySQL/PostgreSQL connection string. Leave empty to use the bundled SQLite database on the mounted volume (recommended for Railway: zero config). |
| `SESSION_SECRET` | gateway | (secret) | REQUIRED — random string used to sign gateway sessions and OAuth state. This placeholder auto-generates one. Changing it logs all users out. |
| `FRONTEND_BASE_URL` | gateway | - | Absolute base used for callback and share URLs. Auto-filled from this service's public domain. On a single-replica deploy the gateway is the master node and serves its own bundled web UI, so this only matters if you add replicas. |
| `REDIS_CONN_STRING` | gateway | - | Optional — Redis connection string (redis://:password@host:6379) for multi-node caching. Leave empty on a single-replica deploy; the in-memory cache is used instead. |

## Configuration

- **Healthcheck:** `/api/ops/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/status`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/unorouter)
