# Deploy Vane on Bifrost: Self Hosted AI Search Engine on Railway

Deploy and Host Vane on Bifrost: Self Hosted AI Search Engine with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vane-on-bifrost-self-hosted-ai-search-en)

## About

Vane, formerly Perplexica, is a self hosted AI search engine. You ask a question, it searches the live web through its own private SearxNG, and an LLM writes a cited answer from what it finds. This template puts Bifrost behind it, an open source AI gateway, so the answering model and the reranker route through one connection that reaches 20+ providers, with failover and cost tracking.

Three services run together. Vane bundles its search engine and storage in a single image and serves the web UI. Bifrost is the AI gateway that Vane sends its model calls through, and Postgres holds Bifrost configuration and request logs over the private network. After deploy, add a provider key in Bifrost, then open the Vane setup wizard and point its OpenAI compatible base URL at Bifrost, choosing a chat model and an embedding model. From then on, every answer is grounded in fresh web results and routed through the gateway, so you control the model and the cost in one place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Bifrost | `maximhq/bifrost:latest` | Web service |
| Vane | `itzcrazykns1337/vane:latest` | Web service |

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
| `PORT` | Vane | 3000 |
| `HOSTNAME ` | Vane |  :: |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vane-on-bifrost-self-hosted-ai-search-en)
