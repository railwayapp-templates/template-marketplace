# Deploy LobeChat on Railway

Self-hosted AI chat with memory and plugins

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobe-chat)

## About

LobeChat is an open-source, self-hosted AI chat application that you can deploy on Railway in minutes. It supports multiple LLM providers — OpenAI, Anthropic Claude, Google Gemini, Groq, and Ollama — behind a single interface, with persistent conversation history, file uploads, voice input, plugins, and a multi-assistant UI. Self-hosting LobeChat gives you a private ChatGPT alternative with full data ownership and no per-seat subscription.

Hosting LobeChat requires running its Next.js application server alongside a PostgreSQL database. Postgres stores conversation history, user sessions, assistants, and plugin state, which is what enables persistent memory across sessions. Without a database, LobeChat runs in stateless mode and loses all chat history on restart.

The app reads its database connection string, auth secrets, and AI provider API keys from environment variables at startup. Railway provisions the Postgres instance, injects the connection variables, and networks both services automatically, so there is no manual configuration, Docker Compose file, or reverse proxy to maintain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| lobe-chat-railway-template | [Amritasha/lobe-chat-railway-template](https://github.com/Amritasha/lobe-chat-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | lobe-chat-railway-template | 3210 | - |
| `NODE_ENV` | lobe-chat-railway-template | production | - |
| `AUTH_SECRET` | lobe-chat-railway-template | (secret) | - |
| `OPENAI_API_KEY` | lobe-chat-railway-template | (secret) | - |
| `DATABASE_DRIVER` | lobe-chat-railway-template | node | - |
| `ANTHROPIC_API_KEY` | lobe-chat-railway-template | (secret) | - |
| `KEY_VAULTS_SECRET` | lobe-chat-railway-template | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/lobe-chat)
