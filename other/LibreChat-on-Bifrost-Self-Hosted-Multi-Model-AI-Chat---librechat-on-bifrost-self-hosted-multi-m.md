# Deploy LibreChat on Bifrost: Self Hosted Multi Model AI Chat on Railway

Give your team a private ChatGPT across every model you connect.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-on-bifrost-self-hosted-multi-m)

## About

LibreChat is an open source, self hosted AI chat platform with a ChatGPT style interface, multi user auth, and support for every major model provider. This template runs it on Railway with the Bifrost AI gateway in front, so your whole team chats across providers while every model call flows through one gateway you control.

The stack is four services: LibreChat, its MongoDB database, the Bifrost AI gateway, and Postgres for Bifrost. LibreChat handles the chat UI, accounts, and conversation history in MongoDB. Bifrost holds your real provider keys and handles routing, failover, virtual keys, budgets, and request logging, with Postgres storing its configuration and logs. LibreChat reaches Bifrost through a custom endpoint baked into the image, pointing at Bifrost's OpenAI compatible endpoint on the private network, so the app never holds a real provider key itself.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Bifrost | `maximhq/bifrost:latest` | Web service |
| Librechat | [swadhin505/librechat-bifrost](https://github.com/swadhin505/librechat-bifrost) | Web service |
| MongoDB | `mongo:7` | Database |

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
| `HOST` | Librechat | 0.0.0.0 |
| `PORT` | Librechat | 3080 |
| `SEARCH` | Librechat | false |
| `NO_INDEX` | Librechat | true |
| `JWT_SECRET` | Librechat | (secret) |
| `ALLOW_REGISTRATION` | Librechat | true |
| `JWT_REFRESH_SECRET` | Librechat | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/librechat-on-bifrost-self-hosted-multi-m)
