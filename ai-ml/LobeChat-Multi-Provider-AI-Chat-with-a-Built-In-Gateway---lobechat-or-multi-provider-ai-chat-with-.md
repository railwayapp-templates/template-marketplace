# Deploy LobeChat | Multi-Provider AI Chat with a Built-In Gateway on Railway

Deploy and Host LobeChat | Multi-Provider AI Chat with a Built-In Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobechat-or-multi-provider-ai-chat-with-)

## About

Running your own AI chat usually means picking one provider and locking yourself to it, or pasting raw API keys into a tool with no failover, no cost visibility, and no shared control. This template fixes that. LobeChat gives you a polished chat interface, and Bifrost sits behind it as the gateway, so every message can reach OpenAI, Anthropic, Google, and more through one connection, with provider failover and request logging built in.

The stack runs three services: LobeChat as the interface, Bifrost as the gateway, and Postgres as Bifrost storage for configuration and request logs. After deploy, open Bifrost and add a provider key, then open LobeChat, enter your access code, and start chatting. Every request routes through Bifrost, so you get failover and full request logs without changing anything in the chat app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Bifrost | `maximhq/bifrost:latest` | Web service |
| LobeChat | `lobehub/lobe-chat` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | bifrost |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_LEVEL` | Bifrost | info |
| `LOG_STYLE` | Bifrost | json |
| `OPENAI_API_KEY` | LobeChat | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lobechat-or-multi-provider-ai-chat-with-)
