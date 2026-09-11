# Deploy Bifrost on Railway

Fast Go LLM gateway with dashboard, virtual keys, budgets and fallbacks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-2)

## About

Bifrost is an open-source LLM gateway written in Go. It puts one OpenAI-compatible endpoint in front of OpenAI, Anthropic, Bedrock, Vertex, Azure, Mistral, Groq, Ollama and more, with a built-in dashboard for providers, virtual keys, budgets, fallbacks, semantic caching, MCP tools, and request logs.

Hosting Bifrost is a single container. This template uses the official `maximhq/bifrost:v2.1.1` image with a Railway volume mounted at `/app/data`, which is where Bifrost keeps its SQLite configuration store and request logs, the same layout as the upstream Docker Compose example. `PORT` and `APP_PORT` are pinned to 8080 so Railway's healthcheck hits `/health` on the right port, `APP_HOST` is `::` so other Railway services can reach it over IPv6 private networking, and `RAILWAY_RUN_UID=0` works around the image's non-root user against Railway's root-owned volumes. An encryption key and a one-time setup token are generated for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | `maximhq/bifrost:v2.1.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway's healthcheck and edge proxy probe. Must equal APP_PORT (8080). |
| `APP_DIR` | /app/data | Application data directory (config.db, logs.db, optional config.json). Must match the volume mount path. |
| `APP_HOST` | :: | Bind address passed as -host. '::' binds dual-stack so other Railway services can reach http://bifrost.railway.internal:8080 over IPv6. Use 0.0.0.0 (upstream default) if you only need IPv4. |
| `APP_PORT` | 8080 | Port the Bifrost gateway, dashboard, and /health listen on. The image entrypoint passes it as -port. Keep equal to PORT. |
| `LOG_LEVEL` | info | Optional. Process log level: debug, info, warn, or error. |
| `LOG_STYLE` | json | Optional. Process log format: json or pretty. |
| `OPENAI_API_KEY` | (secret) | Optional. If set on first boot, Bifrost auto-registers an OpenAI provider using this variable. You can also add providers later in the dashboard. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. If set on first boot, Bifrost auto-registers an Anthropic provider using this variable. You can also add providers later in the dashboard. |
| `BIFROST_SETUP_TOKEN` | (secret) | One-time bootstrap token. Paste it in Dashboard > Workspace > Config > Security when creating the first admin account. Never persisted or logged. |
| `BIFROST_ENCRYPTION_KEY` | - | Encrypts provider keys and other secrets at rest (Argon2id-derived AES-256). Set once; changing it makes stored secrets unreadable. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bifrost-2)
