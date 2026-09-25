# Deploy Bifrost on Railway

Bifrost 2.2 fast AI gateway for 20+ LLM providers with virtual keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-2)

## About

Bifrost is a high-performance AI gateway written in Go. It exposes one OpenAI-compatible API in front of OpenAI, Anthropic, Google, AWS Bedrock, Azure, Mistral, Groq, Ollama and many more providers, with load balancing, fallbacks, semantic caching, budgets, rate limits, virtual keys, MCP tools and request logs.

This template deploys Bifrost v2.2.2 from the official image with its config and logs stores in SQLite on a Railway volume. The start command writes a `config.json` that protects the dashboard and management API with an admin username and a generated password, and requires a virtual key for every inference request. Provider keys are encrypted with a generated key. Add providers and virtual keys in the dashboard, then point any OpenAI SDK at Bifrost. It is light and fits the Hobby plan. Requests from other Railway services can use the private URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bifrost | `maximhq/bifrost:v2.2.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `APP_HOST` | :: |
| `APP_PORT` | 8080 |
| `BIFROST_ADMIN_PASSWORD` | (secret) |
| `BIFROST_ADMIN_USERNAME` | (secret) |
| `BIFROST_LOG_RETENTION_DAYS` | 30 |
| `BIFROST_DISABLE_CONTENT_LOGGING` | false |

## Configuration

- **Start command:** `sh -c 'mkdir -p /app/data && printf "%s\n" "{\"\$schema\": \"https://www.getbifrost.ai/schema\", \"encryption_key\": \"env.BIFROST_ENCRYPTION_KEY\", \"governance\": {\"auth_config\": {\"is_enabled\": true, \"admin_username\": \"env.BIFROST_ADMIN_USERNAME\", \"admin_password\": \"env.BIFROST_ADMIN_PASSWORD\", \"disable_auth_on_inference\": true}}, \"client\": {\"enforce_auth_on_inference\": true, \"enable_logging\": true, \"disable_content_logging\": ${BIFROST_DISABLE_CONTENT_LOGGING:-false}, \"log_retention_days\": ${BIFROST_LOG_RETENTION_DAYS:-30}}, \"config_store\": {\"enabled\": true, \"type\": \"sqlite\", \"config\": {\"path\": \"/app/data/config.db\"}}, \"logs_store\": {\"enabled\": true, \"type\": \"sqlite\", \"config\": {\"path\": \"/app/data/logs.db\"}}}" > /app/data/config.json && exec /app/docker-entrypoint.sh /app/main'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bifrost-2)
