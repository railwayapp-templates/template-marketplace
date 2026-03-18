# Deploy Railway Service Cron on Railway

Starts and Stops railway services based on a cron schedule

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railway-service-cron)

## About

Deploying Railway Service Cron creates a lightweight Alpine-based container (~10MB) that runs supercronic to manage your services on custom schedules. The service validates your Railway API token, uses GraphQL APIs to control multiple services, and includes smart management that only starts/stops services when needed. All cron job output is automatically logged to Railway's dashboard for easy monitoring. The container runs continuously with minimal resource usage, executing your configured start and stop schedules reliably.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Railway Service Cron | [smolpaw/railway-service-cron](https://github.com/smolpaw/railway-service-cron) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | The timezone the cron schedule should run on |
| `SERVICES_ID` | - | One or many comma separated list of service ids |
| `STOP_SCHEDULE` | 0 18 * * * | Your services will stop on this schedule |
| `START_SCHEDULE` | 0 8 * * * | Your services will start on this schedule |

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/railway-service-cron)
