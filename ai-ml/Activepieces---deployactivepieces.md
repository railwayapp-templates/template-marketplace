# Deploy Activepieces on Railway

Chat, agents, flows, tables, and 760+ apps in one workspace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deployactivepieces)

## About

Activepieces is an open-source, AI-powered workflow automation platform for connecting applications, APIs, data, and business processes. It is a self-hosted alternative to Zapier, Make, and n8n. This template deploys the full production stack on Railway — Activepieces, PostgreSQL, and Redis — with private networking, auto-generated secrets, and persistent volumes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/deployactivepieces)

Hosting Activepieces on Railway means running three containers on Railway’s private network: the Activepieces application (workflow builder + engine), PostgreSQL for flows/runs/connections/users, and Redis for the job queue (BullMQ). Railway terminates TLS, so the app listens on port 80 internally while you get a public HTTPS domain. Persistent volumes keep Postgres data, Redis data, and the Activepieces cache across redeploys. Secrets (`AP_API_KEY`, `AP_ENCRYPTION_KEY`, `AP_JWT_SECRET`, `POSTGRES_PASSWORD`) are generated automatically. After the first deploy you only need to set `AP_FRONTEND_URL` to your public domain so webhooks and OAuth redirects work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7.4.3` | Database |
| Postgres | `postgres:17.4` | Database |
| Activepieces | `ghcr.io/activepieces/activepieces:0.91.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | activepieces | Name of the PostgreSQL database to create and use. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the PostgreSQL superuser/admin account. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the PostgreSQL user. |
| `PORT` | Activepieces | 3000 | Port the Activepieces server listens on. |
| `DOMAIN` | Activepieces | - | Public domain where Activepieces is accessible. Railway automatically provides this domain. |
| `AP_PORT` | Activepieces | 3000 | Internal port Activepieces runs on (usually the same as PORT). |
| `AP_API_KEY` | Activepieces | (secret) | Secret API key used for authenticating internal and API requests. |
| `AP_JWT_SECRET` | Activepieces | (secret) | Secret used to sign and verify JWT tokens for authentication and sessions. |
| `AP_REDIS_HOST` | Activepieces | - | Private hostname of the Redis service used by Activepieces. |
| `AP_REDIS_PORT` | Activepieces | 6379 | Port Redis is listening on. |
| `AP_ENVIRONMENT` | Activepieces | prod | Environment mode for Activepieces (prod, dev, etc.). |
| `AP_FRONTEND_URL` | Activepieces | http://127.0.0.1:3000 | URL of the Activepieces frontend/UI. Should normally point to the public domain in production. |
| `AP_POSTGRES_HOST` | Activepieces | - | Private hostname of the PostgreSQL service used by Activepieces. |
| `AP_POSTGRES_PORT` | Activepieces | 5432 | Port PostgreSQL is listening on. |
| `AP_ENCRYPTION_KEY` | Activepieces | - | Key used to encrypt sensitive data (credentials, secrets, etc.) at rest. |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED | How flows and pieces are executed (UNSANDBOXED means no isolation). |
| `AP_POSTGRES_DATABASE` | Activepieces | activepieces | Name of the PostgreSQL database used by Activepieces. |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) | Password for the PostgreSQL user. |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) | Username Activepieces uses to connect to PostgreSQL. |
| `AP_TELEMETRY_ENABLED` | Activepieces | true | Enables or disables sending anonymous usage/telemetry data to Activepieces. |
| `AP_FLOW_TIMEOUT_SECONDS` | Activepieces | 600 | Maximum time (in seconds) a flow is allowed to run before timing out. |
| `AP_TEMPLATES_SOURCE_URL` | Activepieces | https://cloud.activepieces.com/api/v1/flow-templates | URL from which Activepieces fetches official flow templates. |
| `AP_ENGINE_EXECUTABLE_PATH` | Activepieces | dist/packages/engine/main.js | Path to the Activepieces engine executable used to run flows. |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 | Timeout (in seconds) for webhook requests. |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 | Default polling interval (in minutes) for polling-based triggers. |

## Configuration

- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/cache`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deployactivepieces)
