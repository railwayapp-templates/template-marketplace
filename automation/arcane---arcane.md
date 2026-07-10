# Deploy arcane on Railway

Modern, web-based Docker management UI. SQLite, single container.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arcane)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/arcane)

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-arcane/main/og-image.svg)

Arcane is a modern, web-based Docker management interface. Manage containers, images, volumes, and networks from a clean UI — deploy it on Railway in minutes.

Arcane runs as a single container with SQLite for persistence. Railway provides the compute, TLS at the edge, and a public URL. The service restarts automatically on failures. No external database is required — everything runs in one container with a persistent `/app/data` volume for SQLite, settings, and uploaded assets.

**Railway-specific note:** Login, the bootstrap admin account, SQLite persistence, and service health checks all work normally. The dashboard / containers / images / volumes / networks tabs return HTTP 500 on Railway because Railway-managed containers do not expose `/var/run/docker.sock` to the application. To manage live Docker resources from the UI, run Arcane directly on a Docker host and mount the socket: `docker run -v /var/run/docker.sock:/var/run/docker.sock`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| arcane | `ghcr.io/getarcaneapp/manager:v2.2.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PGID` | 65532 | Group ID for file ownership (default: 65532). |
| `PUID` | 65532 | User ID for file ownership (default: 65532). |
| `APP_URL` | - | Public URL of your Arcane instance. Required. Auto-populated from Railway's public domain; override if using a custom domain. |
| `JWT_SECRET` | (secret) | Random secret for JWT signing. Auto-generated. Override with: openssl rand -hex 32 (64-char hex) or any sufficiently long random string. |
| `ENCRYPTION_KEY` | - | Random secret for encryption. Auto-generated. Override with: openssl rand -hex 32 (64-char hex) or any sufficiently long random string. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/arcane)
