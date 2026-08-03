# Deploy Open WebUI on Railway

Private AI chat UI for OpenAI, Ollama and any compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-ai-chat)

## About

Open WebUI is a self-hosted AI chat platform — a ChatGPT-style interface for whichever models you point it at (OpenAI, Groq, OpenRouter, vLLM, or a private Ollama server), with multi-user accounts, RBAC, document RAG, shared knowledge bases and notes. Its ~147k GitHub stars make it the default front end for teams that want the ChatGPT experience without sending conversations and files to a third-party SaaS. Self-host Open WebUI when chat history and internal documents must stay on infrastructure you control.

Deploy Open WebUI on Railway as three services in one deploy. The app runs the pinned `ghcr.io/open-webui/open-webui:v0.10.2` image on port `8080` and is the only service with a public domain. Managed **Postgres** holds users, chats, knowledge-base records and runtime configuration, replacing the SQLite file a plain container would use; managed **Redis** backs the websocket manager and shared session state. A volume at `/data` stores uploads, caches and the Chroma vector database; both datastores stay private.

![Open WebUI Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1785655906/587_1x_shots_so_kzugjm.png)

Open WebUI solves the chat sprawl that follows AI adoption — personal vendor accounts, ad-hoc API keys, no shared prompts, company documents in someone else's logs. One self-hosted instance gives everyone a single URL where model access and data retention are governed.

- **Provider-agnostic models** — OpenAI, Ollama and any OpenAI-compatible API side by side, with multi-model chats.
- **Built-in RAG** — PDFs, DOCX, Markdown and URLs in shared knowledge bases, with hybrid vector and keyword search.
- **Granular RBAC** — admin review for new accounts, per-group model permissions, LDAP, OAuth, SSO and SCIM 2.0.
- **Extensibility and workspace** — Tools, Functions, Pipes and MCP servers, plus notes, folders, channels, memory, scheduled automations, web search and image generation.

**open-webui** serves the UI and API, **Postgres** is the system of record, **Redis** the coordination layer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| open-webui | `ghcr.io/open-webui/open-webui:v0.10.2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `WEBUI_SECRET_KEY` | open-webui | (secret) |
| `TIKTOKEN_CACHE_DIR` | open-webui | (secret) |
| `OAUTH_SESSION_TOKEN_ENCRYPTION_KEY` | open-webui | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-ai-chat)
