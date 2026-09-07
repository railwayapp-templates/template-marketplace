# Deploy Rakazo on Railway

Persistent AI teammates with memory, routines, and their own computers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rakazo)

## About

Rakazo is an open-source platform for running persistent AI teammates you
actually own: bots with their own conversations, memory, routines, and a real
computer (browser, terminal, files, graphical desktop) they operate themselves.
Bring your own model credentials and your own computer provider.

This template deploys four services:

- **web** — the public web app. It owns the Railway public domain and
  same-origin-proxies `/api` and `/rpc` to the API, so only one public
  endpoint is exposed.
- **api** — the Hono API server. Applies database migrations
  (`prisma migrate deploy`) before serving and reports readiness at
  `GET /health`.
- **worker** — the Graphile Worker process handling routines, wakeup jobs, and
  background work on top of Postgres (no Redis required).
- **postgres** — PostgreSQL 16, the single durable datastore.

Bot computers run on Rakazo's remote providers (E2B, Daytona, or Box) instead
of local Docker containers, which matches upstream's own production
recommendation for hosts without a nested Docker daemon.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | [monotykamary/railway-template-rakazo](https://github.com/monotykamary/railway-template-rakazo) | Database |
| web | `ghcr.io/elie222/rakazo/app@sha256:f3c31787c2a5be058aef9842e35840d4b84c356dff3b02b436bd0b0d9df65b3c` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| worker | [monotykamary/railway-template-rakazo](https://github.com/monotykamary/railway-template-rakazo) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api | 3100 | HTTP port the API listens on. |
| `API_URL` | api | - | Canonical public origin. Wired to the web service domain. Do not edit. |
| `API_HOST` | api | 0.0.0.0 | Bind address for the API listener. |
| `DATA_DIR` | api | /data | Writable directory for bot workspace checkpoints (Railway volume). |
| `NODE_ENV` | api | production | Runtime mode for the API process. |
| `SMTP_URL` | api | - | Optional SMTP URL (smtps://user:pass@host:465) enabling forgotten-password recovery. |
| `LOG_LEVEL` | api | info | Log verbosity: debug, info, warn, error, or off. |
| `EMAIL_FROM` | api | - | Optional From header for outgoing email, e.g. "Rakazo <no-reply@example.com>". |
| `WEB_ORIGIN` | api | - | Canonical public origin. Wired to the web service domain. Do not edit. |
| `BOX_API_KEY` | api | (secret) | API key for the selected computer provider. Get one at e2b.dev, daytona.io, or box.ai. |
| `E2B_API_KEY` | api | (secret) | API key for the selected computer provider. Get one at e2b.dev, daytona.io, or box.ai. |
| `RAKAZO_HOST` | api | - | Public hostname the web allowlists. Wired to the web service domain. Do not edit. |
| `DATABASE_URL` | api | - | Postgres connection string wired to the Postgres service. Do not edit. |
| `AGENT_RUNTIME` | api | pi | Agent runtime; pi is the upstream default. |
| `WAKEUP_DRIVER` | api | graphile | Job wakeup driver; graphile uses the bundled Postgres queue. |
| `ENCRYPTION_KEY` | api | - | AES key for stored credentials. Generated for you. Never regenerate after first deploy or stored credentials become undecryptable. |
| `BETTER_AUTH_URL` | api | - | Canonical public origin. Wired to the web service domain. Do not edit. |
| `DAYTONA_API_KEY` | api | (secret) | API key for the selected computer provider. Get one at e2b.dev, daytona.io, or box.ai. |
| `SIGNUPS_ENABLED` | api | true | Allow public signups. The first registered user becomes the deployment owner. |
| `COMPOSIO_API_KEY` | api | (secret) | Optional Composio key enabling the managed plugin catalog. |
| `SANDBOX_PROVIDER` | api | e2b | Computer provider for bot computers: e2b, daytona, box, or none. e2b/daytona/box need the matching API key below; without a key the product boots and bots chat but computer tools are unavailable. |
| `SIGNUP_ALLOWLIST` | api | - | Optional allowlist of emails/domains allowed to sign up (comma-separated). Configure before the first API start. |
| `BETTER_AUTH_SECRET` | api | (secret) | Signing secret for authentication sessions. Generated for you. |
| `OPENROUTER_API_KEY` | api | (secret) | Optional model key so bots work out of the box; users can also connect models per-user in the UI. |
| `SCREEN_PROXY_SECRET` | api | (secret) | Signing secret for browser-screen capabilities, shared with the web service. Generated for you. |
| `NODE_ENV` | web | production | Runtime mode for the web server. |
| `RAKAZO_HOST` | web | - | Public hostname the web allowlists. Wired to this service domain. Do not edit. |
| `API_PROXY_TARGET` | web | - | Private API endpoint the web server proxies /api and /rpc to. Do not edit. |
| `RAKAZO_IMAGE_TAG` | web | sha-01a210225ed1818c4f41c902c45d1b5143f8ee68 | Informational pinned upstream image tag. |
| `SCREEN_PROXY_SECRET` | web | (secret) | Signing secret for browser-screen capabilities, shared with the api service. Do not edit. |
| `POSTGRES_DB` | Postgres | railway | Database name created on first boot. |
| `DATABASE_URL` | Postgres | - | Full connection string, private-network. Do not edit. |
| `POSTGRES_USER` | Postgres | (secret) | Database user created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated for you. Do not edit. |
| `DATA_DIR` | worker | /data | Writable directory for worker workspace state (Railway volume). |
| `NODE_ENV` | worker | production | Runtime mode for the worker process. |
| `LOG_LEVEL` | worker | info | Log verbosity: debug, info, warn, error, or off. |
| `BOX_API_KEY` | worker | (secret) | API key for the selected computer provider. Get one at e2b.dev, daytona.io, or box.ai. |
| `E2B_API_KEY` | worker | (secret) | API key for the selected computer provider. Get one at e2b.dev, daytona.io, or box.ai. |
| `DATABASE_URL` | worker | - | Postgres connection string wired to the Postgres service. Do not edit. |
| `AGENT_RUNTIME` | worker | pi | Agent runtime; pi is the upstream default. |
| `WAKEUP_DRIVER` | worker | graphile | Job wakeup driver; graphile uses the bundled Postgres queue. |
| `ENCRYPTION_KEY` | worker | - | AES key for stored credentials, shared with the api service. Do not edit. |
| `DAYTONA_API_KEY` | worker | (secret) | API key for the selected computer provider. Get one at e2b.dev, daytona.io, or box.ai. |
| `SANDBOX_PROVIDER` | worker | e2b | Computer provider for bot computers: e2b, daytona, box, or none. e2b/daytona/box need the matching API key below; without a key the product boots and bots chat but computer tools are unavailable. |
| `BETTER_AUTH_SECRET` | worker | (secret) | Unused by the worker; upstream blanks it intentionally. |
| `SCREEN_PROXY_SECRET` | worker | (secret) | Unused by the worker; upstream blanks it intentionally. |

## Configuration

- **Start command:** `bash -lc "pnpm --filter @rakazo/db exec prisma migrate deploy && pnpm --filter @rakazo/api start"`
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Start command:** `pnpm --filter @rakazo/web preview --host 0.0.0.0 --port 5173`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter @rakazo/worker start`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rakazo)
