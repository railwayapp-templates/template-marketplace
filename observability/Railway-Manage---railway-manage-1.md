# Deploy Railway Manage on Railway

Internal disaster-recovery and operations control plane for projects.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railway-manage-1)

## About

Railway Manage is a self-hosted operations control plane for Railway projects. It provides automated SQLite backups, service restart monitoring, infrastructure visibility, and a clean dashboard — giving you disaster-recovery and day-to-day management capabilities that Railway's own UI doesn't cover.

Railway Manage runs as a single unified container: a Node.js backend, a prebuilt React dashboard, and a Caddy reverse proxy — all bundled into one Alpine-based image. When deployed on Railway, the app authenticates via your Railway API token, polls your project's services and metrics, schedules rolling backups to local storage, and exposes a protected dashboard behind JWT-authenticated sessions. All state lives in an embedded SQLite database — no external databases needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-manage | [0xdps/railway-manage](https://github.com/0xdps/railway-manage) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_KEY` | - | Password used to log in to the Railway Manage dashboard |
| `SESSION_SECRET` | (secret) | Secret used to sign and verify JWT session tokens — use a long random string |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability · **Languages:** JavaScript, CSS, Just, Dockerfile, Shell, HTML

[View on Railway →](https://railway.com/template/railway-manage-1)
