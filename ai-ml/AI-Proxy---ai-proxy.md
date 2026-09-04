# Deploy AI Proxy on Railway

A high-performance AI gateway for OpenAI, Claude, Gemini & more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-proxy)

## About

AI Proxy is a high-performance AI gateway that provides a unified entry point for OpenAI, Claude, Gemini, and other AI providers.

This Railway template deploys **AI Proxy with PostgreSQL and Redis**, giving you persistent configuration, shared caching, request logging, analytics, multi-tenant controls, and a built-in management panel.

![AI Proxy](https://raw.githubusercontent.com/labring/aiproxy/main/docs/images/dashboard.png)

AI Proxy acts as a middleware layer between your applications and multiple AI providers.

It supports OpenAI-compatible APIs together with Claude and Gemini protocols, while adding intelligent retry handling, channel prioritization, load balancing, monitoring, quotas, billing controls, and plugin-based extensions.

This template uses PostgreSQL for persistent application data and Redis for caching and shared runtime state over Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Aiproxy | `ghcr.io/labring/aiproxy:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis hostname available through Railway private networking |
| `REDISPORT` | Redis | 6379 | Default Redis TCP port |
| `REDISUSER` | Redis | default | Default Redis ACL username |
| `REDIS_URL` | Redis | - | Full Redis connection URL using Railway private networking |
| `REDISPASSWORD` | Redis | (secret) | Compatibility alias for clients expecting REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated Redis authentication password |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `TZ` | Aiproxy | Asia/Jakarta | Application timezone |
| `REDIS` | Aiproxy | - | Redis connection URL for caching and shared state |
| `LISTEN` | Aiproxy | :3000 | HTTP listen address for AIProxy |
| `SQL_DSN` | Aiproxy | - | PostgreSQL connection string for persistent AIProxy data |
| `ADMIN_KEY` | Aiproxy | - | Administrative key used to access AIProxy management APIs |
| `BILLING_ENABLED` | Aiproxy | true | Enable billing and usage accounting features |
| `SAVE_ALL_LOG_DETAIL` | Aiproxy | true | Store full request log details |
| `LOG_DETAIL_STORAGE_HOURS` | Aiproxy | 72 | Number of hours to retain detailed request logs |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ai-proxy)
