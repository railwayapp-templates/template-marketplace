# Deploy Flowise + Bifrost | Visual AI Agent Builder with a Built In Gateway on Railway

Flowise + Bifrost | Visual AI Agent Builder with a Built In Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-bifrost-or-visual-ai-agent-build)

## About

Building agents and flows usually means pasting a provider key into every model node, with no failover, no shared budget, and no single place to see what the AI is costing. This template fixes that. Flowise gives you the visual drag and drop builder, and Bifrost sits underneath as the gateway every model node routes through, so one connection reaches OpenAI, Anthropic, Google, and more, with provider failover and request logging built in.

The stack runs three services: Flowise as the builder with its own embedded storage on a volume, Bifrost as the AI gateway, and Postgres as Bifrost storage for configuration and request logs. After deploy, add a provider key in Bifrost, then in Flowise add a ChatOpenAI node and set its base URL to Bifrost over the private network. Every model call then flows through Bifrost with failover and full logging.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Bifrost | `maximhq/bifrost:latest` | Web service |
| Flowise | `flowiseai/flowise` | Web service |

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
| `PORT` | Flowise | 3000 |
| `DATABASE_PATH` | Flowise | /root/.flowise |
| `FLOWISE_PASSWORD` | Flowise | (secret) |
| `FLOWISE_USERNAME` | Flowise | (secret) |
| `NUMBER_OF_PROXIES` | Flowise | 1 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/root/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-bifrost-or-visual-ai-agent-build)
