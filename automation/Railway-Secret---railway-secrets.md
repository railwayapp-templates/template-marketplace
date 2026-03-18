# Deploy Railway Secret on Railway

A self-hosted service to manage and rotate Railway environment variables.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-secrets)

## About

Railway Secrets is a self-hosted dashboard to manage and rotate Railway environment variables. Supports manual and scheduled rotation, per-secret intervals, encrypted rollback history, and session-based admin access.

One-click deploy. The volume, health check, and cron service are pre-configured in the template. The only variable you need to provide is your `RAILWAY_TOKEN` — everything else is set automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-secret | [0xdps/railway-secrets](https://github.com/0xdps/railway-secrets) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_KEY` | - | Password required to log into the web dashboard. |
| `MASTER_KEY` | - | Key used to encrypt secret history stored in the local SQLite database (AES-256-GCM). |
| `SESSION_SECRET` | (secret) | Secret used to encrypt and HMAC-sign the session cookie (AES-256-GCM). |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`

**Category:** Automation · **Languages:** PHP, JavaScript, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/railway-secrets)
