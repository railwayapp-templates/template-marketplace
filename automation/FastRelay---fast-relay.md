# Deploy FastRelay on Railway

Fast HTTP proxy with Gist config, smart routing, and custom responses

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fast-relay)

## About

**Fast Relay** is a lightweight, production-ready HTTP proxy router that simplifies microservice routing, webhook forwarding, and API aggregation. Configure routes with JSON, update dynamically via GitHub Gist, and deploy in seconds on Railway.

Hosting Fast Relay on Railway gives you a production-ready proxy server in minutes. The service automatically loads route configurations from GitHub Gist, enabling zero-downtime updates without redeployment. With support for both append and query parameter routing modes, you can seamlessly forward requests to multiple backend services. The built-in auto-restart feature detects configuration changes and updates your routes automatically, making it ideal for dynamic environments where routes need frequent updates.

Fast Relay handles JSON, form-data, file uploads, and text formats automatically. It includes enterprise-grade security with SSRF protection, optional API authentication, rate limiting, and token masking—keeping your infrastructure secure from day one. Return custom responses immediately while forwarding requests asynchronously, perfect for webhook receivers that need immediate acknowledgment without waiting for processing to complete.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fast-relay | [supra126/fast-relay](https://github.com/supra126/fast-relay) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Server host |
| `PORT` | 8080 | Server port |
| `GIST_ID` | - | Private Gist ID (Option 2: Private Gist, requires GITHUB_TOKEN) |
| `API_KEYS` | (secret) | API authentication keys (single or multiple, comma-separated) |
| `GIST_URL` | https://gist.githubusercontent.com/supra126/3f07888ef44313e66ce1ea0bfef99aea/raw/85b9c1d128d0df374c04269e72b139bd34c6666b/routes.json | GitHub Gist Raw URL for route configuration (Option 1: Public Gist — example only, remove in production) |
| `LOG_LEVEL` | warn | Logging level for production. Options: 'error' (errors only), 'warn' (warnings + errors), 'info' (all logs). Default: 'info'. Set to 'warn' or 'error' to reduce log volume in production. |
| `BODY_LIMIT` | 10485760 | Request body size limit in bytes (default: 10MB) |
| `CORS_ORIGINS` | - | CORS allowed origins (comma-separated) |
| `GITHUB_TOKEN` | (secret) | GitHub Personal Access Token with 'gist' scope (only for private Gist) |
| `RATE_LIMIT_MAX` | 100 | Rate limit maximum requests per time window |
| `ALLOWED_DOMAINS` | - | Whitelist of allowed proxy target domains (prevents SSRF) |
| `GIST_AUTO_RESTART` | true | Auto-restart when config changes detected |
| `RATE_LIMIT_WINDOW` | 1 minute | Rate limit time window |
| `GIST_FETCH_TIMEOUT` | 10000 | Gist API request timeout (milliseconds) |
| `GIST_SYNC_INTERVAL` | 300 | Configuration sync interval (seconds, 0=disabled) |

**Category:** Automation · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/fast-relay)
