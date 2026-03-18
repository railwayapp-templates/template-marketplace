# Deploy Activepieces on Railway

Activepieces Deployment via GitHub

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/53ig3a)

## About

> Deploy Activepieces via GitHub latest version.

This is a one-click deployment of Activepieces that pulls the latest version of Activepieces when you click redeploy.

🤯 Activepieces
Your friendliest open source all-in-one automation tool, designed to be extensible through a type-safe pieces framework written in Typescript.

🗃️ Documentation
Detailed documentation is available a https://www.activepieces.com/docs/getting-started/introduction

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Activepieces | `activepieces/activepieces` | Web service |
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Activepieces | 80 |
| `AP_JWT_SECRET` | Activepieces | (secret) |
| `AP_ENVIRONMENT` | Activepieces | prod |
| `AP_EXECUTION_MODE` | Activepieces | UNSANDBOXED |
| `AP_SIGN_UP_ENABLED` | Activepieces | false |
| `AP_POSTGRES_PASSWORD` | Activepieces | (secret) |
| `AP_POSTGRES_USERNAME` | Activepieces | (secret) |
| `AP_TELEMETRY_ENABLED` | Activepieces | false |
| `AP_NODE_EXECUTABLE_PATH` | Activepieces | /usr/local/bin/node |
| `AP_TEMPLATES_SOURCE_URL` | Activepieces | https://cloud.activepieces.com/api/v1/flow-templates |
| `AP_ENGINE_EXECUTABLE_PATH` | Activepieces | dist/packages/engine/main.js |
| `AP_FLOW_WORKER_CONCURRENCY` | Activepieces | 10 |
| `AP_WEBHOOK_TIMEOUT_SECONDS` | Activepieces | 30 |
| `AP_SANDBOX_RUN_TIME_SECONDS` | Activepieces | 600 |
| `AP_TRIGGER_DEFAULT_POLL_INTERVAL` | Activepieces | 5 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/53ig3a)
