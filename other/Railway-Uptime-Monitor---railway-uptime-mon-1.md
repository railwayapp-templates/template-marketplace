# Deploy Railway Uptime Monitor on Railway

Railway uptime monitor with alerts for private/public services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-uptime-mon-1)

## About

Hosting this template on Railway involves deploying a Bun-based worker service, configuring a few environment variables, and attaching persistent storage for SQLite state. You provide a Railway API token plus target project/environment IDs, and the monitor continuously discovers services and checks their health endpoints. Optional notifier variables enable incident alerts through your preferred channels. A mounted volume keeps monitor history and incident state durable across restarts and deploys. The service also exposes a health endpoint for platform-level health checks. Once deployed, it runs continuously with configurable intervals, timeouts, expected status code ranges, and failure/recovery thresholds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-uptime-monitor | [joe-yeomans/railway-uptime-monitor](https://github.com/joe-yeomans/railway-uptime-monitor) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `DATABASE_PATH` | monitor.db | SQLite database file path for monitors/incidents state |
| `RESEND_API_KEY` | (secret) | Resend API key for email alerts. Used only if all Resend vars are set. |
| `RESEND_TO_EMAIL` | - | Recipient email address for Resend notifications. |
| `CHECK_TIMEOUT_MS` | 5000 | Timeout per HTTP check (milliseconds). |
| `HEALTHCHECK_PATH` | /healthz | Path served by this app for its own health endpoint. Must start with /. |
| `TELEGRAM_CHAT_ID` | - | Telegram chat ID for alert messages. |
| `FAILURE_THRESHOLD` | 3 | Consecutive failed checks before marking a service DOWN. |
| `RESEND_FROM_EMAIL` | - | Sender email address for Resend notifications. |
| `SLACK_WEBHOOK_URL` | - | Slack incoming webhook for DOWN/RECOVERED alerts. |
| `RECOVERY_THRESHOLD` | 2 | Consecutive successful checks before marking a service RECOVERED. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token. Used only if TELEGRAM_CHAT_ID is also set. |
| `DISCORD_WEBHOOK_URL` | - | Discord webhook for DOWN/RECOVERED alerts. |
| `EXPECTED_STATUS_MAX` | 299 | Maximum acceptable HTTP status code. |
| `EXPECTED_STATUS_MIN` | 200 | Minimum acceptable HTTP status code. |
| `CHECK_INTERVAL_SECONDS` | 30 | How often monitor checks run. |
| `DISCOVERY_INTERVAL_SECONDS` | 120 | How often to rediscover Railway services to monitor. |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/railway-uptime-mon-1)
