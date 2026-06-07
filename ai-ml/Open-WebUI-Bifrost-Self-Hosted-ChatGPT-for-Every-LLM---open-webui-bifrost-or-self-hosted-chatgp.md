# Deploy Open WebUI + Bifrost | Self-Hosted ChatGPT for Every LLM on Railway

Deploy and Host Open WebUI + Bifrost 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-bifrost-or-self-hosted-chatgp)

## About

A private, self-hosted ChatGPT alternative connected to every major LLM provider. Powered by Open WebUI, Bifrost, and Postgres — fully yours, zero vendor lock-in, one-click deploy. Open WebUI gives you the polished chat interface; Bifrost is the high-performance AI gateway that routes to 20+ providers (OpenAI, Anthropic, Google, AWS Bedrock, and more) with automatic failover, semantic caching, virtual keys, and cost tracking built in.

This template deploys a complete private AI workspace across three services: Open WebUI as the chat frontend, Bifrost as the multi-provider AI gateway, and Postgres for persistent storage. All services are pre-wired through Railway's internal private network with auto-generated secrets — no manual networking required.

After deploy, open the Bifrost dashboard to add your API keys (OpenAI, Anthropic, Groq, Gemini, or any supported provider), then open Open WebUI and start chatting. The first account created automatically becomes admin. Every message routes through Bifrost, so you get failover, caching, per-user budgets, and full request logging out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Open WebUI | `ghcr.io/open-webui/open-webui:main` | Web service |
| Bifrost | `maximhq/bifrost:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | bifrost |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Open WebUI | 8080 |
| `OPENAI_API_KEY` | Open WebUI | (secret) |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) |
| `ENABLE_OLLAMA_API` | Open WebUI | false |
| `RAG_EMBEDDING_ENGINE` | Open WebUI | openai |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_LEVEL` | Bifrost | info |
| `LOG_STYLE` | Bifrost | json |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Healthcheck:** `/health`
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-bifrost-or-self-hosted-chatgp)
