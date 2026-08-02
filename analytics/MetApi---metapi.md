# Deploy MetApi on Railway

Meta-gateway for AI APIs with smart routing & auto check-ins

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metapi)

## About

MetApi is an open-source AI gateway and model aggregation platform that unifies multiple AI providers and API gateways behind a single OpenAI-compatible endpoint. It provides intelligent model routing, centralized account management, automatic failover, balance monitoring, scheduled check-ins, and a web dashboard for managing AI infrastructure from one place.

Hosting MetApi on Railway provides a production-ready environment for running your own AI aggregation gateway without managing servers. Railway can deploy the official Docker image, automatically provision networking, and expose the application over HTTPS with a public domain.

MetApi stores its configuration, routing rules, credentials, logs, and SQLite database locally, making a Railway Volume essential for persistent storage. While SQLite is the default database, MySQL and PostgreSQL are also supported for external deployments. Railway Variables simplify secret management for administrator authentication, proxy access, scheduled jobs, and notification services, allowing you to securely operate a centralized AI gateway with minimal infrastructure management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MetApi | `1467078763/metapi:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone setting for cron jobs, check-ins, and log timestamps. |
| `PORT` | 4000 | Internal application listening port. |
| `DATA_DIR` | /app/data | Absolute directory path for persistent SQLite database and runtime data storage. |
| `AUTH_TOKEN` | (secret) | Secret admin login token for the dashboard. |
| `PROXY_TOKEN` | (secret) | Bearer token used by downstream /v1/* proxy requests. |
| `CHECKIN_CRON` | 0 8 * * * | Cron schedule for automated daily upstream check-in tasks. |
| `BALANCE_REFRESH_CRON` | 0 * * * * | Cron schedule for automated hourly upstream balance updates. |
| `ACCOUNT_CREDENTIAL_SECRET` | (secret) | Secret used to encrypt credentials; defaults to AUTH_TOKEN if omitted. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metapi)
