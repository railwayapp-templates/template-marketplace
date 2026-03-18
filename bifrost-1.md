# Deploy Bifrost on Railway

Fastest enterprise AI gateway (50x faster than LiteLLM).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bifrost-1)

## About

Bifrost deploys as a containerized gateway that proxies requests to multiple AI providers while adding enterprise features like budget management and SSO. Deployment requires configuring provider API keys through the web UI or environment variables, setting up persistent storage for caching and logs, and optionally enabling clustering for high availability. The gateway supports 1000+ models with zero-configuration startup, offers built-in observability with Prometheus metrics, and includes guardrails for governance. Enterprise deployments can leverage HashiCorp Vault for secure key management and custom plugins for extensibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | `maximhq/bifrost` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port of the gateway. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/bifrost-1)
