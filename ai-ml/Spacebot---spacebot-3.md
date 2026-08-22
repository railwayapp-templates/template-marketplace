# Deploy Spacebot on Railway

Deploy Spacebot with Caddy HTTP Basic Auth and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spacebot-3)

## About

Spacebot is an open-source, self-hosted AI agent platform from Spacedrive. It provides a web UI, persistent agent memory, local workspaces, scheduled work, and integrations for channels such as Discord, Slack, Telegram, Twitch, and email. Spacebot supports multiple LLM providers and can run in setup mode until a provider credential is added.

This template runs the official Spacebot container together with a small Caddy reverse-proxy service. Spacebot stays private inside Railway’s network while Caddy supplies the public HTTPS endpoint and HTTP Basic Authentication. Spacebot’s `/data` directory is mounted to a Railway volume so configuration, SQLite/LanceDB/redb data, agent workspaces, logs, and browser caches survive redeploys and restarts. Add at least one provider key after deployment, then configure channels and models as needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy | `caddy:2.10.2-alpine` | Web service |
| spacebot | `ghcr.io/spacedriveapp/spacebot:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `BASIC_AUTH_PASSWORD` | caddy | (secret) |
| `BASIC_AUTH_USERNAME` | caddy | (secret) |
| `OPENAI_API_KEY` | spacebot | (secret) |
| `SLACK_APP_TOKEN` | spacebot | (secret) |
| `SLACK_BOT_TOKEN` | spacebot | (secret) |
| `ANTHROPIC_API_KEY` | spacebot | (secret) |
| `DISCORD_BOT_TOKEN` | spacebot | (secret) |
| `OPENROUTER_API_KEY` | spacebot | (secret) |
| `BRAVE_SEARCH_API_KEY` | spacebot | (secret) |

## Configuration

- **Start command:** `sh -euc 'test -n "${BASIC_AUTH_USERNAME:-}" && test -n "${BASIC_AUTH_PASSWORD:-}" && test -n "${SPACEBOT_UPSTREAM:-}"; hash="$(caddy hash-password --plaintext "$BASIC_AUTH_PASSWORD")"; printf ":${PORT:-80} {\n  handle /healthz {\n    respond \"ok\" 200\n  }\n  handle {\n    basic_auth {\n      %s %s\n    }\n    reverse_proxy %s\n  }\n}\n" "$BASIC_AUTH_USERNAME" "$hash" "$SPACEBOT_UPSTREAM" > /etc/caddy/Caddyfile; caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile; exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/spacebot-3)
