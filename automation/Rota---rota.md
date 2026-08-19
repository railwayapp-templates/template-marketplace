# Deploy Rota on Railway

Deploy Rota, an authenticated proxy rotation platform with TimescaleDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rota)

## About

Rota is an open-source proxy rotation platform with a high-performance Go proxy engine, a real-time Next.js dashboard, automatic upstream health checks, proxy sources and pools, per-user routing, and TimescaleDB-backed analytics. This template pins Rota `v2.2.1` and exposes the dashboard and API through one Railway HTTPS domain while exposing the proxy engine through a separate authenticated Railway TCP endpoint.

The Gateway service owns the public web domain. On first deployment, the Core service seeds the administrator from `ROTA_ADMIN_USER` and the generated `ROTA_ADMIN_PASSWORD`. The Railway adapter also enables incoming proxy authentication from generated `ROTA_PROXY_USER` and `ROTA_PROXY_PASSWORD` variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TimescaleDB | `timescale/timescaledb:2.22.1-pg17@sha256:fba60021a224479e174ae1ec577c1a0576d5185b09fe9e622f1d19e4bf5bab0d` | Database |
| Core | [monotykamary/railway-template-rota](https://github.com/monotykamary/railway-template-rota) (branch: main) (root: core) | TCP service |
| Dashboard | `ghcr.io/alpkeskin/rota-dashboard:2.2.1@sha256:912c38c0db2e6e8d6e336e24a99b34b59c26b1ad275d9deb181c66734d2eb5a3` | Worker |
| Gateway | [monotykamary/railway-template-rota](https://github.com/monotykamary/railway-template-rota) (branch: main) (root: gateway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | TimescaleDB | 5432 | Internal PostgreSQL listener port. |
| `POSTGRES_DB` | TimescaleDB | rota | Database name used by Rota. |
| `POSTGRES_USER` | TimescaleDB | (secret) | Database user created for Rota. |
| `POSTGRES_PASSWORD` | TimescaleDB | (secret) | Generated password shared with Core through a Railway service reference. |
| `TIMESCALEDB_TELEMETRY` | TimescaleDB | off | Disables TimescaleDB telemetry for this self-hosted deployment. |
| `PORT` | Core | 8001 | Port Railway uses for Core HTTP health checks. |
| `DB_HOST` | Core | - | TimescaleDB private Railway hostname. |
| `DB_NAME` | Core | - | Database name referenced from TimescaleDB. |
| `DB_PORT` | Core | 5432 | TimescaleDB private PostgreSQL port. |
| `DB_USER` | Core | (secret) | Database user referenced from TimescaleDB. |
| `API_PORT` | Core | 8001 | Rota API listener port used by Gateway over private networking. |
| `LOG_LEVEL` | Core | info | Rota application log level. |
| `DB_SSLMODE` | Core | disable | Disables PostgreSQL TLS on Railway private networking. |
| `PROXY_PORT` | Core | 8000 | Rota incoming HTTP proxy listener exposed through Railway TCP networking. |
| `DB_PASSWORD` | Core | (secret) | Database password referenced from TimescaleDB. |
| `ROTA_ADMIN_USER` | Core | (secret) | Initial Rota dashboard administrator username. |
| `ROTA_PROXY_USER` | Core | (secret) | Username required by clients of the public Rota TCP proxy. |
| `ROTA_ADMIN_PASSWORD` | Core | (secret) | Generated initial password for the Rota dashboard administrator. |
| `ROTA_PROXY_PASSWORD` | Core | (secret) | Generated password required by clients of the public Rota TCP proxy. |
| `TRUST_PROXY_HEADERS` | Core | true | Trusts forwarding headers from the private Gateway for login rate limiting. |
| `CORS_ALLOWED_ORIGINS` | Core | * | Allowed API origins; Rota normally runs same-origin behind Gateway. |
| `PORT` | Dashboard | 3000 | Private Next.js dashboard listener port used by Gateway. |
| `PORT` | Gateway | 8080 | Public Gateway listener port targeted by the Railway HTTPS domain. |
| `ROTA_CORE_HOST` | Gateway | - | Core private Railway hostname for API, health, docs, and WebSockets. |
| `ROTA_DASHBOARD_HOST` | Gateway | - | Dashboard private Railway hostname for web routes. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **TCP Proxies:** 8000
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rota)
