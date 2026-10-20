# Deploy 9Router Docker on Railway

Pinned 9Router Docker image with a persistent volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-9router-docker-image)

## About

This template runs the official decolua/9router image (tag 0.5.95, pinned by digest) as one Railway service. For people who want the 9Router Docker image without managing TLS, volumes, or restart policies on a VPS.

This template runs the exact decolua/9router image you would pull locally, pinned to tag 0.5.95 by digest so a redeploy never silently changes versions. Railway removes the VPS chores: TLS, reverse proxy, restart policy and host patching.

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

[View on Railway →](https://railway.com/deploy/deploy-9router-docker-image)
