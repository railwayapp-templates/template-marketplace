# Deploy OmniRoute Free Models on Railway

Route coding tools across free provider tiers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-omniroute-free-ai-models)

## About

OmniRoute Free Models is a self-hosted AI gateway for MCP users who want coding tools to use free provider tiers. Route Claude Code, Codex, Cursor, Cline, Copilot, OpenCode, Aider, Continue, and Kilo Code through one endpoint with fallback, quota awareness, and a built-in MCP server.

A practical free-models setup: put your paid subscription or key first in a combo, then two or three free-tier providers behind it. When the paid tier hits its quota, OmniRoute falls through to the free ones instead of failing the request, and the dashboard shows which tier served each call. Check the usage view weekly, because free tiers change limits and drop models without notice. Never send secrets or customer data through a free tier that logs prompts.

The Railway template runs one service from pinned image diegosouzapw/omniroute:3.8.51, port 20128, health /healthz, volume /app/data. Dashboard /dashboard, API /v1 (OpenAI, Claude, Gemini, Responses compatible). SQLite WAL in /app/data; no Postgres or Redis. Provider keys AES-256-GCM encrypted. Generated secrets: INITIAL_PASSWORD, JWT_SECRET, API_KEY_SECRET, OMNIROUTE_WS_BRIDGE_SECRET, MACHINE_ID_SALT. Fixed vars: PORT=20128, HOSTNAME=0.0.0.0, DATA_DIR=/app/data, NEXT_PUBLIC_BASE_URL, BASE_URL, AUTH_COOKIE_SECURE=true, REQUIRE_API_KEY=true. MIT licensed; you pay providers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| omniroute | `diegosouzapw/omniroute:3.8.51@sha256:8bd462c9f60d8eda79329cfbb6ea7ea723505fe7721beb944f3d43835409e218` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | HTTP port for the dashboard and API (20128). |
| `BASE_URL` | http://localhost:20128 | Public HTTPS URL used by server-side callbacks. |
| `DATA_DIR` | /app/data | SQLite database location on the /app/data volume. |
| `HOSTNAME` | 0.0.0.0 | Bind address; 0.0.0.0 so Railway can reach the app. |
| `JWT_SECRET` | (secret) | Signs dashboard auth cookies; keep stable. |
| `API_KEY_SECRET` | (secret) | Secret for generated API keys; keep stable. |
| `MACHINE_ID_SALT` | - | Salt for stable machine ID hashing. |
| `REQUIRE_API_KEY` | (secret) | Require a Bearer API key on /v1 routes. |
| `INITIAL_PASSWORD` | (secret) | First dashboard login password, generated per deploy. |
| `AUTH_COOKIE_SECURE` | true | HTTPS-only auth cookie; true behind Railway HTTPS. |
| `OMNIROUTE_MEMORY_MB` | 1024 | Node heap size in MB; raise for coding agents. |
| `NEXT_PUBLIC_BASE_URL` | - | Public HTTPS URL shown in the dashboard UI. |
| `OMNIROUTE_WS_BRIDGE_SECRET` | (secret) | Secret for the internal WebSocket bridge. |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p /app/data && chown -R 1000:1000 /app/data && cd /app && if command -v setpriv >/dev/null 2>&1; then exec setpriv --reuid=1000 --regid=1000 --init-groups env HOME=/home/node /app/check-permissions.sh node dev/run-standalone.mjs; else exec /app/check-permissions.sh node dev/run-standalone.mjs; fi"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deploy-omniroute-free-ai-models)
