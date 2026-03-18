# Deploy Railway Ram Restart on Railway

Monitors ram usage and restarts when exceeded. Supports automatic restarts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1FHSG9)

## About

This template will help you control and restart any services that continue to increase in ram usage due to a memory leak or some other reason.

You have 2 options:

Option 1 allows you to monitor the ram usage of a service and restart it if it exceeds your ram usage limit. This works by setting `MAX_RAM_CRON_INTERVAL_CHECK` using your preferred cron configuration such as `* * * * *`. You must also set `MAX_RAM_GB`. For 1GB you just set `1`, for anything less than 1GB it is `0.5` for example

Option 2 allows you to restart the service at a defined cron interval regardless of the ram usage. You use the env `CRON_INTERVAL_RESTART`. You can define it for in the middle of the night to prevent impacting others such as `0 4 * * *`

You must also set `RAILWAY_API_TOKEN` and `TARGET_SERVICE_NAME`. The target service name is the service you would like the ram monitor to monitor.

The template further uses `RAILWAY_PROJECT_ID`, `RAILWAY_ENVIRONMENT_ID`, and `RAILWAY_ENVIRONMENT_NAME`. These are however automatically set by railway. This means the monitor will only target the service name in the same environment it is  hosted. You could target other environments by changing these variables manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-ram-restart | [dClimate/railway-ram-restart](https://github.com/dClimate/railway-ram-restart) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `MAX_RAM_GB` | The ram limit to trigger restart. Base is 1GB |
| `TARGET_SERVICE_NAME` | The service name to target |
| `CRON_INTERVAL_RESTART` | How often it should restarted regardless of ram usage |
| `MAX_RAM_CRON_INTERVAL_CHECK` | How often it should check the ram using cron |

## Configuration

- **Start command:** `node index.js`

**Category:** Automation · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/1FHSG9)
