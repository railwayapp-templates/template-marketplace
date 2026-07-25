# Deploy NOMAD on Railway

Self-hosted collaborative travel planning with durable SQLite storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nomad)

## About

TREK is a self-hosted collaborative travel planner with interactive maps, itineraries, budgets, packing lists, reservations, documents, journals, offline PWA support, OIDC, passkeys, plugins, and optional AI-assisted booking import. This Railway template runs TREK as a single service with durable SQLite and upload storage.

TREK serves its web client, API, and WebSocket endpoint from port `3000`. Its SQLite database, encryption state, logs, plugins, backups, and uploaded files must survive redeployments. Railway supports one volume per service, so this template's container links `/app/uploads` into `/app/data/uploads` and mounts one persistent volume at `/app/data`.

The template generates an encryption key and initial administrator password, configures Railway's HTTPS origin, trusts one proxy hop, and checks `/api/health` before accepting a deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TREK | `ghcr.io/monotykamary/nomad:3.4.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for logs, reminders, and scheduled tasks. |
| `PORT` | 3000 | TREK HTTP and WebSocket port. |
| `APP_URL` | - | Canonical public TREK URL. |
| `NODE_ENV` | production | Node.js runtime environment. |
| `LOG_LEVEL` | info | Application log verbosity. |
| `ADMIN_EMAIL` | admin@example.com | Initial administrator email; used only on an empty installation. |
| `FORCE_HTTPS` | true | Enable HTTPS redirects and secure browser policy. |
| `TRUST_PROXY` | 1 | Trust Railway as one reverse-proxy hop. |
| `ADMIN_PASSWORD` | (secret) | Generated initial administrator password; used only on an empty installation. |
| `ENCRYPTION_KEY` | - | Generated 256-bit key for encrypting sensitive settings. |
| `ALLOWED_ORIGINS` | - | Allowed browser origin for CORS. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nomad)
