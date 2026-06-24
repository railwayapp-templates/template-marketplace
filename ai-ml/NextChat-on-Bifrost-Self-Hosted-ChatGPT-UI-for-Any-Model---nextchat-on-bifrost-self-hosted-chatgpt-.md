# Deploy NextChat on Bifrost: Self Hosted ChatGPT UI for Any Model on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextchat-on-bifrost-self-hosted-chatgpt-)

## About

NextChat is a fast, lightweight, open source ChatGPT style UI for the web and desktop. This template runs it on Railway with the Bifrost AI gateway behind it, so the chat app talks to every model provider through one gateway you control, and never holds a real provider key.

The stack is two services: NextChat and the Bifrost AI gateway. NextChat serves the chat UI and stores conversations in the browser, so it needs no database. It points at Bifrost over the private network with a single base URL environment variable. Bifrost holds your real provider keys and handles routing, failover, virtual keys, budgets, and request logging, keeping its configuration and logs on a persistent volume. Adding a model is as simple as adding a provider key in Bifrost and listing the model in NextChat's model variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NextChats | `yidadaa/chatgpt-next-web:latest` | Web service |
| Bifrost | `maximhq/bifrost:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BASE_URL` | NextChats | http://bifrost.railway.internal:8080 |
| `CUSTOM_MODELS` | NextChats | -all,+gpt-4o |
| `OPENAI_API_KEY` | NextChats | (secret) |
| `HIDE_USER_API_KEY` | NextChats | (secret) |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_LEVEL` | Bifrost | info |
| `LOG_STYLE` | Bifrost | json |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nextchat-on-bifrost-self-hosted-chatgpt-)
