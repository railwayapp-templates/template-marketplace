# Deploy NoClick on Railway

Open-source visual workflow automation and AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/noclick)

## About

Deploy the NoClick community edition as one Railway service from the reviewed public release image.

NoClick combines its backend, frontend, and HTTP gateway in one container. The template runs database bootstrap before release and keeps one replica for the in-process scheduler and realtime state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| noclick | `ghcr.io/noclickapp/noclick:0.1.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SESSION_SECRET` | (secret) |
| `SUPABASE_SECRET_KEY` | (secret) |
| `WORKFLOW_JWT_SECRET` | (secret) |
| `CRON_SCHEDULER_SECRET` | (secret) |
| `CREDENTIALS_ENCRYPTION_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/bash -lc "export VITE_DISABLE_CAPTCHA=true; exec /usr/local/bin/noclick-entrypoint"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/noclick)
