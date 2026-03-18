# Deploy clawdguard-railway-template on Railway

GUI-first, Shodan-proof Clawdbot template for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/clawdguard-railway-template)

## About

Clawd Guard is a security-hardened deployment template for Clawdbot, the WhatsApp AI agent. It binds to loopback by default, making your instance invisible to Shodan and port scanners while maintaining full functionality through a secure control plane.

Deploying Clawdbot typically exposes port 18789 to the public internet, making instances discoverable via Shodan (923+ exposed instances at last count). Clawd Guard solves this by binding the gateway to localhost only, with a minimal health endpoint for Railway's orchestration. The template includes automatic security defaults, persistent storage paths for WhatsApp session data, and an optional connection to the Clawd Guard dashboard for QR pairing and monitoring without terminal access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClawdGuard Database | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| clawdguard-railway-template | [DLhugly/clawdguard-railway-template](https://github.com/DLhugly/clawdguard-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | ClawdGuard Database | railway | Default database created when image is started. |
| `DATABASE_URL` | ClawdGuard Database | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | ClawdGuard Database | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | ClawdGuard Database | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | ClawdGuard Database | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE_URL` | clawdguard-railway-template | - | Postgres connection string (auto-injected by Railway) |
| `CLAWD_GUARD_TOKEN` | clawdguard-railway-template | (secret) | Payment token (required - from purchase) |
| `CLAWD_GUARD_PASSWORD` | clawdguard-railway-template | (secret) | Dashboard password (required) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/template/clawdguard-railway-template)
