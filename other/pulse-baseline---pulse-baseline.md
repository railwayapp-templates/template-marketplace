# Deploy pulse-baseline on Railway

Router, Redis, and janitor baseline for Pulse deployments on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pulse-baseline)

## About

Pulse Baseline provisions the stable Railway control plane used by `pulse-railway init` before Pulse app deployments are rolled out.

This template creates three baseline services:

- `pulse-router` routes HTTP and WebSocket traffic to the active Pulse deployment.
- `pulse-redis` stores active deployment state, drain state, and shared Railway session data.
- `pulse-janitor` removes drained deployment services after connected clients reload.

The template is intentionally small. `pulse-railway init` deploys it first, then writes the runtime variables, domains, health checks, cron settings, and image pins needed by the installed plugin version.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pulse-janitor | `ghcr.io/erwinkn/pulse-railway-janitor:0.1.0` | Worker |
| pulse-redis | `redis:8.2.1` | Database |
| pulse-router | `ghcr.io/erwinkn/pulse-railway-router:0.1.0` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDIS_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'pulse-railway janitor run'`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `sh -c 'uvicorn pulse_railway.router:build_app_from_env --factory --host 0.0.0.0 --port "${PORT:-8000}"'`
- **Healthcheck:** `/healthz`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pulse-baseline)
