# Deploy OpenClaw WhatsApp on Railway

Personal AI assistant on WhatsApp via OpenClaw

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-openclaw-whatsapp-assistant)

## About

OpenClaw WhatsApp turns a phone number into a private AI assistant via the OpenClaw Gateway. Pair WhatsApp Web by scanning a QR from the gateway, approve your number with an E.164 allow list, then chat with Claude, Codex, or a local model. Railway keeps the gateway online, stores pairing state on a volume, and exposes the Control UI.

The OpenClaw Gateway is the control plane for sessions, tools, events, and channels. This template deploys one service on port 18789 with a health check at /healthz and a volume at /data. State, including WhatsApp credentials, lives under /data/.openclaw; the workspace also sits under /data so transcripts and tool outputs survive redeploys.

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

[View on Railway →](https://railway.com/deploy/deploy-openclaw-whatsapp-assistant)
