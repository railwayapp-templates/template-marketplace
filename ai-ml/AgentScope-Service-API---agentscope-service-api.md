# Deploy AgentScope Service API on Railway

AgentScope API with Redis state and persistent agent workspaces.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentscope-service-api)

## About

AgentScope API with Redis state and persistent agent workspaces.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 3 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| service | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Database |
| agentscope | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_HOST` | service | - | Private Redis/Valkey hostname supplied by the redis service reference. |
| `REDIS_PASSWORD` | service | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `PORT` | agentscope | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `ACCESS_USER` | agentscope | (secret) | Access user for agentscope. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | agentscope | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | agentscope | 8000 | Upstream port for agentscope. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | agentscope | (secret) | Generated access password. Keep private and preserve with backups. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/agentscope-service-api)
