# Deploy Bifrost AI Gateway Stack: LLM Proxy with Caching, Budgets, and Logs on Railway

A fast OpenAI compatible gateway with response caching across every model.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-ai-gateway-stack-llm-proxy-with-)

## About

Bifrost is an open source, high performance AI gateway that puts one OpenAI compatible endpoint in front of every model provider, with routing, failover, virtual keys, budgets, request logging, and response caching. This production template deploys Bifrost with Postgres and Redis on Railway, so you get a fast, governed gateway with persistent configuration, logs, and a caching layer in one click.

The stack is three services: Bifrost, Postgres, and Redis. Bifrost exposes an OpenAI compatible API that your apps, SDKs, and coding agents point at instead of calling each provider directly. It holds your real provider keys, routes and fails over across providers, enforces virtual keys, budgets, and rate limits, and logs every request. Postgres stores the gateway configuration and request logs so they persist and scale across restarts. Redis serves as the cache backend, giving instant replay of repeated requests with exact match caching out of the box, and semantic caching once you add an embedding provider. After deploy, you open the Bifrost dashboard, add one or more provider keys, and point any OpenAI client at the gateway URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Bifrost | `maximhq/bifrost:latest` | Web service |
| Redis | `redis/redis-stack-server:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | app |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_LEVEL` | Bifrost | info |
| `LOG_STYLE` | Bifrost | json |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bifrost-ai-gateway-stack-llm-proxy-with-)
