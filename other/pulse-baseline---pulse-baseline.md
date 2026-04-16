# Deploy pulse-baseline on Railway

Pulse Railway router, janitor, Redis layout.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pulse-baseline)

## About

Deploy the Pulse Railway baseline infrastructure layout on Railway. This variant includes a managed Railway Redis service.

This template is intentionally infrastructure-only. It gives `pulse-railway init` a curated Railway canvas topology while the CLI remains authoritative for runtime images, variables, domains, healthchecks, cron, replicas, and deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pulse-janitor | `ghcr.io/erwinkn/pulse-railway-janitor:template` | Worker |
| pulse-router | `ghcr.io/erwinkn/pulse-railway-router:template` | Worker |
| pulse-redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDISPASSWORD` | (secret) |
| `REDIS_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pulse-baseline)
