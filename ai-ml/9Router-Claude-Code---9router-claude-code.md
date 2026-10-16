# Deploy 9Router Claude Code on Railway

Route Claude Code through 40+ providers with fallback

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-claude-code)

## About

Point Claude Code at this Railway template and you get the same 9Router stack for coding sessions: OpenAI-compatible /v1, 3-tier fallback across your provider accounts, and RTK compression on tool_result content. Image decolua/9router:0.5.95 is digest-pinned, /app/data is mounted, and secrets are generated at deploy.

One service runs decolua/9router:0.5.95 pinned by digest, port 20128, health /api/health, volume /app/data. Dashboard at /dashboard, API at /v1. State is SQLite at $DATA_DIR/db/data.sqlite with auto backups under $DATA_DIR/db/backups/. No Postgres or Redis. Generated secrets: INITIAL_PASSWORD (replaces upstream default 123456), JWT_SECRET, API_KEY_SECRET, MACHINE_ID_SALT. Fixed vars: PORT=20128, HOSTNAME=0.0.0.0, DATA_DIR=/app/data, BASE_URL and NEXT_PUBLIC_BASE_URL from the public domain, CLOUD_URL for optional 9router.com sync, AUTH_COOKIE_SECURE=true, ENABLE_REQUEST_LOGS off by default, REQUIRE_API_KEY=true. Optional empty HEADROOM_URL and SEARXNG_URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | `decolua/9router:0.5.95@sha256:4316fefb95ea642d57db885d906b1227b1768b15ac5def314621fd781da7b3f1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | HTTP port for the dashboard and API (20128). |
| `BASE_URL` | - | Public HTTPS URL used by server-side callbacks. |
| `DATA_DIR` | /app/data | SQLite database and backups location on the volume. |
| `HOSTNAME` | 0.0.0.0 | Bind address; 0.0.0.0 so Railway can reach the app. |
| `CLOUD_URL` | https://9router.com | Cloud sync endpoint base (9router.com). |
| `JWT_SECRET` | (secret) | Signs dashboard auth cookies; keep stable. |
| `SEARXNG_URL` | - | Optional SearXNG search endpoint for web search. |
| `HEADROOM_URL` | - | Optional Headroom compress endpoint for token savings. |
| `API_KEY_SECRET` | (secret) | HMAC secret for generated API keys; keep stable. |
| `MACHINE_ID_SALT` | - | Salt for stable machine ID hashing. |
| `REQUIRE_API_KEY` | (secret) | Require a Bearer API key on /v1 routes. |
| `INITIAL_PASSWORD` | (secret) | First dashboard login password, generated per deploy. |
| `AUTH_COOKIE_SECURE` | true | HTTPS-only auth cookie; true behind Railway HTTPS. |
| `ENABLE_REQUEST_LOGS` | false | Log full requests and responses; leave false. |
| `NEXT_PUBLIC_BASE_URL` | - | Public HTTPS URL shown in the dashboard UI. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-claude-code)
