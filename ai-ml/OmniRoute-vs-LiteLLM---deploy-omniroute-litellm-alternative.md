# Deploy OmniRoute vs LiteLLM on Railway

Self-hosted AI gateway vs LiteLLM Python proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-omniroute-litellm-alternative)

## About

OmniRoute is a one-container Node gateway with SQLite and dashboard combos; LiteLLM is a Python proxy needing Postgres for budgets and Redis for scaling. OmniRoute fits solo devs and small coding-agent boxes; LiteLLM suits platform teams.

This template runs OmniRoute only: one Node.js container with SQLite in /app/data, so you keep your routing config, usage logs, and encrypted provider keys on a Railway volume you control. You still own the data, not a hosted control plane.

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

[View on Railway →](https://railway.com/deploy/deploy-omniroute-litellm-alternative)
