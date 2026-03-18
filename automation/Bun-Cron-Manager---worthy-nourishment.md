# Deploy Bun Cron Manager on Railway

Modern cron job manager with dashboard, built on Bun. Deploy in 30 seconds.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/worthy-nourishment)

## About

Type-safe cron job scheduler with password-protected web dashboard. Built on Bun and Croner. Create jobs in TypeScript, control via dashboard or REST API, track execution history.

Railway auto-installs Bun and handles dependency installation. Configure required environment variables: `DASHBOARD_USERNAME` and `DASHBOARD_PASSWORD` for authentication. Optional variables control server port, timezone, log retention, API key auth, HTTPS enforcement, rate limiting, and security headers. After deployment, generate a public domain to access the dashboard. The application runs as a lightweight HTTP server with no database requirements. All scheduled jobs run automatically. Control jobs via the web dashboard or REST API. Minimal resource usage makes it cost-effective to host.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bun-cron-manager | [multiplehats/bun-cron-manager](https://github.com/multiplehats/bun-cron-manager) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | The port Bun will run on |
| `TIMEZONE` | UTC | The default timezone passed to Croner |
| `REQUIRE_HTTPS` | true | When true, rejects requests that aren't using HTTPS |
| `RATE_LIMIT_MAX` | 100 | Prevents abuse by limiting requests per IP address.  |
| `RATE_LIMIT_WINDOW` | 60 |  Prevents abuse by limiting requests per IP address |
| `DASHBOARD_PASSWORD` | (secret) | The dashboard and API are protected with HTTP Basic Authentication. Generate a secure password in your terminal by running: openssl rand -base64 32 |
| `DASHBOARD_USERNAME` | (secret) | The dashboard and API are protected with HTTP Basic Authentication# |
| `MAX_EXECUTION_LOGS` | 100 | Maximum number of job execution logs to keep in memory |
| `ENABLE_SECURITY_HEADERS` | true | Enable security headers (X-Frame-Options, X-Content-Type-Options, etc.) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, Dockerfile, CSS, HTML

[View on Railway →](https://railway.com/deploy/worthy-nourishment)
