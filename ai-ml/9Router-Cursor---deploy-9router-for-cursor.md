# Deploy 9Router Cursor on Railway

Connect Cursor IDE to a self-hosted AI router

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-9router-for-cursor)

## About

9Router Cursor points Cursor IDE at your own AI router. Host the open-source 9Router template on Railway, get a public HTTPS domain, and route Cursor chats through provider combos with fallback. This guide covers setup, costs, and operations. If Cursor shows a model as unavailable, check that the model name in Cursor matches a 9Router combo name exactly.

9Router Cursor is the MIT-licensed 9Router codebase as one Railway service from the pinned decolua/9router:0.5.95 digest. One container runs the dashboard, the /v1 API, SQLite, and routing. No Postgres, Redis, or worker. The volume at /app/data persists SQLite and automatic backups.

Railway issues a public HTTPS URL immediately. Cursor sends model requests from its own backend, not your laptop, so localhost never works. Railway handles TLS and port exposure, skipping firewall and cert work. The template generates INITIAL_PASSWORD, JWT_SECRET, API_KEY_SECRET, and MACHINE_ID_SALT.

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

[View on Railway →](https://railway.com/deploy/deploy-9router-for-cursor)
