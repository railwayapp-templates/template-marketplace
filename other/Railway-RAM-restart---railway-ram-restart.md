# Deploy Railway RAM restart on Railway

monitoring service memory usage or automatically restarting services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-ram-restart)

## About

Railway RAM Restart is an automated monitoring service that tracks memory usage of your Railway services and automatically restarts them when RAM thresholds are exceeded or on a scheduled basis. Built with Bun and TypeScript, it provides a lightweight, reliable solution for preventing memory-related outages without manual intervention.

Deploying Railway RAM Restart involves creating a dedicated monitoring service within your Railway project that watches other services for high memory consumption. You'll configure environment variables including your Railway API token, target project ID, and service names to monitor. The template supports two modes: cron-based RAM threshold monitoring that triggers restarts when memory exceeds defined limits, and scheduled restarts at specified intervals. Once deployed, the service runs headlessly with minimal resource overhead (~20MB RAM), checking metrics via Railway's GraphQL API and triggering deployments when needed. A built-in circuit breaker prevents API abuse during failures.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Railway RAM restart | [sarvesh-astrophile/railway-templates-ram-restart](https://github.com/sarvesh-astrophile/railway-templates-ram-restart) (root: /template-1-cron) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `MAX_RAM_GB` | The memory threshold in gigabytes. When the service exceeds this RAM usage, it will be restarted (if monitoring is enabled). Example: `2`, `4`, `8` |
| `TARGET_SERVICE_NAME` | Id of service, Look at URL `https://railway.com/project/<PROJECT_ID>/service/<SERVICE_ID>?environmentId=<ENVIRONMENT_ID>` |
| `CRON_INTERVAL_RESTART` | Cron schedule for scheduled restarts. Use this for periodic restarts regardless of memory usage. Example: `0 4 * * *` (daily at 4 AM) |
| `MAX_RAM_CRON_INTERVAL_CHECK` | Cron schedule for checking memory usage. When set, the monitor will periodically check if the service exceeds `MAX_RAM_GB` and restart it if necessary. Example: `*/1 * * * *` (every minute) |

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/railway-ram-restart)
