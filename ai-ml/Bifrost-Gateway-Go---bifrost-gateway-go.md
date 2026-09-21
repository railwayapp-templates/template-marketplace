# Deploy Bifrost Gateway (Go) on Railway

Go LLM gateway with dashboard auth on, virtual keys, budgets and fallbacks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-gateway-go)

## About

Bifrost is an open-source LLM gateway written in Go. It puts one OpenAI-compatible endpoint in front of OpenAI, Anthropic, Bedrock, Vertex, Azure, Mistral, Groq, Ollama and more, with a built-in dashboard for providers, virtual keys, budgets, fallbacks, semantic caching, MCP tools, and request logs.

Hosting Bifrost is a single container. This template uses the official `maximhq/bifrost:v2.2.1` image with a Railway volume mounted at `/app/data`, which is where Bifrost keeps its SQLite configuration store and request logs, the same layout as the upstream Docker Compose example. `PORT` and `APP_PORT` are pinned to 8080 so Railway's healthcheck hits `/health` on the right port, `APP_HOST` is `::` so other Railway services can reach it over IPv6 private networking, and `RAILWAY_RUN_UID=0` works around the image's non-root user against Railway's root-owned volumes. The dashboard and admin API are password protected from the first boot: the start command seeds a config.json that turns on admin auth and requires a virtual key on every inference call, with the username and password read from environment variables so no credential is written into the file. An encryption key and the admin password are generated for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | `maximhq/bifrost:v2.2.1` | Web service |

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
| `BIFROST_SETUP_TOKEN` | (secret) | Only needed if you turn dashboard auth off and later create the first admin through the UI. Auth is already on by default in this template. |
| `BIFROST_ADMIN_PASSWORD` | (secret) | Dashboard and admin API password, generated at deploy. Bifrost requires 12+ characters with upper case, lower case, a number and a symbol; the Aa1! suffix guarantees that. Change it in Workspace, Config, Security. |
| `BIFROST_ADMIN_USERNAME` | (secret) | Dashboard and admin API username. Referenced from config.json as env.BIFROST_ADMIN_USERNAME, so the credential itself is never written to the config file. |
| `BIFROST_ENCRYPTION_KEY` | - | Encrypts provider keys and other secrets at rest (Argon2id-derived AES-256). Set once; changing it makes stored secrets unreadable. |

## Configuration

- **Start command:** `sh -c 'mkdir -p "$APP_DIR" && printf %s "{\"client\":{\"enforce_auth_on_inference\":true},\"governance\":{\"auth_config\":{\"is_enabled\":true,\"admin_username\":\"env.BIFROST_ADMIN_USERNAME\",\"admin_password\":\"env.BIFROST_ADMIN_PASSWORD\",\"disable_auth_on_inference\":false}}}" > "$APP_DIR/config.json" && exec /app/docker-entrypoint.sh'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bifrost-gateway-go)
