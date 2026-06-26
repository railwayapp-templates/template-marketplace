# Deploy Chat UI Pro Stack: Self Hosted HuggingChat with Bifrost and Mongo on Railway

The open chat app behind HuggingChat, on any model, with its own database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chat-ui-pro-stack-self-hosted-huggingcha)

## About

Hugging Face Chat UI is the open source codebase that powers HuggingChat, a fast, self hosted chat interface for any OpenAI compatible model. This Pro Stack template runs it on Railway with MongoDB for storage and the Bifrost AI gateway in front, so every model call flows through one governed endpoint while conversations, users, and settings persist in your own database.

The stack is four services: Chat UI, MongoDB, the Bifrost AI gateway, and Postgres. Chat UI serves the SvelteKit chat interface and stores all conversations, users, settings, and assistants in MongoDB. Bifrost holds your real provider keys and handles routing, failover, virtual keys, budgets, and request logging, with Postgres storing its configuration and logs. Chat UI points at Bifrost through a single base URL environment variable and automatically discovers whatever models Bifrost serves, so the app never holds a real provider key itself.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | `maximhq/bifrost:latest` | Web service |
| ChatUI | `ghcr.io/huggingface/chat-ui:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| MongoDB | `mongo:7` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_LEVEL` | Bifrost | info |
| `LOG_STYLE` | Bifrost | json |
| `OPENAI_API_KEY` | ChatUI | (secret) |
| `MONGODB_DB_NAME` | ChatUI | chatui |
| `OPENAI_BASE_URL` | ChatUI | http://bifrost.railway.internal:8080/openai/v1 |
| `PUBLIC_APP_NAME` | ChatUI | ChatUI |
| `POSTGRES_DB` | Postgres | app |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data/db`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/chat-ui-pro-stack-self-hosted-huggingcha)
