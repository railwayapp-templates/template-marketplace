# Deploy OpenWA on Railway

OpenWA: self-hosted WhatsApp API gateway with dashboard, webhooks & MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openwa)

## About

Open source WhatsApp API gateway — self-host the messaging layer: session
management, Webhooks, automations, and a React dashboard, in one container.
MIT-licensed, actively developed (rmyndharis/OpenWA, 15k+ stars, 2026-10).

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/pretty-beauty)

OpenWA ships as one hardened container (Node 22 + Puppeteer/Chromium for the
whatsapp-web.js engine, ffmpeg, and the React dashboard bundled and served by
the same NestJS process on a single port). The upstream `docker-entrypoint.sh`
handles privilege handoff to the non-root `openwa` user and pre-creates the
data directories — the template's `Dockerfile` only layers on the
`HEALTHCHECK` (pointed at `/api/health/ready`, the same route the upstream's
own compose file uses) and the `EXPOSE`.

Deployment surface:

- **Service `openwa`** — listens on `2785`; REST API at `/api/*`; dashboard at
  `/`; Swagger at `/api/docs` (when `ENABLE_SWAGGER=true`); metrics at
  `/api/metrics`; health at `/api/health` (`live` / `ready`).
- **Volume `openwa-data`** — mounted at `/app/data`; SQLite DB, WhatsApp
  session profiles, plugin state, media cache.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openwa | [mc9max/openwa](https://github.com/mc9max/openwa) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for log stamps and 'today' stats. Stored message timestamps are always UTC. |
| `PORT` | 2785 | HTTP listen port. The bundled React dashboard, the REST API (under /api), and Swagger (when enabled) all serve from this one port. |
| `BASE_URL` | - | Public URL of this instance (e.g. https://openwa-xyz.up.railway.app). Used in outbound payloads and callback examples. Blank = app default. |
| `NODE_ENV` | production | Runtime mode. Keep production (the image ships the production build). |
| `DATABASE_TYPE` | sqlite | Data store: SQLite (zero-config, lives on the openwa-data volume at /app/data) or Postgres (then also set DATABASE_HOST/PORT/USERNAME/PASSWORD, typically a sibling Postgres service). |
| `API_KEY_PEPPER` | (secret) | Optional HMAC pepper for API-key hashing. Leave blank to use plain SHA-256. If you set it, set it BEFORE first boot — enabling it later locks out existing keys until the old pepper is restored. |
| `API_MASTER_KEY` | - | Your admin API key. Prefilled with a fresh owa_k1_<64-hex> key per deployment via Railway's secret() function. OpenWA seeds this exact value as the default ADMIN key on first boot (needs 32+ chars in production); overwrite it with your own value to use that instead. No effect after the first boot (empty key table) — thereafter rotate keys in the dashboard. |
| `ENABLE_SWAGGER` | - | Set to 'true' to publish interactive API docs at /api/docs (off by default; recommended to leave off on a public domain). |
| `AUTO_START_SESSIONS` | - | Set to 'true' to reconnect previously paired WhatsApp sessions automatically on boot instead of showing a fresh QR code. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Bots · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/openwa)
