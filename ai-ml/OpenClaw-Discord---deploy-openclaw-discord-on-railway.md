# Deploy OpenClaw Discord on Railway

OpenClaw Gateway connected to a Discord bot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-openclaw-discord-on-railway)

## About

OpenClaw Discord connects the OpenClaw Gateway to a Discord bot. Create a bot in the Discord Developer Portal, enable the Message Content intent, copy the bot token, add it to the OpenClaw Discord channel config, and invite the bot with an OAuth2 URL.

OpenClaw is an MIT-licensed gateway and control plane for sessions, tools, events, and channels. Discord is one of more than 20 supported channel types, including Telegram, Slack, WhatsApp, Signal, Google Chat, and iMessage.

The start command changes ownership of /data, applies OPENCLAW_RAILWAY_CONFIG as a one-line batch JSON that sets gateway.mode to local, derives publicOrigin and controlUi.allowedOrigins from RAILWAY_PUBLIC_DOMAIN, and sets trustedProxies to 100.64.0.0/10 for Railway's proxy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | `openclaw/openclaw:2026.10.3-browser@sha256:c84c4c37e7b9dc02dd869c9699ba0c4fb20ff821febe4b789bb2f8f4bfd9c8a3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for logs and scheduled tasks. |
| `HOME` | /home/node | Home directory for the node user, on the volume. |
| `PORT` | 18789 | HTTP port Railway routes to (18789). |
| `OPENCLAW_HOME` | /home/node | OpenClaw home directory on the volume. |
| `OPENAI_API_KEY` | (secret) | Optional OpenAI key for models. |
| `ANTHROPIC_API_KEY` | (secret) | Optional Anthropic key for Claude models. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Gateway state directory on the /data volume. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional Telegram bot token from BotFather. |
| `OPENCLAW_CONFIG_DIR` | /data/.openclaw | Config directory on the /data volume. |
| `OPENCLAW_CONFIG_PATH` | /data/.openclaw/openclaw.json | Path to the OpenClaw config file. |
| `OPENCLAW_GATEWAY_BIND` | lan | Gateway bind mode; lan so Railway can reach it. |
| `OPENCLAW_GATEWAY_PORT` | 18789 | Gateway listen port; keep equal to PORT. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Gateway auth token for the Control UI, generated per deploy. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Agent workspace directory on the /data volume. |
| `OPENCLAW_RAILWAY_CONFIG` | - | Start-time config: public origin, allowed origins, proxies. |

## Configuration

- **Start command:** `/bin/sh -c "set -ef; D=${RAILWAY_VOLUME_MOUNT_PATH:-/data}; mkdir -p $D/.openclaw $D/workspace $D/.config/openclaw; if [ ! -L /home/node/.config/openclaw ]; then rm -rf /home/node/.config/openclaw; ln -s $D/.config/openclaw /home/node/.config/openclaw; fi; find $D ! -user 1000 -exec chown -h 1000:1000 {} +; chmod 700 $D/.openclaw; cd /app; if [ ${#OPENCLAW_RAILWAY_CONFIG} -gt 0 ]; then setpriv --reuid=1000 --regid=1000 --init-groups env HOME=/home/node USER=node node openclaw.mjs config set --batch-json $OPENCLAW_RAILWAY_CONFIG || echo railway-start: config batch failed; fi; exec setpriv --reuid=1000 --regid=1000 --init-groups env HOME=/home/node USER=node tini -s -- node /app/docker-entrypoint.mjs node openclaw.mjs gateway --bind lan --port 18789 --allow-unconfigured"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deploy-openclaw-discord-on-railway)
