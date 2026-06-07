# Deploy Bifrost + PostgreSQL on Railway

Deploy Bifrost AI Gateway with PostgreSQL — production-ready in one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blue-dark)

## About

Bifrost is an open-source, high-performance AI gateway written in Go that unifies 20+ LLM providers — OpenAI, Anthropic, AWS Bedrock, Google Vertex, Azure, and more — through a single OpenAI-compatible API. Deploy in seconds with automatic failover, load balancing, virtual keys, and enterprise governance. Adds only 11µs overhead at 5,000 RPS.

This template deploys Bifrost backed by PostgreSQL for persistent configuration and request log storage. On first boot, Bifrost automatically runs database migrations and launches a full web UI for visual provider setup, real-time monitoring, and analytics. All provider API keys, virtual keys, budgets, and governance settings persist in Postgres across restarts and redeploys. Connect any AI provider directly from the UI — no code changes required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| maximhq/bifrost:latest | `maximhq/bifrost:latest` | Web service |
| railwayapp-templates/postgres-ssl:18 | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `APP_HOST` | maximhq/bifrost:latest | 0.0.0.0 |
| `APP_PORT` | maximhq/bifrost:latest | 8080 |
| `LOG_LEVEL` | maximhq/bifrost:latest | info |
| `LOG_STYLE` | maximhq/bifrost:latest | json |
| `POSTGRES_DB` | railwayapp-templates/postgres-ssl:18 | bifrost |
| `POSTGRES_USER` | railwayapp-templates/postgres-ssl:18 | (secret) |
| `POSTGRES_PASSWORD` | railwayapp-templates/postgres-ssl:18 | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/blue-dark)
